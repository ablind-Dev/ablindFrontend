import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import "../styles/global.css";
import { RecoilRoot } from "recoil";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Router from "next/router";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/Resource/LoadingSpinner";
import Image from "next/image";
import NoFound from "../public/images/NoFound.svg";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <RecoilRoot>
      <div className="container">
        <Layout>
          {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
        </Layout>
      </div>
      <div className="mobile-box">
        <div className="img-box">
          <div className="circle" />
          <Image src={NoFound} layout="fill" objectFit="cover" />
        </div>
        <div className="info-box">
          <span className="title">죄송합니다.</span>
          <span>{`현재 Ablind는 PC로만 이용이 가능합니다.\n서둘러 모바일 환경을 제공할 수 있도록 노력하겠습니다.`}</span>
        </div>
      </div>
      <style jsx>{`
        .mobile-box {
          display: none;
        }
        .img-box {
          width: 50vw;
          height: 50vw;
          position: relative;
        }
        .circle {
          width: 40vw;
          height: 40vw;
          border-radius: 100%;
          background-color: #b9b9b9;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: pre-line;
        }
        .title {
          font-weight: 900;
          font-size: 2rem;
        }
        @media (max-width: 450px) {
          .container {
            display: none;
          }
          .mobile-box {
            display: flex;
            width: 100vw;
            height: 100vh;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 20px;
          }
        }
      `}</style>
    </RecoilRoot>
  );
}

export default MyApp;
