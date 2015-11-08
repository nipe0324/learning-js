import TodoItem from './todo_item';

export default class TodoList extends React.Component {
  render() {
    let todoItems = this.props.todos.map((todo)=> {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.props.onToggle.bind(this, todo)}
          onDestroy={this.props.onDestroy.bind(this, todo)}/>
      );
    });
    return (
      <section className="main">
        <section className="main">
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      </section>
    );
  }
}
