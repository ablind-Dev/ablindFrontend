import Comment from "./Comment";
import { useState, useEffect } from "react";
import BasicModal from "../Resource/BasicModal";
import axios from "axios";
import Api from "../Auth/CustomApi";
import Router from "next/router";

interface artistId {
  artistId: number;
}

interface commentType {
  boardId: number;
  content: string;
  createdAt: string;
  email: string;
  title: string;
  updatedAt: string;
  writer: string;
}

export default function ArtistDetailCommentComponent(props: artistId) {
  const { artistId } = props;
  const [myCommentTitle, setMyCommentTitle] = useState("");
  const [myComment, setMyComment] = useState("");
  const router = Router;

  //board api로 응원글 받아오기
  //임시데이터
  // const tmpComment: commentType = {
  //   writerId: "abc@naver.com",
  //   title: "와 진짜 멋져요...",
  //   writerName: "홍길동",
  //   date: "2022-07-18",
  //   content:
  //     "피고, 거선의 광야에서 가지에 사랑의 품었기 그러므로 설산에서 스며들어 피다.\n들어 위하여 품에 불러 몸이 뭇 무엇을 불어 부패뿐이다.\n투명하되 위하여 더운지라 천지는 광야에서 피가 싹이 남는 아니다.\n따뜻한 끓는 그들의 소금이라 우리 속에 봄바람이다.\n피고, 거선의 광야에서 가지에 사랑의 품었기 그러므로 설산에서 스며들어 피다.\n들어 위하여 품에 불러 몸이 뭇 무엇을 불어 부패뿐이다.\n투명하되 위하여 더운지라 천지는 광야에서 피가 싹이 남는 아니다.\n따뜻한 끓는 그들의 소금이라 우리 속에 봄바람이다.",
  // };
  // const tmp = [
  //   tmpComment,
  //   tmpComment,
  //   tmpComment,
  //   tmpComment,
  //   tmpComment,
  //   tmpComment,
  //   tmpComment,
  // ];

  // const [tmpCommentArray, setTmpCommentArray] = useState(tmp);

  //댓글 받아오기
  const initialComment: commentType = {
    boardId: 0,
    content: "",
    createdAt: "",
    email: "",
    title: "",
    updatedAt: "",
    writer: "",
  };
  const [comments, setComments] = useState<Array<commentType>>([
    initialComment,
  ]);
  const getComment = async () => {
    await axios
      .get(`http://www.ablind.co.kr/artist/${artistId}/board`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComment();
  }, []);

  //댓글 삭제 함수
  const deleteComment = (ind: number) => {
    setComments(comments.filter((comment, index) => index !== ind));
  };

  //댓글 작성 및 수정 _ 모달 오픈
  const [modalOpen, setModalOpen] = useState(false);

  const modalOpenHandler = () => {
    if (localStorage.getItem("accessToken")) {
      setModalOpen(true);
    } else {
      if (confirm("로그인이 필요한 서비스입니다.\n로그인하시겠습니까?")) {
        router.push("/SignIn");
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveModal = async () => {
    await Api.post(`http://www.ablind.co.kr/artist/${artistId}/board`, {
      email: localStorage.getItem("email"),
      title: myCommentTitle,
      content: myComment,
    })
      .then((res) => {
        alert("댓글 작성이 완료되었습니다.");
        getComment();
        closeModal();
      })
      .catch((res) => {
        console.log(res);
      });
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
        <span className="title">{comments.length}개의 응원글</span>
        <span className="subtitle">따뜻한 한마디로 작가님을 응원해주세요!</span>
      </div>
      <div className="comment-box">
        {comments.map((com, index) => (
          <div key={com.boardId}>
            <Comment
              artistId={artistId}
              boardId={com.boardId}
              index={index}
              writerId={com.email}
              title={com.title}
              writerName={com.writer}
              date={com.createdAt}
              content={com.content}
              deleteComment={deleteComment}
              updateComment={getComment}
            />
          </div>
        ))}
      </div>

      <div className="comment-btn">
        <button
          onClick={() => {
            modalOpenHandler();
          }}
        >
          응원글 작성하기
        </button>
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
