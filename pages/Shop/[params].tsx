import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";
import GoodsDetail from "../../components/GoodsDetail/GoodsDetail";

interface GoodsImg {
  url: string;
  id: number;
}

interface Option {
  id: number;
  itemOption: string;
}

interface goodsDetail {
  itemId: number;
  detailImg: string;
  images: Array<GoodsImg>;
  author: string;
  name: string;
  options: Array<Option>;
  price: number;
}

interface serversideProps {
  data: goodsDetail;
}

export default function ShopDetail(props: serversideProps) {
  const { itemId, detailImg, images, author, name, options, price } =
    props.data;
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  return (
    <>
      <Seo title={name} />
      <GoodsDetail
        itemId={itemId}
        images={images}
        name={name}
        author={author}
        price={price}
        option={options}
        detailImg={detailImg}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const itemId = query.params;
    const res = await axios.get(
      `https://www.ablind.co.kr/shop/detail/${itemId}`,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (res.status === 200) {
      const item = res.data;
      return {
        props: { data: item },
      };
    }
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }

  // 더미 데이터
  // const goods = {
  //   itemId: 1,
  //   images: [
  //     {
  //       url: "https://image.msscdn.net/images/goods_img/20160224/311051/311051_6_500.jpg?t=20200416114813",
  //       id: 1,
  //     },
  //     {
  //       url: "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_9_500.jpg",
  //       id: 2,
  //     },
  //     {
  //       url: "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_10_500.jpg",
  //       id: 3,
  //     },
  //     {
  //       url: "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_12_500.jpg",
  //       id: 4,
  //     },
  //     {
  //       url: "https://image.msscdn.net/images/prd_img/20160224/311051/detail_311051_13_500.jpg",
  //       id: 5,
  //     },
  //   ],
  //   name: "다채로운 분위기의 엽서 5종 세트 (★이벤트 5+1★)",
  //   author: "강슬기",
  //   price: 5000,
  //   option: [
  //     "오색 꽃 그림 엽서 5장",
  //     "우주의 별빛 엽서 5장",
  //     "따뜻한 색감의 엽서 5장",
  //     "랜덤엽서 5+1장 ",
  //   ],
  //   detailImg: "https://conversekorea.cafe24.com/converse/HO21/M9160C.jpg",
  // };

  // return {
  //   props: goods,
  // };
};
