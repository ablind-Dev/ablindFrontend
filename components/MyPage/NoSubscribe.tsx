import Router from "next/router";
import Image from "next/image";
import heart from "../../public/images/heart_person.svg";

export default function NoSubscribe() {
  const router = Router;

  const goToSubscribe = () => {
    router.push("/Artist");
  };
  return (
    <div className="container">
      <div className="img-box">
        <div className="circle" />
        <Image src={heart} layout="fill" objectFit="cover" />
      </div>
      <div className="info-box">
        <span className="title">아직 구독한 예술가가 없어요!</span>
        <span className="subtitle">
          지금 구독하고, 다양한 혜택을 즐겨보세요.
        </span>
        <ul>
          <li>작가님의 다양한 소식을 빠르게 받아볼 수 있어요.</li>
          <li>작가님의 메타버스 전시회에 언제나, 무료로 입장할 수 있어요.</li>
          <li>매달 Ablind의 굿즈를 받아볼 수 있어요.</li>
          <li>
            작가님의 전시회가 개최되면, 전시회 티켓을 무료로 받아볼 수 있어요.
          </li>
        </ul>
      </div>
      <button onClick={() => goToSubscribe()}>구독하러 가기</button>
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
