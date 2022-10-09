import Router from "next/router";
import Image from "next/image";
import cart from "../../../public/images/cart.svg";

export default function NoItem() {
  const router = Router;

  const goToShop = () => {
    router.push("/Shop");
  };
  return (
    <div className="container">
      <div className="img-box">
        <div className="circle" />
        <Image src={cart} layout="fill" objectFit="cover" />
      </div>
      <div className="info-box">
        <span className="title">주문내역이 하나도 없어요!</span>
        <span className="subtitle">
          특별한 예술가들의 굿즈, 오로지 Ablind에서만 만나볼 수 있습니다.
        </span>
        <ul>
          <li>Ablind에서 시각장애인 예술가의 굿즈를 만나보세요.</li>
          <li>다양한 상품을 합리적인 가격으로 구매할 수 있습니다.</li>
          <li>수익금은 예술가가 더 많은 작품을 만들 수 있도록 고취합니다.</li>
        </ul>
      </div>
      <button onClick={() => goToShop()}>쇼핑하러 가기</button>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .img-box {
          width: 600px;
          height: 500px;
          position: relative;
        }
        .circle {
          width: 400px;
          height: 400px;
          border-radius: 100%;
          background-color: #9e9e9e;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .title {
          font-size: 32px;
          font-weight: 900;
        }
        .subtitle {
          font-size: 22px;
          font-weight: 700;
        }
        ul {
          list-style: none;
          padding-left: 0px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }
        button {
          font-size: 16px;
          border: none;
          background-color: #76ba99;
          font-weight: 700;
          color: white;
          padding: 10px 13px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
