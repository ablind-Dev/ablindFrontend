import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";
import { MoneyWonReg } from "../Resource/MoneyWonReg";
import { recoilOrderState, OrderState } from "../../states/recoilOrderState";

interface Option {
  id: number;
  itemOption: string;
}

interface info {
  itemId: number;
  name: string;
  artist: string;
  price: number;
  option: Array<Option>;
  reviewLinkClick: () => void;
}

interface Choice {
  itemId: number;
  name: string;
  option: string;
  count: number;
  price: number;
}

interface AuthState {
  state: boolean;
}

interface itemInterface {
  itemImage: string; //상품 이미지
  itemName: string; //상품 이름
  itemOption: string; //선택한 옵션 이름
  itemId: number;
  count: number; //개수
  price: number;
  id: number; //옵션 아이디
}

export default function TitleInfoBox(props: info) {
  const { itemId, name, artist, price, option, reviewLinkClick } = props;
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const [orderState, setOrderState] = useRecoilState(recoilOrderState);
  const defaultState: AuthState = { ...recoilInfo };
  const [selectedOpt, setSelectedOpt] = useState("");
  const [collapse, setCollapse] = useState(false);
  const [peek, setPeek] = useState<Array<Choice>>();
  const [total, setTotal] = useState(price);
  const [btnClick, setBtnClick] = useState(false);
  const [peekCheck, setPeekCheck] = useState(false);
  const router = Router;

  const selectOption = (opt: string) => {
    setBtnClick((prev) => !prev);
    setSelectedOpt(opt);
    setCollapse(false);
  };

  const deleteOption = (ind: number) => {
    const deletedOptPeek = peek?.filter((p, index) => index !== ind);
    setPeek(deletedOptPeek);
  };

  const countHandler = (ind: number, updown: boolean) => {
    if (peek) {
      let editedCount = peek[ind].count;
      if (updown) {
        //true 더하기, false 빼기
        editedCount = peek[ind].count + 1;
      } else {
        if (peek[ind].count > 1) {
          editedCount = peek[ind].count - 1;
        }
      }
      const editedOpt: Choice = {
        itemId: itemId,
        name: peek[ind].name,
        option: peek[ind].option,
        count: editedCount,
        price: price * editedCount,
      };
      const editedOptPeek = peek.map((p, index) =>
        index === ind ? editedOpt : p
      );
      setPeek(editedOptPeek);
    }
  };

  const putCart = async () => {
    if (defaultState) {
      if (!peek || peek.length === 0) {
        alert("옵션을 선택해주세요.");
      } else {
        peek.map((item) => putCartItem(item.itemId, item.count, item.option));
      }
    } else {
      if (
        confirm("로그인 후 이용할 수 있는 서비스입니다.\n로그인하시겠습니까?")
      ) {
        router.push("/SignIn");
      }
    }
  };

  const putCartItem = async (
    itemId: number,
    count: number,
    itemOption: string
  ) => {
    await axios
      .post(
        "https://www.ablind.co.kr/mypage/cart/add",
        {
          itemId: itemId,
          count: count,
          itemOption: itemOption,
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
        setPeekCheck(true);
        setPeek([]);
      })
      .catch((error) => {
        alert("장바구니에 담기를 실패하였습니다.");
      });
  };

  const buyNow = () => {
    if (!peek || peek.length === 0) {
      alert("옵션을 선택해주세요.");
    } else {
    }
  };

  useEffect(() => {
    if (selectedOpt !== "") {
      const newPeek: Choice = {
        itemId: itemId,
        name: name,
        option: selectedOpt,
        count: 1,
        price: price,
      };
      setPeek((prev) => (prev ? [...prev, newPeek] : [newPeek]));
    }
  }, [btnClick]);

  useEffect(() => {
    if (peek) {
      let calTotal = 0;
      peek.map((p) => (calTotal += p.price));
      setTotal(calTotal);
    }
  }, [peek]);

  return (
    <div className="container">
      <div className="name-box">
        <span className="name">{name}</span>
        <span className="artist">{artist}</span>
      </div>

      <span className="price">{MoneyWonReg(price)} 원</span>
      <ul className="info-list">
        <li>
          <span className="list-title">배송</span>
          <span>40,000원 이상 구매시 무료배송!</span>
        </li>
        <li>
          <span className="list-title">리뷰</span>
          <div>
            <span>
              <a
                href={
                  "https://smartstore.naver.com/ablind?NaPm=ct%3Dl8zx8sv4%7Cci%3Dshopn%7Ctr%3Dsls%7Chk%3Dc01c9a72550bae6ebc575bc49bc6130b5461ba3c%7Ctrx%3Dundefined"
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                네이버스토어
              </a>
              에서 확인하기
            </span>
            <span>
              <span className="review-link" onClick={() => reviewLinkClick()}>
                에이블라인드 리뷰
              </span>
              확인하기
            </span>
          </div>
        </li>
      </ul>
      <div className="opt-box">
        <div className="select-box">
          <span>옵션을 선택해주세요</span>
          <div onClick={() => setCollapse((prev) => !prev)}>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        <div className={collapse ? "fold" : "unfold"}>
          <ul>
            {option.map((opt, index) => (
              <li key={index} onClick={() => selectOption(opt.itemOption)}>
                {opt.itemOption}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {peek && peek.length > 0 ? (
        <div className="peek-box">
          {peek.map((p, index) => (
            <div key={index} className="peek-inner-box">
              <span className="peek-option">{p.option}</span>
              <div className="price-box">
                <div className="count-box">
                  <button
                    className="count-minus"
                    onClick={() => countHandler(index, false)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{p.count}</span>
                  <button
                    className="count-plus"
                    onClick={() => countHandler(index, true)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <span className="peek-price">{MoneyWonReg(p.price)}원</span>
              </div>
              <button className="x-mark" onClick={() => deleteOption(index)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
          <div className="total-box">
            <span className="total-info">합계</span>
            <span className="total">{MoneyWonReg(total)}원</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      {peekCheck ? (
        <div className="peek-complete-box">
          <span>상품이 장바구니에 담겼습니다.</span>
          <button onClick={() => router.push("/MyPage")} className="go-btn">
            장바구니 확인하기
          </button>
          <button onClick={() => setPeekCheck(false)} className="close-btn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="btn-box">
        <button onClick={() => putCart()}>장바구니</button>
        {/* <button onClick={() => buyNow()}>바로 구매하기</button> */}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: start;
          min-width: 60vh;
          max-width: 75vh;
        }
        .name-box {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 5px;
        }
        ul {
          list-style: none;
          padding-left: 0px;
          margin: 0px;
        }
        .name {
          font-size: 24px;
          font-weight: 900;
        }
        .artist {
          font-size: 16px;
          background-color: #76ba99;
          padding: 5px 10px;
          border-radius: 5px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          color: white;
          font-weight: 600;
          cursor: pointer;
        }
        .price {
          font-size: 28px;
          color: #76ba99;
          font-weight: 700;
        }
        .info-list li {
          display: flex;
          flex-direction: row;
          gap: 10px;
          font-size: 16px;
          align-items: start;
        }
        .info-list li div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .list-title {
          font-weight: 600;
          color: #646464;
        }
        a,
        .review-link {
          font-weight: 600;
          color: black;
          transition: all 0.15s;
          cursor: pointer;
          text-decoration: underline;
        }
        a:hover,
        .review-link:hover {
          color: #76ba99;
        }
        .opt-box {
          display: flex;
          flex-direction: column;
          justify-content: start;
          width: 100%;
          border: 1px solid black;
          border-radius: 10px;
          padding: 15px 20px 15px 20px;
          font-size: 16px;
        }
        .select-box {
          display: flex;
          justify-content: space-between;
        }
        .select-box div {
          cursor: pointer;
          transition: all 0.25s;
          transform: rotate(${collapse ? "180deg" : "0deg"});
        }
        .opt-box ul {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 10px;
          margin-bottom: 0px;
        }
        .fold,
        .unfold {
          transition: all 0.15s;
        }
        .unfold {
          display: none;
        }
        .opt-box li {
          cursor: pointer;
        }
        .peek-box {
          background-color: #d9d9d9;
          padding: 20px;
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .peek-inner-box {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .peek-option {
          font-size: 18px;
        }
        .peek-price {
          color: #646464;
        }
        .price-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .x-mark {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 0px;
          right: 0px;
          border: none;
          background: none;
          cursor: pointer;
        }
        .count-box {
          /* border: 1px solid black; */
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 11px;
          background-color: white;
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
        .total-box {
          display: flex;
          justify-content: end;
          align-items: center;
          gap: 10px;
        }
        .total-box span {
          font-weight: 600;
        }
        .total-info {
          color: #646464;
        }
        .total {
          font-size: 24px;
          color: #76ba99;
          letter-spacing: -0.05;
        }
        .btn-box {
          display: flex;
          flex-direction: row;
          gap: 15px;
        }
        .btn-box button {
          font-size: 18px;
          background-color: #76ba99;
          color: white;
          font-weight: 700;
          padding: 12px 28px;
          border: none;
          border-radius: 10px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }
        .peek-complete-box {
          padding: 10px 20px;
          border: 1px solid black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          position: relative;
          gap: 10px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        }
        .go-btn {
          background: none;
          border: 1px solid black;
          border-radius: 2px;
          padding: 5px 10px;
          font-weight: 600;
          transition: all 0.25s;
          cursor: pointer;
        }
        .go-btn:hover {
          background-color: #76ba99;
          border: 1px solid #76ba99;
          color: white;
        }
        .peek-complete-box .close-btn {
          position: absolute;
          top: 1.5%;
          right: 1%;
          border: none;
          background: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
