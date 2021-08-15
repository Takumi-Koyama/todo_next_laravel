import { useEffect } from "react";
import { useDispatch } from "react-redux";
import router from "next/router";
import styles from "./TodoEdit.module.css";
import { useState } from "react";
import { castTodo } from "../../models/Todo";
import { Layout } from "../../components/Layout/Layout";
import {
  initTodoUpdateRequest,
  TodoUpdateRequest,
} from "../../models/Request/Todo/TodoUpdateRequest";
import { deleteTodos, updateTodos } from "../../modules/TodosModule";
import { deleteTodoApi, fetchTodoApi, patchTodoApi } from "../api/TodoApi";

const TodoEdit: React.FC = () => {
  const paramsId = router.query.id;
  if (typeof paramsId !== "string") {
    return;
  }
  const id = parseInt(paramsId);

  const [todo, setTodo] = useState<TodoUpdateRequest>(initTodoUpdateRequest);

  useEffect(() => {
    (async () => {
      const responseTodo = await fetchTodoApi(id);
      const initTodo = castTodo(responseTodo);
      setTodo(initTodo);
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
    const responseTodo = await patchTodoApi(id, todo);
    dispatch(updateTodos(responseTodo));
    router.push("/TodoList");
  };

  const deleteClick = async () => {
    deleteTodoApi(id);
    dispatch(deleteTodos(id));
    router.push("/TodoList");
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
