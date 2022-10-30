import Image from "next/image";
import { MoneyWonReg } from "../Resource/MoneyWonReg";
import Router from "next/router";
import { useState, ComponentProps, DOMAttributes } from "react";
import Api from "../Auth/CustomApi";
import BasicModal from "../Resource/BasicModal";
import MakeReviewModal from "./MakeReviewModal";

interface goods {
  count: number;
  id: number;
  itemOption: string;
  orderPrice: number;
  name: string;
  img: string;
  itemId: number;
  review: boolean;
}

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;
export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function OrderDetailItem(props: goods) {
  const { count, id, itemOption, orderPrice, name, img, itemId, review } =
    props;
  const router = Router;

  //모달 관련 함수들
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRate, setReviewRate] = useState(5);
  const [attachment, setAttachment] = useState("");
  const [reviewImg, setReviewImg] = useState("");
  const [imgFile, setImgFile] = useState<File>();

  const handleOnChange: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        setReviewImg(value);
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setAttachment(result);
          setImgFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveModal = async () => {
    if (reviewTitle === "" || reviewContent === "" || reviewRate === 0) {
      alert("모든 내용을 기입해주세요.");
    } else {
      const reviewForm = {
        title: reviewTitle,
        content: reviewContent,
        rate: reviewRate,
      };
      const blob = new Blob([JSON.stringify(reviewForm)], {
        type: "application/json",
      });
      const multipartFile = new FormData();
      imgFile ? multipartFile.append("file", imgFile) : null;
      multipartFile.append("ItemReviewDto", blob);
      await Api.post(
        `https://www.ablind.co.kr/shop/${itemId}/review`,
        multipartFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          alert("리뷰 작성이 완료되었습니다.");
          setReviewTitle("");
          setReviewContent("");
          closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="item-box">
      <div
        className="img-box"
        onClick={() => {
          router.push(`/${itemId}`);
        }}
      >
        <Image src={img} layout="fill" objectFit="cover" />
      </div>
      <div className="info-box">
        <span className="name">{name}</span>
        <span className="option-count">
          {itemOption} {count}개
        </span>
        <span className="price">{MoneyWonReg(orderPrice)} 원</span>
        {review ? (
          <button onClick={() => modalOpenHandler()}>리뷰 작성</button>
        ) : (
          <></>
        )}
      </div>
      <BasicModal
        open={modalOpen}
        close={closeModal}
        save={saveModal}
        header={`${name} 리뷰 등록`}
      >
        <MakeReviewModal
          title={reviewTitle}
          setTitle={setReviewTitle}
          content={reviewContent}
          setContent={setReviewContent}
          rate={reviewRate}
          setRate={setReviewRate}
          attachment={attachment}
          reviewImg={reviewImg}
          handleOnChange={handleOnChange}
        />
      </BasicModal>
      <style jsx>{`
        .item-box {
          display: flex;
          flex-direction: row;
          gap: 40px;
          width: 100%;
        }
        .img-box {
          width: 15vw;
          height: 15vw;
          position: relative;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 5px;
        }
        .name {
          font-size: 20px;
          font-weight: 700;
        }
        .option-count {
          color: #2b2b2b;
        }
        .price {
          font-size: 18px;
          font-weight: 700;
          color: #48735e;
          margin-top: 10%;
        }
        button {
          border: none;
          background-color: #76ba99;
          border-radius: 5px;
          padding: 5px 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
