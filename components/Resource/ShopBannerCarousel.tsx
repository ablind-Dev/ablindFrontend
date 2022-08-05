import ShopBannerCarouselItem from "./ShopBannerCarouselItem";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilAuthState } from "../../states/recoilAuthState";

interface Banner {
  img: string;
  content: string;
  url: string;
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

  useEffect(() => {
    if (authState.state) {
      setMargin(-104);
    } else {
      setMargin(-89);
    }
  }, [recoilInfo]);

  return (
    <div className="container">
      <ShopBannerCarouselItem
        img={banners[0].img}
        content={banners[0].content}
        url={banners[0].url}
      />
      <div className="hype-box">
        <span className="ablind">Ablind's Goods</span>
        <span className="shop">Shop</span>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
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
