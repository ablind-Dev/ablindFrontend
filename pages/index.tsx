import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import MainBannerCarousel from "../components/Resource/MainBannerCarousel";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";

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
      <MainBannerCarousel />
      <style jsx>{`
        .container {
          width: 100%;
          padding-bottom: 100px;
        }
      `}</style>
    </div>
  );
};

export default Home;
