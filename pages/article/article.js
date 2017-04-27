// pages/article/article.js
let WxParse = require('../../wxParse/wxParse.js');

Page({
  data:{
  },
  onLoad:function(options){
    console.log(options.id)
    let id = options.id;
    let that = this;
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + id,
      method: 'GET',
      success: function(res){
        let article = res.data.body;
        WxParse.wxParse('article', 'html', article, that, 0);
        that.setData({
          id: id,
          title: res.data.title,
          image: res.data.image,
          image_source: res.data.image_source
        })
        wx.hideLoading();
      },
      fail: function(res) {
        wx.hideLoading();
      },
      complete: function(res) {
      }
    })

  },
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: '/pages/article/article?id=' + this.data.id,
      success: function(res) {
      },
      fail: function(res) {
      }
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})