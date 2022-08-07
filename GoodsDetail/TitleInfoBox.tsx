import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface info {
  name: string;
  artist: string;
  price: number;
  naver: string;
  option: Array<string>;
}

export default function TitleInfoBox(props: info) {
  const { name, artist, price, naver, option } = props;
  const [selectedOpt, setSelectedOpt] = useState("옵션을 선택해주세요.");
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="container">
      <span className="name">{name}</span>
      <span className="artist">{artist}</span>
      <span className="price">{price}원</span>
      <ul className="info-list">
        <li>
          <span className="list-title">배송</span>
          <span>30,000원 이상 구매시 무료배송!</span>
        </li>
        <li>
          <span className="list-title">리뷰</span>
          <span>
            <a href={naver} target="_blank">
              네이버스토어
            </a>
            에서 확인하기
          </span>
        </li>
      </ul>
      <div className="opt-box">
        <div className="select-box">
          <span>{selectedOpt}</span>
          <div>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        <div>
          <ul className={collapse ? "fold" : "unfold"}>
            {option.map((opt, index) => (
              <li key={index}>{opt}</li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap:5px;
          align-items:start;
        }
        ul {
          list-style: none;
          padding-left: 0px;s
        }
        .name{
          font-size:28px;
          font-weight:900;
        }
        .artist{
          font-size:20px;
          background-color: #76ba99;
          padding: 5px 10px;
          border-radius:5px;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          color:white;
          font-weight:600;
          cursor: pointer;
        }
        .price{
          font-size: 32px;
          color : #76ba99;
          font-weight: 700;
          padding-top: 15px;
        }
        .info-list li{
          display:flex;
          flex-direction: row;
          gap: 10px;
          font-size: 20px;
          align-items: center;
        }
        .list-title{
          font-weight: 600;
          color: #646464
        }
        a{
          font-weight:600;
          color:black;
          transition: all 0.15s;
        }
        a:hover{
          color: #76ba99;
        }
        .opt-box{
          display:flex;
          flex-direction: column;
          justify-content: start;
          width:100%;
          border:1px solid black;
          border-radius:10px;
          padding: 20px 20px 0px 20px; 
          font-size: 20px;
        }
        .select-box{
          display:flex;
          justify-content:space-between;
        }
        .select-box div{
          cursor:pointer;
        }
        .opt-box ul{
          display:flex;
          flex-direction:column;
          gap:5px;
        }
        .unfold{
          display:none;
        }
      `}</style>
    </div>
  );
}
