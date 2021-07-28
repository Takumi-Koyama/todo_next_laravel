import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { castTodo, Todo } from "../models/Todo";
import { TodoResponse } from "../models/Response/TodoResponse";
// import Axios, { AxiosResponse } from "axios";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { getCookieValue, todo_token_key } from "../utils/Cookie";

// const initTodos = createAsyncThunk("/TodoList", async () => {
//   const router = useRouter();
//   const token = getCookieValue(todo_token_key);
//   if (token === "") {
//     router.push("/Login");
//   }
//   const response: AxiosResponse<TodoResponse[]> = await Axios.get<
//     TodoResponse[]
//   >("todos", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (response.status === 200) {
//     return response.data;
//   } else {
//     router.push("/Login");
//   }
// });

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

export const { initialTodos, addTodos, deleteTodos, updateTodos } =
  todosModule.actions;

export default todosModule;
