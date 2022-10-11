import ShopBannerCarouselItem from "./ShopBannerCarouselItem";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";

interface Banner {
  content: string;
  id: number;
  image: string;
  link: string;
}

interface bannerProps {
  banners: Array<Banner>;
}

interface AuthState {
  state: boolean;
}

export default function ShopBannerCarousel(props: bannerProps) {
  const { banners } = props;
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const authState: AuthState = { ...recoilInfo };
  const [margin, setMargin] = useState(-89);
  const [bannerChange, setBannerChange] = useState(0);

  useEffect(() => {
    if (authState.state) {
      setMargin(-104);
    } else {
      setMargin(-89);
    }
  }, [recoilInfo]);

  useEffect(() => {
    setInterval(() => {
      setBannerChange((prev) => (prev < banners.length - 1 ? prev + 1 : 0));
    }, 7000);
  }, []);

  return (
    <div className="container">
      <div className="banner-box">
        <ShopBannerCarouselItem
          img={banners[bannerChange].image}
          content={banners[bannerChange].content}
          url={banners[bannerChange].link}
          key={banners[bannerChange].id}
        />
        <ul>
          {banners.map((banner, index) => (
            <li
              key={banner.id}
              className={bannerChange === index ? "selected" : "non-selected"}
              onClick={() => setBannerChange(index)}
            />
          ))}
        </ul>
      </div>
      <div className="hype-box">
        <span className="ablind">{"Ablind's Goods"}</span>
        <span className="shop">Shop</span>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
        }
        .banner-box {
          display: flex;
          flex-direction: row;
        }
        .hype-box {
          display: flex;
          flex-direction: column;
          font-size: 72px;
          font-weight: 900;
          padding-left: 45px;
          text-shadow: 1px 1px 1px rgba(32, 32, 32, 0.536);
          margin-top: ${margin}px;
        }
        .ablind {
          color: white;
        }
        .shop {
          color: #76ba99;
        }
        ul {
          position: absolute;
          list-style-type: none;
          display: flex;
          gap: 10px;
          bottom: 31%;
          right: 48px;
        }
        li {
          width: 10px;
          height: 10px;
          border-radius: 100%;
          cursor: pointer;
          transition: all 0.25s;
        }
        .selected {
          background-color: white;
          transform: scale(1.02);
        }
        .non-selected {
          background-color: #b3b3b3;
        }
      `}</style>
    </div>
  );
}
