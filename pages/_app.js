import Head from "next/head";
import "../styles/styles.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Owasp TOP 10 demo</title>
        <meta
          name="description"
          content="Weakly secured website to showcase few vurnabilities written in the OWASP top 10"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
