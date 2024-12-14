import React from "react";
import "../App.scss";

class ListToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      editTaskId: "",
    };
  }

  handleClickDelete = (job_id) => {
    this.props.deleteTask(job_id);
  };

  handleTaskEditing = (id, item) => {
    this.setState({ editTaskId: id, input: item });
  };

  handleOnchange = (event) => {
    console.log(event.target.value);
    this.setState({
      input: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.input) {
      alert("You need to write a task!");
      return;
    }
    this.props.editTask(this.state.editTaskId, this.state.input);
    this.setState({ input: "", editTaskId: "" });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState({
      editTaskId: "",
    });
  };

  render() {
    return (
      <div className="listtodo-container">
        <ul>
          {this.props.tasks.map((item, index) =>
            this.state.editTaskId === item.id ? (
              <li className="task" key={item.id}>
                <form className="main_task">
                  <div>
                    <input
                      value={this.state.input}
                      onChange={this.handleOnchange}
                      autoFocus
                    ></input>
                  </div>
                  <div className="buttonChange">
                    <button type="submit" onClick={this.handleSubmit}>
                      Save
                    </button>
                    <button type="button" onClick={this.handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
                <div className="space"></div>
              </li>
            ) : (
              <li className="task" key={item.id}>
                <div className="main_task">
                  <div className="task-content">
                    <input type="checkbox" className="finish-task-btn"></input>
                    {item.value}
                  </div>
                  <div className="buttonChange">
                    <button
                      onClick={() =>
                        this.handleTaskEditing(item.id, item.value)
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => this.handleClickDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="space"></div>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default ListToDo;
