import { useRouter } from "next/router";
import styles from "./Login.module.css";
import Axios from "axios";
import { User } from "../../models/User";
import { AuthResponse } from "../../models/AuthResponse";
import { useState } from "react";

export const Login: React.FC = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const pushLogin = async () => {
    const response = await Axios.post<AuthResponse>("auth/login", user);
    document.cookie = `todo_token=${response.data.access_token}`;
    if (response.status == 200) {
      router.push("/TodoList");
    } else {
      alert("ログイン失敗");
    }
  };

  const changedEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    //左側の引数に対して、右側の値をマージする
    const newUser = Object.assign({}, user);
    newUser.email = e.target.value;
    setUser(newUser);
  };

  const changedPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //左側の引数に対して、右側の値をマージする
    const newUser = Object.assign({}, user);
    newUser.password = e.target.value;
    setUser(newUser);
  };

  return (
    <>
      <h1>Login</h1>
      <div className={styles.loginForm}>
        メールアドレス
        <input className={styles.loginInput} onChange={changedEmail} />
        パスワード
        <input className={styles.loginInput} onChange={changedPassword} />
        <div>
          <button className={styles.backButton} onClick={() => router.back()}>
            back
          </button>
          <button className={styles.loginButton} onClick={pushLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
