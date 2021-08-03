import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { TodoItem } from "../../components/TodoItem/TodoItem";
import { useRouter } from "next/router";
import Axios, { AxiosResponse } from "axios";
import { addTodos } from "../../modules/TodosModule";
import { getCookieValue, todo_token_key } from "../../utils/Cookie";
import { Layout } from "../../components/Layout/Layout";
import { TodoResponse } from "../../models/Response/TodoResponse";
import { Pagination } from "../../components/Pagination/Pagination";
import {
  initTodoCreateRequest,
  TodoCreateRequest,
} from "../../models/Request/Todo/TodoCreateRequest";
import styles from "./TodoList.module.css";
import {
  initTodosByPageResponse,
  TodosByPageResponse,
} from "../../models/Response/TodosByPageResponse";

export const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<TodoCreateRequest>(initTodoCreateRequest);
  const [todosByPage, setTodosByPage] = useState<TodosByPageResponse>(
    initTodosByPageResponse
  );
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

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<TodosByPageResponse> =
        await Axios.get<TodosByPageResponse>(`todos/byPage?page=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        setTodosByPage(response.data);
      } else {
        router.push("/Login");
      }
    })();
  }, [setTodosByPage, id]);

  const changedTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    //左側の引数に対して、右側の値をマージする
    const newTodo = Object.assign({}, todo);
    newTodo.title = e.target.value;
    setTodo(newTodo);
  };

  const changedDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //左側の引数に対して、右側の値をマージする
    const newTodo = Object.assign({}, todo);
    newTodo.description = e.target.value;
    setTodo(newTodo);
  };

  const addClick = async () => {
    const response = await Axios.post<
      TodoCreateRequest,
      AxiosResponse<TodoResponse>
    >("todos", todo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      dispatch(addTodos(response.data));
      router.push("/TodoList/1");
      setTodo(initTodoCreateRequest);
    } else {
      alert("追加できませんでした");
    }
  };

  return (
    <Layout>
      <h1>TodoList</h1>
      <div>
        Title
        <input
          className={styles.todoTitleInput}
          onChange={changedTitle}
          value={todo.title}
        />
        Description
        <textarea
          className={styles.todoDescriptionInput}
          onChange={changedDescription}
          value={todo.description}
        />
        <button className="primaryButton" onClick={addClick}>
          Add
        </button>
      </div>
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
