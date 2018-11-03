// pages/discussion/ask-question/ask-question.js
import {Question} from '../question/question-model.js';
import { My } from '../../my/my-model.js';

var question = new Question(),
    my = new My();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    description: '',
    alertActive: 'none',
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
      title: '提问',
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

  /*检查用户信息是否填写完整*/
  _checkValid: function (data) {
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

  /*监听标题输入*/
  titleInput: function (event) {
    this.data.title = event.detail.value;
  },

  /*监听描述输入*/
  descriptionInput: function (event) {
    this.data.description = event.detail.value;
  },

  /*提交问题*/
  submit: function() {
    var data = {
      'title': this.data.title,
      'description': this.data.description
    };
    var that = this;
    question.askQuestion(data, (callback) => {
      console.log(callback);
      if (callback.question_id != undefined) {
        wx.navigateTo({
          url: '../question/question?id=' + callback.question_id,
        })
      }
      else{
        that.showTips('标题不能为空');
      }

    });
  },

    /*提示信息*/
  showTips: function (msg) {
    //显示提示信息
    this.setData({
      msg: msg,
      alertActive: ''
    });

    //一段时间后隐藏
    setTimeout(function () {
      this.setData({
        alertActive: 'none'
      });
    }.bind(this), 1500);
  },
  

})