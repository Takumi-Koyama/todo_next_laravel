import style from "./Header.module.css";
import router from "next/router";
import { todo_token_key } from "../../utils/Validates";
import { clearTodos } from "../../modules/TodosModule";
import { useDispatch } from "react-redux";
import { isLogin } from "../../utils/Validates";

export const Header: React.FC = () => {
  return (
    <div className={style.headerArea}>
      <div className={style.logo} onClick={() => router.push("/")}>
        Todo
      </div>
      {isLogin() ? <LoginedHeader /> : <UnLoginedHeader />}
    </div>
  );
};

const LoginedHeader: React.FC = () => {
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
    <div className={style.headerRightArea}>
      <button className={style.headerButton} onClick={goBack}>
        戻る
      </button>
      <button className={style.headerButton} onClick={logoutAccount}>
        ログアウト
      </button>
    </div>
  );
};

const UnLoginedHeader: React.FC = () => {
  const pushRegister = () => {
    router.push("/Register");
  };
  const pushLogin = () => {
    router.push("/Login");
  };

  return (
    <div className={style.headerRightArea}>
      <button className={style.headerButton} onClick={pushRegister}>
        新規登録
      </button>
      <button className={style.headerButton} onClick={pushLogin}>
        ログイン
      </button>
    </div>
  );
};
