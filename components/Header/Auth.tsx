import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import basicProfile from "../../public/images/basic_profile.png";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";
import { recoilThemeState } from "../../states/recoilThemeState";
import Api from "../Auth/CustomApi";
import Cookies from "universal-cookie";

interface ThemeState {
  theme: string;
}

interface basicInfo {
  image: string; //프사
  email: string;
  phoneNumber: string;
  name: string;
  role: string; //회원인지 예술가인지 관리자인지
  address: string; //&로 분류
  account: string; //은행
  account_name: string; //계좌번호
}

interface AuthState {
  state: boolean;
}

export default function Auth() {
  //Artist 탭 색 테마
  const [recoilTheme, setRecoilTheme] = useRecoilState(recoilThemeState);
  const defaultTheme: ThemeState = { ...recoilTheme };
  const color = defaultTheme.theme === "white" ? "#646464" : "white";

  const router = useRouter();
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const defaultState: AuthState = { ...recoilInfo };
  const [modalState, setModalState] = useState(false);
  const [info, setInfo] = useState<basicInfo>();

  const cookies = new Cookies();

  useEffect(() => {
    const curDate = new Date();
    const authDate = new Date(
      `${localStorage.getItem("accessTokenExpiredTime")}`
    );
    if (localStorage.getItem("email") && localStorage.getItem("accessToken")) {
      if (curDate < authDate) {
        //토큰 만료시간보다 전이라면
        defaultLogined();
      } else {
        //토큰 만료시간이 지났다면
        // logoutServer();
        defaultLogined();
      }
    }
  }, []);

  const defaultLogined = () => {
    defaultState.state = true;
    setRecoilInfo(defaultState);
  };

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
          "https://www.ablind.co.kr/members/logout",
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
    setModalState(false);
    router.replace("/");
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      Api.get("https://www.ablind.co.kr/mypage", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          setInfo(res.data);
        })
        .catch((error) => {
          logoutServer();
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (defaultState.state) {
      getUserProfile();
    }
  }, [defaultState]);

  return (
    <div>
      {defaultState.state ? (
        <nav className="yes-auth">
          <span className="non-active">
            반가워요, <b>{info ? info.name : ""}</b>님!
          </span>
          <div
            className="auth-btn"
            onClick={() => setModalState((prev) => !prev)}
          >
            <Image
              src={
                info ? (info.image ? info.image : basicProfile) : basicProfile
              }
              alt={"기본프로필"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          {modalState ? (
            <div className="click-modal">
              <ul>
                <li>
                  <Link href="/MyPage">
                    <a onClick={() => setModalState((prev) => !prev)}>
                      마이페이지
                    </a>
                  </Link>
                </li>
                <li
                  onClick={() => {
                    logout();
                    setModalState((prev) => !prev);
                  }}
                >
                  로그아웃
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </nav>
      ) : (
        <nav className="no-auth">
          <Link href="/SignIn">
            <a
              className={
                router.pathname === "/SignIn" ? "active" : "non-active"
              }
            >
              Sign In
            </a>
          </Link>
        </nav>
      )}
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: row;
          justify-content: end;
        }
        .no-auth {
          padding: 20px 50px 0px 0px;
        }
        .yes-auth {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 15px;
          padding: 20px 50px 0px 0px;
          font-size: 18px;
          position: relative;
        }
        nav a {
          text-decoration: none;
          font-size: 18px;
        }
        .non-active {
          color: ${color};
          ${defaultTheme.theme ? `font-weight:400;` : `font-weight:100;`}
        }
        .active {
          font-weight: bold;
          color: #76ba99;
        }
        .auth-btn {
          width: 35px;
          height: 35px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }
        .click-modal {
          position: absolute;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          width: 150px;
          top: 120%;
        }
        .click-modal ul {
          list-style-type: none;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .click-modal li {
          transition: all 0.25s;
        }
        .click-modal li:hover {
          cursor: pointer;
          color: #76ba99;
          font-weight: bold;
        }
        .click-modal li a {
          text-decoration: none;
          color: black;
        }
        .click-modal li a:hover {
          color: #76ba99;
        }
      `}</style>
    </div>
  );
}
