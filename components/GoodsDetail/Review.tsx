import axios from "axios";
import { useState, useEffect } from "react";
import ReviewBox from "./ReviewBox";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";
import Api from "../Auth/CustomApi";
import Link from "next/link";

interface pageProps {
  goodsId: number;
}

interface ReviewInfo {
  title: string;
  content: string;
  image: string;
  rate: number;
  reviewBoardId: number;
  createdAt: string;
  updatedAt: string;
  myReview: boolean;
  username: string;
}

interface AuthState {
  state: boolean;
}

export default function Review(props: pageProps) {
  const { goodsId } = props;
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const defaultState: AuthState = { ...recoilInfo };
  const [reviewArray, setReviewArray] = useState<Array<ReviewInfo>>();
  const [admin, setAdmin] = useState(false);

  const getReview = () => {
    Api.get(`http://www.ablind.co.kr/shop/${goodsId}/review`, {
      //5부분에 goodsId넣어줘야함.
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setReviewArray(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMyProfile = () => {
    Api.get("http://www.ablind.co.kr/mypage", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        res.data.role === "ADMIN" ? setAdmin(true) : setAdmin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (defaultState.state) {
      getReview();
      getMyProfile();
    }
  }, []);

  return (
    <div className="container">
      {defaultState.state ? (
        <>
          {reviewArray ? (
            reviewArray.map((review, index) => (
              <ReviewBox
                key={review.reviewBoardId}
                title={review.title}
                content={review.content}
                image={review.image}
                rate={review.rate}
                reviewBoardId={review.reviewBoardId}
                createdAt={review.createdAt}
                updatedAt={review.updatedAt}
                myReview={admin ? true : review.myReview}
                username={review.username}
                updateReview={getReview}
              />
            ))
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="non-login-box">
          <span>Ablind 상품의 리뷰를 확인하고 싶다면?</span>
          <Link href="/SignIn">
            <a>
              <button>로그인하기</button>
            </a>
          </Link>
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 70px;
          width: 70%;
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
      `}</style>
    </div>
  );
}
