import Image from "next/image";
import about from "../../public/images/about.png";
export default function AboutLayout() {
  return (
    <div className="container">
      <div className="img-box">
        <Image src={about} layout="fill" objectFit="cover" />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .img-box {
          position: relative;
          min-width: 800px;
          min-height: 2748.99px;
          width: 70vw;
          height: 240.54vw;
        }
      `}</style>
    </div>
  );
}
