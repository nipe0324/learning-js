import Util from './../utils/util';

export default class Todo {
  constructor(title, completed) {
    this.id        = Util.uuid();
    this.title     = title;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }

  destroy() {
    console.log('Not implement Todo#destroy');
  }
}
