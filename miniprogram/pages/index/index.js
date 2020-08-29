// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    name: "点击登录",
    totalBorrow: 0,
    nowBorrow: 0,
    showUsrInfo:false,
    lib:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'queryUsr'
    }).then(res=>{
      if(res.result.data.length != 0){
        this.setData({
          showUsrInfo: true,
          nowBorrow: res.result.data[0].borrow,
          totalBorrow: res.result.data[0].history,
          lib: res.result.data[0].lib
        })
        wx.hideLoading()
      }else{
        wx.navigateTo({
          url: '../register/register',
          success: ()=>{
            wx.hideLoading()
          }
        })
      }
    })
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
   * 扫描条形码，录入图书信息
   */
  scanBarCode: function(){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: "barCode",
      success: (res)=>{
        wx.showLoading({
          title: '请稍等',
        })
        wx.navigateTo({
          url: '../donate/donate?isbn=' + res.result,
          success: function(){
            wx.hideLoading()
          }
        })
      }
    })
  },

  /**
   * 跳转到图书馆页面
   */
  toLibrary: function(){
    wx.navigateTo({
      url: '../library/library?lib=' + this.data.lib,
    })
  },

  /**
   * 扫码借书
   */
  borrow: function () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: "barCode",
      success:(res)=>{
        console.log(res.result)
        wx.cloud.callFunction({
          name: 'queryBooksByIsbn',
          data:{
            lib: this.data.lib,
            isbn: res.result
          }
        }).then(res=>{
          console.log(res)
          if(res.result.data.length != 0){
            wx.navigateTo({
              url: '../book/book?_id=' + res.result.data[0]._id,
            })
          }else{
            wx.showToast({
              title: '书籍不存在',
              duration: 1500,
              icon: "none",
            })
          }
        })
      }
    })
  },

  /**
   * 跳转到已借图书页面
   */
  toBorrow: function (e) {
    wx.navigateTo({
      url: '../borrow/borrow?arr=' + (e.currentTarget.id == 'total' ? JSON.stringify(this.data.totalBorrow) : JSON.stringify(this.data.nowBorrow))
    })
  }
})