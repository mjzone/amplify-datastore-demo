import React, { Component } from "react";
import _ from "lodash";
import CreateTodo from "./todo/create-todo";
import TodoList from "./todo/todo-list";
//import { withAuthenticator } from "aws-amplify-react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Todo } from "../models";

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

    // Load todos from DataStore
    let dataStoreItems = await DataStore.query(Todo);
    let todos = _.map(dataStoreItems, item => {
      return {
        id: item.id,
        task: item.task
      };
    });
    self.setState({ todos });
  }

  init() {
    this.loadTasks();
    // this.subscibeForNewTasks();
  }

  subscibeForNewTasks() {
    DataStore.observe(Todo).subscribe(task => {
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
        <CreateTodo createTodo={this.createTodo.bind(this)} />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo.bind(this)}
          deleteTodo={this.deleteTodo.bind(this)}
        />
      </div>
    );
  }

  async createTodo(task) {
    let self = this;

    // Create todo in DataStore
    const newTodo = await DataStore.save(
      new Todo({
        task: task.task
      })
    );
    task.id = newTodo[0].id;
    self.state.todos.unshift(task);
    self.setState({ todos: self.state.todos });
  }

  async updateTodo(todoId, todoText) {
    let self = this;
    let todo = _.find(self.state.todos, todo => todo.id === todoId);
    todo.task = todoText;
    self.setState({ todos: self.state.todos });

    // Update DataStore
    const original = await DataStore.query(Todo, todoId);
    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.task = todoText;
      })
    );
  }

  async deleteTodo(deleteTodo) {
    let self = this;
    _.remove(self.state.todos, todo => todo.id === deleteTodo.id);
    self.setState({ todos: self.state.todos });

    // Remove from DataStore
    const todelete = await DataStore.query(Todo, deleteTodo.id);
    DataStore.delete(todelete);
  }
}
