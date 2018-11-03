// pages/my/my-profile/my-profile.js
import { My } from '../my-model.js';

var my = new My();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: '',
    major: '',
    alertActive: 'none'
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
      title: '编辑个人资料',
    })
  },

  onShow: function () {
    my.getUserInfoFromServer((data) => {
      this.setData({
        'data': data,
        'school': data.school,
        'major': data.major
      });
    });
  },

  /*监听学校输入*/
  schoolInput: function(event) {
    this.data.school = event.detail.value;
  },

  /*监听专业输入*/
  majorInput: function (event) {
    this.data.major = event.detail.value;
  },

  /*提交*/
  submit: function(){
    var data = {
      'school': this.data.school,
      'major': this.data.major
    };
    console.log(data);
    if (data.school != '' && data.major != '' 
      && data.school != null && data.major != null ) {
      my.saveUserInfo(data, (res) => {
        wx.navigateBack({
          delta: 1
        })
      });
    }
    else{
      this.showTips('请补全信息');
    }

  },

  /*提示信息*/
  showTips: function (msg) {
    this.setData({
      msg: msg,
      alertActive: ''
    });

    setTimeout(function () {
      this.setData({
        alertActive: 'none'
      });
    }.bind(this), 1500);
  },




})