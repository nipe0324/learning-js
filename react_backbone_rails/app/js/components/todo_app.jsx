import Header from './header';
import TodoList from './todo_list';
import Footer from './footer';

export default class TodoApp extends React.Component {
  constructor() {
    super();

    let todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: false },
      { id: 3, title: 'Todo 3', completed: true  }
    ];

    this.state = {
      nowShowing: 'all',
      editing:    null,
      todos:      todos
    };
  }

  render() {
    return (
      <div>
        <Header/>
        <TodoList todos={this.state.todos}/>
        <Footer todos={this.state.todos}/>
      </div>
    );
  }
}
