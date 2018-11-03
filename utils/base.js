
import { Config } from 'config.js';
import { Token } from 'token.js';

class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }


  /*发送HTTP请求;当noRefech为true时，不做未授权重试机制*/
  request(params, noRefetch){
    var that = this;
    var url = this.baseRequestUrl + params.url;

    if (!params.type){
      params.type = 'GET';
    }

    wx.request({
      url: url,
      data: params.data,
      method:params.type,
      header: {
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success: function(res){
        /*获取状态码*/
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);

        /*根据状态码判断返回信息*/
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        }
        else {
          if (code == '401') {
            /*401，再次发送请求 */
            if (!noRefetch) {
              that._refetch(params);
            }
          }    
          if (noRefetch) {
            params.eCallback && params.eCallback(res.data);
          }
          params.eCallback && params.eCallback(res.data); 
        }
      },
      fail: function(err){
        // console.log(err)
        params.eCallback && params.eCallback(err);
      }
    })
  }

  /*再次获取token*/
  _refetch(params) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(params, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

}

export { Base };