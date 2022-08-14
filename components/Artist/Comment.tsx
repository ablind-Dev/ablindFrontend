import { useState, useEffect } from "react";
import BasicModal from "../Resource/BasicModal";
import axios from "axios";
import Api from "../Auth/CustomApi";
import moment from "moment";
import "moment/locale/ko";

interface commentType {
  artistId: number;
  boardId: number;
  index: number;
  writerId: string;
  title: string;
  writerName: string;
  date: string;
  content: string;
  deleteComment: (ind: number) => void;
  updateComment: () => void;
}
export default function Comment(props: commentType) {
  const {
    artistId,
    boardId,
    index,
    writerId,
    title,
    writerName,
    date,
    content,
    deleteComment,
    updateComment,
  } = props;
  const [dateByString, setDateByString] = useState("");
  const [originContent, setOriginContent] = useState(content);
  const [cutContent, setCutContent] = useState(originContent);
  const [isLong, setIsLong] = useState(false); // 응원글이 길면 true
  const [collapse, setCollapse] = useState(false); // 응원글 접고(false) 펼치기(true)
  const [isMine, setIsMine] = useState(true);

  const dateFormater = (value: string) => {
    const nowDate = new Date();
    const date = new Date(value);
    const dateByString = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const gapTime = date.getTime() - nowDate.getTime();
    console.log(gapTime);
    if (gapTime > -86400000) {
      setDateByString(moment(date).fromNow());
    } else if (gapTime < -86400000) {
      setDateByString(dateByString);
    }
  };

  useEffect(() => {
    testLong();
    checkMyComment();
    dateFormater(date);
  }, [originContent]);

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

  const checkMyComment = () => {
    const myEmail = localStorage.getItem("email");
    if (myEmail === writerId) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  };

  const deleteCommentHandler = async () => {
    if (confirm("삭제한 댓글은 복구할 수 없습니다.\n정말 삭제하시겠습니까?")) {
      //댓글 삭제 통신
      await Api.delete(
        `http://www.ablind.co.kr/artist/${artistId}/board/delete`,
        {
          data: {
            boardId: boardId,
          },
        }
      )
        .then((res) => {
          alert("댓글 삭제가 완료되었습니다.");
          deleteComment(index);
          closeModal();
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  //댓글 작성 및 수정 _ 모달 오픈
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(originContent);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const saveModal = async () => {
    await Api.put(`http://www.ablind.co.kr/artist/${artistId}/board/update`, {
      boardId: boardId,
      title: editTitle,
      content: editContent,
    })
      .then((res) => {
        alert("댓글 수정이 완료되었습니다.");
        updateComment();
        setOriginContent(editContent);
        closeModal();
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const inputHandler = (id: string, value: string) => {
    switch (id) {
      case "title":
        setEditTitle(value);
        break;
      case "content":
        setEditContent(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  const editComment = () => {
    if (confirm("댓글을 수정하시겠습니까?")) {
      //댓글 수정 모달 오픈
      setModalOpen(true);
    }
  };

  return (
    <div className="container">
      <span className="title">{title}</span>
      <div className="subtitle-box">
        <span className="writer">{writerName}</span>
        <span className="date">{dateByString}</span>
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
      <BasicModal
        open={modalOpen}
        close={closeModal}
        save={saveModal}
        header="응원글 수정"
      >
        <div className="modal">
          <label htmlFor="title">응원글 제목</label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해주세요."
            onChange={(e) => inputHandler(e.target.id, e.target.value)}
            value={editTitle}
          />
          <label htmlFor="content">응원글</label>
          <textarea
            id="content"
            placeholder="내용을 입력해주세요."
            onChange={(e) => inputHandler(e.target.id, e.target.value)}
            value={editContent}
          />
        </div>
      </BasicModal>
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
        .modal {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .modal input {
          padding: 3px 5px 3px 5px;
        }
        .modal textarea {
          min-height: 150px;
          padding: 3px 5px 3px 5px;
        }
      `}</style>
    </div>
  );
}
