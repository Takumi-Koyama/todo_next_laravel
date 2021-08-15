import Head from "next/head";
import router from "next/router";
import { Layout } from "../components/Layout/Layout";

export const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Home</h1>
          <button
            className="primaryButton"
            onClick={() => {
              router.push("/Register");
            }}
          >
            Register
          </button>
          <button
            className="primaryButton"
            onClick={() => {
              router.push("/Login");
            }}
          >
            Login
          </button>
          <button
            className="primaryButton"
            onClick={() => {
              router.push("TodoList");
            }}
          >
            Todo
          </button>
        </main>
      </Layout>
    </>
  );
};

export default Home;
