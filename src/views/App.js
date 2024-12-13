import logo from "./logo.svg";
import "./App.scss";
import ListToDo from "./todo/ListToDo";
import React from "react";
import AddTask from "./todo/AddTask";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  editTask = (id, value) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((obj) =>
        obj.id === id ? { ...obj, value: value } : obj
      ),
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((item) => item.id !== id),
    }));
  };

  addNewTask = (task) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task],
    }));
    console.log("tasks: ", this.state.tasks);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>A basic web page using React</h1>
          <ListToDo
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
          />
          <AddTask addNewTask={this.addNewTask} />
        </header>
      </div>
    );
  }
}

export default App;
