import { useState, useEffect } from "react";
import ShopBannerCarousel from "../Resource/ShopBannerCarousel";
import SearchBox from "./SearchBox";
import Categories from "./Categories";
import GoodsComponent from "./GoodsComponent";
import { useRecoilState } from "recoil";
import { recoilCategoryState } from "../../states/recoilCategoryState";
import { CategoryArray } from "../Resource/CategoryArray";

interface Banner {
  content: string;
  id: number;
  img: string;
  link: string;
}

interface GoodsImg {
  url: string;
  id: number;
}

interface Goods {
  itemId: number;
  category: string;
  detailImg: string;
  images: Array<GoodsImg>;
  author: string;
  name: string;
  option: Array<string>;
  price: number;
}

interface shopProps {
  artists: Array<string>;
  banners: Array<Banner>;
  goods: Array<Goods>;
}

interface CategoryState {
  category: string;
}

export default function ShopManiPage(props: shopProps) {
  const { artists, banners, goods } = props;
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilCategoryState);
  const [goodsArr, setGoodsArr] = useState<Array<Goods>>(goods);

  const goodsClassify = () => {
    if (CategoryArray.includes(recoilInfo.category)) {
      //카테고리 이름으로 분류
      classifyByCategory();
    } else {
      //작가이름으로 분류
      classifyByName();
    }
  };

  const classifyByCategory = () => {
    const newArr: Array<Goods> = goods.filter(
      (good) => good.category === recoilInfo.category
    );
    setGoodsArr(newArr);
  };

  const classifyByName = () => {
    const newArr: Array<Goods> = goods.filter(
      (good) => good.name === recoilInfo.category
    );
    setGoodsArr(newArr);
  };

  useEffect(() => {
    if (recoilInfo.category === "전체") {
      setGoodsArr(goods);
    } else {
      goodsClassify();
    }
  }, [recoilInfo]);

  return (
    <div className="container">
      <ShopBannerCarousel banners={banners} />
      <div className="search-box">
        <SearchBox advertise={"작품 또는 작가명을 검색해주세요❤"} />
      </div>
      <div className="category-box">
        <Categories artists={artists} />
        <GoodsComponent goods={goodsArr} />
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
