import totop from "../../public/images/caret-up.png";
import totopWhite from "../../public/images/caret-up-white.png";
import Image from "next/image";

export default function PageMoveSticker() {
  const moveToTop = () => (document.documentElement.scrollTop = 0);
  const moveToDown = () =>
    (document.documentElement.scrollTop = document.body.scrollHeight);
  return (
    <div className="toTop">
      <button onClick={() => moveToDown()} className="scrollBtnDown">
        <div className="white">
          <Image src={totopWhite} />
        </div>
        <div className="black">
          <Image src={totop} />
        </div>
      </button>
      <button onClick={() => moveToTop()} className="scrollBtn">
        <div className="white">
          <Image src={totopWhite} />
        </div>
        <div className="black">
          <Image src={totop} />
        </div>
      </button>
      <style jsx>{`
        .toTop {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 5;
          display: flex;
          gap: 10px;
        }
        .scrollBtnDown {
          background-color: #434343;
          width: 35px;
          height: 35px;
          padding: 8px;
          border: none;
          border-radius: 100%;
          position: relative;
          cursor: pointer;
          transition: all 0.15s;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transform: rotate(180deg);
        }
        .scrollBtn {
          background-color: #434343;
          width: 35px;
          height: 35px;
          padding: 8px;
          border: none;
          border-radius: 100%;
          position: relative;
          cursor: pointer;
          transition: all 0.15s;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .white {
          opacity: 1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.15s;
        }
        .black {
          opacity: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.15s;
        }
        .scrollBtn:hover,
        .scrollBtnDown:hover {
          background-color: #76ba99;
        }
        .scrollBtn:hover .white,
        .scrollBtnDown:hover .white {
          opacity: 0;
        }
        .scrollBtn:hover .black,
        .scrollBtnDown:hover .black {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
