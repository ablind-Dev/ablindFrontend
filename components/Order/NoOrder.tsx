import Router from "next/router";
import Image from "next/image";
import warning from "../../public/images/warning.svg";

export default function NoOrder() {
  const router = Router;

  const goToHome = () => {
    router.replace("/");
  };
  return (
    <div className="container">
      <div className="img-box">
        <div className="circle" />
        <Image src={warning} layout="responsive" objectFit="cover" />
      </div>
      <div className="info-box">
        <span className="title">접근할 수 없는 페이지입니다!</span>
        <span className="subtitle">
          특별한 예술가들를 Ablind에서 만나보세요.
        </span>
        <ul>
          <li>Ablind에서 시각장애인 예술가의 굿즈를 만나보세요.</li>
          <li>Ablind 예술가를 구독하고 다양한 혜택을 누려보세요.</li>
        </ul>
      </div>
      <button onClick={() => goToHome()}>홈 화면으로</button>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 50px 0px 100px 0px;
        }
        .img-box {
          width: 400px;
          height: 400px;
          position: relative;
        }
        .circle {
          width: 300px;
          height: 300px;
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
