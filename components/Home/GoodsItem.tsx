import Router from "next/router";
import Image from "next/image";

interface gridGoods {
  image: string;
  itemId: number;
  name: string;
  author: string;
}

export default function GoodsItem(props: gridGoods) {
  const { image, itemId, name, author } = props;
  const router = Router;
  return (
    <div className="box" onClick={() => router.push(`/Shop/${itemId}`)}>
      <div className="img-box">
        <Image src={image} layout="fill" objectFit="cover" />
      </div>
      <div className="glass">
        <div className="info-box">
          <span className="title">{name}</span>
          <span className="artist">
            <span className="artist-name">{author}</span> 작가
          </span>
        </div>
      </div>
      <style jsx>{`
        .box {
          width: 100%;
          height: 100%;
          position: relative;
          cursor: pointer;
        }
        .img-box {
          width: 100%;
          height: 100%;
        }
        .glass {
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: all 0.25s;
          position: absolute;
          top: 0px;
          left: 0px;
        }
        .glass:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.45);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: absolute;
          bottom: 10%;
          left: 10%;
        }
        .title {
          overflow: hidden;
          white-space: pre-line;
          font-size: 22px;
          font-weight: 700;
        }
        .artist {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 3px;
        }
        .artist-name {
          background-color: #76ba99;
          color: white;
          padding: 2px 4px;
          font-weight: 500;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
