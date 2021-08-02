import router from "next/router";
import styles from "./Pagination.module.css";

type Props = {
  totalCount: number;
};

export const PER_PAGE = 5;

export const Pagination: React.FC<Props> = ({ totalCount }) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <div className={styles.pagingUl}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <a
          onClick={() => {
            router.push(`/TodoList/${number}`);
          }}
          key={index}
        >
          {number}
        </a>
      ))}
    </div>
  );
};
