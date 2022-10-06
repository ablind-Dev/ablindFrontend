import { useState, useEffect } from "react";
import BasketBoardContent from "./BasketBoardContent";
import PriceBox from "./PriceBox";
import Api from "../../Auth/CustomApi";
import axios from "axios";
import Router from "next/router";
import NoItem from "./NoItem";
import { useRecoilState } from "recoil";
import { recoilOrderState, OrderState } from "../../../states/recoilOrderState";

interface itemInterface {
  itemImage: string; //상품 이미지
  itemName: string; //상품 이름
  itemOption: string; //선택한 옵션 이름
  itemId: number;
  count: number; //개수
  price: number;
  id: number; //옵션 아이디
}

export default function BasketBoard() {
  const [basketItem, setBasketItem] = useState<Array<itemInterface>>();
  const [selectItem, setSelectItem] = useState<Array<itemInterface>>([]);
  const [sumPrice, setSumPrice] = useState(0);
  const [sumSelectPrice, setSumSelectPrice] = useState(0);
  const [orderState, setOrderState] = useRecoilState(recoilOrderState);
  const router = Router;

  //받아오기 관련
  const getMyBasket = async () => {
    //통신으로 받아오기
    await Api.get("http://www.ablind.co.kr/mypage/cart", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setBasketItem(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyBasket();
  }, []);

  //합계계산 관련
  const calculateSumPrice = () => {
    if (basketItem) {
      let sum = 0;
      basketItem.map((item) => (sum += item.price * item.count));
      setSumPrice(sum);
    }
  };

  useEffect(() => {
    calculateSumPrice();
  }, [basketItem]);

  //개수 조정 관련
  const editCount = async (id: number, count: number) => {
    await axios
      .put(
        "http://www.ablind.co.kr/mypage/cart/update",
        {
          id: id,
          count: count,
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
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const upCountById = (id: number, count: number) => {
    if (basketItem) {
      let upperItems: Array<itemInterface> = [];
      basketItem.map((item, index) => {
        item.id === id
          ? upperItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count + 1, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            })
          : upperItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            });
      });
      setBasketItem(upperItems);
      editCount(id, count + 1);
    }

    if (selectItem.some((item) => item.id === id)) {
      let upperItems: Array<itemInterface> = [];
      selectItem.map((item, index) => {
        item.id === id
          ? upperItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count + 1, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            })
          : upperItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            });
      });
      setSelectItem(upperItems);
    }
  };

  const downCountById = (id: number, count: number) => {
    if (basketItem) {
      let downItems: Array<itemInterface> = [];
      basketItem.map((item, index) => {
        item.id === id
          ? downItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count - 1, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            })
          : downItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            });
      });
      setBasketItem(downItems);
      editCount(id, count - 1);
    }

    if (selectItem.some((item) => item.id === id)) {
      let downItems: Array<itemInterface> = [];
      selectItem.map((item, index) => {
        item.id === id
          ? downItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count - 1, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            })
          : downItems.push({
              itemImage: item.itemImage, //상품 이미지
              itemName: item.itemName, //상품 이름
              itemOption: item.itemOption, //선택한 옵션 이름
              itemId: item.itemId,
              count: item.count, //개수
              price: item.price,
              id: item.id, //옵션 아이디
            });
      });
      setSelectItem(downItems);
    }
  };

  //선택상품 관련
  const peekItem = (id: number) => {
    if (basketItem) {
      const peek = basketItem.filter((item) => item.id === id);
      setSelectItem((prev) => [...prev, ...peek]);
    }
  };

  const peekOutItem = (id: number) => {
    const updatedItem = selectItem.filter((item) => item.id !== id);
    setSelectItem(updatedItem);
  };

  const calculateSumSelectPrice = () => {
    let sum = 0;
    selectItem.map((item) => (sum += item.price * item.count));
    setSumSelectPrice(sum);
  };

  useEffect(() => {
    calculateSumSelectPrice();
  }, [selectItem]);

  //삭제관련
  const removeInBasket = () => {
    if (basketItem && selectItem.length > 0) {
      if (confirm("정말 장바구니에서 제거하시겠습니까?")) {
        let removeItemId: Array<number> = [];
        selectItem.map((item) => removeItemId.push(item.id));
        const removedItem = basketItem.filter(
          (item) => !removeItemId.includes(item.id)
        );
        setBasketItem(removedItem);
        setSelectItem([]);

        removeItemId.map((item) => removeItemInBasket(item));
        alert("제거가 완료되었습니다.");
      }
    } else {
      alert("선택한 상품이 없습니다.");
    }
  };

  const removeItemInBasket = (id: number) => {
    axios
      .delete(`http://www.ablind.co.kr/mypage/cart/delete`, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const selectOrder = () => {
    if (selectItem.length > 0) {
      const orderingItem: OrderState = {
        ordering: true,
        items: selectItem,
      };
      setOrderState(orderingItem);
      // await new Promise(() => setOrderState(orderingItem));
      router.push("/Order");
    } else {
      alert("선택한 상품이 없습니다.");
    }
  };

  const allOrder = async () => {
    if (basketItem) {
      const orderingItem: OrderState = {
        ordering: true,
        items: basketItem,
      };
      setOrderState(orderingItem);
      // await new Promise(() => setOrderState(orderingItem));
      router.push("/Order");
    }
  };

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">장바구니</span>
        <span>{basketItem ? basketItem.length : 0}</span>
      </div>
      {basketItem && basketItem.length > 0 ? (
        <div className="container">
          <div className="basket-box">
            {basketItem.map((item, index) => (
              <BasketBoardContent
                img={item.itemImage}
                itemId={item.itemId}
                goodsName={item.itemName}
                option={item.itemOption}
                count={item.count}
                price={item.price}
                optId={item.id}
                upCount={upCountById}
                downCount={downCountById}
                peekItem={peekItem}
                peekOutItem={peekOutItem}
                key={item.id}
              />
            ))}
          </div>
          <PriceBox sumAllPrice={sumPrice} sumSelectPrice={sumSelectPrice} />
          <div className="btns">
            <button onClick={() => removeInBasket()}>삭제하기</button>
            <button onClick={() => selectOrder()}>선택주문</button>
            <button onClick={() => allOrder()}>전체주문</button>
          </div>
        </div>
      ) : (
        <NoItem />
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 40px;
          padding: 0px 40px 20px 0px;
        }
        .title-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          color: #bebebe;
          font-size: 28px;
          font-weight: 700;
          border-bottom: 2px solid #bebebe;
          padding-bottom: 10px;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
        }
        .basket-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .btns {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 15px;
        }
        .btns button {
          background: none;
          border: 1px solid black;
          padding: 10px 15px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 5px;
          transition: all 0.15s;
          cursor: pointer;
        }
        .btns button:hover {
          background-color: #76ba99;
          border: 1px solid #76ba99;
          color: white;
        }
      `}</style>
    </div>
  );
}
