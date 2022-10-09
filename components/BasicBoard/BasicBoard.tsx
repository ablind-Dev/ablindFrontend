import moment from "moment";
import { useState, useEffect } from "react";
import BasicBoardContent from "./BasicBoardContent";
import Pagenation from "../Shop/Pagenation";

interface boardProps {
  title: string;
  contentNum: number;
  firstCol: string; //첫 열 이름
  thirdCol: string; //두 번쨰 열 이름
  fourthCol: string; //세 번째 열 이름
  buttonState: boolean; //버튼 존재하는가
  buttonHandler: () => void; //버튼 클릭 핸들러
  contentArray: Array<boardContent>;
  updateHandler: () => void;
  deleteAnswer:(id:number) => void;
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
    contentNum,
    firstCol,
    thirdCol,
    fourthCol,
    buttonState,
    buttonHandler,
    contentArray,
    updateHandler,
    deleteAnswer
  } = props;

  const [viewQuestion, setViewQuestion] =
    useState<Array<boardContent>>(contentArray);

  useEffect(() => {
    setViewQuestion(contentArray);
  }, [contentArray]);

  const filterArray = (ind: number) => {
    if (qnaListInPage) {
      const filteredArray = qnaListInPage[curPage - 1].filter(
        (qna, index) => ind !== index
      );
      const setArray = qnaListInPage.map((qna, index) =>
        index == curPage - 1 ? filteredArray : qna
      );
      setQnaListPage(setArray);
    }
  };

  //페이지네이션 관련 -> 18개씩
  const [qnaListInPage, setQnaListPage] =
    useState<Array<Array<boardContent>>>();
  const [allPage, setAllPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  const qnaSlice = (page: number) => {
    let tmpQnas = [];
    if (viewQuestion) {
      for (let i = 0; i < page; i++) {
        tmpQnas.push(viewQuestion.splice(0, 18));
      }
      setQnaListPage(tmpQnas);
    }
  };

  useEffect(() => {
    if (viewQuestion && viewQuestion.length > 18) {
      let allPages;
      if (viewQuestion.length % 18 === 0) {
        allPages = Math.floor(viewQuestion.length / 18);
      } else {
        allPages = Math.floor(viewQuestion.length / 18) + 1;
      }
      setAllPage(allPages);
      qnaSlice(allPages);
    } else if (viewQuestion && viewQuestion.length <= 18) {
      setQnaListPage([viewQuestion]);
    }
  }, [viewQuestion]);

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">{title}</span>
        <span>{contentNum}</span>
      </div>
      <table>
        <thead>
          <tr className="first-row">
            <th className="first-col">{firstCol}</th>
            <th className="second-col">{}</th>
            <th className="third-col">{thirdCol}</th>
            <th className="fourth-col">{fourthCol}</th>
          </tr>
        </thead>
        <tbody>
          {qnaListInPage ? (
            qnaListInPage[curPage - 1].map((content, index) => (
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
                updateHandler={updateHandler}
                deleteAnswer={deleteAnswer}
              />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <Pagenation pages={allPage} setPage={setCurPage} />
      </div>
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
          display: flex;
          justify-content: end;
        }
        .down-box button {
          width: 120px;
          background-color: #646464;
          border-radius: 5px;
          padding: 8px 16px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
        }
        .pagination {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
