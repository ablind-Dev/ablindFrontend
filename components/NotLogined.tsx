import artist from "../public/images/artist.png";
import Image from "next/image";
import Link from "next/link";

export default function NotLogined() {
  return (
    <div className="container">
      <div>아직 로그인하지 않으셨네요,</div>
      <div>
        <span>Ablind</span> 에서 다양한 작품과 굿즈를 만나보세요!
      </div>
      <Link href="/SignIn">
        <button>로그인</button>
      </Link>
      <style jsx>{`
        .container {
          display: flex;
          height: 400px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          padding-bottom: 100px;
        }
        .container span {
          font-weight: bold;
          color: #76ba99;
          font-size: 24px;
        }
        .container button {
          margin-top: 40px;
          border: 3px solid #76ba99;
          background-color: white;
          color: #76ba99;
          font-size: 16px;
          font-weight: 600;
          padding: 10px 40px 10px 40px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .container button:hover {
          background-color: #76ba99;
          color: white;
        }
      `}</style>
    </div>
  );
}
