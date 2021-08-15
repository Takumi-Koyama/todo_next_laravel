import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { TodoItem } from "../../components/TodoItem/TodoItem";
import router from "next/router";
import { addTodos, initialTodos } from "../../modules/TodosModule";
import { Layout } from "../../components/Layout/Layout";
import {
  initTodoCreateRequest,
  TodoCreateRequest,
} from "../../models/Request/Todo/TodoCreateRequest";
import styles from "./TodoList.module.css";
import { fetchTodosApi, postTodoApi } from "../api/TodoApi";

export const TodoList: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const todosResponse = await fetchTodosApi();
      dispatch(initialTodos(todosResponse));
    })();
  }, [dispatch, initialTodos]);

  const [todo, setTodo] = useState<TodoCreateRequest>(initTodoCreateRequest);

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
    const responseTodo = await postTodoApi(todo);
    dispatch(addTodos(responseTodo));
    router.push("/TodoList");
    setTodo(initTodoCreateRequest);
  };

  return (
    <Layout>
      <h1>TodoList</h1>
      <button
        onClick={() => {
          router.push("/TodoList/1");
        }}
      >
        ページネーションへ
      </button>
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
      {todos.map((todo) => {
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
    </Layout>
  );
};

export default TodoList;
