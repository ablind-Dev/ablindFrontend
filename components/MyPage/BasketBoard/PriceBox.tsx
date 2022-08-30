import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEquals } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

interface priceProps {
  sumAllPrice: number;
  sumSelectPrice: number;
}

export default function PriceBox(props: priceProps) {
  const { sumAllPrice, sumSelectPrice } = props;
  const [option, setOption] = useState(false); //false가 선택 상품, true가 전체 상품
  const [shipping, setShipping] = useState(3000);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if ((option && sumAllPrice < 40000) || (!option && sumSelectPrice < 40000))
      setShipping(3000);
    else setShipping(0);
  }, [option, sumAllPrice, sumSelectPrice]);

  useEffect(() => {
    if (option) setSum(shipping + sumAllPrice);
    else setSum(shipping + sumSelectPrice);
  }, [shipping, sumAllPrice, sumSelectPrice, option]);

  return (
    <div className="container">
      <ul>
        <li
          className={option ? "" : "selected"}
          onClick={() => setOption(false)}
        >
          선택상품
        </li>
        <li
          className={option ? "selected" : ""}
          onClick={() => setOption(true)}
        >
          전체상품
        </li>
      </ul>
      <div className="price-box">
        <span>상품 금액</span>
        <span className="price">
          {option ? sumAllPrice : sumSelectPrice} 원
        </span>
        <FontAwesomeIcon icon={faPlus} />
        <span>배송비</span>
        <span className="price">{shipping} 원</span>
        <FontAwesomeIcon icon={faEquals} />
        <span className="price">{sum} 원</span>
      </div>
      <span className="shipping">40,000원 이상 구매시 무료배송🌟</span>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          border: 4px solid #76ba99c6;
          border-radius: 10px;
          padding: 15px 15px;
          gap: 15px;
        }

        ul {
          list-style-type: none;
          padding: 0px;
          margin: 0px;
          display: flex;
          flex-direction: row;
          gap: 8px;
          font-size: 18px;
        }

        li {
          cursor: pointer;
          transition: all 0.15s;
        }
        li:hover {
          color: #76ba99;
        }

        .selected {
          color: #76ba99;
          font-weight: 700;
        }

        .price-box {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .price {
          font-size: 22px;
          font-weight: 600;
        }
        .shipping {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
