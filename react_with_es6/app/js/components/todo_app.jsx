import Todo  from './../models/todo';
import Todos from './../collections/todos';
import Header from './header';
import TodoList from './todo_list';
import Footer from './footer';

export default class TodoApp extends React.Component {
  constructor() {
    super();

    let todos = new Todos([
      new Todo('Todo 1', false),
      new Todo('Todo 2', false),
      new Todo('Todo 3', true)
    ]);

    this.state = {
      nowShowing: 'all',
      editing:    null,
      todos:      todos
    };
  }

  onCommitTodo(todo) {
    // ok? https://facebook.github.io/react/docs/component-api.html#setstate
    this.state.todos.add(todo);
    this.setState(this.state); // setStateでレンダーが行われる
  }

  toggle(todoToToggle) {
    // 直でTODOをtoggleできる?
    this.state.todos.toggle(todoToToggle);
    this.setState({ todos: this.state.todos });
  }

  edit(todoToEdit) {
    this.state.editing = todoToEdit.id;
    this.setState(this.state);
  }

  save(todoToSave, newTitle) {
    console.log(todoToSave);
    this.state.todos.save(todoToSave, newTitle);
    this.state.editing = null;
    this.setState(this.state);
  }

  cancel() {
    this.state.editing = null;
    this.setState(this.state);
  }

  destroy(todoToDestroy) {
    this.state.todos.destroy(todoToDestroy);
    this.setState({ todos: this.state.todos });
  }

  render() {
    return (
      <div>
        <Header onCommitTodo={this.onCommitTodo.bind(this)}/>
        <TodoList
          todos={this.state.todos}
          editing={this.state.editing}
          onToggle={this.toggle.bind(this)}
          onDoubleClick={this.edit.bind(this)}
          onSave={this.save.bind(this)}
          onCancel={this.cancel.bind(this)}
          onDestroy={this.destroy.bind(this)}/>
        <Footer todos={this.state.todos}/>
      </div>
    );
  }
}
