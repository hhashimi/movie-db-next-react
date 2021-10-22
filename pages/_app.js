import Layout from "../components/Layout";
import "../styles/globals.css";

import { store } from "../app/store";
import { Provider } from "react-redux";
import { getUserByToken } from "../features/user/userSlice";

function MyApp({ Component, pageProps }) {
  // sign in based on JWT in localStorage upon app load
  if (typeof window !== "undefined") store.dispatch(getUserByToken());

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
