import Router from "next/router";

interface Goods {
  id: number;
  img: string;
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
      <div className="img" onClick={() => onClickItemHandler()} />
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
          background-image: url(${img});
          background-size: cover;
          background-position: center;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
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
