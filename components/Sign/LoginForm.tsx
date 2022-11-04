import { useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";
import Cookies from "universal-cookie";
import PolicyModal from "../Resource/PolicyModal";

const cookies = new Cookies();

interface AuthState {
  state: boolean;
}

const LoginForm: NextPage<{ onChagne: () => void }> = (props) => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [autoLogin, setAutoLogin] = useState(true);
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const defaultState: AuthState = { ...recoilInfo };
  const [err, setErr] = useState("");
  const [modal, setModal] = useState(false);
  const router = Router;

  const onChangeHandler = (value: string, type: string) => {
    switch (type) {
      case "id":
        setId(value);
        break;
      case "pwd":
        setPwd(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  const onClickAutoLogin = (checked: boolean) => {
    setAutoLogin(checked);
  };

  const loginBtnHandler = async () => {
    await axios
      .post(
        "https://www.ablind.co.kr/members/login",
        {
          email: id,
          pass: pwd,
        },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("accessTokenExpiredTime", res.data.date);
        localStorage.setItem("email", id);
        cookies.set("refreshToken", res.data.refreshToken, {
          path: "/",
        });
        // localStorage.setItem("refresh", res.data.refreshToken);
        setErr("");
        changeLoginState();
      })
      .catch((res) => {
        console.log(res);
        setErr("로그인에 실패하였습니다.");
      });
  };

  const changeLoginState = () => {
    defaultState.state = true;
    setRecoilInfo(defaultState);
    router.push("/");
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="container">
      <div className="title-box">
        <div className="subtitle">
          불가능을 가능으로,
          <br />
          세상의 모든 특별한 예술가를 만나보세요.
        </div>
        <div className="title">바로 이곳 Ablind에서-</div>
      </div>
      <form onSubmit={(e) => loginBtnHandler()} className="login-form">
        <label htmlFor="id-input">Email</label>
        <input
          type="text"
          id="id-input"
          name="id"
          placeholder="이메일을 입력하세요"
          className="text-input"
          onChange={(e) => onChangeHandler(e.target.value, e.target.name)}
        />
        <label htmlFor="pwd-input">Password</label>
        <input
          type="password"
          id="pwd-input"
          name="pwd"
          placeholder="비밀번호를 입력하세요"
          className="text-input"
          onChange={(e) => onChangeHandler(e.target.value, e.target.name)}
        />
      </form>
      <form className="auto-login-box">
        <label htmlFor="auto-login">자동로그인</label>
        <input
          type="checkbox"
          id="auto-login"
          name="checked"
          checked={autoLogin}
          onChange={(e) => onClickAutoLogin(e.target.checked)}
        />
      </form>
      {err === "" ? <></> : <span className="err">{err}</span>}
      <div className="btns">
        <button onClick={() => loginBtnHandler()}>Login</button>
        <button onClick={props.onChagne}>Sign Up</button>
      </div>
      <div className="link-box">
        <div>
          <span onClick={() => setModal(true)}>개인정보 처리방침</span> |{" "}
          <span onClick={() => setModal(true)}>이용약관</span>
        </div>
        <a>아이디 찾기</a>
        <a>비밀번호 찾기</a>
      </div>
      <PolicyModal open={modal} close={closeModal} />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .subtitle {
          font-size: 28px;
          font-weight: 300;
          letter-spacing: -0.02;
        }
        .title {
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -0.02;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        label {
          font-size: 18px;
          color: #646464;
          letter-spacing: -0.02;
        }

        .text-input {
          border: none;
          background-color: #afafaf;
          border-radius: 5px;
          height: 40px;
          font-size: 18px;
          padding: 0px 10px 0px 10px;
          color: white;
          font-weight: 200;
        }

        .auto-login-box {
          font-size: 16px;
          display: flex;
          flex-direction: row;
          gap: 5px;
        }

        .auto-login-box input {
          width: 16px;
          height: 16px;
          accent-color: #76ba99;
        }

        .btns {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        button {
          border: none;
          height: 50px;
          width: 210px;
          background-color: #76ba99;
          color: white;
          font-weight: bold;
          font-size: 18px;
          border-radius: 5px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }

        .link-box {
          padding-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: #646464;
          text-decoration: underline;
        }
        .link-box span {
          cursor: pointer;
        }
        .link-box span:visited {
          color: #646464;
        }
        .err {
          font-size: 18px;
          color: #d75281;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
