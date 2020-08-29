// miniprogram/pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    lib: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'queryUsr'
    }).then(res=>{
      console.log(res)
      if(res.result.data.length != 0){
        this.setData({
          lib:res.result.data[0].lib
        })
        wx.hideLoading()
      }
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
   * 用户注册
   */
  register: function () {
    wx.showLoading({
      title: '注册中',
    })
    wx.cloud.callFunction({
      name:'addUsr',
      data:{
        name: this.data.name,
        phone: this.data.phone,
        lib: this.data.lib
      }
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '注册成功',
        duration: 2000
      })
      wx.redirectTo({
        url: '../index/index',
      })
    })
  }
})