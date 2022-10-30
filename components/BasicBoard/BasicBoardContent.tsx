import moment from "moment";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface boardContentProps {
  index: number;
  content: string;
  createdAt: string;
  myReview: boolean;
  qnaBoardId: number;
  secretTNF: boolean;
  title: string;
  updatedAt: string;
  username: string;
  answer: string;
  filterArray: (ind: number) => void;
  updateHandler: () => void;
  deleteAnswer: (id: number) => void;
}

export default function BasicBoardContent(props: boardContentProps) {
  const {
    index,
    content,
    createdAt,
    myReview,
    qnaBoardId,
    secretTNF,
    title,
    updatedAt,
    username,
    answer,
    filterArray,
    updateHandler,
    deleteAnswer,
  } = props;
  const [collapseState, setCollapse] = useState(false);
  const [btnState, setBtnState] = useState(true);
  const [editState, setEditState] = useState(false);
  const [editQuestionTitle, setEditQuestionTitle] = useState(title);
  const [editQuestionContent, setEditQuestionContent] = useState(content);

  const dateFormater = (createdAt: string) => {
    const nowDate = new Date();
    const date = new Date(createdAt);
    let dateByString = moment(createdAt).add(9, "h").format("YYYY-MM-DD");
    const gapTime = date.getTime() - nowDate.getTime();
    if (gapTime > -86400000) dateByString = moment(date).add(9, "h").fromNow();
    return dateByString;
  };

  const collapseHandler = () => {
    if (!secretTNF || (secretTNF && myReview)) {
      setCollapse((prev) => !prev);
      if (collapseState) {
        setEditState(false);
        setBtnState(true);
        setEditQuestionTitle(title);
        setEditQuestionContent(content);
      }
    } else alert("접근 권한이 없습니다.");
  };

  const deleteQuestionHandler = () => {
    if (confirm("삭제한 질문은 복구할 수 없습니다.\n정말 삭제하시겠습니까?")) {
      axios
        .delete(`https://www.ablind.co.kr/shop/5/qna/delete`, {
          data: {
            qnaBoardId: qnaBoardId,
          },
        })
        .then((res) => {
          filterArray(index);
          alert("질문 삭제가 완료되었습니다.");
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const editButtonClicker = () => {
    if (answer) {
      alert("답변이 달린 질문은 수정할 수 없습니다.");
    } else {
      setEditState(true);
      setBtnState(false);
    }
  };

  const editQuestionHandler = () => {
    if (confirm("댓글을 수정하시겠습니까?")) {
      axios
        .put(
          "https://www.ablind.co.kr/shop/5/qna/update",
          {
            qnaBoardId: qnaBoardId,
            title: editQuestionTitle,
            content: editQuestionContent,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          alert("댓글 수정이 완료되었습니다.");
          updateHandler();
          setBtnState(true);
          setEditState(false);
        })
        .catch((error) => {
          console.log(error);
          alert("댓글 수정에 실패했습니다.");
          setEditQuestionTitle(title);
          setEditQuestionContent(content);
        });
    }
  };

  return (
    <>
      <tr
        className={collapseState ? "" : "row"}
        onClick={() => collapseHandler()}
      >
        <td>{answer ? "답변 완료" : "답변 대기중"}</td>
        <td className="content-title">
          {secretTNF ? (collapseState ? title : "비밀글입니다") : title}
        </td>
        <td>{username}</td>
        <td>{dateFormater(createdAt)}</td>
      </tr>
      {collapseState ? (
        <tr className="content-box">
          <td />
          <td colSpan={2}>
            <div className="content">
              {editState ? (
                <textarea
                  onChange={(e) => setEditQuestionContent(e.target.value)}
                  value={editQuestionContent}
                ></textarea>
              ) : (
                <div>{editQuestionContent}</div>
              )}
              {answer ? (
                <div
                  className="comment-box"
                  onClick={() => deleteAnswer(qnaBoardId)}
                >
                  <FontAwesomeIcon icon={faCaretRight} />
                  <span>{answer}</span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </td>
          <td>
            {myReview && btnState ? (
              <div className="btns">
                <button
                  onClick={() => {
                    editButtonClicker();
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    deleteQuestionHandler();
                  }}
                >
                  삭제
                </button>
              </div>
            ) : myReview && !btnState ? (
              <button
                onClick={() => editQuestionHandler()}
                className="save-btn"
              >
                저장
              </button>
            ) : (
              <></>
            )}
          </td>
        </tr>
      ) : (
        <></>
      )}
      <style jsx>{`
        td {
          height: 40px;
          text-align: center;
          cursor: pointer;
        }
        .row {
          border-bottom: 1px solid #bebebe;
        }
        .content-title {
          transition: all 0.15s;
          font-weight: 600;
        }
        .content-title:hover {
          color: #76ba99;
        }
        .content-box {
          border-bottom: 1px solid #bebebe;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 5px;
          text-align: start;
          cursor: default;
          padding-bottom: 10px;
          white-space: pre-line;
        }
        .comment-box {
          display: flex;
          flex-direction: row;
          align-items: start;
          gap: 10px;
          background-color: #bebebe;
          border-radius: 5px;
          padding: 10px 15px;
        }
        .btns {
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: start;
          gap: 2px;
          cursor: default;
        }

        .btns button {
          border: none;
          background: none;
          cursor: pointer;
          color: #505050;
          font-weight: 500;
          text-decoration: underline;
        }
        .save-btn {
          border: none;
          background-color: #76ba99;
          border-radius: 5px;
          padding: 5px 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
        }
        textarea {
          width: 100%;
        }
      `}</style>
    </>
  );
}
