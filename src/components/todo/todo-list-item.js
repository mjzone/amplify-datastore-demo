import React from "react";

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  renderTaskSection() {
    const { task } = this.props;
    const taskStyle = {
      color: "#d35400",
      fontSize: "20px",
      cursor: "pointer"
    };
    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput" />
          </form>
        </td>
      );
    }
    return <td style={taskStyle}>{task}</td>;
  }

  renderActionSection() {
    const style = {
      marginRight: "5px",
      width: "75px"
    };
    if (this.state.isEditing) {
      return (
        <td>
          <button style={style} type="button" className="success button" onClick={this.onSaveClick.bind(this)}>
            Save
          </button>
          <button style={style} type="button" className="secondary button" onClick={this.onCancelClick.bind(this)}>
            Cancel
          </button>
        </td>
      );
    }
    return (
      <td>
        <button style={style} type="button" className="button" onClick={this.onEditClick.bind(this)}>
          {" "}
          Edit{" "}
        </button>
        <button style={style} type="button" className="alert button" onClick={this.onDeleteClick.bind(this)}>
          {" "}
          Delete{" "}
        </button>
      </td>
    );
  }

  render() {
    return (
      <tr>
        {this.renderTaskSection()}
        {this.renderActionSection()}
      </tr>
    );
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onCancelClick() {
    this.setState({ isEditing: false });
  }

  onSaveClick(e) {
    e.preventDefault();
    const todoId = this.props.id;
    const todoText = this.refs.editInput.value;
    this.props.updateTodo(todoId, todoText);
    this.setState({ isEditing: false });
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteTodo(this.props);
  }
}
