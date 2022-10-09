import { useState, useEffect } from "react";
import axios from "axios";
import MainBannerItem from "./ManiBannerItem";
import first from "../../public/images/banners/banner_1.jpg";
import second from "../../public/images/banners/banner_2.jpg";
import third from "../../public/images/banners/banner_3.jpg";
import fourth from "../../public/images/banners/banner_4.jpg";
import fifth from "../../public/images/banners/banner_5.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface bannerItem {
  content: string;
  deleteImage: string;
  id: number;
  image: string;
  link: string;
}

export default function MainBannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const tmpInitBanner: Array<bannerItem> = [
    {
      content: "에이블라인드 웹 서비스\n10월 08일 배포 예정!",
      deleteImage:
        "https://magazine.brique.co/wp-content/uploads/2022/02/%EC%8B%9C%EB%AA%AC%EC%8A%A4-%EA%B7%B8%EB%A1%9C%EC%84%9C%EB%A6%AC-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-web.jpg",
      id: 0,
      image:
        "https://magazine.brique.co/wp-content/uploads/2022/02/%EC%8B%9C%EB%AA%AC%EC%8A%A4-%EA%B7%B8%EB%A1%9C%EC%84%9C%EB%A6%AC-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-web.jpg",
      link: "https://www.naver.com/",
    },
    {
      content: "집에 가고 싶다\n집에 가고 싶다...",
      deleteImage:
        "https://magazine.brique.co/wp-content/uploads/2022/02/%EC%8B%9C%EB%AA%AC%EC%8A%A4-%EA%B7%B8%EB%A1%9C%EC%84%9C%EB%A6%AC-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-web.jpg",
      id: 1,
      image:
        "https://magazine.brique.co/wp-content/uploads/2022/02/%EC%8B%9C%EB%AA%AC%EC%8A%A4-%EA%B7%B8%EB%A1%9C%EC%84%9C%EB%A6%AC-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-web.jpg",
      link: "https://www.naver.com/",
    },
  ];

  const [banners, setBanners] = useState<Array<bannerItem>>([]);

  const getBanner = () => {
    axios
      .get("http://www.ablind.co.kr/banner", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setBanners(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div className="container">
      <Slider {...settings} dotsClass="main-banner-dots">
        {banners.map((banner, index) => (
          <MainBannerItem
            content={banner.content}
            deleteImage={banner.deleteImage}
            image={banner.image}
            link={banner.link}
            key={banner.id}
          />
        ))}
      </Slider>
      <style jsx>{`
        .container {
          cursor: pointer;
          padding: 0px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
