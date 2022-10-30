import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";
import SubscribePage from "../../components/Subscribe/SubscribePage";

interface workType {
  id: number;
  work: string;
}

interface serverSideProps {
  artistId: number;
  name: string;
  works: Array<workType>;
}

interface coverProps {
  data: serverSideProps;
}

export default function Subscribe(props: coverProps) {
  const { data } = props;
  const { artistId, name, works } = data;
  const artworks = works.map((art) => art.work);
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  const router = useRouter();
  const temp = `${router.query.params}`;
  return (
    <>
      <Seo title={name} />
      <SubscribePage artistId={artistId} name={name} artworks={artworks} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const artistId = query.params;
    const res = await axios.get(`https://www.ablind.co.kr/artist/${artistId}`, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
    if (res.status === 200) {
      const artist = res.data;
      return {
        props: { data: artist },
      };
    }
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }

  //더미 데이터
  // const artwork: workType = {
  //   id: 1,
  //   work: "https://photo.akmall.com/image4/goods/96/53/97/54/96539754_M_1500.jpg",
  // };
  // const artist: serverSideProps = {
  //   artistId: 1,
  //   name: "강슬기",
  //   works: [
  //     artwork,
  //     artwork,
  //     artwork,
  //     artwork,
  //     artwork,
  //     artwork,
  //     artwork,
  //     artwork,
  //     artwork,
  //   ],
  // };
  // return {
  //   props: { data: artist },
  // };
};
