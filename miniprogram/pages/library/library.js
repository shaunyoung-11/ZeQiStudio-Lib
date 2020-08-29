// pages/library/library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    key: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      lib: options.lib
    })
    wx.cloud.callFunction({
      name: 'queryBooks',
      data:{
        lib: options.lib
      }
    }).then(res=>{
      console.log(res)
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
   * 搜索书籍
   */
  searchBook: function () {
    wx.showLoading({
      title: '搜索中',
    })
    wx.cloud.callFunction({
      name: 'searchBook',
      data:{
        key: this.data.key,
        lib: this.data.lib
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        books: res.result.data
      })
      wx.hideLoading()
    })
  },

  /**
   * 跳转到书籍详情页面
   */
  toBook: function (event) {
    wx.showLoading({
      title: '跳转中',
    })
    console.log(event)
    wx.navigateTo({
      url: '../book/book?_id=' + event.currentTarget.id,
      success: ()=>{
        wx.hideLoading()
      }
    })
  }
})