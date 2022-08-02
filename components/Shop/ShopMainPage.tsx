import { useState, useEffect } from "react";
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
  banners: Array<Banner>;
  goods: Array<Goods>;
}
export default function ShopManiPage(props: shopProps) {
  console.log(props);
  return <></>;
}
