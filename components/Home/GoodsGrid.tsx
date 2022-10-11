import { useState, useEffect } from "react";
import axios from "axios";
import GoodsItem from "./GoodsItem";

interface GoodsImg {
  url: string;
  id: number;
}

interface Goods {
  itemId: number;
  detailImg: string;
  images: Array<GoodsImg>;
  author: string;
  name: string;
  option: Array<string>;
  price: number;
}

interface gridGoods {
  image: string;
  itemId: number;
  name: string;
  author: string;
}

interface goodsProps {
  items: Array<Goods>;
}

export default function GoodsGrid(props: goodsProps) {
  const [viewItem, setViewItem] = useState<Array<gridGoods>>([]);
  const [length, setLength] = useState(0);
  const { items } = props;

  const setGridItems = () => {
    let newItem: Array<gridGoods> = [];
    if (items) {
      items.map((item, index) =>
        newItem.push({
          image: item.images[0].url,
          itemId: item.itemId,
          name: item.name,
          author: item.author,
        })
      );
    }
    setViewItem(newItem);
    setLength(newItem.length);
  };

  useEffect(() => {
    items ? setGridItems() : null;
  }, []);

  return (
    <div className="container">
      {viewItem ? (
        viewItem.map((item, index) => (
          <GoodsItem
            key={item.itemId}
            image={item.image}
            name={item.name}
            itemId={item.itemId}
            author={item.author}
          />
        ))
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 80vw;
          height: ${length < 5
            ? "20vw"
            : length < 9
            ? "40vw"
            : length < 13
            ? "60vw"
            : "80vw"};
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: ${length < 5
            ? "1fr"
            : length < 9
            ? "1fr 1fr"
            : length < 13
            ? "1fr 1fr 1fr"
            : "1fr 1fr 1fr 1fr"};
          row-gap: 20px;
          column-gap: 20px;
        }
      `}</style>
    </div>
  );
}
