import style from "./Header.module.css";
import { useRouter } from "next/router";
import { todo_token_key } from "../../utils/Cookie";
import { clearTodos } from "../../modules/TodosModule";
import { useDispatch } from "react-redux";

export const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutAccount = () => {
    document.cookie = `${todo_token_key}=; max-age=0`;
    router.push("/");
    dispatch(clearTodos());
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className={style.headerArea}>
      <div className={style.logo} onClick={() => router.push("/")}>
        Todo
      </div>
      <div className={style.headerRightArea}>
        <button className={style.headerButton} onClick={goBack}>
          戻る
        </button>
        <button className={style.headerButton} onClick={logoutAccount}>
          ログアウト
        </button>
      </div>
    </div>
  );
};
