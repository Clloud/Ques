import { Config } from 'config.js';
import { Base } from 'base.js';

class User extends Base{
  constructor() {
    super();
  }

  /*获取用户身份*/
  getIdentity(callback){
    var that = this;
    var param = {
      url: 'user/identity',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /*认证用户身份*/
  qualifyIdentity(data, callback) {
    var param = {
      url: 'user/qualify',
      type: 'post',
      data: data,
      sCallback: function (res) {
        callback && callback(res);
      },
      eCallback(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }
  
}

export { User };