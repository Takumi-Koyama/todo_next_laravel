import router from "next/router";
import { TodosByPageResponse } from "../../models/Response/TodosByPageResponse";
import styles from "./Pagination.module.css";

type Props = {
  todosByPageResponse: TodosByPageResponse;
};

export const Pagination: React.FC<Props> = ({ todosByPageResponse }) => {
  return (
    <div className={styles.pagingList}>
      {[...Array(todosByPageResponse.last_page)].map((_, number) => (
        <button
          onClick={() => {
            router.push(`/TodoList/${number + 1}`);
          }}
          key={number + 1}
        >
          {number + 1}
        </button>
      ))}
    </div>
  );
};
