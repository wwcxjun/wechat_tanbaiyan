// pages/start/start.js
const app = getApp();
const ctx = wx.createCanvasContext('shareCanvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: "",
    canvasHeight: "",
    canvasLeft: "",
    canvasTop: ""
  },
  getImage: function (url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: function (res) {
          resolve(res)
        },
        fail: function () {
          reject("")
        }
      })
    })
  },
  getImageAll: function (image_src) {
    let that = this;
    var all = [];
    image_src.map(function (item) {
      all.push(that.getImage(item))
    })
    return Promise.all(all)
  },
  create: function () {
    let that = this;
    //图片一把是通过接口请求后台，返回俩点地址，或者网络图片
    let bg = app.globalData.url + '/images/bg.jpg';
    let qr = app.globalData.url + '/qrcode/' + wx.getStorageSync('token');
    //图片区别下载完成，生成临时路径后，在尽心绘制
    this.getImageAll([bg, qr]).then((res) => {
      let bg = res[0];
      let qr = res[1];
      //设置canvas width height position-left,  为图片宽高
      this.setData({
        canvasWidth: bg.width + 'px',
        canvasHeight: bg.height + 'px',
        canvasLeft: `-${bg.width + 100}px`,
      })
      let ctx = wx.createCanvasContext('canvas');
      ctx.drawImage(bg.path, 0, 0, bg.width, bg.height);
      ctx.drawImage(qr.path, bg.width - qr.width / 2, bg.height - 250, 150, 150)
      ctx.draw()
      wx.showModal({
        title: '提示',
        content: '绘制完成',
        showCancel: false,
        confirmText: "点击保存",
        success: function () {
          that.save()
        }
      })
    })
  },
  save: function () {
    wx.canvasToTempFilePath({//canvas 生成图片 生成临时路径
      canvasId: 'canvas',
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({ //下载图片
          filePath: res.tempFilePath,
          success: function () {
            wx.showToast({
              title: "保存成功",
              icon: "success",
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qrcode = app.globalData.url + '/qrcode/' + wx.getStorageSync('token');
    this.setData({
      qrcode: qrcode
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
    var uid = wx.getStorageSync('uid');
    var imgurl = app.globalData.url;
    return {
      title: '坦白言-想说什么就说什么',
      path: 'pages/confession/confession?scene=' + uid,
      imageUrl: imgurl + '/tanbaiyan.jpg'
    }
  }
})