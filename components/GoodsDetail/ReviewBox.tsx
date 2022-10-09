import moment from "moment";
import "moment/locale/ko";
import Image from "next/image";
import { useState, useEffect } from "react";
import starEmpty from "../../public/images/stars_empty.png";
import starFill from "../../public/images/stars_fill.png";
import axios from "axios";

interface reviewProps {
  title: string;
  content: string;
  image: string;
  rate: number;
  reviewBoardId: number;
  createdAt: string;
  updatedAt: string;
  myReview: boolean;
  username: string;
  updateReview: () => void;
}

export default function ReviewBox(props: reviewProps) {
  const {
    title,
    content,
    image,
    rate,
    reviewBoardId,
    createdAt,
    updatedAt,
    myReview,
    username,
    updateReview,
  } = props;

  const [originContent, setOriginContent] = useState(content);
  const [cutContent, setCutContent] = useState(originContent);
  const [isLong, setIsLong] = useState(false); // 리뷰가 길면 true
  const [collapse, setCollapse] = useState(false); // 리뷰 접고(false) 펼치기(true)
  const [dateByString, setDateByString] = useState("");
  const [calRate, setCalRate] = useState("120px"); //별점 기본사이즈

  const [imgClicker, setImgClicker] = useState(false);

  const testLong = () => {
    const countArray = cutContent.split(`\n`); //개행기준으로 문자열 나누기
    const count = countArray.length - 1; //개행문자 개수
    if (originContent.length > 200) {
      setCutContent(`${originContent.substring(0, 196)}...`);
      setIsLong(true);
    } else if (count > 4) {
      setCutContent(
        `${countArray[0]}\n${countArray[1]}\n${countArray[2]}\n${countArray[3]}...`
      );
      setIsLong(true);
    } else {
      setCutContent(originContent);
    }
  };

  const onClickCollapse = () => {
    if (collapse) testLong();
    else {
      setCutContent(originContent);
    }
    setCollapse((prev) => !prev);
  };

  const dateFormater = () => {
    const nowDate = new Date();
    const date = new Date(createdAt);
    const dateByString = moment(createdAt)
      .add(9, "h")
      .format("YYYY-MM-DD HH:mm:ss");
    const gapTime = date.getTime() - nowDate.getTime();
    if (gapTime > -86400000) {
      setDateByString(moment(date).add(9, "h").fromNow());
    } else if (gapTime < -86400000) {
      setDateByString(dateByString);
    }
  };

  const calculateRateStar = () => {
    const width = 24 * rate;
    setCalRate(`${width}px`);
  };

  const deleteReview = () => {
    if (
      confirm("한 번 삭제한 리뷰는 복구할 수 없습니다.\n정말 삭제하시겠습니까?")
    ) {
      axios
        .delete(`http://www.ablind.co.kr/shop/5/review/delete`, {
          data: {
            reviewBoardId: reviewBoardId,
          },
        })
        .then((res) => {
          updateReview();
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  useEffect(() => {
    testLong();
    dateFormater();
    calculateRateStar();
  }, [originContent]);

  return (
    <div className="container">
      <div className="left-box">
        <span className="title">{title}</span>
        <div className="subtitle-box">
          <span className="writer">{username}</span>
          <span className="date">{dateByString}</span>
          {myReview ? (
            <div className="editor">
              <span>수정</span>
              <span onClick={() => deleteReview()}>삭제</span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="rate-box">
          <span>평점</span>
          <div className="stars">
            <Image src={starEmpty} layout="fill" objectFit="cover" />
            <div className="stars-fill">
              <Image
                src={starFill}
                layout="fill"
                objectFit="cover"
                objectPosition="left"
              />
            </div>
          </div>
          <span>{rate.toFixed(1)}</span>
        </div>
        <div className="content-box">
          {isLong ? (
            <span className="content">
              {cutContent}
              <span className="collapse" onClick={() => onClickCollapse()}>
                {collapse ? "접기" : "더보기"}
              </span>
            </span>
          ) : (
            <span className="content">{cutContent}</span>
          )}
        </div>
      </div>
      {image ? (
        <div
          className={imgClicker ? "img-wide" : "img-box"}
          onClick={() => setImgClicker((prev) => !prev)}
        >
          <Image src={image} loading="lazy" layout="fill" objectFit="cover" />
        </div>
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 100%;
          border-radius: 30px;
          background: linear-gradient(315deg, #d1d1d1, #f8f8f8);
          box-shadow: -9px -9px 18px #e1e1e1, 9px 9px 18px #efefef;
          display: flex;
          ${imgClicker
            ? `flex-direction: column;
          justify-content: space-between;
          align-items: start;
          padding: 0px 50px 50px 50px;`
            : `flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0px 50px;`}
        }
        .left-box {
          padding: 50px 0px;
          white-space: pre-line;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.05;
        }
        .rate-box {
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
          gap: 10px;
        }
        .rate-box span {
          font-weight: 700;
          color: #6e6e6e;
        }
        .stars {
          position: relative;
          width: 120px;
          height: 24.8px;
        }
        .stars-fill {
          position: relative;
          width: ${calRate};
          height: 24.8px;
        }
        .subtitle-box {
          display: flex;
          flex-direction: row;
          gap: 10px;
          align-items: center;
        }
        .writer {
          font-size: 18px;
          font-weight: 600;
          color: black;
        }
        .collapse {
          margin-left: 10px;
          font-weight: 700;
          text-decoration: underline;
          cursor: pointer;
          transition: all 0.15s linear;
        }
        .collapse:hover,
        .editor span:hover {
          color: #76ba99;
        }
        .editor {
          display: flex;
          flex-direction: row;
          gap: 10px;
          align-items: center;
          font-weight: 700;
        }
        .editor span {
          text-decoration: underline;
          transition: all 0.15s linear;
          cursor: pointer;
        }
        .img-box {
          position: relative;
          width: 150px;
          min-height: 150px;
          cursor: pointer;
        }
        .img-wide {
          position: relative;
          width: 300px;
          min-height: 300px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
