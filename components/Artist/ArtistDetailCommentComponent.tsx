import Comment from "./Comment";
import { useState } from "react";
import BasicModal from "../Resource/BasicModal";

interface artistId {
  artistId: number;
}

interface commentType {
  writerId: string;
  title: string;
  writerName: string;
  date: string;
  content: string;
}

export default function ArtistDetailCommentComponent(props: artistId) {
  const { artistId } = props;
  const [myCommentTitle, setMyCommentTitle] = useState("");
  const [myComment, setMyComment] = useState("");

  //board api로 응원글 받아오기
  //임시데이터
  const tmpComment: commentType = {
    writerId: "abc@naver.com",
    title: "와 진짜 멋져요...",
    writerName: "홍길동",
    date: "2022-07-18",
    content:
      "피고, 거선의 광야에서 가지에 사랑의 품었기 그러므로 설산에서 스며들어 피다.\n들어 위하여 품에 불러 몸이 뭇 무엇을 불어 부패뿐이다.\n투명하되 위하여 더운지라 천지는 광야에서 피가 싹이 남는 아니다.\n따뜻한 끓는 그들의 소금이라 우리 속에 봄바람이다.\n피고, 거선의 광야에서 가지에 사랑의 품었기 그러므로 설산에서 스며들어 피다.\n들어 위하여 품에 불러 몸이 뭇 무엇을 불어 부패뿐이다.\n투명하되 위하여 더운지라 천지는 광야에서 피가 싹이 남는 아니다.\n따뜻한 끓는 그들의 소금이라 우리 속에 봄바람이다.",
  };
  const tmp = [
    tmpComment,
    tmpComment,
    tmpComment,
    tmpComment,
    tmpComment,
    tmpComment,
    tmpComment,
  ];
  const [tmpCommentArray, setTmpCommentArray] = useState(tmp);

  //댓글 삭제 함수
  const deleteComment = (ind: number) => {
    setTmpCommentArray(
      tmpCommentArray.filter((comment, index) => index !== ind)
    );
  };

  //댓글 작성 및 수정 _ 모달 오픈
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const saveModal = () => {
    //통신구문_응원글 작성
    closeModal();
  };
  const inputHandler = (id: string, value: string) => {
    switch (id) {
      case "title":
        setMyCommentTitle(value);
        break;
      case "content":
        setMyComment(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">{tmpCommentArray.length}개의 응원글</span>
        <span className="subtitle">따뜻한 한마디로 작가님을 응원해주세요!</span>
      </div>
      <div className="comment-box">
        {tmpCommentArray.map((comment, index) => (
          <div key={index}>
            <Comment
              index={index}
              writerId={comment.writerId}
              title={comment.title}
              writerName={comment.writerName}
              date={comment.date}
              content={comment.content}
              deleteComment={deleteComment}
            />
          </div>
        ))}
      </div>

      <div className="comment-btn">
        <button onClick={() => setModalOpen(true)}>응원글 작성하기</button>
      </div>
      <BasicModal
        open={modalOpen}
        close={closeModal}
        save={saveModal}
        header="응원글 작성"
      >
        <div className="modal">
          <label htmlFor="title">응원글 제목</label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해주세요."
            onChange={(e) => inputHandler(e.target.id, e.target.value)}
            value={myCommentTitle}
          />
          <label htmlFor="content">응원글</label>
          <textarea
            id="content"
            placeholder="내용을 입력해주세요."
            onChange={(e) => inputHandler(e.target.id, e.target.value)}
            value={myComment}
          />
        </div>
      </BasicModal>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 50px 0px 100px 0px;
          gap: 60px;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .title {
          font-size: 36px;
          font-weight: 900;
        }
        .subtitle {
          font-size: 28px;
          letter-spacing: -0.05;
        }

        .comment-box {
          display: flex;
          flex-direction: column;
          gap: 70px;
        }
        .comment-btn {
          padding: 50px 0px 50px 0px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .comment-btn button {
          background-color: #00ff0000;
          padding: 10px 15px 10px 15px;
          font-size: 18px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: 2px solid black;
          color: black;
          transition: all 0.25s;
        }
        .comment-btn button:hover {
          border: 2px solid #76ba99;
          background-color: #76ba99;
          color: white;
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
