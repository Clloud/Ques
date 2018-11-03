// pages/discussion/question/question.js
import { Question } from 'question-model.js';
import { My } from '../../my/my-model.js';

var question = new Question(),
    my = new My();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerId: 0,
    hasAnswered: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData(options.id);
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

  /*加载数据*/
  _loadData: function(id){
    var that = this;
    question.getAnswerByQuestion(id, data => {
      this.setData({
        'data': data
      });
      my.getUserAnswer((data) => {
        that._check(data);
      });
    });
  },

  /*检查是否回答过该问题*/
  _check: function (data) {
    var flag = false,
        question_id = this.data.data.question.id,
        that = this;

    for (var i = 0; i < data.length; i++) {
      if (data[i].question_id == question_id) {
        flag = true;
        that.setData({
          'answerId' : data[i].id
        });
        break;
      }
    }

    if (flag == true) {
      this.setData({
        hasAnswered: true
      });
    }
  },

  /*跳转到自己的回答*/
  toMyAnswer: function () {
    wx.navigateTo({
      url: '../answer/answer?id=' + this.data.answerId,
    })
  },

  /*跳转到回答页面*/
  onAnswerTap: function (event) {
    var id = question.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../answer/answer?id=' + id,
    })
  },

  /*写回答*/
  addAnswer: function (event) {
    var id = question.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../add-answer/add-answer?id=' + id,
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