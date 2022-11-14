import { NextPage } from "next";
import { useCallback, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilSignUpState } from "../../states/recoilSignUpState";
import axios from "axios";

interface SignUpState {
  name: string;
  id: string;
  pwd: string;
}

const SignUpForm: NextPage<{ backLogin: () => void; goNext: () => void }> = (
  props
) => {
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilSignUpState);
  const defaultState: SignUpState = { ...recoilInfo };

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [regular, setRegular] = useState(false);
  const [errorMsg, setError] = useState("");

  const inputHandler = (value: string, type: string) => {
    switch (type) {
      case "name":
        setName(value);
        break;
      case "id":
        setId(value);
        break;
      case "pwd":
        setPwd(value);
        regularExpression(value);
        break;
      case "pwdCheck":
        setPwdCheck(value);
        break;
    }
  };

  const isEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(email);
  };

  const checkIdClick = () => {
    //통신해서 id 중복검사
    if (isEmail(id)) {
      axios
        .post(
          "https://www.ablind.co.kr/members/login/id",
          {
            email: id,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          alert("중복되는 아이디가 존재합니다.");
        })
        .catch((res) => {
          if (res.response.data === "No") {
            alert("중복되는 아이디가 존재합니다");
          } else {
            if (confirm("사용가능한 Email 입니다. 사용하시겠습니까?")) {
              setIdCheck(true);
            }
          }
        });
    } else {
      alert("올바른 이메일 형식으로 입력해주세요.");
    }
  };

  const cancleID = () => {
    if (confirm("아이디를 수정하시겠습니까?")) {
      setIdCheck(false);
    }
  };

  const regularExpression = (value: string) => {
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/; //숫자, 영문자 포함 8자 이상
    if (!reg.test(value)) {
      setRegular(false);
      setError("영문자, 숫자 포함 8자리 이상으로 입력해주세요.");
    } else {
      setRegular(true);
      setError("안전한 비밀번호입니다 :)");
    }
  };

  const nextBtnClick = () => {
    if (name !== "" && id !== "" && pwd !== "" && pwdCheck !== "") {
      if (!idCheck) setError("아이디 중복검사를 진행해주세요.");
      else if (!regular)
        setError("비밀번호는 영문자, 숫자 포함 8자리 이상으로 입력해주세요.");
      else if (pwd !== pwdCheck) setError("비밀번호를 다시 확인해주세요.");
      else {
        saveState();
      }
    } else {
      setError("모든 정보를 입력해주세요.");
    }
  };

  const saveState = () => {
    defaultState.name = name;
    defaultState.id = id;
    defaultState.pwd = pwd;
    setRecoilInfo(defaultState);
    props.goNext();
  };

  return (
    <div className="container">
      <div className="title-box">
        <div className="subtitle">
          간단하게 회원가입하고, 다양한 예술 혜택을.
        </div>
        <div className="title">특별한 Ablind에서-</div>
      </div>
      <form className="input-box" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="이름을 입력하세요."
          value={name}
          onChange={(e) => inputHandler(e.target.value, e.target.name)}
        />
        <div className="id-box">
          <div className="id-input-box">
            <label htmlFor="id">Email</label>
            <input
              id="id"
              type="text"
              name="id"
              placeholder="Email를 입력하세요."
              value={id}
              onChange={(e) => inputHandler(e.target.value, e.target.name)}
              disabled={idCheck}
            />
          </div>
          {idCheck ? (
            <button className="cancle-id-btn" onClick={() => cancleID()}>
              사용취소
            </button>
          ) : (
            <button className="overlap-btn" onClick={() => checkIdClick()}>
              중복검사
            </button>
          )}
        </div>
        <label htmlFor="pwd">비밀번호</label>
        <input
          id="pwd"
          type="password"
          name="pwd"
          placeholder="영문자, 숫자 포함 8글자 이상"
          value={pwd}
          onChange={(e) => inputHandler(e.target.value, e.target.name)}
        />
        <label htmlFor="pwd-c">비밀번호 확인</label>
        <input
          id="pwd-c"
          type="password"
          name="pwdCheck"
          placeholder="영문자, 숫자 포함 8글자 이상"
          value={pwdCheck}
          onChange={(e) => inputHandler(e.target.value, e.target.name)}
        />
      </form>
      <div className="error">{errorMsg}</div>
      <div className="btns-box">
        <button
          onClick={() => {
            props.backLogin();
          }}
          className="back"
        >
          돌아가기
        </button>
        <button className="next" onClick={() => nextBtnClick()}>
          추가정보 입력
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 445.35px;
          gap: 5px;
        }
        .title-box {
          padding-bottom: 20px;
        }

        .subtitle {
          font-size: 22px;
        }
        .title {
          font-size: 28px;
          color: black;
          font-weight: 900;
        }
        .input-box {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .id-box {
          display: flex;
          flex-direction: row;
          align-items: end;
          gap: 5px;
        }
        .id-input-box {
          width: 370px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        label {
          font-size: 18px;
          color: #646464;
          letter-spacing: -0.02;
        }
        input {
          border: none;
          background-color: #afafaf;
          border-radius: 5px;
          height: 40px;
          font-size: 16px;
          padding: 0px 10px 0px 10px;
          color: white;
          font-weight: 200;
        }
        button {
          cursor: pointer;
        }
        .overlap-btn {
          background-color: #76ba99;
          width: 80px;
          height: 40px;
          border: none;
          border-radius: 5px;
          padding: 0px 12px 0px 12px;
          color: white;
          font-weight: bold;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .cancle-id-btn {
          background-color: #ff8c8c;
          height: 40px;
          width: 80px;
          border: none;
          border-radius: 5px;
          padding: 0px 12px 0px 12px;
          color: white;
          font-weight: bold;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .btns-box {
          padding-top: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .btns-box button {
          border: none;
          height: 50px;
          width: 210px;
          color: white;
          font-weight: bold;
          font-size: 18px;
          border-radius: 5px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }
        .back {
          background-color: #646464;
        }
        .next {
          background-color: #76ba99;
        }
        .error {
          padding: 5px 0px 0px 0px;
          color: #646464;
        }
      `}</style>
    </div>
  );
};

export default SignUpForm;
