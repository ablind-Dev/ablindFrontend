import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";
import SubscribePage from "../../components/Subscribe/SubscribePage";

interface serverSideProps {
  name: string;
  artworks: Array<string>;
}

interface coverProps {
  data: serverSideProps;
}

export default function Subscribe(props: coverProps) {
  const { data } = props;
  const { name, artworks } = data;
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  const router = useRouter();
  const temp = `${router.query.params}`;
  return (
    <>
      <Seo title={temp} />
      <SubscribePage name={name} artworks={artworks} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //임시데이터
  const tmpData: serverSideProps = {
    name: "박환",
    artworks: [
      "https://www.fnnews.com/resource/media/image/2018/07/11/201807111619001689_l.jpg",
      "http://www.kbiznews.co.kr/news/photo/202006/68102_26376_5711.jpg",
      "https://www.fnnews.com/resource/media/image/2018/07/11/201807111619001689_l.jpg",
      "http://www.kbiznews.co.kr/news/photo/202006/68102_26376_5711.jpg",
      "https://www.fnnews.com/resource/media/image/2018/07/11/201807111619001689_l.jpg",
      "http://www.kbiznews.co.kr/news/photo/202006/68102_26376_5711.jpg",
      "https://www.fnnews.com/resource/media/image/2018/07/11/201807111619001689_l.jpg",
      "http://www.kbiznews.co.kr/news/photo/202006/68102_26376_5711.jpg",
      "https://www.fnnews.com/resource/media/image/2018/07/11/201807111619001689_l.jpg",
      "http://www.kbiznews.co.kr/news/photo/202006/68102_26376_5711.jpg",
      "https://www.fnnews.com/resource/media/image/2018/07/11/201807111619001689_l.jpg",
      "http://www.kbiznews.co.kr/news/photo/202006/68102_26376_5711.jpg",
      "https://www.fnnews.com/resource/media/image/2018/07/11/201807111619001689_l.jpg",
      "http://www.kbiznews.co.kr/news/photo/202006/68102_26376_5711.jpg",
    ],
  };
  return {
    props: {
      data: tmpData,
    },
  };
};
