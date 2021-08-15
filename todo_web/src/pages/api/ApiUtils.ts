import { getTodoToken } from "../../utils/Validates";
import { isLogin } from "../../utils/Validates";
import router from "next/router";

export const createHeader = (): any => {
  const token = getTodoToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const loginPass = (): void => {
  if (!isLogin()) {
    alert("ログインしてください");
    router.push("/Login");
  }
};
