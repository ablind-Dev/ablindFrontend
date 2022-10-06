import { useEffect, useState } from "react";
import CheckItem from "./CheckItems";
import OrderSheet from "./OrderSheet";
import OrderComplete from "./OrderComplete";

interface Orderer {
  name: string;
  number: string;
  bank: string;
  account: string;
}

interface Receiver {
  name: string;
  number: string;
  addr: string;
  detail: string;
}

export default function OrderLayout() {
  const [step, setStep] = useState(0);
  const [allPrice, setAllPrice] = useState(0);

  const [orderer, setOrderer] = useState<Orderer>();
  const [receiver, setReceiver] = useState<Receiver>();
  const [orderDate, setOrderDate] = useState<string>("");

  return (
    <div className="container">
      <ul className="step-box">
        <li className={step === 0 ? "cur-li" : "li"}>1</li>
        <li className={step === 1 ? "cur-li" : "li"}>2</li>
        <li className={step === 2 ? "cur-li" : "li"}>3</li>
      </ul>
      <div className="order-box">
        {step === 0 ? (
          <CheckItem setStep={setStep} setAllPrice={setAllPrice} />
        ) : step === 1 ? (
          <OrderSheet
            setStep={setStep}
            allPrice={allPrice}
            setOrderer={setOrderer}
            setReceiver={setReceiver}
            setOrderDate={setOrderDate}
          />
        ) : (
          <OrderComplete
            allPrice={allPrice}
            orderer={orderer}
            receiver={receiver}
            orderDate={orderDate}
          />
        )}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          padding: 50px 0px;
          position: relative;
        }
        .order-box {
          width: 690px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
          border-radius: 20px;
          z-index: 10;
          margin: auto;
        }
        .step-box {
          display: flex;
          list-style: none;
          position: absolute;
          align-items: center;
          top: 0px;
          left: 50%;
          transform: translateX(-50%);
          gap: 20px;
        }
        .step-box li {
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 700;
        }

        .li {
          width: 60px;
          height: 60px;
          font-size: 20px;
          background-color: #76ba99;
        }

        .cur-li {
          width: 100px;
          height: 100px;
          font-size: 24px;
          background-color: #578a71;
        }
      `}</style>
    </div>
  );
}
