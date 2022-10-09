import { useRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { useEffect } from "react";
import Seo from "../components/Seo";
import ShopMainPage from "../components/Shop/ShopMainPage";
import { GetServerSideProps } from "next";
import axios from "axios";

interface Banner {
  content: string;
  id: number;
  image: string;
  link: string;
}

interface GoodsImg {
  url: string;
  id: number;
}

interface Goods {
  itemId: number;
  category: string;
  detailImg: string;
  images: Array<GoodsImg>;
  author: string;
  name: string;
  option: Array<string>;
  price: number;
}

interface Artist {
  artistId: number;
  name: string;
  profile: string;
  intro: string;
}

interface serversideProps {
  names: Array<string>;
  banners: Array<Banner>;
  goods: Array<Goods>;
}

interface ThemeState {
  theme: string;
}

export default function Shop(props: serversideProps) {
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilThemeState);
  const defaultState: ThemeState = { ...recoilInfo };
  useEffect(() => {
    if (defaultState.theme) {
      defaultState.theme = "mix";
      setRecoilInfo(defaultState);
    }
  }, []);

  const { names, banners, goods } = props;

  return (
    <>
      <Seo title="Shop" />
      {banners && goods ? (
        <ShopMainPage artists={names} banners={banners} goods={goods} />
      ) : (
        <></>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const banners = await axios.get("http://www.ablind.co.kr/shop/banner", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const goods = await axios.get("http://www.ablind.co.kr/shop", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const artists = await axios.get("http://www.ablind.co.kr/artist", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (
      banners.status === 200 &&
      goods.status === 200 &&
      artists.status === 200
    ) {
      const bannerData: Array<Banner> = banners.data;
      const goodsData: Array<Goods> = goods.data;
      const artistsData: Array<string> = artists.data.map(
        (artist: Artist) => artist.name
      );
      return {
        props: { names: artistsData, banners: bannerData, goods: goodsData },
      };
    }
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }

  //더미데이터
  // const names = ["강슬기", "유아인", "신예찬", "최상엽", "이지은", "김민정"];
  // const banner: Banner = {
  //   id: 1,
  //   img: "https://magazine.brique.co/wp-content/uploads/2022/02/%EC%8B%9C%EB%AA%AC%EC%8A%A4-%EA%B7%B8%EB%A1%9C%EC%84%9C%EB%A6%AC-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-web.jpg",
  //   content: "신사 아르보떼\n팝업스토어 개장\n2022-08-01 ~ 2022-08-31",
  //   link: "https://www.instagram.com/p/CgvYuB-Jgvl/?utm_source=ig_web_copy_link",
  // };
  // const bannersec: Banner = {
  //   id: 2,
  //   img: "https://pds.joongang.co.kr/news/component/joongang_sunday/202202/12/e1203db9-e355-4612-8eca-78cdd52fb54d.jpg",
  //   content: "숭실대 창신관\n사무실 개장\n2022-01.01 ~ 2022-12-31",
  //   link: "https://www.instagram.com/p/CgvYuB-Jgvl/?utm_source=ig_web_copy_link",
  // };
  // const banners = [banner, bannersec];

  // const tmpImg: GoodsImg = {
  //   url: "https://s3.marpple.co/files/u_1150555/2021/12/original/6227056c6620920423a1aceb1bc8ddf2775fc6bf1.jpg",
  //   id: 1,
  // };

  // const secTmpImg: GoodsImg = {
  //   url: "https://s3.marpple.co/files/u_1150555/2021/12/original/31eca686f0dd678adbd12faf5b1d5f693fb405791.jpg",
  //   id: 2,
  // };

  // const good: Goods = {
  //   itemId: 1,
  //   detailImg: "",
  //   images: [tmpImg, tmpImg, tmpImg],
  //   author: "강슬기",
  //   name: "다채로운 분위기의 엽서 5종세트",
  //   option: ["하", "시발짜증나"],
  //   price: 5000,
  // };

  // const secGood: Goods = {
  //   itemId: 1,
  //   detailImg: "",
  //   images: [secTmpImg, secTmpImg, secTmpImg],
  //   author: "강슬기",
  //   name: "다채로운 분위기의 엽서 5종세트",
  //   option: ["하", "시발짜증나"],
  //   price: 5000,
  // };

  // const goods = [
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,

  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,

  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,

  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,

  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,

  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,

  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,

  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,

  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,

  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,

  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,

  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   good,
  //   secGood,
  //   secGood,
  //   good,
  //   good,
  //   secGood,
  // ];

  // return {
  //   props: { names, banners, goods },
  // };
};
