import Head from "next/head";
import Hero from "../components/home/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>제인슨 포트폴리오</title>
        <meta name="description" content="제인슨 포트폴리오" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
}
