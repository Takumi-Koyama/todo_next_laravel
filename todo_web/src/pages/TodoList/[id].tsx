import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { TodoItem } from "../../components/TodoItem/TodoItem";
import { useRouter } from "next/router";
import Axios, { AxiosResponse } from "axios";
import { addTodos, initialTodos } from "../../modules/TodosModule";
import { getCookieValue, todo_token_key } from "../../utils/Cookie";
import { Layout } from "../../components/Layout/Layout";
import { TodoResponse } from "../../models/Response/TodoResponse";
import { Pagination, PER_PAGE } from "../../components/Pagination/Pagination";
import {
  initTodoCreateRequest,
  TodoCreateRequest,
} from "../../models/Request/Todo/TodoCreateRequest";
import styles from "./TodoList.module.css";

export const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<TodoCreateRequest>(initTodoCreateRequest);
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
