import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { castTodo, Todo } from "../models/Todo";
import { TodoResponse } from "../models/Response/TodoResponse";

type State = {
  todos: Todo[];
};

const initialState: State = {
  todos: [],
};

const todosModule = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos(state) {
      state.todos = [];
    },
    initialTodos(state, action: PayloadAction<TodoResponse[]>) {
      state.todos = action.payload;
    },
    addTodos(state, action: PayloadAction<TodoResponse>) {
      const todo = castTodo(action.payload);
      state.todos = [todo, ...state.todos];
    },
    deleteTodos(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodos(state, action: PayloadAction<TodoResponse>) {
      const updatedTodo = castTodo(action.payload);
      state.todos.find((todo) => todo.id === updatedTodo.id).title =
        updatedTodo.title;
      state.todos.find((todo) => todo.id === updatedTodo.id).description =
        updatedTodo.description;
      state.todos.find((todo) => todo.id === updatedTodo.id).updated_at =
        updatedTodo.updated_at;
    },
  },
});

export const { initialTodos, addTodos, deleteTodos, updateTodos, clearTodos } =
  todosModule.actions;

export default todosModule;
