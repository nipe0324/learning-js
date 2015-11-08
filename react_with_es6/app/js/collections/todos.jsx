export default class Todos {
  constructor(todos = []) {
    this.todos = todos;
  }

  add(todo) {
    this.todos.push(todo);
  }

  save(todo, newTitle) {
    console.log(newTitle);
    let index = this.index(todo);
    let updateTodo = this.todos[index];
    updateTodo.title = newTitle;
    updateTodo.save();
  }

  destroy(todo) {
    let index = this.index(todo);
    if (index >= 0) {
      this.todos.splice(index, 1);
      todo.destroy();
    }
  }

  map(callback) {
    return this.todos.map(callback);
  }

  index(todo) {
    let i = 0,
        len = this.todos.length;
    for (let i = 0; i < len; i++) {
      if (this.todos[i].id === todo.id) {
        return i;
      }
    }
    return -1;
  }

  toggle(todoToToggle) {
    this.todos.forEach((todo)=> {
      if (todo.id === todoToToggle.id) {
        todo.toggle();
      }
    });
  }
}
