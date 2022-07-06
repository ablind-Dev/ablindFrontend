import Image from "next/image";
import first from "../public/images/banners/banner_1.jpg";
import second from "../public/images/banners/banner_2.jpg";
import third from "../public/images/banners/banner_3.jpg";
import fourth from "../public/images/banners/banner_4.jpg";
import fifth from "../public/images/banners/banner_5.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainBannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  return (
    <div className="container">
      <Slider {...settings}>
        <Image src={first} />
        <Image src={second} />
        <Image src={third} />
        <Image src={fourth} />
        <Image src={fifth} />
      </Slider>
      <style jsx>{`
        .container {
          overflow: hidden;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
