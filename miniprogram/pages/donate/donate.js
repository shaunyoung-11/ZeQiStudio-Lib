// miniprogram/pages/donate/donate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    press: "",
    labels:[],
    owner:"",
    cover:"",
    isbn: "",
    position: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '查询中',
    })
    wx.request({
      url: 'https://book.feelyou.top/isbn/' + options.isbn,
      method: 'GET',
      success: (res)=>{
        console.log(res)
        this.setData({
          isbn: res.data.isbn,
          labels: res.data.labels,
          name: res.data.title,
          press: res.data.book_info.出版社,
          cover: res.data.cover_url
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
   * 上传照片
   */
  uploadImg: function () {
    wx.chooseImage({
      count: 1,
      success: res=>{
        var resp = res
        wx.cloud.uploadFile({
          filePath: resp.tempFilePaths[0],
          cloudPath: `${Math.floor(Math.random() * 10000000)}.png`
        }).then(res=>{
          this.setData({
            cover: res.fileID
          })
        })
      }
    })
  },

  /**
   * 点击确定
   */
  donate: function () {
    wx.showLoading({
      title: '添加中',
    })
    wx.cloud.callFunction({
      name: 'addBook',
      data:{
        name:this.data.name,
        press: this.data.press,
        owner: this.data.owner,
        labels: this.data.labels,
        cover: this.data.cover,
        isbn: this.data.isbn,
        position:this.data.position
      }
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
        duration: 2000
      })
      wx.redirectTo({
        url: '../index/index',
      })
    })
  }
})