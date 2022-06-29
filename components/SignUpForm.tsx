import { NextPage } from "next";

const SignUpForm: NextPage<{ backLogin: () => void; goNext: () => void }> = (
  props
) => {
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
        <input id="name" type="text" placeholder="이름을 입력하세요." />
        <div className="id-box">
          <div className="id-input-box">
            <label htmlFor="id">ID</label>
            <input id="id" type="text" placeholder="ID를 입력하세요." />
          </div>
          <button className="overlap-btn">중복검사</button>
        </div>
        <label htmlFor="pwd">비밀번호</label>
        <input
          id="pwd"
          type="password"
          placeholder="영어, 숫자, 특수문자 포함 8글자 이상"
        />
        <label htmlFor="pwd-c">비밀번호 확인</label>
        <input
          id="pwd-c"
          type="password"
          placeholder="영어, 숫자, 특수문자 포함 8글자 이상"
        />
      </form>
      <div className="btns-box">
        <button
          onClick={() => {
            props.backLogin();
          }}
          className="back"
        >
          돌아가기
        </button>
        <button className="next" onClick={props.goNext}>
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
      `}</style>
    </div>
  );
};

export default SignUpForm;
