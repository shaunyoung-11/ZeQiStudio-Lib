// miniprogram/pages/borrow/borrow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options.arr)
    wx.cloud.callFunction({
      name: 'queryBorrowBooks',
      data: {
        arr: JSON.parse(options.arr)
      }
    }).then(res=>{
      this.setData({
        books: res.result.data
      })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 还书
   */
  giveBack: function (e) {
    console.log(e)
    var a = e
    wx.scanCode({
      onlyFromCamera: true,
      scanType: 'barCode',
      success: res=>{
        if(res.result == e.currentTarget.dataset.isbn){
          wx.showLoading({
            title: '归还中',
            mask: true,
          })
          wx.cloud.callFunction({
            name: 'changeBookState',
            data: {
              _id: e.currentTarget.id,
              state: false
            }
          }).then(res=>{
            wx.hideLoading()
            wx.showToast({
              title: '已归还',
            })
            wx.cloud.callFunction({
              name: 'removeBookFromUsr',
              data:{
                _id:a.currentTarget.id
              }
            }).then(res=>{
              wx.redirectTo({
                url: '../index/index',
                success: ()=>{
                  wx.hideToast()
                }
              })
            })
          })
        }else{
          wx.showToast({
            title: '书籍与ISBN不匹配',
            icon: "none"
          })
        }
      }
    })
  }
})