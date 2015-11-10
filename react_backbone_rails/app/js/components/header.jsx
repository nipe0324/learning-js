export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          ref="todo"
          autoFocus="true"/>
      </header>
    );
  }
}
