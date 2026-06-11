import "../styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import Loading from "../components/UI/Loading";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DarkChirp</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
