import Link from "next/link";

interface upperProps {
  artistId: number;
  title: string;
  subtitle: string;
  content: string;
  profile: string; //이미지 url
  background: string; //이미지 url
  moveToComment: () => void;
}

export default function ArtistDetailUpperComponent(props: upperProps) {
  const {
    artistId,
    title,
    subtitle,
    content,
    profile,
    background,
    moveToComment,
  } = props;
  return (
    <div className="container">
      <div className="glass" />
      <div className="info-box">
        <div className="profile" />
        <div className="content-box">
          <span className="title">{title}</span>
          <span className="subtitle">{subtitle}</span>
          <span className="content">{content}</span>
          <div className="btn-box">
            <Link href={`/Subscribe/${artistId}`}>
              <a>
                <button>구독하고 굿즈받기</button>
              </a>
            </Link>
            <button onClick={() => moveToComment()}>응원글 남기기</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          background-image: url(${background});
          background-size: cover;
          width: 100%;
          height: 500px;
          padding: 40px 0px 40px 0px;
          background-position: center;
          position: relative;
        }
        .glass {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: absolute;
          top: 0%;
          left: 0%;
        }
        .info-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 70px;
        }
        .profile {
          width: 320px;
          height: 450px;
          background-image: url(${profile});
          background-size: cover;
          background-position: center;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          z-index: 1;
        }
        .content-box {
          max-width: 50%;
          z-index: 2;
          display: flex;
          flex-direction: column;
          white-space: pre-line;
          color: white;
          text-shadow: 1px 1px 1px rgba(32, 32, 32, 0.536);
        }
        .content {
          margin-top: 20px;
        }
        .title {
          font-size: 42px;
          font-weight: bold;
          letter-spacing: -0.1;
        }
        .subtitle {
          font-size: 32px;
          letter-spacing: -0.1;
        }
        .content {
          font-size: 20px;
          line-height: 26px;
        }
        .btn-box {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          gap: 20px;
        }
        .btn-box button {
          background-color: #00ff0000;
          padding: 10px 15px 10px 15px;
          font-size: 18px;
          border-radius: 10px;
          font-weight: 400;
          cursor: pointer;
          border: 2px solid white;
          color: white;
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
