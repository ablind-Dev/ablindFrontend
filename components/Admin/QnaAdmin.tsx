import Api from "../../components/Auth/CustomApi";
import { useState, useEffect } from "react";
import Router from "next/router";
import moment from "moment";
import BasicModal from "../Resource/BasicModal";

interface Qna {
  anwer: string;
  content: string;
  createdAt: string;
  myReview: boolean;
  qnaBoardId: number;
  secretTNF: boolean;
  title: string;
  updatedAt: string;
  username: string;
  itemId: number;
}

export default function QnaAdmin() {
  const router = Router;
  const [qnaList, setQnaList] = useState<Array<Qna>>();
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const closeModal = () => {
    setAnswer("");
    setModalOpen(false);
  };

  const saveModal = () => {
    alert("이거말고 위에 저장 버튼 누르세요.");
  };

  const getQna = () => {
    Api.get("http://www.ablind.co.kr/admin/list/qna/noanswer", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log(res);
        setQnaList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveAnswer = (id: number) => {
    Api.post(
      "https://www.ablind.co.kr/admin/list/qna/answer",
      {
        qnaBoardId: id,
        answer: answer,
      },
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQna();
  }, []);

  return (
    <div>
      <span>답변 안한 질문들</span>
      <div className="container">
        {qnaList ? (
          qnaList.map((qna, index) => (
            <div className="qna-box" key={qna.qnaBoardId}>
              <span>질문 제목 : {qna.title}</span>
              <span>작성자 : {qna.username}</span>
              <span>
                질문 작성 시간 :{" "}
                {moment(qna.updatedAt)
                  .add(9, "h")
                  .format("YYYY-MM-DD HH:mm:ss")}
              </span>
              <span>질문 내용 : {qna.content}</span>
              <button onClick={() => router.push(`/Shop/${qna.itemId}`)}>
                해당 상품으로 가기
              </button>
              <button onClick={() => setModalOpen(true)}>답변 창 열기</button>
              <BasicModal
                open={modalOpen}
                close={closeModal}
                save={saveModal}
                header="답변하기"
              >
                <div className="modal">
                  <span>{qna.title}</span>
                  <span>{qna.content}</span>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button onClick={() => saveAnswer(qna.itemId)}>저장</button>
                </div>
              </BasicModal>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          margin-top: 30px;
        }
        .qna-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .modal {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
}
