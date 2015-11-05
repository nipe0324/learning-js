export default class Header extends React.Component {
  handleNewTodo (event) {
    if (event.keyCode !== 13) { // 13: Enterキー
      return;
    }
    event.preventDefault();

    let todoTitle = event.target.value.trim();
    if (!todoTitle) {
      return;
    }
    this.props.onCommitTodo({ title: todoTitle, completed: false });
    event.target.value = '';
    return;
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          ref="todo"
          autoFocus="true"
          onKeyDown={this.handleNewTodo.bind(this)} />
      </header>
    );
  }
}
