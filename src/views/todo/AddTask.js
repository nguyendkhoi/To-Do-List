import React from "react";
import "../App.scss";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTask: false,
      input: "",
    };
  }

  handleCancel = () => {
    this.setState({ showAddTask: false });
  };

  handleShow = () => {
    this.setState({ showAddTask: true });
  };

  handleChangeInput = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.input) {
      alert("You need to write a task!");
      return;
    }
    this.props.addNewTask({
      id: Math.floor(Math.random() * 1000 + 1),
      value: this.state.input,
    });
    this.setState({ showAddTask: false, input: "" });
  };

  render() {
    return (
      <div className="main-add-task">
        {this.state.showAddTask ? (
          <form className="add-task-form">
            <input
              type="text"
              placeholder="Do homework at 3pm"
              onChange={this.handleChangeInput}
              value={this.state.input}
              autoFocus
            />
            <div className="change-button">
              <button type="button" onClick={this.handleCancel}>
                Cancel
              </button>
              <button type="submit" onClick={this.handleSubmit}>
                Add task
              </button>
            </div>
          </form>
        ) : (
          <button onClick={this.handleShow} className="add-task-btn">
            Add Task
          </button>
        )}
      </div>
    );
  }
}

export default AddTask;
