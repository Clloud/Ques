import { Base } from '../../utils/base.js';

class My extends Base {
  constructor() {
    super();
  }

  //获取用户微信信息
  getUserInfo(callback) {

    var that = this;
    wx.login({
      success: function () {

        wx.getUserInfo({

          success: function (res) {
            typeof callback == "function" && callback(res.userInfo);
          },

          fail: function (res) {
            typeof callback == "function" && callback({
              avatarUrl: '../../../imgs/icon/user@default.png',
              nickName: ''
            });
          }

        });
      },

    })
  }

  /*从数据库获取用户信息*/
  getUserInfoFromServer(callback){
    var params = {
      url: 'user',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  /*保存用户信息*/
  saveUserInfo(data, callback){
    var params = {
        type: 'post',
      url: 'user',
        data: data,
        sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  /*获取用户提问*/
  getUserQuestion(callback) {
    var params = {
      type: 'get',
      url: 'question/user',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  /*获取用户回答*/
  getUserAnswer(callback) {
    var params = {
      type: 'get',
      url: 'answer/user',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  /*获取用户收藏*/
  getUserCollection(callback) {
    var params = {
      type: 'get',
      url: 'collection/user',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
  
};

export { My }