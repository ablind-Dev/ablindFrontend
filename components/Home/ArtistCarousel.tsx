import { useState, useEffect, useRef } from "react";
// import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ArtistCarouselItem from "./ArtistCarouselItem";
import dynamic from "next/dynamic";
// const Carousel = dynamic(() => import("react-spring-3d-carousel"), {
//   ssr: false,
// });

const Carousel = dynamic<{ inline?: boolean }>(
  () => import("react-spring-3d-carousel").then(),
  {
    ssr: false,
  }
);

interface Artist {
  artistId: number;
  intro: string; //intro
  name: string;
  profile: string; //이미지 url
}

interface carouselInterface {
  key: string;
  content: JSX.Element;
  onClick: () => void;
}

export default function ArtistCarousel() {
  const [artist, setArtists] = useState<Array<Artist>>();
  const [imgCarousel, setImgCarousel] = useState<Array<carouselInterface>>();
  const [goToSlide, setGoToSlide] = useState(0);
  const router = Router;

  const getArtistList = () => {
    axios
      .get("http://www.ablind.co.kr/artist", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setArtists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  useEffect(() => {
    getArtistList();
  }, []);

  useEffect(() => {
    let array = [];
    if (artist) {
      for (const value of artist) {
        const tmp = {
          key: uuidv4(),
          content: (
            <ArtistCarouselItem
              img={value.profile}
              name={value.name}
              title={value.intro}
            />
          ),
        };
        array.push(tmp);
      }
      const saveArray = array.map((arr, index) => {
        return { ...arr, onClick: () => setGoToSlide(index) };
      });
      setImgCarousel(saveArray);
    }
  }, [artist]);

  useInterval(() => {
    handleCaret("right");
  }, 5000);

  return (
    <div className="carousel-box">
      {artist && imgCarousel && artist.length > 0 ? (
        <>
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
        </>
      ) : (
        <></>
      )}
      <style jsx>{`
        .carousel-box {
          width: 80vw;
          height: 55vh;
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
      `}</style>
    </div>
  );
}

type IntervalFunction = () => unknown | void;
function useInterval(callback: IntervalFunction, delay: number | null) {
  const savedCallback = useRef<IntervalFunction | null>(null);

  useEffect(() => {
    if (delay === null) return;
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
