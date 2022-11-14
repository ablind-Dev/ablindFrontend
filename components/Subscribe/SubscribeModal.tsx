import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface subscribeProps {
  selectedStage: number;
  setSelected: Dispatch<SetStateAction<number>>;
  artistName: string;
  selectedBank: string;
  setSelectedBank: Dispatch<SetStateAction<string>>;
  agree: boolean;
  setAgree: Dispatch<SetStateAction<boolean>>;
  reject: String;
}

export default function SubscribeModal(props: subscribeProps) {
  const {
    selectedStage,
    setSelected,
    artistName,
    selectedBank,
    setSelectedBank,
    agree,
    setAgree,
    reject,
  } = props;
  const [optionExplain, setOptionExplain] = useState("하이하이");
  const [price, setPrice] = useState("0");
  const bank = ["우리은행 1005-404-424384 양드림(에이블라인드)"];
  useEffect(() => {
    switch (selectedStage) {
      case 0:
        setOptionExplain(`${artistName} 작가님의 소식을 전해드려요.`);
        setPrice("0");
        break;
      case 1:
        setOptionExplain(
          `${artistName} 작가님의 소식과 함께 매달 굿즈를 보내드려요.`
        );
        setPrice("15,000");
        break;
      case 2:
        setOptionExplain(
          // `${artistName} 작가님의 소식, 굿즈와 함께 전시회 티켓을 만나볼 수 있어요.`
          "아직 준비중이에요."
        );
        setPrice("준비중");
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  }, [selectedStage]);

  const chooseBank = (value: string) => {
    setSelectedBank(value);
  };

  return (
    <div className="container">
      <div className="box">
        <span className="title">매월 정기결제</span>
      </div>
      <div className="box option-box">
        <span className="title">옵션선택</span>
        <div className="select-box">
          <div
            className={selectedStage === 0 ? "selected" : "no-selected"}
            onClick={() => setSelected(0)}
          >
            Listener
          </div>
          <div
            className={selectedStage === 1 ? "selected" : "no-selected"}
            onClick={() => setSelected(1)}
          >
            Supporter
          </div>
          <div
            className={selectedStage === 2 ? "selected" : "no-selected"}
            onClick={() => setSelected(2)}
          >
            VIP
          </div>
        </div>
        <span>{optionExplain}</span>
        <div className="last-payment">
          <span className="sub">최종 결제금액</span>
          <span className="price">{price} 원</span>
          <span className="vat">(VAT 포함)</span>
        </div>
      </div>
      <div className="box pay-box">
        <span className="title">결제 방법</span>
        <label htmlFor="bankbook">
          <input type="radio" name="bankbook" value="bankbook" checked={true} />
          무통장 입금
        </label>
        <div className="banks">
          <select
            onChange={(e) => chooseBank(e.target.value)}
            value={selectedBank}
          >
            <option value="">은행 선택</option>
            {bank.map((b, index) => (
              <option value={b} key={index}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="agree-box">
        <input
          type="checkbox"
          id="regular-agree"
          name="checked"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor="regular-agree">
          매월 정기 입금을 완료하지 않으면 구독이 중지되는 것에 동의합니다.
        </label>
      </div>
      <span className="reject">{reject}</span>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .box {
          display: flex;
          flex-direction: column;
          border-radius: 10px;
          background: #f1f1f1;
          box-shadow: 10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff;
          padding: 10px 20px 10px 20px;
        }
        .option-box {
          gap: 10px;
        }
        .title {
          font-weight: 600;
        }
        .select-box {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }
        .select-box div {
          padding: 5px 10px 5px 10px;
          border-radius: 5px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }
        .no-selected {
          background-color: white;
          color: black;
        }
        .selected {
          background: none;
          background-color: #76ba99;
          color: white;
        }
        .last-payment {
          display: flex;
          flex-direction: column;
          text-align: right;
          gap: 2px;
        }
        .sub {
          font-size: 0.9rem;
        }
        .price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4a8368;
        }
        .vat {
          font-size: 0.95rem;
          letter-spacing: -0.05;
        }
        .pay-box {
          gap: 10px;
        }
        .pay-box label {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 4px;
          accent-color: #76ba99;
        }

        .pay-box label input {
          width: 1rem;
          height: 1rem;
        }
        .pay-box select {
          width: 95%;
          height: 1.8rem;
          align-items: center;
          padding: 0px 5px 0px 5px;
          border-radius: 5px;
        }
        .banks {
          display: flex;
          justify-content: end;
        }
        .agree-box {
          padding-top: 10px;
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .agree-box input {
          width: 1rem;
          height: 1rem;
          accent-color: #76ba99;
        }
        .reject {
          color: #76ba99;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
