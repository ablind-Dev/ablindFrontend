import Api from "../Auth/CustomApi";
import { useState, useEffect } from "react";
import InquireBoard from "./InquireBoard/InquireBoard";
import NoItem from "./InquireBoard/NoItem";
import OrderDetail from "./OrderDetail";

interface inquireContent {
  createdAt: string;
  id: number; //주문내역 고유 아이디
  orderItems: Array<goods>; //주문 상품
  orderStatus: string; //배송 상태
  price: number; //총 가격
}

interface goods {
  count: number;
  id: number;
  itemName: string; //상품 이름
  itemOption: string; //옵션 이름
  orderPrice: number; //해당 상품 -> 옵션 -> 가격
}

export default function InquireOrder() {
  const [inquire, setInquire] = useState<Array<inquireContent>>();
  const [step, setStep] = useState(0);

  const getInquireInfo = () => {
    //통신구문으로 받아오기
    Api.get("http://www.ablind.co.kr/mypage/order", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setInquire(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInquireInfo();
  }, []);

  return (
    <div className="box">
      {inquire ? (
        step === 0 ? (
          <InquireBoard
            title="주문 조회"
            contentNum={inquire.length}
            contentArray={inquire}
            setStep={setStep}
          />
        ) : (
          <OrderDetail step={step} setStep={setStep} />
        )
      ) : (
        <NoItem />
      )}
      <style jsx>{`
        .box {
          padding: 0px 100px 40px 0px;
        }
      `}</style>
    </div>
  );
}
