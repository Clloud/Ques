import { Base } from '../../../utils/base.js';

class Main extends Base {
  constructor() {
    super();
  }

  /*获得推荐问题*/
  getRecommendQuestion(callback) {
    var param = {
      url: 'question/recommend',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export { Main };