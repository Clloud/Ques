// pages/discussion/answer/answer.js
import { Answer } from 'answer-model.js';
import { Question } from '../question/question-model.js';
import { My } from '../../my/my-model.js';

var answer = new Answer(),
    question = new Question(),
    my = new My();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerId: 0,
    hasAnswered: false,
    alertActive: 'none',
    approvalStatus: false,
    collectionStatus: false,
    approvalCount: 0,
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
  _loadData: function (id) {
    var that = this;
    //获取问题回答
    answer.getAnswer(id, data => {
      console.log(data);

      this.setData({
        'data' : data,
        'approvalCount': data.approval_count
      });

      //获取回答对应的问题
      question.getQuestion(data.question_id, (question) => {
        this.setData({
          'question': question
        });
        my.getUserAnswer((data) => {
          that._check(data);
        });
      });

      //获取问题点赞、收藏状态
      answer.getApprovalStatus(data.id, (res) => {
        console.log(res);
        if (res.status == 'approved') {
          this.setData({
            'approvalStatus': true
          });   
        }


      })
      answer.getCollectionStatus(data.id, (res) => {
        console.log(res);
        if (res.status == 'collected') {
          this.setData({
            'collectionStatus': true
          });
        }
      })
      
    });


  },

  /*检查是否回答过该问题*/
  _check: function(data){
    
    var flag = false,
        question_id = this.data.question.question.id,
        that = this;

    for (var i=0; i<data.length; i++) {
      if (data[i].question_id == question_id) {
        flag = true;
        that.setData({
          'answerId': data[i].id
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

  /*跳转到问题界面*/
  onQuestionTap: function(event) {
    var id = answer.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../question/question?id=' + id,
    })
  },

  /*写回答*/
  addAnswer: function(event){
    var id = answer.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../add-answer/add-answer?id=' + id,
    })
  },

  /*跳转到我自己的回答*/
  toMyAnswer: function(){
    if (this.data.answerId == this.data.data.id) {
      this.showTips('当前已是你的回答');
    }
    else{
      wx.navigateTo({
        url: '../answer/answer?id=' + this.data.answerId,
      });
    }
  },

  /*赞成*/
  approve: function() {
    var that = this;
    answer.alterApprovalStatus(this.data.data.id, (res) => {
      console.log(res);
      if (res.status == 0) {
        this.setData({
          'approvalStatus': false,
          'approvalCount': this.data.approvalCount - 1,
        });
        that.showTips('已取消');
      }
      else {
        this.setData({
          'approvalStatus': true,
          'approvalCount': this.data.approvalCount + 1,
        });
        that.showTips('已赞同');
      }
    });
  },

  /*收藏*/
  collect: function () {
    var that = this;
    answer.alterCollectionStatus(this.data.data.id, (res) => {
      if (res.code == 201) {
        if (this.data.collectionStatus == true) {
          that.setData({
            'collectionStatus': false
          });
          that.showTips('已取消收藏');
        }
        else {
          that.setData({
            'collectionStatus': true
          });
          that.showTips('已收藏');
        }
      }
    });
  },

  /*评论*/
  toComment: function () {
    wx.navigateTo({
      url: '../comment/comment?id=' + this.data.data.id,
    })
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