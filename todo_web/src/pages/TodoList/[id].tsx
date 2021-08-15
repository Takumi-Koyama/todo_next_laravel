import { useEffect } from "react";
import { TodoItem } from "../../components/TodoItem/TodoItem";
import router from "next/router";
import { Layout } from "../../components/Layout/Layout";
import { Pagination } from "../../components/Pagination/Pagination";
import { fetchTodosByPageApi } from "../api/TodoApi";
import { useState } from "react";
import {
  initTodosByPageResponse,
  TodosByPageResponse,
} from "../../models/Response/TodosByPageResponse";

export const TodoList: React.FC = () => {
  const [todosByPage, setTodosByPage] = useState<TodosByPageResponse>(
    initTodosByPageResponse
  );
  const paramsId = router.query.id;
  if (typeof paramsId !== "string") {
    return;
  }
  const id = parseInt(paramsId);

  useEffect(() => {
    (async () => {
      const todoByPageResponse = await fetchTodosByPageApi(id);
      setTodosByPage(todoByPageResponse);
    })();
  }, [setTodosByPage, id]);

  return (
    <Layout>
      <h1>TodoList</h1>
      <button
        onClick={() => {
          router.push("/TodoList");
        }}
      >
        一覧へ
      </button>
      {todosByPage.data.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClick={() => {
              return router.push(`/TodoEdit/${todo.id}`);
            }}
          />
        );
      })}
      <Pagination todosByPageResponse={todosByPage} />
      <div style={{ textAlign: "center" }}>
        {todosByPage.current_page}/{todosByPage.last_page} ページ
      </div>
    </Layout>
  );
};

export default TodoList;
