import { useState, useEffect } from "react";
import stageOneImg from "../../public/images/friend.png";
import stageTwoImg from "../../public/images/gift.png";
import stageThreeImg from "../../public/images/love.png";
import Image from "next/image";
import { MoneyWonReg } from "../Resource/MoneyWonReg";

interface stageProps {
  stage: number; //0,1,2
  selectStage: (stage: number) => void;
  selected: number;
}

export default function PaymentBox(props: stageProps) {
  const { stage, selectStage, selected } = props;
  const [img, setImg] = useState(stageOneImg);
  const [price, setPrice] = useState("Listener");
  const [value, setValue] = useState(0);
  const [explanation, setExplanation] = useState([
    "작가님의 최신 소식을 카카오톡으로 알려드립니다.",
  ]);
  const one = ["작가님의 최신 소식을 카카오톡으로 알려드립니다."];
  const two = [
    ...one,
    "매달 집에서 Ablind의 다양한 굿즈를 만나볼 수 있습니다.",
    "작가님의 작품을 누구보다 먼저 만나볼 수 있습니다.",
    "작가님의 전시회 정보를 빠르게 받아볼 수 있습니다.",
  ];
  const three = [...two, "작가님의 전시회 티켓을 받아볼 수 있습니다."];
  useEffect(() => {
    switch (stage) {
      case 0:
        setPrice("Listener");
        setValue(0);
        setExplanation(one);
        break;
      case 1:
        setImg(stageTwoImg);
        setPrice("Supporter");
        setValue(15000);
        setExplanation(two);
        break;
      case 2:
        setImg(stageThreeImg);
        setPrice("VIP");
        setValue(20000);
        setExplanation(three);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  }, []);

  return (
    <div
      className={selected === stage ? "selected-container" : "container"}
      onClick={() => selectStage(stage)}
    >
      <div className="circle">
        <Image src={img} width="200" height="180" />
      </div>
      <div className="price-box">
        <span className="price">{price}</span>
        <span className="sub">월 {MoneyWonReg(value)}원</span>
        {price === "Listener" ? <></> : <span className="vat">(VAT 포함)</span>}
      </div>
      <div className="line" />
      <ul className="explain-box">
        {explanation.map((explain, index) => (
          <li key={index}>{explain}</li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 50px 20px 50px 20px;
          border: 1px solid black;
          border-radius: 10px;
          align-items: center;
          width: 300px;
          gap: 20px;
          cursor: pointer;
          transition: all 0.15s linear;
        }
        .selected-container {
          display: flex;
          flex-direction: column;
          padding: 50px 20px 50px 20px;
          border: 2px solid #76ba99;
          background-color: #76ba9960;
          border-radius: 10px;
          align-items: center;
          width: 300px;
          gap: 20px;
          cursor: pointer;
          transition: all 0.15s linear;
        }
        .circle {
          width: 200px;
          height: 200px;
          background-color: #d9d9d9;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .line {
          width: 80%;
          height: 1px;
          background-color: black;
        }
        .price-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .price {
          font-size: 22px;
          font-weight: 700;
        }
        .sub {
          font-size: 18px;
          letter-spacing: -0.05;
          padding-top: 5px;
        }
        .vat {
          font-size: 14px;
        }
        ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 80%;
          padding-left: 20px;
        }
        li {
          list-style-image: url("/images/check-box.png");
          align-items: center;
        }
        .container:hover {
          background-color: #76ba9940;
        }
      `}</style>
    </div>
  );
}
