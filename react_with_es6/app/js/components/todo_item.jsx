export default class TodoItem extends React.Component {
  render() {
    return (
      <li>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle} />
          <label>{this.props.todo.title}</label>
          <button className="destroy"/>
          <input className="edit"/>
        </div>
      </li>
    );
  }
}
