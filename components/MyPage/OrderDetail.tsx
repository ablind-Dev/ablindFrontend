import moment from "moment";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { MoneyWonReg } from "../Resource/MoneyWonReg";
import OrderDetailItem from "./OrderDetailItem";
import Api from "../Auth/CustomApi";

interface orderDetailProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

interface ItemDetail {
  createdAt: string;
  id: number;
  orderItems: Array<goods>;
  orderStatus: string;
  ordererAccount: string;
  ordererAccountName: string;
  ordererName: string;
  ordererPhoneNumber: string;
  price: number;
  recipientAddress: string;
  recipientName: string;
  recipientPhoneNumber: string;
}

interface goods {
  count: number;
  id: number;
  itemOption: string;
  orderPrice: number;
  name: string;
  img: string;
  itemId: number;
}

export default function OrderDetail(props: orderDetailProps) {
  const { step, setStep } = props;
  const [itemDetail, setItemDetail] = useState<ItemDetail>();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState(false);

  const getOrderDetail = () => {
    Api.get("http://www.ablind.co.kr/mypage/order/detail", {
      params: {
        id: step,
      },
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setItemDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // const tmpItem: goods = {
    //   count: 1,
    //   id: 21,
    //   itemOption: "option1",
    //   orderPrice: 1000,
    //   name: "상품이름입니다",
    //   img: "https://ablind-s3-bucket.s3.ap-northeast-2.amazonaws.com/firsrt/artworks/dummy_art6.jpg",
    //   itemId: 5,
    // };

    // const tmpData: ItemDetail = {
    //   createdAt: "2022-10-08 06:58:37",
    //   id: 17,
    //   orderItems: [tmpItem],
    //   orderStatus: "배송완료",
    //   ordererAccount: "123456",
    //   ordererAccountName: "NH농협",
    //   ordererName: "이준규",
    //   ordererPhoneNumber: "010-1234-5678",
    //   price: 4000,
    //   recipientAddress:
    //     "서울 동작구 상도로 지하 378 (상도동, 7호선 숭실대입구역)(07040)&304_undefined",
    //   recipientName: "이준규",
    //   recipientPhoneNumber: "01012345678",
    // };

    // setItemDetail(tmpData);
  };

  const settingTitle = () => {
    if (itemDetail) {
      itemDetail.orderItems.length > 1
        ? setTitle(
            `${itemDetail.orderItems[0].name} 외 ${itemDetail.orderItems.length}개`
          )
        : setTitle(`${itemDetail.orderItems[0].name}`);
      itemDetail.orderStatus === "배송완료"
        ? setReview(true)
        : setReview(false);
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  useEffect(() => {
    settingTitle();
  }, [itemDetail]);

  return (
    <div className="container">
      {itemDetail ? (
        <>
          <div className="title-box">
            <span className="title">{title}</span>
            <span className="subtitle">
              {moment(itemDetail.createdAt)
                .add(9, "h")
                .format("YYYY-MM-DD HH:MM")}
            </span>
          </div>
          <div className="info-box">
            <table>
              <tbody>
                <tr>
                  <td className="content-title">주문 상태</td>
                  <td>{itemDetail.orderStatus}</td>
                </tr>
                <tr>
                  <td className="content-title">주문자</td>
                  <td>{itemDetail.ordererName}</td>
                </tr>
                <tr>
                  <td className="content-title">결제 금액</td>
                  <td>{MoneyWonReg(itemDetail.price)} 원</td>
                </tr>
                <tr>
                  <td className="content-title">수령인</td>
                  <td>{itemDetail.recipientName}</td>
                </tr>
                <tr>
                  <td className="content-title">수령지</td>
                  <td>{itemDetail.recipientAddress}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="item-box">
            {itemDetail.orderItems.map((item, index) => (
              <OrderDetailItem
                count={item.count}
                id={item.id}
                itemOption={item.itemOption}
                orderPrice={item.orderPrice}
                name={item.name}
                img={item.img}
                itemId={item.itemId}
                review={review}
                key={`${item.id}-${index}`}
              />
            ))}
            <div className="price-sum-box">
              <span>총 결제금액</span>
              <span className="subtitle">
                {MoneyWonReg(itemDetail.price)} 원
              </span>
            </div>
          </div>
          <button onClick={() => setStep(0)}>주문조회 페이지로</button>
        </>
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          width: 100%;
        }
        .title-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
        .title {
          font-weight: 700;
          font-size: 24px;
        }
        .subtitle {
          font-weight: 400;
          font-size: 18px;
        }
        .info-box {
          width: 100%;
        }
        table {
          width: 100%;
          border-bottom: 3px solid #bebebe;
          border-top: 3px solid #bebebe;
          border-collapse: collapse;
        }
        th {
          height: 50px;
          background-color: #bebebe;
        }
        td {
          height: 30px;
          border-bottom: 0.5px solid #bebebe;
        }
        .content-title {
          transition: all 0.15s;
          font-weight: 600;
          cursor: default;
        }
        .content-title:hover {
          color: #76ba99;
        }
        .item-box {
          width: 100%;
        }
        .price-sum-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }
        button {
          font-size: 16px;
          border: none;
          background-color: #76ba99;
          font-weight: 700;
          color: white;
          padding: 10px 13px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
