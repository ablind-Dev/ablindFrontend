interface Goods {
  img: string;
  artist: string;
  name: string;
  price: number;
}

export default function GoodsItem(props: Goods) {
  const { img, artist, name, price } = props;
  return (
    <div>
      <div className="img" />
      <span>{artist}</span>
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
}
