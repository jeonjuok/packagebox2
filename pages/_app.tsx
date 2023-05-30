import "@/styles/globals.css";

import { ThemeProvider } from "next-themes";
// import 'semantic-ui-css/semantic.min.css'

import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>제인슨 포트폴리오</title>
        <meta name="description" content="제인슨 포트폴리오" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

/**
 * _app.js
 * 페이지 전환시 레이아웃을 유지할 수 있습니다.
 * 페이지 전환시 상태값을 유지할 수 있습니다.
 * ComponentDidCatch를 이용해서 커스템 에러 핸들링을 할 수 있습니다.
 * 추가적인 데이터를 페이지로 주입시켜주는게 가능합니다.
 * 글로벌 CSS를 이곳에 선언합니다.
 */
