import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import Seo from "../components/Seo";
import HomeLayout from "../components/Home/HomeLayout";
import axios from "axios";

interface bannerItem {
  content: string;
  deleteImage: string;
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
  detailImg: string;
  images: Array<GoodsImg>;
  author: string;
  name: string;
  option: Array<string>;
  price: number;
}

interface Artist {
  artistId: number;
  intro: string; //intro
  name: string;
  profile: string; //이미지 url
}

interface serverSideProps {
  banners: Array<bannerItem>;
  items: Array<Goods>;
  artists: Array<Artist>;
}

// const Home: NextPage = () => {
//   const resetTheme = useResetRecoilState(recoilThemeState);
//   useEffect(() => {
//     resetTheme();
//   }, []);

//   return (
//     <div className="container">
//       <Seo title="Home" />
//       <HomeLayout />
//       <style jsx>{`
//         .container {
//           width: 100%;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

export default function Home(props: serverSideProps) {
  const resetTheme = useResetRecoilState(recoilThemeState);
  const { banners, items, artists } = props;

  useEffect(() => {
    resetTheme();
  }, []);

  return (
    <div className="container">
      <Seo title="Home" />
      <HomeLayout banners={banners} items={items} artists={artists} />
      <style jsx>{`
        .container {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const bannerRes = await axios.get("http://www.ablind.co.kr/banner", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const itemRes = await axios.get("http://www.ablind.co.kr/shop", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const artistRes = await axios.get("http://www.ablind.co.kr/artist", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (
      bannerRes.status === 200 &&
      itemRes.status === 200 &&
      artistRes.status === 200
    ) {
      const banners: Array<bannerItem> = bannerRes.data;
      const items: Array<Goods> =
        itemRes.data.length > 16 ? itemRes.data.slice(0, 16) : itemRes.data;
      const artists: Array<Artist> = artistRes.data;
      return {
        props: {
          banners: banners,
          items: items,
          artists: artists,
        },
      };
    }
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};
