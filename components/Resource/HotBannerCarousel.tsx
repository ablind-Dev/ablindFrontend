import ShopBannerCarouselItem from "./HotBannerCarouselItem";
import { useState, useEffect } from "react";
import totop from "../../public/images/caret-up.png";
import totopWhite from "../../public/images/caret-up-white.png";
import Image from "next/image";

interface item {
  img: string; //이미지 url
  content: string; //내용
  artist: string; //작가
}

export default function HotBannerCarousell() {
  const dummy: item = {
    img: "https://s3.marpple.co/files/u_1150555/2021/12/original/6227056c6620920423a1aceb1bc8ddf2775fc6bf1.jpg",
    content: "가뿐하게, 색다르게,\n그리고 간편하게",
    artist: "에어팟",
  };
  const dummies = [dummy, dummy, dummy, dummy, dummy];

  const arrayX = dummies.length - 1;
  const [viewLeft, setViewLeft] = useState(false);
  const [viewRight, setViewRight] = useState(true);
  const [viewCenter, setViewCenter] = useState(0);
  const [moveX, setMoveX] = useState(200);

  const moveRight = () => {
    setMoveX((prev) => prev - 340);
    setViewLeft(true);
    setViewCenter((prev) => prev + 1);
  };

  const moveLeft = () => {
    setMoveX((prev) => prev + 340);
    setViewRight(true);
    setViewCenter((prev) => prev - 1);
  };

  useEffect(() => {
    if (viewCenter === 0) setViewLeft(false);
    if (viewCenter === arrayX) setViewRight(false);
  }, [viewCenter]);

  return (
    <div className="container">
      <span className="title">
        <span className="bold">Ablind</span>의 신상 굿즈를 만나보세요.
      </span>
      <div className="carousel-box">
        {dummies.map((dummy, index) => (
          <ShopBannerCarouselItem
            img={dummy.img}
            content={dummy.content}
            artist={dummy.artist}
            center={index === viewCenter ? true : false}
            key={index}
          />
        ))}
      </div>
      {viewLeft ? (
        <button onClick={() => moveLeft()} className="left-btn">
          <Image src={totop} />
        </button>
      ) : (
        <></>
      )}
      {viewRight ? (
        <button onClick={() => moveRight()} className="right-btn">
          <Image src={totop} />
        </button>
      ) : (
        <></>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          gap: 10px;
        }
        .title {
          font-size: 1.3rem;
          color: #000000;
          padding: 5px 200px;
        }
        .bold {
          font-weight: 800;
        }
        .carousel-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          gap: 50px;
          transform: translateX(${moveX}px);
          transition: all 0.2s ease;
          position: relative;
        }
        .left-btn,
        .right-btn {
          position: absolute;
          top: 50%;
          background-color: #a3a3a395;
          width: 35px;
          height: 35px;
          padding: 8px;
          border: none;
          border-radius: 100%;
          cursor: pointer;
          transition: all 0.15s;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .left-btn {
          left: 2%;
          transform: rotate(270deg);
        }
        .right-btn {
          right: 2%;
          transform: rotate(90deg);
        }

        .left-btn:hover,
        .right-btn:hover {
          background-color: #76ba99;
        }
      `}</style>
    </div>
  );
}
