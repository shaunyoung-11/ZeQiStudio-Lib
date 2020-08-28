// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "https://i0.hdslb.com/bfs/face/a9b8be284afff02d8b05bde724129d7da139a23a.jpg",
    name: "择栖工作室",
    totalBorrow: 0,
    nowBorrow: 0
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
  scanCode: function(){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: "barCode",
      success: (res)=>{
        // res.result
        var resp = res;
        wx.request({
          url: 'https://book.feelyou.top/isbn/' + resp.result,
          method: 'GET',
          success: (res)=>{
            console.log(res)
          }
        })
      }
    })
  }
})