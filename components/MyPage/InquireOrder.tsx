import Api from "../Auth/CustomApi";
import { useState, useEffect } from "react";
import InquireBoard from "./InquireBoard/InquireBoard";
import { uuid } from "uuidv4";

interface inquireContent {
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

export default function InquireOrder() {
  const [inquire, setInquire] = useState<Array<inquireContent>>();

  const getInquireInfo = () => {
    //통신구문으로 받아오기

    //더미데이터
    const tmpGoods: goods = {
      goodsName: "유갓미루킹폴어텐션~~~",
      optName: "에이티티이엔티아이온 어텐션",
      price: 3000,
    };
    const tmpInquire: inquireContent = {
      shopId: 0, //주문내역 고유 아이디
      shipping: "주문 완료", //배송 상태
      goods: [tmpGoods, tmpGoods, tmpGoods, tmpGoods, tmpGoods, tmpGoods], //주문 상품
      priceSum: 18000, //총 가격
      createdAt: "2022-08-23",
    };
    setInquire([
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
      tmpInquire,
    ]);
  };

  useEffect(() => {
    getInquireInfo();
  }, []);

  return (
    <div className="box">
      {inquire ? (
        <InquireBoard
          title="주문 조회"
          contentNum={inquire.length}
          contentArray={inquire}
        />
      ) : (
        <></>
      )}
      <style jsx>{`
        .box {
          padding: 0px 100px 40px 0px;
        }
      `}</style>
    </div>
  );
}
