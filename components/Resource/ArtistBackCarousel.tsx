import { useState, useEffect } from "react";

interface imgProps {
  imgs: Array<string>;
}
export default function ArtistBackCarousel(props: imgProps) {
  const { imgs } = props;
  const [moveTimer, setMoveTimer] = useState(
    "animation: scroll 40s linear infinite;"
  );
  const [moveLength, setMoveLength] = useState(
    "transform: translateX(-1800px);"
  );
  useEffect(() => {
    const timer = `animation: scroll ${7 * imgs.length}s linear infinite;`;
    setMoveTimer(timer);
    const length = `transform: translateX(${-300 * imgs.length}px);`;
    setMoveLength(length);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  return (
    <div className="view-window">
      <div {...settings} className="img-box">
        {imgs.map((img, index) => (
          <div key={index} className="artist">
            <img src={img} alt="Ablid's Artist" />
          </div>
        ))}
        {imgs.map((img, index) => (
          <div key={index} className="artist">
            <img src={img} alt="Ablid's Artist" />
          </div>
        ))}
      </div>
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
          height: 420px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .img-box {
          display: flex;
          flex-direction: row;
          position: absolute;
          opacity: 0.6;
          ${moveTimer}
        }
        .artist {
          width: 300px;
          height: 420px;
          position: relative;
          overflow: hidden;
        }
        .artist img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
