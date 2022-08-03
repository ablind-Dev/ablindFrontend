import ShopBannerCarouselItem from "./ShopBannerCarouselItem";

interface Banner {
  img: string;
  content: string;
  url: string;
}

interface bannerProps {
  banners: Array<Banner>;
}

export default function ShopBannerCarousel(props: bannerProps) {
  const { banners } = props;
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
          /* position: absolute;
          top: 0px;
          left: 0px; */
        }
        .hype-box {
          display: flex;
          flex-direction: column;
          font-size: 72px;
          font-weight: 900;
          margin-top: -89px;
          padding-left: 45px;
          text-shadow: 1px 1px 1px rgba(32, 32, 32, 0.536);
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
