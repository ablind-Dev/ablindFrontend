import { NextPage } from "next";

const ButtonsForm: NextPage<{ backLogin: () => void; goSignup: () => void }> = (
  props
) => {
  const onClickHandler = (type: string) => {
    switch (type) {
      case "email":
        props.goSignup();
        break;
      case "kakao":
        alert("준비중입니다.");
        break;
      case "naver":
        alert("준비중입니다.");
        break;
      case "back":
        props.backLogin();
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };
  return (
    <div className="container">
      <button
        name="email"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;
          onClickHandler(target.name);
        }}
        className="email"
      >
        이메일 간단 회원가입
      </button>
      <button
        name="kakao"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;
          onClickHandler(target.name);
        }}
        className="kakao"
      >
        카카오로 로그인
      </button>
      <button
        name="naver"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;
          onClickHandler(target.name);
        }}
        className="naver"
      >
        네이버로 로그인
      </button>
      <button
        name="back"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;
          onClickHandler(target.name);
        }}
        className="back"
      >
        로그인 화면으로 돌아가기
      </button>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 445.35px;
          gap: 30px;
        }
        button {
          border: none;
          border-radius: 25px;
          height: 70px;
          font-size: 18px;
          font-weight: 900;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
          transition: 0.25s;
        }

        button:hover {
          transform: scale(1.05);
        }

        .email {
          background-color: #76ba99;
          color: white;
        }
        .kakao {
          background-color: #fee500;
        }
        .naver {
          background-color: #2db400;
          color: white;
        }
        .back {
          background-color: #646464;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ButtonsForm;
