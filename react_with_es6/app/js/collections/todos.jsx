export default class Todos {
  constructor(todos = []) {
    this.todos = todos;
  }

  add(todo) {
    this.todos.push(todo);
  }

  map(callback) {
    return this.todos.map(callback);
  }

  toggle(todoToToggle) {
    this.todos.forEach( (todo)=> {
      if (todo.id === todoToToggle.id) {
        todo.toggle();
      }
    });
  }
}
