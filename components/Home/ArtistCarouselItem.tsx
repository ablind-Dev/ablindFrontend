import Image from "next/image";
import { useSpring, animated } from "react-spring";
import { useState } from "react";

interface itemProps {
  img: string;
  name: string;
  title: string;
}

export default function ArtistCarouselItem(props: itemProps) {
  const { img, name, title } = props;

  const [show, setShown] = useState(false);

  const props3 = useSpring({
    borderRadius: "10px",
    overflow: "hidden",
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    <>
      <animated.div
        style={props3}
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <div className="img-box">
          <Image src={img} layout="fill" objectFit="cover" />
          <div className="info-box">
            <span>작가 {name}</span>
            <span>{title}</span>
          </div>
        </div>
        <style jsx>{`
          .img-box {
            position: relative;
            width: 35vw;
            height: 55vh;
          }
          .info-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 18px;
            background: rgba(255, 255, 255, 0.35);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(3.5px);
            -webkit-backdrop-filter: blur(3.5px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            padding: 10px;
          }
        `}</style>
      </animated.div>
    </>
  );
}
