import { useState, useRef, useEffect } from "react";
import PageMoveSticker from "../Resource/PageMoveSticker";
import TitleImgBox from "./TitleImgBox";
import TitleInfoBox from "./TitleInfoBox";
import GoodsNav from "./GoodsNav";
import Content from "./Content";
import Review from "./Review";
import Qna from "./Qna";
import Api from "../Auth/CustomApi";

interface GoodsImg {
  url: string;
  id: number;
}

interface Option {
  id: number;
  itemOption: string;
}

interface goodsDetail {
  itemId: number;
  detailImg: string;
  images: Array<GoodsImg>;
  author: string;
  name: string;
  option: Array<Option>;
  price: number;
}

interface basicInfo {
  image: string; //프사
  email: string;
  phoneNumber: string;
  name: string;
  role: string; //회원인지 예술가인지 관리자인지
  address: string; //&로 분류
  account: string; //은행
  account_name: string; //계좌번호
}

export default function GoodsDetail(props: goodsDetail) {
  const { itemId, detailImg, images, author, name, option, price } = props;
  const [nav, setNav] = useState(0);
  const reviewRef = useRef<HTMLDivElement>(null);
  const reviewLinkClick = () => {
    setNav(1);
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [info, setInfo] = useState<basicInfo>();
  const getMyProfile = () => {
    Api.get("http://www.ablind.co.kr/mypage", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteGoods = () => {
    if (confirm("진짜 삭제할거에요? 복구 안됨")) {
      Api.delete(`http://www.ablind.co.kr/admin/delete/item`, {
        headers: {
          "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
        },
        data: {
          itemId: itemId,
        },
      })
        .then((res) => {
          alert("삭제완료");
        })
        .catch((res) => {
          console.log(res);
          alert("삭제실패");
        });
    }
  };

  const deleteAnswer = (id: number) => {
    if (info && info.role === "ADMIN") {
      if (confirm("진짜 삭제할거에요? 복구 안됨")) {
        Api.delete(`http://www.ablind.co.kr/admin/list/qna/answer/delete`, {
          headers: {
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
          data: {
            qnaBoardId: id,
          },
        })
          .then((res) => {
            alert("삭제완료");
          })
          .catch((res) => {
            console.log(res);
            alert("삭제실패");
          });
      }
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div className="container">
      <PageMoveSticker />
      {info ? (
        info.role === "ADMIN" ? (
          <button onClick={() => deleteGoods()}>
            상품 삭제 _ 관리자만 보여요~
          </button>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <div className="upper-box">
        <TitleImgBox imgs={images} />
        <TitleInfoBox
          itemId={itemId}
          name={name}
          artist={author}
          price={price}
          option={option}
          reviewLinkClick={reviewLinkClick}
        />
      </div>
      <GoodsNav nav={nav} setNav={setNav} />
      <div className="content-box" ref={reviewRef}>
        {nav === 0 ? (
          <Content detailImg={detailImg} />
        ) : nav === 1 ? (
          <Review goodsId={itemId} />
        ) : (
          <Qna goodsId={itemId} deleteAnswer={deleteAnswer} />
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 50px 0px 100px 0px;
          gap: 100px;
        }
        .upper-box {
          display: flex;
          flex-direction: row;
          gap: 100px;
        }
        .content-box {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
