import { Base } from '../../../utils/base.js';

class Answer extends Base {
  constructor() {
    super();
  }

  /*获得问题答案*/
  getAnswer(id, callback) {
    var param = {
      url: 'answer/' + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*添加回答*/
  addAnswer(data, callback){
    var param = {
      type:'post',
      data: data,
      url: 'question/' + data.id + '/answer',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*赞同或取消赞同*/
  alterApprovalStatus(id, callback){
    var param = {
      type: 'post',
      url: 'answer/' + id + '/approval',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*获取当前回答赞同状态*/
  getApprovalStatus(id, callback) {
    var param = {
      type: 'get',
      url: 'answer/' + id + '/approval',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*收藏或取消收藏*/
  alterCollectionStatus(id, callback) {
    var param = {
      type: 'post',
      url: 'answer/' + id + '/collection',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*获取当前回答收藏状态*/
  getCollectionStatus(id, callback) {
    var param = {
      type: 'get',
      url: 'answer/' + id + '/collection',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*获取回答评论*/
  getAnswerComment(id, callback) {
    var param = {
      type: 'get',
      url: 'answer/' + id + '/comment',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*添加回答评论*/
  addComment(data, callback) {
    var param = {
      type: 'post',
      data: data,
      url: 'answer/' + data.id + '/comment',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}

export { Answer };