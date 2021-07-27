import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Register.module.css";
import Axios from "axios";
import { AuthRegisterRequest } from "../../models/Request/Auth/AuthRegisterRequest";
import { Layout } from "../../components/Layout/Layout";

export const Register: React.FC = () => {
  const [user, setUser] = useState<AuthRegisterRequest>();
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
    <Layout>
      <h1>Register</h1>
      <div>
        Name
        <input className={styles.registerInput} onChange={changedName} />
        Mail
        <input className={styles.registerInput} onChange={changedEmail} />
        Password
        <input
          type="password"
          className={styles.registerInput}
          onChange={changedPassword}
        />
        Password Confirmation
        <input
          type="password"
          className={styles.registerInput}
          onChange={changedConfirmation}
        />
        <button className="primaryButton" onClick={pushRegister}>
          Register
        </button>
      </div>
    </Layout>
  );
};

export default Register;
