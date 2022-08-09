import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

//prop로 받아야할 것 => 전체 페이지 수, 페이지에 따라서 아이템 세팅되는 setState
interface pageProps {
  pages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagenation(props: pageProps) {
  const { pages, setPage } = props; //전체페이지와 현재 페이지 업데이트 setState
  const [curPage, setCurPage] = useState(1);
  const [allPage, setAllPage] = useState<Array<Array<number>>>([]);
  const [allTen, setAllTen] = useState(1); // 10개 짜리 페이지네이션이 몇개인지 (개수임! -1 해줘야함)
  const [ten, setTen] = useState(0); //현재 10개 짜리의 인덱스! 인덱스임 인덱스

  // console.log(
  //   `총 페이지 : ${allPage}, 현재 페이지 : ${curPage}, 10개 단위 : ${allTen}, 현재 10개 단위 : ${ten}`
  // );

  useEffect(() => {
    let pageArray = [];
    for (let i = 0; i < pages; i++) {
      pageArray.push(i + 1);
    }

    if (pages <= 10) {
      setAllPage([pageArray]);
    } else {
      let tenPage = [];
      for (let i = 0; i < Math.ceil((pages - 1) / 10); i++) {
        tenPage.push(pageArray.splice(0, 10));
      }
      setAllPage(tenPage);
      setAllTen(Math.ceil((pages - 1) / 10));
    }
  }, [pages]);

  const clickPageHandler = (page: number) => {
    console.log(`현재페이지 ${page}`);
    setCurPage(page);
    setPage(page);
  };

  const leftHandler = () => {
    if (ten !== 0) {
      setTen((prev) => prev - 1);
      clickPageHandler(allPage[ten - 1][0]);
    }
  };

  const rightHandler = () => {
    if (ten !== allTen - 1) {
      setTen((prev) => prev + 1);
      clickPageHandler(allPage[ten + 1][0]);
    }
  };

  return (
    <div className="container">
      {allPage[0] ? (
        <>
          <div className="btn">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => leftHandler()}
            />
          </div>

          <ul>
            {allPage[ten].map((page, index) => (
              <li
                key={page}
                onClick={() => clickPageHandler(page)}
                className={curPage === page ? "selected" : ""}
              >
                {page}
              </li>
            ))}
          </ul>
          <div className="btn">
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => rightHandler()}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 15px;
        }
        ul {
          list-style: none;
          padding-left: 0px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }
        li {
          cursor: pointer;
          padding: 4px 8px;
          transition: all 0.15s;
        }
        .selected {
          background-color: #76ba99;
          border-radius: 2px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          color: white;
          font-weight: 600;
        }
        .btn {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
