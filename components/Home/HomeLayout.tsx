import { useState, useEffect } from "react";
import axios from "axios";
import MainBannerCarousel from "../Resource/MainBannerCarousel";
import Router from "next/router";
import GoodsGrid from "./GoodsGrid";
import ArtistCarousel from "./ArtistCarousel";

export default function HomeLayout() {
  const router = Router;

  return (
    <div className="container">
      <div>
        <MainBannerCarousel />
      </div>
      <div className="artist-box">
        <span className="artist-title">
          <span className="logo">Ablind</span>
          {`에서\n당신의 예술가를 만나보세요!`}
        </span>
        <ArtistCarousel />
        <button onClick={() => router.push("/Artist")}>
          Ablind 예술가 보러가기
        </button>
      </div>
      <div className="goods-box">
        <span className="artist-title">
          <span className="logo">Ablind</span>
          {`에서만\n만나볼 수 있는 특별한 상품`}
        </span>
        <GoodsGrid />
        <button onClick={() => router.push("/Shop")}>
          Ablind 굿즈 더 보러가기
        </button>
      </div>
      <div className="footer-box">
        <div>
          <span className="footer-bold">Ablind</span>
          <span>불가능을 가능으로, 특별한 예술가를 소개합니다.</span>
        </div>
        <div>
          <span className="footer-bold">Business</span>
          <span>{`email.  ablind2021@naver.com\n대표자. 양드림 (010-3240-0722)`}</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 130px;
        }
        .artist-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 60px;
        }
        .artist-box span:not(.logo),
        .goods-box span:not(.logo) {
          font-size: 36px;
          font-weight: 800;
          white-space: pre-line;
        }
        .logo {
          font-size: 42px;
          font-weight: 900;
        }
        .artist-box button,
        .goods-box button {
          font-size: 18px;
          font-weight: 600;
          background: none;
          border: 2px solid black;
          border-radius: 5px;
          padding: 10px 15px;
          transition: all 0.25s;
          cursor: pointer;
        }
        .artist-box button:hover,
        .goods-box button:hover {
          border: 2px solid #76ba99;
          background-color: #76ba99;
          color: white;
        }
        .goods-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 60px;
        }
        .footer-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          padding: 100px 0px 50px 50px;
        }
        .footer-box div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          white-space: pre-line;
        }
        .footer-bold {
          font-size: 18px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
