export default class TodoItem extends React.Component {
  render() {
    return (
      <li>
        <div className="view">
          <input className="toggle" type="checkbox"/>
          <label>{this.props.todo.title}</label>
          <button className="destroy"/>
        </div>
        <input className="edit"/>
      </li>
    );
  }
}
