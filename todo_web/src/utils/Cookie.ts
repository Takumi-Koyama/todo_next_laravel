// 連想配列に格納
export const getCookieValue = (key: string) => {
  const arr = [];
  if (process.browser) {
    if (document.cookie != "") {
      const tmp = document.cookie.split("; ");
      for (let i = 0; i < tmp.length; i++) {
        const data = tmp[i].split("=");
        arr[data[0]] = decodeURIComponent(data[1]);
      }
    }
    if (key in arr) {
      return arr[key];
    }
    return "";
  }
};

export const todo_token_key = "todo_token";
