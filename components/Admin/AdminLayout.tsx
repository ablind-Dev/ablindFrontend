import { useState } from "react";
import BannerAdmin from "./BannerAdmin";
import GoodsAdmin from "./GoodsAdmin";
import QnaAdmin from "./QnaAdmin";
import OrderAdmin from "./OrderAdmin";
import ArtistAdmin from "./ArtistAdmin";
import SubscribeAdmin from "./SubscribeAdmin";
import UserAdmin from "./UserAdmin";
import ArtworkAdmin from "./ArtworkAdmin";

export default function AdminLayout() {
  const [category, setCategory] = useState("main-banner");
  return (
    <div className="container">
      <ul>
        <li
          className={category === "main-banner" ? "peek" : "none"}
          onClick={() => setCategory("main-banner")}
        >
          메인페이지 배너관리
        </li>
        <li
          className={category === "goods" ? "peek" : "none"}
          onClick={() => setCategory("goods")}
        >
          상품 관리
        </li>
        <li
          className={category === "qna" ? "peek" : "none"}
          onClick={() => setCategory("qna")}
        >
          QnA 관리
        </li>
        <li
          className={category === "order" ? "peek" : "none"}
          onClick={() => setCategory("order")}
        >
          주문 관리
        </li>
        <li
          className={category === "artist" ? "peek" : "none"}
          onClick={() => setCategory("artist")}
        >
          작가 관리
        </li>
        <li
          className={category === "subscribe" ? "peek" : "none"}
          onClick={() => setCategory("subscribe")}
        >
          구독자 관리
        </li>
        <li
          className={category === "user" ? "peek" : "none"}
          onClick={() => setCategory("user")}
        >
          회원 관리
        </li>
        <li
          className={category === "artwork" ? "peek" : "none"}
          onClick={() => setCategory("artwork")}
        >
          작품 관리
        </li>
      </ul>
      {category === "main-banner" ? (
        <BannerAdmin />
      ) : category === "goods" ? (
        <GoodsAdmin />
      ) : category === "qna" ? (
        <QnaAdmin />
      ) : category === "order" ? (
        <OrderAdmin />
      ) : category === "artist" ? (
        <ArtistAdmin />
      ) : category === "subscribe" ? (
        <SubscribeAdmin />
      ) : category === "user" ? (
        <UserAdmin />
      ) : category === "artwork" ? (
        <ArtworkAdmin />
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        ul {
          list-style-type: none;
          display: flex;
          gap: 10px;
        }
        li {
          padding: 5px 10px;
          cursor: pointer;
        }
        .peek {
          background-color: #76ba99;
          color: white;
          border: 1px solid #76ba99;
          font-weight: 700;
        }
        .none {
          background-color: white;
          color: black;
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
}
