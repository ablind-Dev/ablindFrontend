import { useState, useEffect } from "react";
import TitleImgBox from "./TitleImgBox";
import TitleInfoBox from "./TitleInfoBox";
import GoodsNav from "./GoodsNav";

interface goodsDetail {
  imgs: Array<string>;
  name: string;
  artist: string;
  price: number;
  naver: string;
  option: Array<string>;
  content: string;
}

export default function GoodsDetail(props: goodsDetail) {
  const { imgs, name, artist, price, naver, option, content } = props;
  const [nav, setNav] = useState(0);
  return (
    <div className="container">
      <div className="upper-box">
        <TitleImgBox imgs={imgs} />
        <TitleInfoBox
          name={name}
          artist={artist}
          price={price}
          naver={naver}
          option={option}
        />
      </div>
      <GoodsNav nav={nav} setNav={setNav} />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 50px 0px 100px 0px;
          gap: 50px;
        }
        .upper-box {
          display: flex;
          flex-direction: row;
          gap: 100px;
        }
      `}</style>
    </div>
  );
}
