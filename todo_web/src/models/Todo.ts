import { TodoResponse } from "./Response/TodoResponse";

export const castTodo = (todoResponse: TodoResponse): Todo => {
  const todo: Todo = {
    id: todoResponse.id,
    title: todoResponse.title,
    description: todoResponse.description,
    created_at: todoResponse.created_at,
    updated_at: todoResponse.updated_at,
  };
  return todo;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};
