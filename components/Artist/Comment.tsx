import { useState, useEffect } from "react";

interface commentType {
  index: number;
  writerId: string;
  title: string;
  writerName: string;
  date: string;
  content: string;
  deleteComment: (ind: number) => void;
}
export default function Comment(props: commentType) {
  const { index, writerId, title, writerName, date, content, deleteComment } =
    props;
  const [cutContent, setCutContent] = useState(content);
  const [isLong, setIsLong] = useState(false); // 응원글이 길면 true
  const [collapse, setCollapse] = useState(false); // 응원글 접고(false) 펼치기(true)
  const [isMine, setIsMine] = useState(true);

  useEffect(() => {
    testLong();
    checkMyComment();
  }, []);

  const testLong = () => {
    const countArray = cutContent.split(`\n`); //개행기준으로 문자열 나누기
    const count = countArray.length - 1; //개행문자 개수
    if (content.length > 200) {
      setCutContent(`${content.substring(0, 196)}...`);
      setIsLong(true);
    } else if (count > 4) {
      setCutContent(
        `${countArray[0]}\n${countArray[1]}\n${countArray[2]}\n${countArray[3]}...`
      );
      setIsLong(true);
    } else {
      setCutContent(content);
    }
  };

  const onClickCollapse = () => {
    if (collapse) testLong();
    else {
      setCutContent(content);
    }
    setCollapse((prev) => !prev);
  };

  const checkMyComment = () => {
    const myEmail = localStorage.getItem("email");
    if (myEmail === writerId) {
      setIsMine(true);
    }
  };

  const deleteCommentHandler = () => {
    if (confirm("삭제한 댓글은 복구할 수 없습니다.\n정말 삭제하시겠습니까?")) {
      //댓글 삭제 통신
      deleteComment(index);
      console.log("삭제");
    }
  };

  const editComment = () => {
    if (confirm("댓글을 수정하시겠습니까?")) {
      //댓글 수정 모달 오픈
    }
  };

  return (
    <div className="container">
      <span className="title">{title}</span>
      <div className="subtitle-box">
        <span className="writer">{writerName}</span>
        <span className="date">{date}</span>
        {isMine ? (
          <div className="editor">
            <span onClick={() => editComment()}>수정</span>
            <span onClick={() => deleteCommentHandler()}>삭제</span>
          </div>
        ) : (
          <></>
        )}
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

      <style jsx>{`
        .container {
          border-radius: 30px;
          background: linear-gradient(315deg, #d1d1d1, #f8f8f8);
          box-shadow: -9px -9px 18px #e1e1e1, 9px 9px 18px #efefef;
          padding: 50px;
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
      `}</style>
    </div>
  );
}
