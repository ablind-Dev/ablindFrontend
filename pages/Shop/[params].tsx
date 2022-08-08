import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";
import GoodsDetail from "../../components/GoodsDetail/GoodsDetail";

interface goodsDetail {
  imgs: Array<string>;
  name: string;
  artist: string;
  price: number;
  naver: string;
  option: Array<string>;
  content: string;
}

export default function ShopDetail(props: goodsDetail) {
  const { imgs, name, artist, price, naver, option, content } = props;
  console.log(props);
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  return (
    <>
      <Seo title={name} />
      <GoodsDetail
        imgs={imgs}
        name={name}
        artist={artist}
        price={price}
        naver={naver}
        option={option}
        content={content}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const goodsParams = query.params;
  // 더미 데이터
  const goods = {
    imgs: [
      "https://image.msscdn.net/images/goods_img/20160224/311051/311051_6_500.jpg?t=20200416114813",
      "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_9_500.jpg",
      "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_10_500.jpg",
      "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_12_500.jpg",
      "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_13_500.jpg",
    ],
    name: "다채로운 분위기의 엽서 5종 세트 (★이벤트 5+1★)",
    artist: "강슬기",
    price: 5000,
    naver: "https://smartstore.naver.com/ablind",
    option: [
      "오색 꽃 그림 엽서 5장",
      "우주의 별빛 엽서 5장",
      "따뜻한 색감의 엽서 5장",
      "랜덤엽서 5+1장 ",
    ],
    content: "https://conversekorea.cafe24.com/converse/HO21/M9160C.jpg",
  };
  return {
    props: goods,
  };
};
