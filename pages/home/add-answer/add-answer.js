// pages/discussion/add-answer/add-answer.js
import { Question } from '../question/question-model.js';
import { Answer } from '../answer/answer-model.js';
import { My } from '../../my/my-model.js';

var question = new Question(),
    answer = new Answer(),
    my = new My();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_id: 0,
    answer: '',
    alertActive: 'none',
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
    wx.setNavigationBarTitle({
      title: '回答',
    })
  },

  onShow: function () {
    var that = this;
    my.getUserInfo((data) => {
      my.saveUserInfo(data, (callback) => {
      });
    })

    my.getUserInfoFromServer((data) => {
      that._checkValid(data);
    });
  },

  /*加载数据*/
  _loadData: function (id) {
    this.setData({
      'question_id': id
    });

    question.getQuestion(id, (question) => {
      this.setData({
        'question': question
      });
      console.log(question);
    });
  },

  /*检查用户信息是否填写完整*/
  _checkValid: function(data) {
    console.log(data);
    if (data.school == null) {
      wx.showActionSheet({
        itemList: ['去完善个人信息'],
        itemColor: '#0184FD',
        success: function (res) {
          wx.navigateTo({
            url: '../../my/my-profile/my-profile',
          })
        },
        fail: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  /*监听回答输入*/
  answerInput: function (event) {
    this.data.answer = event.detail.value;
  },

  /*提交回答*/
  submit: function() {
    var data = {
      'id': this.data.question_id,
      'context': this.data.answer
    };
    console.log(data);
    if (data.context != '') {
      answer.addAnswer(data, (callback) => {
        if (callback.answer_id != undefined) {
          wx.navigateTo({
            url: '../answer/answer?id=' + callback.answer_id,
          })
        }
      });
    } 
    else {
      this.showTips('回答不能为空');
    }

  },

    /*显示提示信息*/
  showTips: function(msg) {
    this.setData({
      msg: msg,
      alertActive: ''
    });
    setTimeout(function () {
      this.setData({
        alertActive: 'none'
      });
    }.bind(this), 1500);
  }

})