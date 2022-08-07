import { useState, useEffect } from "react";
import ShopBannerCarousel from "../Resource/ShopBannerCarousel";
import SearchBox from "./SearchBox";
import Categories from "./Categories";
import GoodsComponent from "./GoodsComponent";

interface Banner {
  img: string;
  content: string;
  url: string;
}

interface Goods {
  img: string;
  artist: string;
  name: string;
  price: number;
}

interface shopProps {
  artists: Array<string>;
  banners: Array<Banner>;
  goods: Array<Goods>;
}

export default function ShopManiPage(props: shopProps) {
  const { artists, banners, goods } = props;

  return (
    <div className="container">
      <ShopBannerCarousel banners={banners} />
      <div className="search-box">
        <SearchBox advertise={"#한정판_유리컵 이벤트 진행중❤"} />
      </div>
      <div className="category-box">
        <Categories artists={artists} />
        <GoodsComponent goods={goods} />
      </div>
      <style jsx>{`
        .main-box {
          padding-top: 89px;
        }
        .search-box {
          display: flex;
          justify-content: end;
          padding-right: 45px;
          margin-top: -61.5px;
        }
        .category-box {
          display: flex;
          flex-direction: row;
          align-items: start;
          gap: 50px;
          padding: 50px 50px 0px 50px;
        }
      `}</style>
    </div>
  );
}
