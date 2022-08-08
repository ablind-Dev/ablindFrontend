import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface navProps {
  nav: number;
  setNav: Dispatch<SetStateAction<number>>;
}

export default function GoodsNav(props: navProps) {
  const { nav, setNav } = props;
  const navs = ["상품정보", "리뷰", "Q&A"];
  return (
    <div className="nav-box">
      {navs.map((n, index) => (
        <span
          key={n}
          className={index === nav ? "selected" : "disabled"}
          onClick={() => setNav(index)}
        >
          {n}
        </span>
      ))}
      <style jsx>{`
        .nav-box {
          display: flex;
          height: 40px;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border: 1px solid black;
          padding: 0px;
        }
        span {
          width: 200px;
          height: 100%;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          margin: 0px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .disabled:hover {
          background-color: #76ba9951;
        }
        .selected {
          background-color: #76ba99;
          color: white;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
