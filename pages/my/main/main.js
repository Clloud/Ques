// pages/my/my.js
import { My } from '../my-model.js';
import { User } from '../../../utils/user.js';

var my = new My();
var user = new User();

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
    // this._loadData();
  },

  /**
   * 生命周期函数--监听页面加载完毕
   */
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '我的'
    });
  },

  onShow: function(){
    this._loadData();
  },


  /*加载数据 */
  _loadData() {
    var that = this;
    //从微信服务器获取用户数据
    my.getUserInfo((data) => {
      this.setData({
        userInfo: data
      });
      my.saveUserInfo(data, (callback) => {
        
      });
    })

    //从数据库获取用户数据
    my.getUserInfoFromServer((data) => {
      this.setData({
        savedUserInfo: data
      });
      console.log(typeof(data.school));
    })
  },

  /*获取用户信息*/
  getUserInfo: function() {
    my.getUserInfo((data) => {
      this.setData({
        userInfo: data
      })
    })
  },

  /*用户授权后，获取用户信息 */
  bindGetUserInfo: function (e) {
    my.getUserInfo((data) => {
      this.setData({
        userInfo: data
      })
    })
  },

  /*编辑个人资料*/
  editInfo: function(){
    wx.navigateTo({
      url: '../my-profile/my-profile',
    })
  },

  /*查看我的创作*/
  toMyWork: function(){
    wx.navigateTo({
      url: '../my-work/my-work',
    })
  },

  /*查看我的收藏*/
  toCollection: function () {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },


})