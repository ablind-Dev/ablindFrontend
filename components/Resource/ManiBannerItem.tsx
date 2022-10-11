import Image from "next/image";

interface bannerItem {
  content: string;
  deleteImage: string;
  image: string;
  link: string;
}

export default function MainBannerItem(props: bannerItem) {
  const { content, deleteImage, image, link } = props;
  console.log(content);
  return (
    <div className="container">
      <Image src={image} layout="fill" objectFit="cover" />
      <div className="gradient" />
      <div className="info-box">
        <span className="title">{content}</span>
        <a
          href={link}
          target="_blank"
          className="link-btn"
          rel="noopener noreferrer"
        >
          보러가기
        </a>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100vw;
          height: 30vw;
        }
        .gradient {
          width: 70vw;
          height: 100%;
          position: absolute;
          top: 0px;
          right: 0px;
          background: linear-gradient(to right, #00ff0000, #000000);
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          position: absolute;
          right: 50px;
          top: 50%;
          gap: 20px;
          transform: translateY(-50%);
        }
        .title {
          color: white;
          white-space: pre-line;
          font-size: 2rem;
          text-align: end;
          font-weight: 700;
        }
        .link-btn {
          border: 2px solid white;
          background: none;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          padding: 8px 15px;
          border-radius: 10px;
          transition: all 0.25s;
          text-decoration: none;
          cursor: pointer;
        }
        .link-btn:hover {
          background-color: white;
          color: black;
        }
      `}</style>
    </div>
  );
}
