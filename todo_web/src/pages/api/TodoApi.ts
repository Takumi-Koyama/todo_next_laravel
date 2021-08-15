/* eslint-disable no-console */
import Axios, { AxiosResponse } from "axios";
import { TodoCreateRequest } from "../../models/Request/Todo/TodoCreateRequest";
import { TodoUpdateRequest } from "../../models/Request/Todo/TodoUpdateRequest";
import { TodoResponse } from "../../models/Response/TodoResponse";
import { createHeader, loginPass } from "./ApiUtils";

export const fetchTodosApi = async (): Promise<TodoResponse[]> => {
  loginPass();
  const header = createHeader();
  const response: AxiosResponse<TodoResponse[]> = await Axios.get<
    TodoResponse[]
  >("todos", header);
  if (response.status === 200) {
    return response.data;
  } else {
    // throw new Error("取得できませんでした");
    console.log("取得できませんでした");
  }
};

export const fetchTodoApi = async (id: number): Promise<TodoResponse> => {
  loginPass();
  const header = createHeader();
  const response: AxiosResponse<TodoResponse> = await Axios.get<TodoResponse>(
    `todos/${id}`,
    header
  );
  if (response.status === 200) {
    return response.data;
  } else {
    // throw new Error("取得できませんでした");
    console.log("取得できませんでした");
  }
};

export const postTodoApi = async (
  todo: TodoCreateRequest
): Promise<TodoResponse> => {
  loginPass();
  const header = createHeader();
  const response = await Axios.post<
    TodoCreateRequest,
    AxiosResponse<TodoResponse>
  >("todos", todo, header);
  if (response.status === 201) {
    return response.data;
  } else {
    // throw new Error("追加できませんでした");
    console.log("追加できませんでした");
  }
};

export const patchTodoApi = async (
  id: number,
  todo: TodoUpdateRequest
): Promise<TodoResponse> => {
  loginPass();
  const header = createHeader();
  const response = await Axios.patch<
    TodoUpdateRequest,
    AxiosResponse<TodoResponse>
  >(`todos/${id}`, todo, header);
  if (response.status === 200) {
    return response.data;
  } else {
    // throw new Error("更新できませんでした");
    console.log("更新できませんでした");
  }
};

export const deleteTodoApi = async (id: number): Promise<void> => {
  loginPass();
  const header = createHeader();
  const response = await Axios.delete<number>(`todos/${id}`, header);
  if (response.status === 200) {
    return;
  } else {
    // throw new Error("削除できませんでした");
    console.log("削除できませんでした");
  }
};
