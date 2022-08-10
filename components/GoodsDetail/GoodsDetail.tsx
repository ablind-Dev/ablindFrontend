import { useState, useEffect } from "react";
import PageMoveSticker from "../Resource/PageMoveSticker";
import TitleImgBox from "./TitleImgBox";
import TitleInfoBox from "./TitleInfoBox";
import GoodsNav from "./GoodsNav";
import Content from "./Content";
import Review from "./Review";
import Qna from "./Qna";

interface GoodsImg {
  url: string;
  id: number;
}

interface goodsDetail {
  detailImg: string;
  images: Array<GoodsImg>;
  author: string;
  name: string;
  option: Array<string>;
  price: number;
}

export default function GoodsDetail(props: goodsDetail) {
  const { detailImg, images, author, name, option, price } = props;
  const [nav, setNav] = useState(0);
  return (
    <div className="container">
      <PageMoveSticker />
      <div className="upper-box">
        <TitleImgBox imgs={images} />
        <TitleInfoBox
          name={name}
          artist={author}
          price={price}
          option={option}
        />
      </div>
      <GoodsNav nav={nav} setNav={setNav} />
      {nav === 0 ? (
        <Content detailImg={detailImg} />
      ) : nav === 1 ? (
        <Review />
      ) : (
        <Qna />
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 50px 0px 100px 0px;
          gap: 100px;
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
