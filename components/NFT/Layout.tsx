import developer from "../../public/images/developer.svg";
import Image from "next/image";
import Router from "next/router";

export default function Layout() {
  const router = Router;
  return (
    <div className="container">
      <div className="img-box">
        <Image src={developer} layout="fill" objectFit="cover" />
      </div>
      <div className="title-box">
        <span className="title">Ablind의 NFT는 아직 준비중이에요!</span>
        <span className="subtitle">{`곧 공개 될 예정이니, 많은 기대 부탁드려요 :)`}</span>
      </div>
      <button onClick={() => router.push("/")}>홈 화면으로</button>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 50px;
          padding: 80px 0px;
        }
        .img-box {
          width: 30vw;
          height: 30vw;
          position: relative;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          font-weight: 800;
          font-size: 32px;
        }
        .subtitle {
          font-weight: 600;
          font-size: 26px;
        }
        button {
          border: none;
          background-color: #76ba99;
          border-radius: 10px;
          padding: 10px 15px;
          color: white;
          font-weight: 700;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
