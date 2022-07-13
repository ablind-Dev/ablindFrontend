import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";
import ArtistDetailPage from "../../components/Artist/ArtistDetailPage";

interface serverSideProps {
  artistId: number;
  title: string;
  subtitle: string;
  content: string;
  profile: string; //이미지 url
  background: string; //이미지 url
  youtube: string;
  detail: string; //이미지 url
  artworks: Array<string>;
}

interface coverProps {
  data: serverSideProps;
}

export default function ArtistDetail(props: coverProps) {
  const { data } = props;
  const {
    artistId,
    title,
    subtitle,
    content,
    profile,
    background,
    youtube,
    detail,
    artworks,
  } = data;
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  const router = useRouter();
  const temp = `${router.query.params}`;
  console.log(props);
  return (
    <>
      <Seo title={temp} />
      <ArtistDetailPage
        artistId={artistId}
        title={title}
        subtitle={subtitle}
        content={content}
        profile={profile}
        background={background}
        youtube={youtube}
        detail={detail}
        artworks={artworks}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //임시데이터
  const tmpData: serverSideProps = {
    artistId: 123,
    title: "시각장애 화가 박환",
    subtitle: "‘대체 불가능한, 대한민국 최고의 화가’",
    content:
      "못할 속잎나고, 찾아다녀도, 교향악이다.\n피고, 거선의 광야에서 가지에 사랑의 품었기 그러므로 설산에서 스며들어 피다.\n들어 위하여 품에 불러 몸이 뭇 무엇을 불어 부패뿐이다.\n투명하되 위하여 더운지라 천지는 광야에서 피가 싹이 남는 아니다.\n따뜻한 끓는 그들의 소금이라 우리 속에 봄바람이다.",
    profile:
      "http://file3.instiz.net/data/file3/2022/07/09/2/b/7/2b75173fc5fbcd406e05ecb418821091.jpg",
    background: "https://img.lovepik.com/photo/40164/6795.jpg_wh300.jpg",
    youtube: "https://youtu.be/dYRITmpFbJ4",
    detail:
      "https://www.saraminimage.co.kr/recruit/bbs_recruit2/hub_n_190821.png",
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
