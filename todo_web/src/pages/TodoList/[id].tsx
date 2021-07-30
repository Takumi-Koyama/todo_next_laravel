import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import { TodoItem } from "../../components/TodoItem/TodoItem";
import { useRouter } from "next/router";
import Axios, { AxiosResponse } from "axios";
import { initialTodos } from "../../modules/TodosModule";
import { getCookieValue, todo_token_key } from "../../utils/Cookie";
import { Layout } from "../../components/Layout/Layout";
import { TodoResponse } from "../../models/Response/TodoResponse";
import { Pagination, PER_PAGE } from "../../components/Pagination/Pagination";

export const TodoList: React.FC = () => {
  const router = useRouter();

  const paramsId = router.query.id;
  if (typeof paramsId !== "string") {
    return;
  }
  const id = parseInt(paramsId);

  const token = getCookieValue(todo_token_key);
  if (token === "") {
    router.push("/Login");
  }

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
      const response: AxiosResponse<TodoResponse[]> = await Axios.get<
        TodoResponse[]
      >("todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(initialTodos(response.data));
      } else {
        router.push("/Login");
      }
    })();
  }, [dispatch, initialTodos]);

  return (
    <Layout>
      <h1>TodoList</h1>
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
    </Layout>
  );
};

export default TodoList;
