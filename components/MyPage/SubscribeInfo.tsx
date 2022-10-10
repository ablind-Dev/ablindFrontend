import Api from "../Auth/CustomApi";
import { useState, useEffect } from "react";
import Image from "next/image";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import SubscribeCard from "./SubscribeCard";
import Router from "next/router";
import NoSubscribe from "./NoSubscribe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

interface Artist {
  artistId: number;
  intro: string; //intro
  subTitle: string;
  content: string;
  profile: string; //이미지 url
  backGround: string; //이미지 url
  youtube: string;
  detail: string; //이미지 url
  email: string;
  works: Array<string>;
}

interface carouselInterface {
  key: string;
  content: JSX.Element;
  onClick: () => void;
}

export default function SubscribeInfo() {
  const [artist, setArtists] = useState<Array<Artist>>();
  const [imgCarousel, setImgCarousel] = useState<Array<carouselInterface>>();
  const [goToSlide, setGoToSlide] = useState(0);
  const router = Router;

  const getMyArtist = async () => {
    await Api.get("http://www.ablind.co.kr/mypage/follow/artist", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log(res);
        setArtists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyArtist();
  }, []);

  useEffect(() => {
    let array = [];
    if (artist) {
      for (const value of artist) {
        const tmp = {
          key: uuidv4(),
          content: <SubscribeCard img={value.profile} />,
        };
        array.push(tmp);
      }
      const saveArray = array.map((arr, index) => {
        return { ...arr, onClick: () => setGoToSlide(index) };
      });
      setImgCarousel(saveArray);
    }
  }, [artist]);

  const goToArtistPage = (id: number) => {
    router.push(`/Artist/${id}`);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("작가님의 이메일 주소가 클립보드에 복사되었습니다.");
    } catch (error) {
      alert("클립보드 복사에 실패하였습니다.");
    }
  };

  const handleCaret = (direction: string) => {
    if (imgCarousel) {
      if (direction === "left") {
        setGoToSlide((prev) =>
          prev === 0 ? imgCarousel.length - 1 : prev - 1
        );
      } else {
        setGoToSlide((prev) =>
          prev === imgCarousel.length - 1 ? 0 : prev + 1
        );
      }
    }
  };

  return (
    <div className="box">
      {artist && imgCarousel && artist.length > 0 ? (
        <>
          <div className="carousel-box">
            <Carousel
              slides={imgCarousel}
              goToSlide={goToSlide}
              offsetRadius={2}
              showNavigation={false}
              animationConfig={config.gentle}
            />
            <button className="left" onClick={() => handleCaret("left")}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <button className="right" onClick={() => handleCaret("right")}>
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </div>
          <div className="artist-box">
            <div className="badge">supporter</div>
            <div className="title-box">
              <span className="title">{artist[goToSlide].intro}</span>
              <span className="subtitle">{artist[goToSlide].subTitle}</span>
            </div>
            <span className="content">{artist[goToSlide].content}</span>
            <div className="btns">
              <button
                onClick={() => goToArtistPage(artist[goToSlide].artistId)}
              >
                Artist Page
              </button>
              <button>Meta-Exhibition</button>
              <button
                onClick={() => handleCopyClipBoard(artist[goToSlide].email)}
              >
                Contact
              </button>
              <button>Unfollow</button>
            </div>
          </div>
        </>
      ) : (
        <NoSubscribe />
      )}

      <style jsx>{`
        .box {
          padding-right: 20px;
        }
        .carousel-box {
          width: 60%;
          height: 600px;
          margin: 0px auto;
          position: relative;
        }
        .left,
        .right {
          position: absolute;
          border: none;
          background-color: #434343;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          color: white;
          font-size: 24px;
          width: 32px;
          height: 32px;
          border-radius: 100%;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .left {
          left: -50px;
        }
        .right {
          right: -50px;
        }
        .badge {
          background-color: #76ba99;
          padding: 5px 8px;
          color: white;
          font-weight: 600;
          border-radius: 3px;
          cursor: default;
        }
        .artist-box {
          display: flex;
          flex-direction: column;
          align-items: start;
          white-space: pre-line;
          gap: 20px;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .title {
          font-size: 42px;
          font-weight: 900;
        }
        .subtitle {
          font-size: 32px;
          font-weight: 700;
        }
        .content {
          font-size: 18px;
        }
        .btns {
          display: flex;
          gap: 10px;
        }
        .btns button {
          background: none;
          border: 2px solid black;
          padding: 10px 15px;
          border-radius: 7px;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btns button:hover {
          background-color: #76ba99;
          border: 2px solid #76ba99;
          color: white;
        }
      `}</style>
    </div>
  );
}
