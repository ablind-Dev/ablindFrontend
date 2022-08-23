import Image from "next/image";

interface infoProps {
  profile: string; //프사
  name: string;
  type: string; //회원인지 예술가인지 관리자인지
}

export default function BasicProfile(props: infoProps) {
  const { profile, name, type } = props;
  return (
    <div className="box">
      <div className="img-box">
        <Image src={profile} layout="fill" objectFit="cover" />
      </div>
      <div className="info-box">
        <span className="title">{name}님 반갑습니다!</span>
        <span className="subtitle">
          {name}님은 <span className="br">{type}</span>입니다.
        </span>
      </div>
      <style jsx>{`
        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .subtitle {
          font-size: 18px;
        }
        .br {
          font-weight: 700;
          color: #76ba99;
        }
        .title {
          font-size: 28px;
          font-weight: 900;
        }
        .img-box {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
