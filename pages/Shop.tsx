import { useRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { useEffect } from "react";
import Seo from "../components/Seo";
import ShopMainPage from "../components/Shop/ShopMainPage";
import { GetServerSideProps } from "next";
import axios from "axios";

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
  console.log(props);

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
  // try {
  //   const res = await axios.get("http://www.ablind.co.kr/artist", {
  //     headers: {
  //       "Content-type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });

  //   if (res.status === 200) {
  //     const artists = res.data;
  //     return {
  //       props: { artists },
  //     };
  //   }
  //   return { props: {} };
  // } catch (err) {
  //   console.log(err);
  //   return { props: {} };
  // }

  //작가이름받아오기
  // try {
  //   const res = await axios.get("http://www.ablind.co.kr/artist", {
  //     headers: {
  //       "Content-type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });

  //   if (res.status === 200) {
  //     const artists = res.data;
  //     return {
  //       props: { artists },
  //     };
  //   }
  //   return { props: {} };
  // } catch (err) {
  //   console.log(err);
  //   return { props: {} };
  // }

  // const get = () => {

  // }

  //더미데이터
  const names = ["강슬기", "유아인", "신예찬", "최상엽", "이지은", "김민정"];
  const banner: Banner = {
    img: "https://magazine.brique.co/wp-content/uploads/2022/02/%EC%8B%9C%EB%AA%AC%EC%8A%A4-%EA%B7%B8%EB%A1%9C%EC%84%9C%EB%A6%AC-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-web.jpg",
    content: "신사 아르보떼\n팝업스토어 개장\n2022-07-31 ~ 2022-08-05",
    url: "https://www.instagram.com/p/CgvYuB-Jgvl/?utm_source=ig_web_copy_link",
  };
  const banners = [banner, banner, banner, banner, banner];

  const good: Goods = {
    img: "https://s3.marpple.co/files/u_1150555/2021/12/original/6227056c6620920423a1aceb1bc8ddf2775fc6bf1.jpg",
    artist: "강슬기",
    name: "다채로운 분위기의 엽서 5종세트",
    price: 5000,
  };
  const goods = [good, good, good, good, good, good, good];

  return {
    props: { names, banners, goods },
  };
};
