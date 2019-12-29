import React, { Component } from "react";
import CreateTodo from "./todo/create-todo";
import TodoList from "./todo/todo-list";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Todo, TodoStatus } from "../models";

var todos = [];

export default class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos
    };
  }

  componentDidMount() {
    this.loadTasks();
    this.subscibeForNewTasks();
  }

  mapTodos(todos) {
    return todos.map(todo => {
      return {
        id: todo.id,
        task: todo.task,
        status: todo.status
      };
    });
  }

  async loadTasks() {
    let self = this;

    // Load todos from DataStore
    let dataStoreItems = await DataStore.query(Todo);
    let todos = this.mapTodos(dataStoreItems);
    self.setState({ todos });
  }

  subscibeForNewTasks() {
    let self = this;
    DataStore.observe(Todo).subscribe(task => {
      const todo = self.state.todos.find(todo => {
        return todo.id === task.element.id;
      });
      // Create Todo
      if (task.opType === "INSERT") {
        if (!todo) {
          const newTodo = {
            id: task.element.id,
            task: task.element.task,
            status: task.element.status
          };
          const todos = [...self.state.todos, newTodo];
          self.setState({ todos });
        }
      }
      // Update Todo
      if (task.opType === "UPDATE") {
        if (todo) {
          const todos = [...self.state.todos];
          const updatedTodo = {
            id: task.element.id,
            task: task.element.task,
            status: task.element.status
          };
          const index = todos.indexOf(todo);
          todos[index] = updatedTodo;
          self.setState({ todos });
        }
      }
      // Delete Todo
      if (task.opType === "DELETE") {
        const todos = self.state.todos.filter(t => t.id !== task.element.id);
        self.setState({ todos });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
          <h3>My Todo List</h3>
        </div>
        <CreateTodo
          createTodo={this.createTodo.bind(this)}
          deleteCompleted={this.deleteCompleted.bind(this)}
          filterTodos={this.filterTodos.bind(this)}
        />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo.bind(this)}
          deleteTodo={this.deleteTodo.bind(this)}
          completeTodo={this.completeTodo.bind(this)}
        />
      </div>
    );
  }

  async createTodo(task) {
    // Create Todo in DataStore
    await DataStore.save(
      new Todo({
        task: task.task,
        status: TodoStatus.INPROGRESS
      })
    );
  }

  async updateTodo(todoId, todoText) {
    // Update Todo in DataStore
    const original = await DataStore.query(Todo, todoId);
    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.task = todoText;
      })
    );
  }

  async deleteTodo(deleteTodo) {
    // Remove from DataStore
    const todelete = await DataStore.query(Todo, deleteTodo.id);
    DataStore.delete(todelete);
  }

  async completeTodo(todoId) {
    // Update DataStore
    const original = await DataStore.query(Todo, todoId);
    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.status = TodoStatus.COMPLETED;
      })
    );
  }

  async filterTodos(isChecked) {
    let self = this;
    if (isChecked) {
      const completedTodos = await DataStore.query(Todo, t => t.status("eq", TodoStatus.COMPLETED));
      self.setState({ todos: this.mapTodos(completedTodos) });
    } else {
      self.loadTasks();
    }
  }

  async deleteCompleted() {
    let self = this;
    const completedTodos = await DataStore.query(Todo, t => t.status("eq", TodoStatus.COMPLETED));
    completedTodos.forEach(todo => {
      DataStore.delete(todo);
    });
    self.loadTasks();
  }
}
