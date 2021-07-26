import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../app/store";
import Axios from "axios";
import { Header } from "../components/Header/Header";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  Axios.defaults.baseURL = "http://localhost:4000/api/";
  Axios.defaults.validateStatus = (status) =>
    (status >= 200 && status < 300) ||
    status == 400 ||
    status == 401 ||
    status == 404 ||
    status == 422;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
