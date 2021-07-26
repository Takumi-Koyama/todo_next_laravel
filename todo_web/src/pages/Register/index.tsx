import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Register.module.css";
import Axios from "axios";
import { UserRegisterRequest } from "../../models/UserRegisterRequest";
import { HomeButton } from "../../components/HomeButton/HomeButton";

export const Register: React.FC = () => {
  const [user, setUser] = useState<UserRegisterRequest>();
  const router = useRouter();

  const changedName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //左側の引数に対して、右側の値をマージする
    const newUser = Object.assign({}, user);
    newUser.name = e.target.value;
    setUser(newUser);
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

  const changedConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    //左側の引数に対して、右側の値をマージする
    const newUser = Object.assign({}, user);
    newUser.password_confirmation = e.target.value;
    setUser(newUser);
  };

  const pushRegister = async () => {
    const response = await Axios.post("users/register", user);
    if (response.status == 200) {
      router.push("/");
    } else {
      alert("登録失敗");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <div className={styles.registerForm}>
        名前
        <input className={styles.registerInput} onChange={changedName} />
        メールアドレス
        <input className={styles.registerInput} onChange={changedEmail} />
        パスワード
        <input
          type="password"
          className={styles.registerInput}
          onChange={changedPassword}
        />
        パスワードの確認
        <input
          type="password"
          className={styles.registerInput}
          onChange={changedConfirmation}
        />
        <div>
          <HomeButton />
          <button className={styles.registerButton} onClick={pushRegister}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
