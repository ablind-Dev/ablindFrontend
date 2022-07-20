import { useState, useEffect } from "react";

interface imgProps {
  imgs: Array<string>;
}

export default function HorizonScrollCarousel(props: imgProps) {
  const { imgs } = props;
  const [imgArray, setImgArray] = useState([imgs, imgs]);
  const [isEmpty, setIsEmpty] = useState(false);

  const [moveTimer, setMoveTimer] = useState(
    "animation: scroll 120s linear infinite;"
  );
  const [moveLength, setMoveLength] = useState(
    "transform: translateX(-1800px);"
  );
  useEffect(() => {
    if (imgs.length < 7) {
      switch (imgs.length) {
        case 0:
          setIsEmpty(true);
          break;
        case 1:
          setImgArray((prev) => [
            ...prev,
            imgs,
            imgs,
            imgs,
            imgs,
            imgs,
            imgs,
            imgs,
          ]);
          break;
        case 2:
          setImgArray((prev) => [...prev, imgs, imgs, imgs, imgs, imgs, imgs]);
          break;
        case 3:
          setImgArray((prev) => [...prev, imgs, imgs, imgs, imgs, imgs]);
          break;
        case 4:
          setImgArray((prev) => [...prev, imgs, imgs, imgs, imgs]);
          break;
        case 5:
          setImgArray((prev) => [...prev, imgs, imgs, imgs]);
          break;
        case 6:
          setImgArray((prev) => [...prev, imgs, imgs]);
          break;
        default:
          alert("잘못된 접근입니다.");
          break;
      }
    }
    const timer = `animation: scroll ${7 * imgs.length}s linear infinite;`;
    setMoveTimer(timer);
    const length = `transform: translateX(${-240 * imgs.length}px);`;
    setMoveLength(length);
  }, []);
  return (
    <div className="view-window">
      {isEmpty ? (
        <div className="empty">등록된 작품이 없어요😨</div>
      ) : (
        <>
          <div className="img-box">
            {imgArray.map((imgs, index) =>
              imgs.map((img, index) => (
                <div key={index} className="artwork">
                  <img src={img} alt="artwork" />
                </div>
              ))
            )}
          </div>
        </>
      )}

      <style jsx>{`
        // Animation
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            ${moveLength}
          }
        }

        .view-window {
          width: 100%;
          height: 280px;
          position: relative;
          overflow: hidden;
        }
        .img-box {
          display: flex;
          flex-direction: row;
          position: absolute;
          gap: 40px;
          ${moveTimer}
        }
        .artwork {
          width: 200px;
          height: 280px;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
        }
        .artwork img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        .empty {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          letter-spacing: -0.05;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
