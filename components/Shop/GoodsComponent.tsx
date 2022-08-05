import { useState, useEffect } from "react";
import GoodsItem from "./GoodsItem";

interface Goods {
  img: string;
  artist: string;
  name: string;
  price: number;
}
interface shopProps {
  goods: Array<Goods>;
}

export default function GoodsComponent(props: shopProps) {
  const { goods } = props;
  const [pages, setPages] = useState(1); //전체페이지 수
  const [curPage, setCurPage] = useState(1); //현재 몇 페이지인지
  const [pageContent, setPageContent] = useState<Array<Goods>>();

  useEffect(() => {
    if (goods.length > 16) {
      const allPages = goods.length / 16 + 1;
      setPages(allPages);
      setPageContent(goods.slice(0, 16));
    } else {
      setPageContent(goods);
    }
  }, []);

  return (
    <div className="container">
      <span>전체</span>
      {pageContent ? (
        <div>
          {pageContent.map((content, index) => (
            <GoodsItem
              img={content.img}
              artist={content.artist}
              name={content.name}
              price={content.price}
              key={index}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
