import Header from './header';
import TodoList from './todo_list';
import Footer from './footer';

export default class TodoApp extends React.Component {
  constructor() {
    super();

    let todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: false },
      { id: 3, title: 'Todo 3', completed: true }
    ];

    this.state = {
      nowShowing: 'all',
      editing:    null,
      todos:      todos
    };
  }

  onCommitTodo(todo) {
    this.state.todos.push(todo);
    this.setState(this.state); // setStateでレンダーが行われる
  }

  toggle(todoToToggle) {
    this.state.todos.forEach((todo) => {
      // Modelを導入してからかな
    });
  }

  render() {
    return (
      <div>
        <Header onCommitTodo={this.onCommitTodo.bind(this)}/>
        <TodoList
          todos={this.state.todos}
          onToggle={this.toggle.bind(this)}/>
        <Footer todos={this.state.todos}/>
      </div>
    );
  }
}
