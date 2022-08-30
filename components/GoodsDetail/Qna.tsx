import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";
import Link from "next/link";
import BasicBoard from "../BasicBoard/BasicBoard";
import Api from "../Auth/CustomApi";
import BasicModal from "../Resource/BasicModal";
import Router from "next/router";

interface pageProps {
  goodsId: number;
}

interface AuthState {
  state: boolean;
}

interface QnaInfo {
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

export default function Qna(props: pageProps) {
  const { goodsId } = props;
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const defaultState: AuthState = { ...recoilInfo };
  const router = Router;
  const [qnaList, setQnaList] = useState<Array<QnaInfo>>();
  const [contentNum, setContentNum] = useState(0);

  const getQna = () => {
    Api.get(`http://www.ablind.co.kr/shop/${goodsId}/qna`, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setQnaList(res.data);
        setContentNum(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });

    // const tmp: QnaInfo = {
    //   content: "안녕하세요1",
    //   createdAt: "2022-08-22",
    //   myReview: true,
    //   qnaBoardId: 1,
    //   secretTNF: false,
    //   title: "안녕하십니까",
    //   updatedAt: "2022-08-22",
    //   username: "이준규",
    //   answer: "",
    // };
    // const tmpArray = [
    //   {
    //     content: "안녕하세요1",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: 1,
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요2",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요3",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요4",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요5",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요6",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요7",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요8",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요9",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요10",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요11",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요12",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요13",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요14",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요15",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요16",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요17",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요18",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요19",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요20",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요21",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요22",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요23",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요24",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요25",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요26",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요27",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    //   {
    //     content: "안녕하세요28",
    //     createdAt: "2022-08-22",
    //     myReview: true,
    //     qnaBoardId: Math.floor(Math.random() * 10000),
    //     secretTNF: false,
    //     title: "안녕하십니까",
    //     updatedAt: "2022-08-22",
    //     username: "이준규",
    //     answer: "",
    //   },
    // ];
    // setContentNum(tmpArray.length);
    // setQnaList(tmpArray);
  };

  useEffect(() => {
    if (defaultState.state) getQna();
  }, []);

  //질문글 모달 관련 함수들
  const [modalOpen, setModalOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [checked, setChecked] = useState(false);

  const modalOpenHandler = () => {
    if (defaultState) {
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
    if (questionTitle === "" || questionContent === "") {
      alert("질문을 입력해주세요.");
    } else {
      await Api.post(`http://www.ablind.co.kr/shop/5/qna`, {
        title: questionTitle,
        content: questionContent,
        secretTNF: checked,
      })
        .then((res) => {
          alert("질문 작성이 완료되었습니다.");
          setQuestionTitle("");
          setQuestionContent("");
          getQna();
          closeModal();
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const inputHandler = (id: string, value: string) => {
    switch (id) {
      case "title":
        setQuestionTitle(value);
        break;
      case "content":
        setQuestionContent(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  return (
    <div className="container">
      {defaultState.state ? (
        <div>
          <div className="qna-box">
            {qnaList ? (
              <BasicBoard
                title="Q&A"
                contentNum={contentNum}
                firstCol="답변상태"
                thirdCol="작성자"
                fourthCol="작성일"
                buttonState={true}
                buttonHandler={modalOpenHandler}
                contentArray={qnaList}
                updateHandler={getQna}
              />
            ) : (
              <></>
            )}
            <BasicModal
              open={modalOpen}
              close={closeModal}
              save={saveModal}
              header="Q&A 작성"
            >
              <div className="modal">
                <label htmlFor="title">질문 제목</label>
                <input
                  type="text"
                  id="title"
                  placeholder="제목을 입력해주세요."
                  onChange={(e) => inputHandler(e.target.id, e.target.value)}
                  value={questionTitle}
                />
                <label htmlFor="content">질문 내용</label>
                <textarea
                  id="content"
                  placeholder="내용을 입력해주세요."
                  onChange={(e) => inputHandler(e.target.id, e.target.value)}
                  value={questionContent}
                />
                <div className="check-box">
                  <label htmlFor="check">비밀글</label>
                  <input
                    id="check"
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                  />
                </div>
              </div>
            </BasicModal>
          </div>
        </div>
      ) : (
        <div className="non-login-box">
          <span>{"Ablind 상품의 Q&A를 확인하고 싶다면?"}</span>
          <Link href="/SignIn">
            <a>
              <button>로그인하기</button>
            </a>
          </Link>
        </div>
      )}
      <style jsx>{`
        .qna-box {
          width: 1200px;
        }
        .non-login-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          padding: 100px 0px;
        }
        .non-login-box span {
          font-size: 24px;
          font-weight: 700;
        }
        .non-login-box button {
          background: none;
          border: 3px solid #76ba99;
          font-size: 20px;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 5px;
          cursor: pointer;
          color: #76ba99;
          transition: all 0.15s;
        }
        .non-login-box button:hover {
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
        .check-box {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .check-box input {
          width: 16px;
          height: 16px;
          accent-color: #76ba99;
        }
      `}</style>
    </div>
  );
}
