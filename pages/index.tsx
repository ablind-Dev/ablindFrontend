import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import Seo from "../components/Seo";
import HomeLayout from "../components/Home/HomeLayout";

interface ThemeState {
  theme: boolean; //true: white theme | false: black theme
}

const Home: NextPage = () => {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);

  return (
    <div className="container">
      <Seo title="Home" />
      <HomeLayout />
      <style jsx>{`
        .container {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Home;
