import ShopBannerCarouselItem from "./ShopBannerCarouselItem";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";

interface Banner {
  content: string;
  id: number;
  img: string;
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
    }, 5000);
  }, []);

  return (
    <div className="container">
      <div className="banner-box">
        <ShopBannerCarouselItem
          img={banners[bannerChange].img}
          content={banners[bannerChange].content}
          url={banners[bannerChange].link}
          key={banners[bannerChange].id}
        />
      </div>
      <div className="hype-box">
        <span className="ablind">Ablind's Goods</span>
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
      `}</style>
    </div>
  );
}
