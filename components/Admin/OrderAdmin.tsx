import Api from "../../components/Auth/CustomApi";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import Image from "next/image";
import { MoneyWonReg } from "../Resource/MoneyWonReg";
import Router from "next/router";

interface Item {
  count: number;
  id: number;
  img: string;
  itemOption: string;
  name: string;
  orderPrice: number;
}

interface Order {
  createdAt: string;
  id: number;
  orderItems: Array<Item>;
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

const options = [
  "전체",
  "주문완료",
  "배송 준비 중",
  "배송 중",
  "배송완료",
  "배송 취소",
];

const changeOptions = [
  "선택하면 적용",
  "주문완료",
  "배송 준비 중",
  "배송 중",
  "배송완료",
  "배송 취소",
];

export default function OrderAdmin() {
  const [info, setInfo] = useState<Array<Order>>();

  const getAllList = () => {
    Api.get("https://www.ablind.co.kr/admin/list/order", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrderListByOption = (option: string) => {
    if (option !== "전체") {
      Api.get(
        `https://www.ablind.co.kr/admin/list/order?orderStatus=${option}`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllList();
    }
  };

  const changeOptionHandler = (id: number, option: string) => {
    if (option !== "선택하면 적용" && option === "배송 준비 중") {
      Api.post(
        "https://www.ablind.co.kr/admin/delivery/pay",
        {
          orderId: id,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          alert("상태 변경 성공");
        })
        .catch((error) => {
          alert("상태변경 실패");
        });
    } else if (option !== "선택하면 적용") {
      Api.post(
        "https://www.ablind.co.kr/admin/list/order/update",
        {
          id: id,
          orderStatus: option,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          alert("상태 변경 성공");
        })
        .catch((error) => {
          alert("상태변경 실패");
        });
    } else {
      alert("잘못된 접근입니다.");
    }
  };

  useEffect(() => {
    getAllList();
  }, []);

  return (
    <div className="container">
      <select onChange={(e) => getOrderListByOption(e.target.value)}>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span>
        계좌 정보는 실제 입금된 계좌와 다를 수 있어요. 상태변경은 옵션 누르면
        바로 적용됩니다. 상태 변경 후에는 좌측에 드롭박스 다른거로 바꿔보세요.
      </span>
      <table>
        <thead>
          <tr>
            <th>상태</th>
            <th>고유아이디</th>
            <th>주문 날짜 및 시간</th>
            <th>주문 상품</th>
            <th>가격</th>
            <th>입금자 정보</th>
            <th>수령인 정보</th>
            <th>상태 변경</th>
          </tr>
        </thead>
        <tbody>
          {info ? (
            info.map((inf, index) => (
              <tr key={inf.id}>
                <td>{inf.orderStatus}</td>
                <td>{inf.id}</td>
                <td>
                  {moment(inf.createdAt)
                    .add(9, "h")
                    .format("YYYY-MM-DD HH:MM:SS")}
                </td>
                <td>
                  {inf.orderItems.map((item, index) => (
                    <div className="item-box" key={item.id}>
                      <div className="img-box">
                        <Image src={item.img} layout="fill" objectFit="cover" />
                      </div>
                      <div>
                        <span>
                          {item.name} - {item.itemOption}
                        </span>
                        <span>{item.count}</span>
                        <span>{MoneyWonReg(item.orderPrice)}원</span>
                      </div>
                    </div>
                  ))}
                </td>
                <td>{inf.price}원</td>
                <td>{`${inf.ordererName}\n${inf.ordererAccountName}\n${inf.ordererAccount}\n${inf.ordererPhoneNumber}`}</td>
                <td>{`${inf.recipientName}\n${inf.recipientPhoneNumber}\n${inf.recipientAddress}`}</td>
                <td>
                  <select
                    onChange={(e) =>
                      changeOptionHandler(inf.id, e.target.value)
                    }
                  >
                    {changeOptions.map((opt, index) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <style jsx>{`
        table,
        tr,
        th,
        td {
          border: 1px solid black;
        }
        .item-box {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .img-box {
          width: 50px;
          height: 50px;
          cursor: pointer;
          position: relative;
        }
      `}</style>
    </div>
  );
}
