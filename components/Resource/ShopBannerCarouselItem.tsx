import Link from "next/link";

interface Banner {
  img: string;
  content: string;
  url: string;
}

export default function ShopBannerCarouselItem(props: Banner) {
  const { img, content, url } = props;
  return (
    <div className="container">
      <div className="info-box">
        <span className="title">{content}</span>
        <button>
          <Link href={url}>
            <a target="_blank">자세히보기</a>
          </Link>
        </button>
      </div>
      <div className="img-box" />
      <style jsx>{`
        .container {
          width: 100%;
          align-items: end;
          justify-content: center;
        }
        .img-box {
          width: 100%;
          height: 500px;
          background-image: url(${img});
          background-size: cover;
          background-position: center;
          filter: brightness(40%);
          position: absolute;
          top: 0px;
          left: 0px;
          z-index: -1;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: end;
          height: 352px;
          padding-right: 45px;
        }
        .title {
          font-size: 36px;
          font-weight: 700;
          color: white;
          white-space: pre-line;
          text-align: end;
          margin-top: 40px;
        }
        button {
          background: none;
          border: solid 2px white;
          padding: 10px 30px;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.15s;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-weight: 400;
        }
        button:hover {
          background-color: #76ba99;
          border: solid 2.5px #76ba99;
        }
        button:hover a {
          color: black;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
