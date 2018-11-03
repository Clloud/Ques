// pages/discussion/search/search.js
import { Question } from '../question/question-model.js';

var question = new Question();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: ''
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
      title: '搜索',
    })
  },

  /*监听查询输入*/
  queryInput: function (event) {
    this.data.query = event.detail.value;
  },

  /*查询问题*/
  search: function (event) {
    var query = this.data.query;
    if (query != '') {
      var data = {
        'query': query
      }
      question.queryQuestion(data, (res) => {
        console.log(res);
        this.setData({
          'questions': res
        });
      });
    }
  },

  /*跳转到问题页面*/
  onQuestionTap: function (event) {
    var id = question.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../question/question?id=' + id,
    })
  },

  /*跳转到回答页面*/
  onAnswerTap: function (event) {
    var id = question.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../answer/answer?id=' + id,
    })
  },


})