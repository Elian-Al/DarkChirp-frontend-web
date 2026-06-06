import "../styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import Loading from "../components/UI/Loading";

function App({ Component, pageProps }) {
  const hydrate = useAuthStore((state) => state.hydrate);
  const [isReady, setIsReady] = useState(false);

  //   const init = async () => {
  //     await hydrate();
  //     setIsReady(true);
  //   };

  //   useEffect(() => {
  //     init();
  //   }, []);

  //   if (!isReady) {
  //     return <Loading>Chargement...</Loading>;
  //   }

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
