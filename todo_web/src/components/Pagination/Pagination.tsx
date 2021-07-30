import Link from "next/link";

type Props = {
  totalCount: number;
};

export const PER_PAGE = 5;

export const Pagination: React.FC<Props> = ({ totalCount }) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/TodoList/${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
