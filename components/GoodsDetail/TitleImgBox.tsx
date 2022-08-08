import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface imgs {
  imgs: Array<string>;
}

const SubImg = (img: string) => (
  <div className="sub-img">
    <style jsx>{`
      .sub-img {
        width: 70px;
        height: 70px;
        background-image: url(${img});
        background-size: cover;
        background-position: center;
        cursor: pointer;
      }
    `}</style>
  </div>
);

export default function TitleImgBox(props: imgs) {
  const { imgs } = props;
  const [main, setMain] = useState(0);

  const leftHandler = () => {
    setMain((prev) => (prev !== 0 ? prev - 1 : imgs.length - 1));
  };

  const rightHandler = () => {
    setMain((prev) => (prev !== imgs.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="container">
      <div className="main-img">
        <button className="left-btn" onClick={() => leftHandler()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="right-btn" onClick={() => rightHandler()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="sub-img-box">
        {imgs.map((img, index) => (
          <div key={img} onClick={() => setMain(index)}>
            {SubImg(img)}
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 30px;
        }
        .main-img {
          width: 470px;
          height: 470px;
          background-image: url(${imgs[main]});
          background-size: cover;
          background-position: center;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          position: relative;
        }
        .sub-img-box {
          width: 470px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 10px;
        }
        .sub-img {
          width: 70px;
          height: 70px;
          background-image: url(${imgs[main]});
          background-size: cover;
          background-position: center;
        }
        button {
          position: absolute;
          border: none;
          width: 50px;
          height: 50px;
          background-color: #0000003a;
          border-radius: 5px;
          transition: all 0.15s;
          cursor: pointer;
        }
        button:hover {
          background-color: #76ba9988;
        }
        .left-btn {
          left: 2%;
          top: 50%;
        }
        .right-btn {
          right: 2%;
          top: 50%;
        }
      `}</style>
    </div>
  );
}
