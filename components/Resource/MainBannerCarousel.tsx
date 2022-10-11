import { useState, useEffect } from "react";
import axios from "axios";
import MainBannerItem from "./ManiBannerItem";
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

interface bannerProps {
  banners: Array<bannerItem>;
}

export default function MainBannerCarousel(props: bannerProps) {
  const { banners } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

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
