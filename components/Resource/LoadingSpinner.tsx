import { useEffect } from "react";

export default function LoadingSpinner() {
  const moveToTop = () => (document.documentElement.scrollTop = 0);
  useEffect(() => {
    moveToTop();
  }, []);
  return (
    <div className="center-body">
      <div className="loader-circle-9">
        <span className="loader-circle-9-cont">Loading</span>
        <span className="loader-circle-9-spin"></span>
      </div>
      <style jsx>{`
        .center-body {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
        }
        body {
          background: #262626;
        }
        .loader-circle-9 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90px;
          height: 90px;
          background: transparent;
          border: 3px solid #3c3c3c;
          border-radius: 50%;
          text-align: center;
          line-height: 70px;
          font-family: sans-serif;
          font-size: 16px;
          color: #76ba99;
          text-transform: uppercase;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        .loader-circle-9:before {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top: 3px solid #76ba99;
          border-right: 3px solid #76ba99;
          border-radius: 50%;
          animation: animateC 2s linear infinite;
        }
        .loader-circle-9-spin {
          display: block;
          position: absolute;
          top: calc(50% - 2px);
          left: 50%;
          width: 50%;
          height: 4px;
          background: transparent;
          transform-origin: left;
          animation: animate 2s linear infinite;
        }
        .loader-circle-9-spin:before {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #76ba99;
          top: -6px;
          right: -8px;
          box-shadow: 0 0 20px #76ba99;
        }
        .loader-circle-9-cont {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes animateC {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes animate {
          0% {
            transform: rotate(45deg);
          }
          100% {
            transform: rotate(405deg);
          }
        }
      `}</style>
    </div>
  );
}
