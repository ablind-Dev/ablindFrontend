import bubble from "../public/images/carousel/bubble.jpg";
import flower from "../public/images/carousel/flower.jpg";
import flowerhill from "../public/images/carousel/flowerhill.jpg";
import girl from "../public/images/carousel/girl.jpg";
import nature from "../public/images/carousel/nature.jpg";
import pinkm from "../public/images/carousel/pink.jpg";
import tiger from "../public/images/carousel/tiger.jpg";
import waterwheel from "../public/images/carousel/waterwheel.jpg";
import yellowm from "../public/images/carousel/yellow.jpg";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SignInImageCarousel() {
  const images = [
    bubble,
    flower,
    flowerhill,
    girl,
    nature,
    pinkm,
    tiger,
    waterwheel,
    yellowm,
  ];

  useEffect(() => {
    images;
  }, []);

  const [order, setOrder] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setOrder((prev) => {
        if (prev === 8) return 0;
        else return prev + 1;
      });
    }, 4000);
  }, []);

  return (
    <div className="img-box">
      <div className="first">
        <Image src={images[order]} priority width={800} height={500} />
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
          position: relative;
          animation-name: first-fade;
          animation-duration: 4s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
      `}</style>
    </div>
  );
}
