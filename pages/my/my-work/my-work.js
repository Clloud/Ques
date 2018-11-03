// pages/my/my-work/my-work.js
import { My } from '../my-model.js';

var my = new My();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionSelected: true,
    answerSelected: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnswer();
    this.getQuestion();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的创作',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /*加载回答数据*/
  getAnswer: function(){
    my.getUserAnswer((answer) => {
      this.setData({
        'answer': answer
      });
    });
  },

  /*加载提问数据*/
  getQuestion: function () {
    my.getUserQuestion((question) => {
      this.setData({
        'question': question
      });
    });
  },

  /*查看所有提问*/
  onQuestionTap: function(){
    this.setData({
      'questionSelected': true,
      'answerSelected': false
    });
  },

  /*查看所有回答*/
  onAnswerTap: function () {
    this.setData({
      'questionSelected': false,
      'answerSelected': true
    });
  },

  /*查看回答详情*/
  toAnswer: function (event) {
    var id = my.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../../home/answer/answer?id=' + id,
    })
  },

  /*查看问题详情*/
  toQuestion: function (event) {
    var id = my.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../../home/question/question?id=' + id,
    })
  },

})