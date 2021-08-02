import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "./TodoEdit.module.css";
import { useState } from "react";
import { castTodo } from "../../models/Todo";
import { Layout } from "../../components/Layout/Layout";
import {
  initUpdateRequest,
  TodoUpdateRequest,
} from "../../models/Request/Todo/TodoUpdateRequest";
import Axios, { AxiosResponse } from "axios";
import { getCookieValue, todo_token_key } from "../../utils/Cookie";
import { deleteTodos, updateTodos } from "../../modules/TodosModule";
import { TodoResponse } from "../../models/Response/TodoResponse";

const TodoEdit: React.FC = () => {
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

  const [todo, setTodo] = useState<TodoUpdateRequest>(initUpdateRequest);

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<TodoResponse> =
        await Axios.get<TodoResponse>(`todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200) {
        const initTodo = castTodo(response.data);
        setTodo(initTodo);
      } else {
        router.push("/Login");
      }
    })();
  }, [setTodo]);

  const dispatch = useDispatch();

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

  const updateClick = async () => {
    const response = await Axios.patch<
      TodoUpdateRequest,
      AxiosResponse<TodoResponse>
    >(`todos/${id}`, todo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      dispatch(updateTodos(response.data));
      router.push("/TodoList/1");
    } else {
      alert("更新できませんでした");
    }
  };

  const deleteClick = async () => {
    const response = await Axios.delete<number>(`todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      dispatch(deleteTodos(id));
      router.push("/TodoList/1");
    } else {
      alert("削除できませんでした");
    }
  };

  return (
    <Layout>
      <h1>TodoEdit</h1>
      <div>
        Title
        <input
          className={styles.todoTitleInput}
          value={todo.title}
          onChange={changedTitle}
        />
        Description
        <textarea
          className={styles.todoDescriptionInput}
          value={todo.description}
          onChange={changedDescription}
        />
        <button className="primaryButton" onClick={updateClick}>
          Update
        </button>
        <button className="dangerButton" onClick={deleteClick}>
          Delete
        </button>
      </div>
    </Layout>
  );
};

export default TodoEdit;
