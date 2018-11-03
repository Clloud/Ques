import { Base } from '../../../utils/base.js';

class Question extends Base {
  constructor() {
    super();
  }

  /*获得指定问题及答案*/
  getAnswerByQuestion(id, callback) {
    var param = {
      url: 'question/' + id + '/answer',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*获取问题*/
  getQuestion(id, callback) {
    var param = {
      url: 'question/' + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*提出问题*/
  askQuestion(data, callback) {
    var param = {
      type: 'post',
      data: data,
      url: 'question',
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /*查询问题*/
  queryQuestion(data, callback) {
    var param = {
      url: 'question?query=' + data.query,
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

export { Question };