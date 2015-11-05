export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          残り<strong>{this.props.todos.length}</strong>
        </span>

        <ul className="filters">
          <li>
            <a href="#/">すべて</a>
          </li>
          <li>
            <a href="#/active">未完了</a>
          </li>
          <li>
            <a href="#/completed">完了済</a>
          </li>
        </ul>

        <button className="clear-completed">
          完了済を削除
        </button>
      </footer>
    );
  }
}
