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
    this.state.todos.toggle(todoToToggle);
    this.setState({ todos: this.state.todos });
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
          onToggle={this.toggle.bind(this)}
          onDestroy={this.destroy.bind(this)}/>
        <Footer todos={this.state.todos}/>
      </div>
    );
  }
}
