import moment from "moment";
import { useState, useEffect } from "react";
import BasicBoardContent from "./BasicBoardContent";

interface boardProps {
  title: string;
  firstCol: string; //첫 열 이름
  thirdCol: string; //두 번쨰 열 이름
  fourthCol: string; //세 번째 열 이름
  buttonState: boolean; //버튼 존재하는가
  buttonHandler: () => void; //버튼 클릭 핸들러
  contentArray: Array<boardContent>;
}

interface boardContent {
  content: string;
  createdAt: string;
  myReview: boolean;
  qnaBoardId: number;
  secretTNF: boolean;
  title: string;
  updatedAt: string;
  username: string;
  answer: string;
}

export default function BasicBoard(props: boardProps) {
  const {
    title,
    firstCol,
    thirdCol,
    fourthCol,
    buttonState,
    buttonHandler,
    contentArray,
  } = props;
  const [viewQuestion, setViewQuestion] =
    useState<Array<boardContent>>(contentArray);

  const filterArray = (ind: number) => {
    setViewQuestion(viewQuestion.filter((content, index) => index !== ind));
  };

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">{title}</span>
        <span>{contentArray.length}</span>
      </div>
      <table>
        <tr className="first-row">
          <th className="first-col">{firstCol}</th>
          <th className="second-col">{}</th>
          <th className="third-col">{thirdCol}</th>
          <th className="fourth-col">{fourthCol}</th>
        </tr>
        {viewQuestion.map((content, index) => (
          <>
            <BasicBoardContent
              index={index}
              content={content.content}
              createdAt={content.createdAt}
              myReview={content.myReview}
              qnaBoardId={content.qnaBoardId}
              secretTNF={content.secretTNF}
              title={content.title}
              updatedAt={content.updatedAt}
              username={content.username}
              answer={content.answer}
              filterArray={filterArray}
              key={content.qnaBoardId}
            />
          </>
        ))}
      </table>
      {buttonState ? (
        <div className="down-box">
          <div className="pagination"></div>
          <button onClick={() => buttonHandler()}>문의하기</button>
        </div>
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: start;
        }
        .title-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          color: #bebebe;
          font-size: 28px;
          font-weight: 700;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
        }
        table {
          width: 100%;
          border-bottom: 3px solid #bebebe;
          border-collapse: collapse;
        }
        th {
          height: 50px;
          background-color: #bebebe;
        }

        .first-col {
          width: 16%;
        }
        .second-col {
          width: 50%;
        }
        .third-col {
          width: 17%;
        }
        .fourth-col {
          width: 17%;
        }
        .down-box {
          width: 100%;
          margin-top: 20px;
          display: flex;
          justify-content: end;
        }
        .down-box button {
          background-color: #646464;
          border-radius: 5px;
          padding: 8px 16px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
