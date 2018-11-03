// pages/home/comment/comment.js
import { Answer } from '../../home/answer/answer-model.js';

var answer = new Answer();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:{},
    content:'',
    alertActive: 'none',
    submitStyle:'submit-button'
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
      title: '评论',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /*加载数据*/
  _loadData: function(id){
    this.setData({
      'id': id
    });
    answer.getAnswerComment(id, (data) => {
      this.setData({
        'comment': data
      });
    });
  },

  /*监听评论输入*/
  commentInput: function(event){
    this.data.content = event.detail.value;
    if (this.data.content.length == 0) {
      this.setData({
        'submitStyle':'submit-button'
      });
    }
    else{
      this.setData({
        'submitStyle': 'submit-button-selected'
      });
    }
  },

  /*提交评论*/
  send: function(){
    var data = {
        'id': this.data.id,
        'content': this.data.content
        },
        that = this;
    console.log(data);
    if (data.content == '') {
      this.showTips('评论内容不能为空');
    }
    else {
      answer.addComment(data, (res) => {
        console.log(res);
        if (res.comment_id != 'undefined') {
          that._loadData(that.data.id);
        }
      });
    }
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