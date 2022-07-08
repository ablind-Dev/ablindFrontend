import bubble from "../../public/images/carousel/bubble.jpg";
import flower from "../../public/images/carousel/flower.jpg";
import flowerhill from "../../public/images/carousel/flowerhill.jpg";
import waterwheel from "../../public/images/carousel/waterwheel.jpg";
import yellowm from "../../public/images/carousel/yellow.jpg";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SignInImageCarousel() {
  const images = [bubble, flower, flowerhill, waterwheel, yellowm];

  useEffect(() => {
    images;
  }, []);

  const [order, setOrder] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setOrder((prev) => {
        if (prev === 4) return 0;
        else return prev + 1;
      });
    }, 5000);
  }, []);

  return (
    <div className="img-box">
      <div className="first">
        <Image src={images[order]} priority className="img" />
      </div>

      <style jsx>{`
        @keyframes first-fade {
          0% {
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .first {
          width: 800px;
          height: 500px;
          position: relative;
          animation-name: first-fade;
          animation-duration: 5s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }

        .img {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
