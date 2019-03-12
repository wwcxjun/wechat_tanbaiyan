// pages/confession/confession.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uid = wx.getStorageSync('uid');
    if (options.scene === null || options.scene === '' || uid == options.scene){
      wx.navigateTo({
        url: '../index/index'
      })
      return;
    }
    that.setData({
      receive_user_id: options.scene
    });
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

  submit: function(e){
    var that = this;
    var content = e.detail.value.textarea;
    content = content.replace(/\s+/g, "");
    if (content == '') {
      wx.showToast({
        title: "要输入内容才可以哦！",
        icon: "none"
      })
      return true;
    }
    if (e.detail.value.textarea.length > 200) {
      wx.showToast({
        title: "内容太多啦最多只能200字哦",
        icon: "none"
      })
      return true;
    }
    var signature = e.detail.value.signature;
    signature = signature.replace(/\s+/g, "");
    if (signature == '') {
      wx.showToast({
        title: "要输入署名才可以哦！",
        icon: "none"
      })
      return true;
    }
    if (e.detail.value.signature.length > 10) {
      wx.showToast({
        title: "署名太长啦",
        icon: "none"
      })
      return true;
    }
    wx.request({
      url: app.globalData.url + '/send',
      method: 'POST',
      data: {
        content: content,
        signature: signature,
        user_id: this.data.receive_user_id,
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.status == 200){
          that.setData({
            status :200
          });
        }
      }
    })
  }
})