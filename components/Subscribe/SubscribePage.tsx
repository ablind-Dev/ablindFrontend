import HorizonScrollCarousel from "../Resource/HorizonScrollCarousel";
import SubscribeCircleComponent from "./SubscribeCircleComponent";
import SubscribePaymentComponent from "./SubscribePaymentComponent";
import Router from "next/router";

interface artistProps {
  name: string;
  artworks: Array<string>;
}

export default function SubscribePage(props: artistProps) {
  const { name, artworks } = props;
  const router = Router;
  const backPressed = () => {
    router.back();
  };
  return (
    <div className="container">
      <span className="title">
        <span className="bold">{name} 작가</span> 구독하고,
        <br />
        다양한 혜택 받아보세요!
      </span>
      <HorizonScrollCarousel imgs={artworks} />
      <SubscribeCircleComponent />
      <span className="title">
        구독료는 ablind 예술가의 지속적인 수입이 되고,
        <br />더 훌륭한 작품을 만드는 기반이 됩니다.
      </span>
      <SubscribePaymentComponent />
      <div className="btn-box">
        <button onClick={() => backPressed()}>뒤로가기</button>
        <button>구독하기</button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 120px 0px 100px 0px;
          gap: 150px;
        }
        .title {
          text-align: center;
          font-size: 1.2rem;
        }
        .bold {
          font-size: 2rem;
          font-weight: 700;
        }
        .btn-box {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          gap: 20px;
          padding-bottom: 80px;
        }
        .btn-box button {
          background-color: #00ff0000;
          padding: 10px 15px 10px 15px;
          font-size: 18px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: 2px solid black;
          color: black;
          transition: all 0.15s;
        }
        .btn-box button:hover {
          border: 2px solid #76ba99;
          background-color: #76ba99;
          color: white;
        }
      `}</style>
    </div>
  );
}
