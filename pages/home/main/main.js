// pages/discussion/main/main.js
import { Main } from 'main-model.js';

var main = new Main();

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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '主页',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._loadData();
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

  /*加载数据*/
  _loadData: function () {
    main.getRecommendQuestion(data => {
      this.setData({
        'questions': data
      });
      console.log(data);
    });
  },

  /*跳转到问题页面*/
  onQuestionTap: function(event){
    var id = main.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../question/question?id=' + id,
    })
  },

  /*跳转到回答页面*/
  onAnswerTap: function (event) {
    var id = main.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../answer/answer?id=' + id,
    })
  },

  /*搜索问题*/
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  /*回答问题*/
  ask: function () {
    wx.navigateTo({
      url: '../ask-question/ask-question',
    })
  }

})