import Head from "next/head";
import "../styles/styles.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Bezpieczne aplikacje Web</title>
        <meta
          name="description"
          content="Very secure site :)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
