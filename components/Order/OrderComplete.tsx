import Image from "next/image";
import complete from "../../public/images/complete.svg";
import { MoneyWonReg } from "../Resource/MoneyWonReg";
import moment from "moment";
import "moment/locale/ko";
import Router from "next/router";

interface completeProps {
  allPrice: number;
  orderer: Orderer | undefined;
  receiver: Receiver | undefined;
  orderDate: string;
}

interface Orderer {
  name: string;
  number: string;
  bank: string;
  account: string;
}

interface Receiver {
  name: string;
  number: string;
  addr: string;
  detail: string;
}

export default function OrderComplete(props: completeProps) {
  const { allPrice, orderer, receiver, orderDate } = props;
  const router = Router;
  return (
    <div className="container">
      <span className="main-title">주문 완료</span>
      <div className="info-box">
        <div className="image-box">
          <div className="circle" />
          <Image src={complete} layout="fill" objectFit="cover" />
        </div>
        <div className="title-box">
          <span className="title">주문이 완료되었습니다.</span>
          <span className="subtitle">
            아래 주문서에 맞게 무통장 입금 절차를 따라주세요!
          </span>
        </div>
        <div className="sheet-box">
          <span className="sheet-title">입금 계좌</span>
          <span>3333163485191 카카오뱅크 양드림</span>
          <span className="sheet-title sheet-title-div">입금 기한</span>
          <div>
            <span>
              {moment(orderDate)
                .add(7, "days")
                .format("YYYY-MM-DD(dddd) HH:mm:ss")}
            </span>
            <span className="warning">
              입금 기한이 지나면, 주문이 자동으로 취소됩니다.
            </span>
          </div>
          <span className="sheet-title">입금 금액</span>
          <span>{MoneyWonReg(allPrice)}원</span>
        </div>
        <div className="sheet-box">
          <span className="sheet-title">주문자</span>
          <span>{orderer?.name}</span>
          <span className="sheet-title">전화번호</span>
          <span>{orderer?.number}</span>
          <span className="sheet-title sheet-title-div">계좌 정보</span>
          <div>
            <span>{orderer?.bank}</span>
            <span>{orderer?.account}</span>
          </div>
        </div>
        <div className="sheet-box">
          <span className="sheet-title">수령인</span>
          <span>{receiver?.name}</span>
          <span className="sheet-title">전화번호</span>
          <span>{receiver?.number}</span>
          <span className="sheet-title sheet-title-div">주소</span>
          <div>
            <span>{receiver?.addr}</span>
            <span>{receiver?.detail}</span>
          </div>
        </div>
        <button className="end-btn" onClick={() => router.replace("/Shop")}>
          쇼핑 더 하러 가기
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 80px 50px;
        }
        .main-title {
          font-size: 22px;
          font-weight: 700;
          color: #578a71;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .circle {
          width: 320px;
          height: 320px;
          border-radius: 100%;
          background-color: #d9d9d9;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .image-box {
          width: 350px;
          height: 425px;
          position: relative;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .title {
          font-weight: 800;
          font-size: 20px;
        }
        .subtitle {
          font-weight: 800;
          font-size: 18px;
        }
        .sheet-box {
          display: grid;
          width: 80%;
          grid-template-columns: 1fr 4fr;
          row-gap: 5px;
          align-items: center;
        }
        .sheet-box:not(.sheet-title) {
          font-weight: 500;
        }
        .sheet-title:not(.sheet-title-div) {
          font-weight: 700;
          font-size: 18px;
        }
        .sheet-title-div {
          align-self: start;
          font-weight: 700;
          font-size: 18px;
        }
        .sheet-box div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .warning {
          color: red;
        }
        .end-btn {
          margin-top: 10px;
          border: none;
          background-color: #76ba99;
          padding: 10px 15px;
          border-radius: 10px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          cursor: pointer;
          color: white;
          font-weight: 800;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
