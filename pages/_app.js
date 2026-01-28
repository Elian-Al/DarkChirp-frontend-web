import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';

function App({ Component, pageProps }) {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  });

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
