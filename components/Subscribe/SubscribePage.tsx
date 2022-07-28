import HorizonScrollCarousel from "../Resource/HorizonScrollCarousel";
import SubscribeCircleComponent from "./SubscribeCircleComponent";
import SubscribePaymentComponent from "./SubscribePaymentComponent";
import Router from "next/router";
import { useState, useEffect } from "react";
import BasicModal from "../Resource/BasicModal";
import SubscribeModal from "./SubscribeModal";
import Api from "../Auth/CustomApi";
import axios from "axios";

interface artistProps {
  artistId: number;
  name: string;
  artworks: Array<string>;
}

export default function SubscribePage(props: artistProps) {
  const { artistId, name, artworks } = props;
  const router = Router;
  const backPressed = () => {
    router.back();
  };

  //payment 선택 관련
  const [selected, setSelected] = useState(1);

  //구독하기 모달 관련
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [agree, setAgree] = useState(false);
  const [reject, setReject] = useState("");
  const [price, setPrice] = useState(0);

  const clickSubscribe = () => {
    if (localStorage.getItem("accessToken")) {
      setModalOpen(true);
    } else {
      if (confirm("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?")) {
        router.push("/SignIn");
      }
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    switch (selected) {
      case 0:
        setPrice(0);
        break;
      case 1:
        setPrice(3000);
        break;
      case 2:
        setPrice(5000);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  }, [selected]);

  const subscribe = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      await axios
        .post(
          `http://www.ablind.co.kr/artist/${artistId}/follow/${price}`,
          {
            email: localStorage.getItem("email"),
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              "ACCESS-TOKEN": token,
            },
          }
        )
        .then((res) => {
          closeModal();
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const saveModal = () => {
    //통신구문_구독하기
    if (selectedBank === "") setReject("은행을 선택해주세요.");
    else if (!agree) setReject("약관에 동의해주세요.");
    else {
      setReject("");
      subscribe();
    }
  };

  return (
    <div className="container">
      <span className="title">
        <span className="bold">{name} 작가</span> 구독하고,
        <br />
        다양한 혜택 받아보세요!
      </span>
      <HorizonScrollCarousel imgs={artworks} />
      <SubscribeCircleComponent />
      <span className="title">
        구독료는 ablind 예술가의 지속적인 수입이 되고,
        <br />더 훌륭한 작품을 만드는 기반이 됩니다.
      </span>
      <SubscribePaymentComponent
        selected={selected}
        setSelected={setSelected}
      />
      <div className="btn-box">
        <button onClick={() => backPressed()}>뒤로가기</button>
        <button onClick={() => clickSubscribe()}>구독하기</button>
      </div>
      <BasicModal
        open={modalOpen}
        close={closeModal}
        save={saveModal}
        header="작가 구독하기"
      >
        <SubscribeModal
          selectedStage={selected}
          setSelected={setSelected}
          artistName={name}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          agree={agree}
          setAgree={setAgree}
          reject={reject}
        />
      </BasicModal>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 120px 0px 100px 0px;
          gap: 150px;
        }
        .title {
          text-align: center;
          font-size: 1.2rem;
        }
        .bold {
          font-size: 2rem;
          font-weight: 700;
        }
        .btn-box {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          gap: 20px;
          padding-bottom: 80px;
        }
        .btn-box button {
          background-color: #00ff0000;
          padding: 10px 15px 10px 15px;
          font-size: 18px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: 2px solid black;
          color: black;
          transition: all 0.15s;
        }
        .btn-box button:hover {
          border: 2px solid #76ba99;
          background-color: #76ba99;
          color: white;
        }
      `}</style>
    </div>
  );
}
