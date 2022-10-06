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
        setArtists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //더미데이터
    // const one: Artist = {
    //   artistId: 0,
    //   intro: "캠퍼스 라이프, 컨버스 앰버서더.", //intro
    //   subTitle: "캠퍼스 여신 - 컨버스 앰버서더 강슬기",
    //   content:
    //     "꼼데가르송의 레이 카와쿠보(Rei Kawakubo)와 뉴욕 그래픽 아티스트 필립 파고스키(Flip Pagowski)가 상상해낸\n독특한 하트-안드-아이 로고와, 컨버스의 클래식 아이콘인 척70이 만났습니다.\n심플하면서도 재치있는 협업으로 전세계적으로 주요한 스타일로 자리매김했습니다.",
    //   profile:
    //     "https://ablind-s3-bucket.s3.ap-northeast-2.amazonaws.com/firsrt/dummy_profile.jpg",
    //   backGround: "", //이미지 url
    //   youtube: "",
    //   detail: "", //이미지 url
    //   email: "abc@naver.com",
    //   works: [],
    // };
    // const two: Artist = {
    //   artistId: 0,
    //   intro: "둘이 될 수 없는 가상인간", //intro
    //   subTitle: "에스파 - 김민정",
    //   content:
    //     "타이틀 곡 ‘Girls’는 강렬한 워블 베이스와 거친 텍스처의 신스 사운드가 돋보이는 댄스곡으로, aespa 멤버들의 자신감 넘치는 보컬과 랩핑이 인상적이며, 가사에는 aespa와 æ-aespa가 ‘Black Mamba’와 본격적인 전투를 펼친 후, 더욱 성장한 모습으로 조력자 nævis와 함께 새로운 이야기를 이어가는 SMCU aespa 세계관의 시즌 1 마지막 에피소드를 담고 있다.\n또한 ‘Life’s Too Short’는 캐치한 기타 리프와 밝고 희망찬 보컬이 돋보이는 미디엄 템포의 팝 곡으로, 한 번뿐인 인생을 원하는 대로 후회 없이 즐기겠다는 긍정적인 포부를 담았다. 지난 4월 미국 최대 규모 야외 음악 축제 ‘코첼라’에서 선보인 곡이자, 6월 24일 공개된 aespa의 첫 번째 영어 싱글인 'Life’s Too Short' 영어 버전도 보너스 트랙으로 수록되어 있다.",
    //   profile:
    //     "https://image.fmkorea.com/files/attach/new2/20211225/3655109/3113058505/4195166827/b511fae513beedd8e90d951288b00420.jpg",
    //   backGround: "", //이미지 url
    //   youtube: "",
    //   detail: "", //이미지 url
    //   email: "abc@naver.com",
    //   works: [],
    // };
    // const three: Artist = {
    //   artistId: 0,
    //   intro: "슈퍼밴드2 출신 미스틱 아이돌", //intro
    //   subTitle: "아이돌 밴드 - 루시",
    //   content:
    //     "자유이자 동심 그리고 순수한 마음을 지닌 유년기를 뜻하는 ‘Childhood’는 이 모든 것을 잃지 않고자 하는 LUCY의 염원이 담긴 그들의 모토이자 아이덴티티이며, 초심 같은 단어이다.\n이번 앨범에서 그들은 장르에 국한되거나 규정되지 않은 다양한 시도를 통하여 자유로움과 에너지를 표현하며, 그들만의 꾸밈없고 현실적이고도 따뜻한 가사들이 이를 뒷받침 한다.",
    //   profile: "https://pbs.twimg.com/media/FabbVURaIAIoFdz.jpg",
    //   backGround: "", //이미지 url
    //   youtube: "",
    //   detail: "", //이미지 url
    //   email: "abc@naver.com",
    //   works: [],
    // };
    // const array = [];
    // setArtists(array);
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
