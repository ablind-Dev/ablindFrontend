import Router from "next/router";
import Image from "next/image";
import goodsdefault from "../../public/images/goodsdefault.png";

interface GoodsImg {
  url: string;
  id: number;
}

interface Goods {
  id: number;
  img: Array<GoodsImg>;
  artist: string;
  name: string;
  price: number;
}

export default function GoodsItem(props: Goods) {
  const { id, img, artist, name, price } = props;
  const router = Router;
  const onClickItemHandler = () => {
    router.push(`/Shop/${id}`);
  };
  return (
    <div className="box">
      <div className="img" onClick={() => onClickItemHandler()}>
        {img.length !== 0 ? (
          <Image
            src={img[0].url}
            loading="lazy"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image
            src={goodsdefault}
            loading="lazy"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <span className="artist">{artist}</span>
      <div className="info" onClick={() => onClickItemHandler()}>
        <span>{name}</span>
        <span>{price}</span>
      </div>
      <style jsx>{`
        .box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .img {
          width: 80%;
          height: 80%;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          position: relative;
          cursor: pointer;
        }
        span {
          font-size: 15px;
        }
        .artist {
          background-color: #76ba99;
          color: white;
          padding: 3px 5px;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
