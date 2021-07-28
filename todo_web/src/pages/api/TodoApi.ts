import Axios, { AxiosResponse } from "axios";
import { getCookieValue, todo_token_key } from "../../utils/Cookie";
import { TodoResponse } from "../../models/Response/TodoResponse";

export const fetchTodos = async () => {
  const token = getCookieValue(todo_token_key);
  if (token === "") {
    alert("ログインしてください");
  }
  const response: AxiosResponse<TodoResponse[]> = await Axios.get<
    TodoResponse[]
  >("todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("取得できませんでした");
  }
};
