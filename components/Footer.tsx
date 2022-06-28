import { useState, useEffect } from "react";
import instagram from "../public/images/instagram.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const onClickInstagram = () => {
    window.open(`https://www.instagram.com/ablind_official/`);
  };
  const onClickNaver = () => {
    window.open(
      `https://smartstore.naver.com/ablind?NaPm=ct%3Dl4xtudpo%7Cci%3Dshopn%7Ctr%3Dsls%7Chk%3Dae9b3123248d0b81670297cd094edcfc15a09d7e%7Ctrx%3Dundefined`
    );
  };
  return (
    <div className="container">
      <div className="box">
        <div className="logoes">
          <div className="instagram">
            <Image
              src={instagram}
              alt="인스타그램"
              width={28}
              height={28}
              quality={100}
              onClick={() => onClickInstagram()}
            />
          </div>
          <div className="naver" onClick={() => onClickNaver()}>
            <div>N</div>
          </div>
        </div>
        <div className="copyright">
          Copyright © 2022 ablind : ablind All rights reserved.
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 250px;
          background-color: #434343;
        }
        .box {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .logoes {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }
        .instagram {
          display: inline-flex;
          cursor: pointer;
        }
        .naver {
          width: 21px;
          height: 21px;
          border: 2.5px solid white;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #f5f5f5;
          font-weight: bold;
          cursor: pointer;
        }

        .copyright {
          color: white;
          font-family: light;
          font-size: 15px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
