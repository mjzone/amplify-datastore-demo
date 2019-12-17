import React, { Component } from "react";
import _ from "lodash";
import CreateTodo from "./todo/create-todo";
import TodoList from "./todo/todo-list";

//import { withAuthenticator } from "aws-amplify-react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Task } from "../models";

var todos = [];

export default class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos
    };
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  async loadTasks() {
    let self = this;
    let todos = await DataStore.query(Task);
    self.setState({ todos });
  }

  init() {
    this.loadTasks();
    // this.subscibeForNewTasks();
  }

  subscibeForNewTasks() {
    DataStore.observe(Task).subscribe(task => {
      if (task.opType === "INSERT") {
        this.state.todos.unshift(task);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
          <h3>My Todo List</h3>
        </div>
        <CreateTodo createTask={this.createTask.bind(this)} />
        <TodoList
          todos={this.state.todos}
          toggleTask={this.toggleTask.bind(this)}
          update={this.update.bind(this)}
          delete={this.delete.bind(this)}
        />
      </div>
    );
  }

  async createTask(task) {
    let self = this;
    self.state.todos.unshift(task);
    self.setState({ todos: self.state.todos });
    await DataStore.save(
      new Task({
        task: task.task,
        isCompleted: task.isCompleted
      })
    );
  }

  // async toggleTask(task) {
  //   var foundTodo = _.find(this.state.todos, todo => todo.id === task.id);
  //   foundTodo.isCompleted = !foundTodo.isCompleted;
  //   this.setState({ todos: this.state.todos });

  //   const original = await DataStore.query(Task, task.id);
  //   await DataStore.save(
  //     Task.copyOf(original, updated => {
  //       updated.isCompleted = foundTodo.isCompleted;
  //     })
  //   );
  // }

  async saveTask(oldTask, newTask) {
    let self = this;
    let foundTodo = _.find(self.state.todos, todo => todo.id === oldTask.id);
    foundTodo.task = newTask;
    self.setState({ todos: self.state.todos });
    const original = await DataStore.query(Task, oldTask.id);
    await DataStore.save(
      Task.copyOf(original, updated => {
        updated.task = foundTodo.task;
        updated.isCompleted = foundTodo.isCompleted;
      })
    );
  }

  deleteTask(taskToDelete) {
    let self = this;
    _.remove(self.state.todos, todo => todo.id === taskToDelete.id);
    self.setState({ todos: self.state.todos });
    // axios
    //   .delete(BASE_URL + "/todos/delete/" + taskToDelete.id)
    //   .then(function(response) {})
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }
}
