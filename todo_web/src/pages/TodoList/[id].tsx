import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import { TodoItem } from "../../components/TodoItem/TodoItem";
import { useRouter } from "next/router";
import { initialTodos } from "../../modules/TodosModule";
import { Layout } from "../../components/Layout/Layout";
import { Pagination, PER_PAGE } from "../../components/Pagination/Pagination";
import { fetchTodosApi } from "../api/TodoApi";

export const TodoList: React.FC = () => {
  const router = useRouter();
  const paramsId = router.query.id;
  if (typeof paramsId !== "string") {
    return;
  }
  const id = parseInt(paramsId);

  const { todos } = useSelector((state: RootState) => state.todos);

  //ページネーション
  const startIndex = PER_PAGE * (id - 1);
  let endIndex = PER_PAGE * id;
  if (endIndex > todos.length) {
    endIndex = todos.length;
  }
  const testTodos = [];
  for (let index = startIndex; index < endIndex; index++) {
    testTodos.push(todos[index]);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const todoResponse = await fetchTodosApi();
      dispatch(initialTodos(todoResponse));
    })();
  }, [dispatch, initialTodos]);

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
      {testTodos.map((todo) => {
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
      <Pagination totalCount={todos.length} />
      <div style={{ textAlign: "center" }}>
        {id}/{Math.ceil(todos.length / PER_PAGE)} ページ
      </div>
    </Layout>
  );
};

export default TodoList;
