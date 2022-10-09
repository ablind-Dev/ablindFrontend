import moment from "moment";
import { MoneyWonReg } from "../../Resource/MoneyWonReg";
import { Dispatch, SetStateAction } from "react";

interface boardContentProps {
  index: number;
  shopId: number; //주문내역 고유 아이디
  shipping: string; //배송 상태
  goods: Array<goods>; //주문 상품
  priceSum: number; //총 가격
  createdAt: string;
  setStep: Dispatch<SetStateAction<number>>;
}

interface goods {
  count: number;
  id: number;
  itemName: string; //상품 이름
  itemOption: string; //옵션 이름
  orderPrice: number; //해당 상품 -> 옵션 -> 가격
}

export default function InquireBoardContent(props: boardContentProps) {
  const { index, shopId, shipping, goods, priceSum, createdAt, setStep } =
    props;
  return (
    <>
      <tr>
        <td>{shipping}</td>
        <td className="content-title" onClick={() => setStep(shopId)}>
          {goods.length > 1
            ? `${goods[0].itemName}외 ${goods.length}개`
            : `${goods[0].itemName}`}
        </td>
        <td>{MoneyWonReg(priceSum)}원</td>
        <td>{moment(createdAt).add(9, "h").format("YYYY-MM-DD")}</td>
      </tr>
      <style jsx>{`
        td {
          height: 40px;
          text-align: center;
          cursor: pointer;
        }
        .content-title {
          transition: all 0.15s;
          font-weight: 600;
        }
        .content-title:hover {
          color: #76ba99;
        }
      `}</style>
    </>
  );
}
