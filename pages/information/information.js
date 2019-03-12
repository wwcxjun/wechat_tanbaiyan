// pages/information/information.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '还没有留言哦~',
    page : 1,
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.url + '/look',
      method: 'POST',
      data: {
        token: token,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.data.to === null){
          var tips = '还没有留言哦~';
        }else{
          var tips = '到底啦';
        }
        that.setData({
          content: res.data.data.data,
          tips: tips,
          next_page_url: res.data.data.next_page_url
        });
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
    var that = this;
    if (that.data.next_page_url === null){
      wx.showToast({
        title: '到底啦',
        icon: 'none',
        duration: 5000
      })
      return;
    }
    var token = wx.getStorageSync('token');
    var page = that.data.page + 1;
    wx.request({
      url: app.globalData.url + '/look',
      method: 'POST',
      data: {
        token: token,
        page: page
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var contents = that.data.content
        contents = contents.concat(res.data.data.data);
        that.setData({
          content: contents,
          page: page + 1,
          next_page_url: res.data.data.next_page_url
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})