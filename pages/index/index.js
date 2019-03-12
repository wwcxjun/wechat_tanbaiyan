//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    toptips: 'move'
  },
  onLoad: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        toptips: ''
      })
    }, 2000)
  },
  onShareAppMessage: function () {
    return {
      title: '想知道TA对你的印象？来坦白言吧！',
    }
  }
})
