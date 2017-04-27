//index.js
let util = require('../../utils/util.js');

Page({
  data:{
    date: 0,
    listStoriesBefore: []
  },

  getList: function() {
    let that = this;
    wx.showLoading({ title: '加载中' })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      method: 'GET',
      success: function(res){
        that.setData({
          listStories: res.data.stories,
          listtTopStories: res.data.top_stories
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      },
      fail: function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  getBeforeList: function() {
    wx.showLoading({ title: '加载中' })
    let that = this;
    let d = this.data.date;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/'+ d,
      method: 'GET',
      success: function(res){
        let arr = that.data.listStoriesBefore.concat(res.data.stories);
        that.setData({
          date: res.data.date,
          listStoriesBefore: arr
        })
        wx.hideLoading()
      },
      fail: function(res) {
        wx.hideLoading()
      }
    })
  },

  onPullDownRefresh: function() {
    this.getList();
  },

  onReachBottom: function() {
    this.getBeforeList();
  },

  onLoad:function(options){
    this.setData({
      date: util.getNowFormatDate()
    })
    this.getList();
  }
})