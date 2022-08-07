import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilCategoryState } from "../../states/recoilCategoryState";
import GoodsItem from "./GoodsItem";
import Pagenation from "./Pagenation";

interface Goods {
  id: number;
  img: string;
  artist: string;
  name: string;
  price: number;
}
interface shopProps {
  goods: Array<Goods>;
}

interface CategoryState {
  category: string;
}

export default function GoodsComponent(props: shopProps) {
  const { goods } = props;
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilCategoryState);
  const defaultState: CategoryState = { ...recoilInfo };
  const [pages, setPages] = useState(1); //전체페이지 수
  const [curPage, setCurPage] = useState(1); //현재 몇 페이지인지
  const [pageContent, setPageContent] = useState<Array<Array<Goods>>>();
  const goodsSlice = (pages: number) => {
    let tmpGoods = [];
    for (let i = 0; i < pages - 1; i++) {
      tmpGoods.push(goods.splice(0, 16));
    }
    setPageContent(tmpGoods);
  };

  useEffect(() => {
    if (goods.length > 16) {
      const allPages = goods.length / 16 + 1;
      setPages(allPages);
      goodsSlice(allPages);
    }
  }, [goods]);

  useEffect(() => {
    if (pageContent) {
      console.log(pageContent[curPage]);
    }
  }, [curPage]);

  return (
    <div className="container">
      <span className="category-peek">{defaultState.category}</span>
      {pageContent ? (
        <div className="goods-box">
          {pageContent[curPage].map((content, index) => (
            <div className="goods">
              <GoodsItem
                id={content.id}
                img={content.img}
                artist={content.artist}
                name={content.name}
                price={content.price}
                key={index}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <div className="pagenation">
        <Pagenation pages={pages} setPage={setCurPage} />
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          padding-bottom: 100px;
        }
        .category-peek {
          margin-left: 26px;
          font-size: 24px;
          font-weight: 600;
          color: #76ba99;
        }
        .goods {
          width: 300px;
          height: 300px;
          padding-bottom: 40px;
        }
        .goods-box {
          padding-top: 30px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .pagenation {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
