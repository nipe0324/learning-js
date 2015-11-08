export default class TodoItem extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing === this.props.todo.id) {
      let node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
    // console.log('update');
    // console.log(prevProps);
    // console.log(this.props.editing);
    // console.log(this.props.editing);
    // console.log(prevProps);
  }

  handleDoubleClick() {
    this.props.onDoubleClick();
    this.forceUpdate();
  }

  handleKeyDown(event) {
    if (event.which === 27) { // ESCAPEキー
      this.props.onCancel(event);
    } else if (event.which === 13) { // ENTERキー
      this.handleSubmit(event);
    }
  }

  handleSubmit(event) {
    let newTitle = event.target.value.trim();
    if (newTitle) {
      this.props.onSave(newTitle);
    } else {
      this.props.onDestroy();
    }
  }

  render() {
    let classNames = ""
    if (this.props.todo.completed) {
      classNames += "completed";
    }
    if (this.props.editing === this.props.todo.id) {
      classNames += " editing"
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>{this.props.todo.title}</label>
          <button className="destroy" onClick={this.props.onDestroy}/>
        </div>
        <input
          className="edit"
          ref="editField"
          defaultValue={this.props.todo.title}
          onKeyDown={this.handleKeyDown.bind(this)}
          onBlur={this.props.onCancel}/>
      </li>
    );
  }
}
