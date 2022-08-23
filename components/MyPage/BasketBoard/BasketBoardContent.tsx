import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface itemProps {
  img: string; //상품 이미지
  goodsName: string; //상품 이름
  option: string; //선택한 옵션 이름
  count: number; //개수
  price: number;
  optId: number; //옵션 아이디
}

export default function BasketBoardContent(props: itemProps) {
  const { img, goodsName, option, price, count, optId } = props;
  return (
    <div className="box">
      <div className="img-box">
        <Image src={img} layout="fill" objectFit="cover" />
        <input type="checkbox" />
      </div>
      <div className="info-box">
        <div className="title-box">
          <span className="title">{goodsName}</span>
          <span className="option">{option}</span>
          <span className="price">가격 : {price}</span>
        </div>

        <div className="count-box">
          <button className="count-minus">
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{count}</span>
          <button className="count-plus">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <style jsx>{`
        .box {
          display: flex;
          flex-direction: row;
          gap: 20px;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .img-box {
          width: 200px;
          height: 200px;
          position: relative;
        }
        .img-box input {
          position: absolute;
          top: 10px;
          left: 10px;
          margin: 0px;
          width: 20px;
          height: 20px;
          border-radius: 5px;
          accent-color: #76ba99;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: start;
          gap: 2px;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
        }
        .price {
          font-size: 14px;
          opacity: 0.8;
        }
        .option {
          font-size: 20px;
        }
        .count-box {
          /* border: 1px solid black; */
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 11px;
          background-color: #76ba998a;
          height: 25px;
        }
        .count-box button {
          height: 100%;
          border-top: none;
          border-bottom: none;
          background: none;
          opacity: 0.8;
          cursor: pointer;
        }
        .count-minus {
          border-right: 1px solid #d9d9d9;
          border-left: none;
        }
        .count-plus {
          border-right: none;
          border-left: 1px solid #d9d9d9;
        }
      `}</style>
    </div>
  );
}
