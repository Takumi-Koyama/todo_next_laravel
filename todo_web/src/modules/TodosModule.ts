import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { castTodo, Todo } from "../models/Todo";
import { TodoResponse } from "../models/Response/TodoResponse";

const initialState: Todo[] = [];

const todosModule = createSlice({
  name: "todos",
  initialState,
  reducers: {
    initialTodos(todos, action: PayloadAction<TodoResponse[]>) {
      action.payload.map((todoResponse) => {
        const todo = castTodo(todoResponse);
        todos.push(todo);
      });
    },
    addTodos(todos, action: PayloadAction<TodoResponse>) {
      const todo = castTodo(action.payload);
      todos = [todo, ...todos];
    },
    deleteTodos(todos, action: PayloadAction<number>) {
      todos = todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodos(todos, action: PayloadAction<TodoResponse>) {
      const updatedTodo = castTodo(action.payload);
      todos.forEach((todo) => {
        if (todo.id === updatedTodo.id) {
          todo.title = updatedTodo.title;
          todo.description = updatedTodo.description;
          todo.updated_at = updatedTodo.updated_at;
        }
      });
    },
  },
});

export const { initialTodos, addTodos, deleteTodos, updateTodos } =
  todosModule.actions;

export default todosModule;
