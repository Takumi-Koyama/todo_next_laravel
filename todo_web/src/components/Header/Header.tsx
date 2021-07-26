import style from "./Header.module.css";
import { useRouter } from "next/router";
import { todo_token_key } from "../../utils/Cookie";

export const Header: React.FC = () => {
  const router = useRouter();

  const logoutAccount = () => {
    document.cookie = `${todo_token_key}=; max-age=0`;
    router.push("/");
  };

  return (
    <div className={style.headerBack}>
      <div className={style.headerLogo} onClick={() => router.push("/")}>
        todo
      </div>
      <div className={style.headerButtonArea}>
        <button className={style.headerButton} onClick={logoutAccount}>
          ログアウト
        </button>
      </div>
    </div>
  );
};
