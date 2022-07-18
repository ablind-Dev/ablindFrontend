import { useState, useEffect } from "react";

interface commentProps {
  title: string;
  writer: string;
  writerId: string;
  date: string;
  content: string;
  commentId: string;
}

export default function CommentCard(props: commentProps) {
  const { title, writer, writerId, date, content, commentId } = props;
  const [myComment, setMyComment] = useState(false);
  useEffect(() => {
    const myId = localStorage.getItem("email");
    if (myId && myId === writerId) {
      setMyComment(true);
    }
  }, []);

  const editCommentHandler = () => {
    //모달창 띄워서 수정
  };

  const deleteCommentHandler = () => {
    if (
      confirm(
        "정말로 응원글을 삭제하시겠습니까?\n삭제된 응원글은 복구할 수 없습니다."
      )
    ) {
      //삭제 통신구문 추가
    }
  };

  return (
    <div className="container">
      {myComment ? (
        <div className="btn-box">
          <button onClick={() => editCommentHandler()}>수정</button>
          <button onClick={() => deleteCommentHandler()}>삭제</button>
        </div>
      ) : (
        <></>
      )}
      <span className="title">{title}</span>
      <div className="info-box">
        <span className="writer">{writer}</span>
        <span className="date">{date}</span>
      </div>
      <span className="content">{content}</span>
    </div>
  );
}
