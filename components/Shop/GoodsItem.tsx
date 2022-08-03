interface Goods {
  img: string;
  artist: string;
  name: string;
  price: number;
}

export default function GoodsItem(props: Goods) {
  const { img, artist, name, price } = props;
  return <></>;
}
