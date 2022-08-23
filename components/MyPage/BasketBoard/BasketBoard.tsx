import { useState, useEffect } from "react";
import BasketBoardContent from "./BasketBoardContent";

interface itemInterface {
  img: string; //상품 이미지
  goodsName: string; //상품 이름
  option: string; //선택한 옵션 이름
  count: number; //개수
  price: number;
  optId: number; //옵션 아이디
}

export default function BasketBoard() {
  const [basketItem, setBasketItem] = useState<Array<itemInterface>>();

  const getMyBasket = () => {
    //통신으로 받아오기

    //더미데이터
    const tmp: itemInterface = {
      img: "https://ablind-s3-bucket.s3.ap-northeast-2.amazonaws.com/firsrt/artworks/dummy_art6.jpg", //상품 이미지
      goodsName: "내 쓸쓸함은 차갑지 않아요", //상품 이름
      option: "여기저기 그 떄의 내음 속엔 설렘이 담겨있고", //선택한 옵션 이름
      count: 2, //개수
      price: 5000,
      optId: 0, //옵션 아이디
    };
    const tmpArray = [tmp, tmp, tmp, tmp];
    setBasketItem(tmpArray);
  };

  useEffect(() => {
    getMyBasket();
  }, []);

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
                img={item.img}
                goodsName={item.goodsName}
                option={item.option}
                count={item.count}
                price={item.price}
                optId={item.optId}
              />
            ))}
          </div>
          <div className="final-box">
            <span className="final-title">총 결제금액</span>
            <span className="price">1000</span>
          </div>
          <div className="btns">
            <button>삭제하기</button>
            <button>선택주문</button>
            <button>전체주문</button>
          </div>
        </div>
      ) : (
        <></>
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
        .final-box {
          display: flex;
          align-items: end;
          flex-direction: column;
        }
        .final-title {
          font-size: 20px;
        }
        .price {
          font-size: 28px;
          font-weight: 700;
          color: #76ba99;
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
