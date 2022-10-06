import { useRecoilState } from "recoil";
import { recoilOrderState, OrderState } from "../../states/recoilOrderState";
import Item from "./Item";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { MoneyWonReg } from "../Resource/MoneyWonReg";

interface checkProps {
  setStep: Dispatch<SetStateAction<number>>;
  setAllPrice: Dispatch<SetStateAction<number>>;
}

export default function CheckItems(props: checkProps) {
  const { setStep, setAllPrice } = props;
  const [orderState, setOrderState] = useRecoilState(recoilOrderState);
  const defaultState: OrderState = { ...orderState };
  const [allPrice, setAllPrices] = useState(0);
  const [delivery, setDelivery] = useState(0);

  const calAllPrice = () => {
    let all = 0;
    defaultState.items.map((item) => {
      all += Number(item.price) * Number(item.count);
    });
    setAllPrices(all);
    all < 40000 ? setDelivery(3000) : setDelivery(0);
  };

  useEffect(() => {
    calAllPrice();
  }, []);

  useEffect(() => {
    setAllPrice(allPrice + delivery);
  }, [delivery]);

  return (
    <div className="container">
      <span className="title">주문 상품 확인</span>
      <div className="item-box">
        {defaultState.items.map((item, index) => (
          <Item item={item} key={`${item.id}-${index}`} />
        ))}
      </div>
      <div className="price-box">
        <span>배송비 {allPrice < 40000 ? "3,000" : "0"}원</span>
        <span>
          총 금액{" "}
          <span className="bold">{MoneyWonReg(allPrice + delivery)}</span>원
        </span>
      </div>
      <button onClick={() => setStep(1)}>다음 단계로</button>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 80px 50px;
        }
        .title {
          font-size: 22px;
          font-weight: 700;
          color: #578a71;
        }
        .item-box {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
        .price-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-top: 15px;
        }
        .bold {
          font-size: 18px;
          font-weight: 700;
        }
        button {
          align-self: center;
          border: solid 2px black;
          background: none;
          border-radius: 10px;
          padding: 10px 15px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          margin-top: 15px;
        }
        button:hover {
          border: solid 2px #76ba99;
          background-color: #76ba99;
          color: white;
        }
      `}</style>
    </div>
  );
}
