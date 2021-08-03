import { TodoResponse } from "./TodoResponse";

export type TodosByPageResponse = {
  current_page: number;
  data: TodoResponse[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

export const initTodosByPageResponse: TodosByPageResponse = {
  current_page: 1,
  data: [],
  first_page_url: "",
  from: 1,
  last_page: 1,
  last_page_url: "",
  links: [],
  next_page_url: "",
  path: "",
  per_page: 1,
  prev_page_url: "",
  to: 1,
  total: 1,
};
