import { NextPage } from "next";

const AddInfo: NextPage<{ backLogin: () => void }> = (props) => {
  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요."
          className="input-text"
        />
        <label htmlFor="number">전화번호</label>
        <input
          id="number"
          type="number"
          placeholder="'-'은 제외하고 입력해주세요. ex) 01000000000"
          className="input-text"
        />
      </form>
      <div className="label">환불계좌</div>
      <div className="account-box">
        환불 계좌를 등록해주세요.
        <div className="hover-account">
          <button>계좌 등록하기</button>
        </div>
      </div>
      <div className="label">주소</div>
      <div className="address-box">
        굿즈를 받아볼 주소를 등록해주세요.
        <div className="hover-address">
          <button className="hover-btn">주소 등록하기</button>
        </div>
      </div>

      <form className="agree-box" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input type="checkbox" id="privacy" className="checkbox" />
          <label htmlFor="privacy">
            <a href="#" target="_blank">
              개인정보 처리방침
            </a>
            을 확인하였으며, 이에 동의합니다.
          </label>
        </div>
        <div>
          <input type="checkbox" id="rule" className="checkbox" />
          <label htmlFor="rule">
            <a href="#" target="_blank">
              이용약관
            </a>
            을 확인하였으며, 이에 동의합니다.
          </label>
        </div>
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
        <button className="complete">가입완료</button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 445.35px;
          gap: 5px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        label {
          font-size: 18px;
          color: #646464;
          letter-spacing: -0.02;
        }
        .label {
          font-size: 18px;
          color: #646464;
          letter-spacing: -0.02;
        }
        .input-text {
          border: none;
          background-color: #afafaf;
          border-radius: 5px;
          height: 40px;
          font-size: 16px;
          padding: 0px 10px 0px 10px;
          color: white;
          font-weight: 200;
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
        .complete {
          background-color: #76ba99;
        }

        .account-box,
        .address-box {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 40px;
          background-color: #76ba99;
          border-radius: 5px;
          color: white;
          font-weight: 300;
          cursor: default;
        }

        .hover-account,
        .hover-address {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          border-radius: 5px;
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          transition: opacity 0.25s linear;
        }

        .hover-account button,
        .hover-address button {
          padding: 2px 20px 2px 20px;
          border-radius: 0.5rem;
          border: 2px solid black;
          background-color: #00ff0000;
          color: black;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
          cursor: pointer;
        }

        .account-box:hover .hover-account,
        .address-box:hover .hover-address {
          opacity: 1;
        }

        .hover-account button:hover,
        .hover-address button:hover {
          background-color: black;
          color: white;
          border: 2px solid black;
        }

        .agree-box {
          padding-top: 20px;
        }
        .checkbox {
          width: 18px;
          height: 18px;
          accent-color: #76ba99;
        }
        .agree-box div {
          display: flex;
          align-items: center;
        }
        a {
          font-weight: bold;
        }
        a:visited {
          color: black;
        }
      `}</style>
    </div>
  );
};

export default AddInfo;
