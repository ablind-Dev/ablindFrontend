import Image from "next/image";
import { MoneyWonReg } from "../Resource/MoneyWonReg";

interface itemInterface {
  itemImage: string; //상품 이미지
  itemName: string; //상품 이름
  itemOption: string; //선택한 옵션 이름
  itemId: number;
  count: number; //개수
  price: number;
  id: number; //옵션 아이디
}

interface itemProps {
  item: itemInterface;
}

export default function Item(props: itemProps) {
  const { item } = props;

  return (
    <div className="box">
      <div className="img-box">
        <Image src={item.itemImage} layout="fill" objectFit="cover" />
      </div>
      <div className="info-box">
        <span className="name">{item.itemName}</span>
        <span className="option">{item.itemOption}</span>
        <span className="count">{item.count}개</span>
        <span className="price">
          {MoneyWonReg(Number(item.count) * Number(item.price))} 원
        </span>
      </div>
      <style jsx>{`
        .box {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
        }
        .img-box {
          width: 200px;
          height: 200px;
          position: relative;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .name {
          font-size: 22px;
          font-weight: 700;
          white-space: pre-line;
        }
        .option,
        .count {
          font-size: 18px;
          font-weight: 500;
        }
        .price {
          font-size: 18px;
          font-weight: 500;
          color: #578a71;
        }
      `}</style>
    </div>
  );
}
