import TitleImgBox from "./TitleImgBox";
import TitleInfoBox from "./TitleInfoBox";

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
      <style jsx>{`
        .container {
          width: 100%;
        }
        .upper-box {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
}
