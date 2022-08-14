import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/global.css";
import { RecoilRoot } from "recoil";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Router from "next/router";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/Resource/LoadingSpinner";

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
      <Layout>
        {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
