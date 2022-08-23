import moment from "moment";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface boardContentProps {
  index: number;
  shopId: number; //주문내역 고유 아이디
  shipping: string; //배송 상태
  goods: Array<goods>; //주문 상품
  priceSum: number; //총 가격
  createdAt: string;
}

interface goods {
  goodsName: string; //상품 이름
  optName: string; //옵션 이름
  price: number; //해당 상품 -> 옵션 -> 가격
}

export default function InquireBoardContent(props: boardContentProps) {
  const { index, shopId, shipping, goods, priceSum, createdAt } = props;
  return (
    <>
      <tr>
        <td>{shipping}</td>
        <td className="content-title">
          {goods.length > 1
            ? `${goods[0].goodsName}외 ${goods.length}개`
            : `${goods[0].goodsName}`}
        </td>
        <td>{priceSum}</td>
        <td>{createdAt}</td>
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
