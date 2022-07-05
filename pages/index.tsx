import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import MainBannerCarousel from "../components/MainBannerCarousel";

const Home: NextPage = () => {
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
