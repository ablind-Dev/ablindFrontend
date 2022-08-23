import BasicProfile from "../../components/MyPage/BasicProfile";
// import SubscribeInfo from "../../components/MyPage/SubscribeInfo";
import InquireOrder from "../../components/MyPage/InquireOrder";
import ShopBasket from "./ShopBasket";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Router from "next/router";

const SubscribeInfo = dynamic(
  () => import("../../components/MyPage/SubscribeInfo"),
  {
    ssr: false,
  }
);

interface AuthState {
  state: boolean;
}

interface infoProps {
  profile: string; //프사
  name: string;
  type: string; //회원인지 예술가인지 관리자인지
  address: string; //&로 분류
  bank: string; //은행
  bank_address: string; //계좌번호
}

export default function MyPageLayout(props: infoProps) {
  const { profile, name, type, address, bank, bank_address } = props;
  const [menu, setMenu] = useState(0);
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const defaultState: AuthState = { ...recoilInfo };
  const cookies = new Cookies();
  const router = Router;

  const logout = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      logoutServer();
    }
  };

  const logoutServer = () => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      axios
        .post(
          "http://www.ablind.co.kr/members/logout",
          {},
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              "ACCESS-TOKEN": token,
            },
          }
        )
        .then((res) => {
          removeState();
          router.push("/");
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const removeState = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiredTime");
    localStorage.removeItem("email");
    cookies.remove("refreshToken");
    defaultState.state = false;
    setRecoilInfo(defaultState);
  };

  return (
    <div className="container">
      <div className="box">
        <div className="left-box">
          <BasicProfile profile={profile} name={name} type={type} />
          <div className="auth-btns">
            <button className="non-selected">회원정보 수정</button>
            <button className="non-selected" onClick={() => logout()}>
              로그아웃
            </button>
          </div>
          <div className="menu-btns">
            <button
              onClick={() => setMenu(0)}
              className={menu === 0 ? "selected" : "non-selected"}
            >
              구독정보
            </button>
            <button
              onClick={() => setMenu(1)}
              className={menu === 1 ? "selected" : "non-selected"}
            >
              주문조회
            </button>
            <button
              onClick={() => setMenu(2)}
              className={menu === 2 ? "selected" : "non-selected"}
            >
              장바구니
            </button>
          </div>
          <div className="terms">
            <a target="_blank">개인정보 처리방침</a>
            <a target="_blank">이용약관</a>
          </div>
        </div>
        <div className="right-box">
          {menu === 0 ? (
            <SubscribeInfo />
          ) : menu === 1 ? (
            <InquireOrder />
          ) : menu === 2 ? (
            <ShopBasket />
          ) : (
            <></>
          )}
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          height: fit-content;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .box {
          width: 93%;
          display: grid;
          grid-template-columns: 1fr 3fr;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          margin-top: -120px;
          padding: 80px 0px;
        }
        .left-box {
          grid-column: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 400px;
        }
        .auth-btns {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .menu-btns {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
        }
        .terms {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .terms a {
          text-decoration: none;
          color: #646464;
          transition: all 0.15s;
          cursor: pointer;
        }
        .terms a:hover {
          color: #76ba99;
        }
        .left-box button {
          width: 70%;
          padding: 8px 0px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.15s;
        }
        .left-box button:hover {
          background-color: #76ba99cb;
          border: 1px solid #76ba99cb;
          color: white;
        }
        .non-selected {
          background: none;
          border: 1px solid #1c1c1c;
          color: #1c1c1c;
        }
        .selected {
          background-color: #76ba99;
          border: 1px solid #76ba99;
          color: white;
        }
        .rgith-box {
          grid-column: 2;
        }
      `}</style>
    </div>
  );
}
