//index.js
// let util = require('/utils/util.js');

Page({
  data:{
    list: []
  },

  getList: function(page) {
    let that = this;
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      method: 'GET',
      success: function(res){
        // console.log(res)
        that.setData({
          listStories: res.data.stories,
          listtTopStories: res.data.top_stories
        })
        wx.hideLoading()
      },
      fail: function(res) {
        wx.hideLoading()
      },
      complete: function(res) {
      }
    })
  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {
    // this.getList();
    console.log('onReachBottom')

  },

  onLoad:function(options){
    this.getList();
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