import Image from "next/image";
import { useSpring, animated } from "react-spring";
import { useState } from "react";

interface cardProps {
  img: string;
}

export default function SubscribeCard(props: cardProps) {
  const { img } = props;

  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    <>
      <animated.div
        className="img-box"
        style={props3}
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <img src={img} />
      </animated.div>
      <style jsx>{`
        img {
          width: 420px;
        }
      `}</style>
    </>
  );
}
