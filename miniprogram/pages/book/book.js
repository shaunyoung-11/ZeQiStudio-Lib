// miniprogram/pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      _id: options._id
    })
    wx.cloud.callFunction({
      name:'queryBook',
      data:{
        _id: options._id
      }
    }).then(res=>{
      console.log(res)
      var result = res
      result.result.data.record.forEach((item)=>{
        item.time = item.time.substring(0, 10)
      })
      this.setData({
        cover: result.result.data.cover,
        name: result.result.data.name,
        press: result.result.data.press,
        state: result.result.data.state,
        record: result.result.data.record.reverse(),
        position: result.result.data.position,
        isbn: result.result.data.isbn
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
   * 借书按钮
   */
  borrow: function () {
    wx.showLoading({
      title: '正在借阅',
    })
    wx.getSetting({
      success:(res)=>{
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res)=>{
              console.log(res.userInfo.nickName)
              var nickName = res.userInfo.nickName
              var avatar = res.userInfo.avatarUrl
              wx.cloud.callFunction({
                name: 'addBookToUsr',
                data:{
                  isbn: this.data._id
                }
              }).then(res=>{
                wx.cloud.callFunction({
                  name: 'addUsrToBook',
                  data:{
                    nickName: nickName,
                    avatar: avatar,
                    _id: this.data._id
                  }
                }).then(res=>{
                  wx.cloud.callFunction({
                    name: 'changeBookState',
                    data:{
                      _id:this.data._id,
                      state: true
                    }
                  }).then(res=>{
                    wx.hideLoading()
                    wx.showToast({
                      title: '已借阅',
                    })
                    wx.redirectTo({
                      url: '../index/index',
                      success: ()=>{
                        wx.hideToast()
                      }
                    })
                  })
                })
              })
            }
          })
        }else{
          wx.showToast({
            title: '授权失败',
            icon: "none"
          })
        }
      }
    })
  }
})