// pages/my/collection/collection.js
import { My } from '../my-model.js';

var my = new My();

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
    my.getUserCollection((data) => {
      this.setData({
        'data' : data
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '收藏',
    })
  },

  /*查看回答详情*/
  toAnswer: function (event) {
    var id = my.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../../home/answer/answer?id=' + id,
    })
  },

})