import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

import App from "../components/pickcolor/App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement!);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

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

      <StrictMode>
        <App />
      </StrictMode>
    </>
  );
}
