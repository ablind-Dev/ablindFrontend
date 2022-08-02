interface itemProps {
  img: string; //이미지 url
  content: string; //내용
  artist: string; //작가
  center: boolean;
}

export default function HotBannerCarouselItem(props: itemProps) {
  const { img, content, artist } = props;
  return (
    <div className="container">
      <span className="artist">{artist}</span>
      <span className="content">{content}</span>
      <div className="img-box" />
      <style jsx>{`
        .container {
          width: 240px;
          height: 320px;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.123);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: flex;
          flex-direction: column;
          padding: 20px 40px;
          gap: 10px;
          justify-content: center;
        }
        .artist {
          font-size: 0.8rem;
          color: #434343;
        }
        .content {
          font-size: 1.2rem;
          font-weight: 800;
          white-space: pre-line;
          letter-spacing: -0.05;
        }
        .img-box {
          width: 210px;
          height: 210px;
          background-image: url(${img});
          background-size: cover;
          background-position: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
