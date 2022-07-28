import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";
import ArtistDetailPage from "../../components/Artist/ArtistDetailPage";

interface workType {
  id: number;
  work: string;
}

interface serverSideProps {
  artistId: number;
  intro: string;
  name: string;
  subTitle: string;
  content: string;
  profile: string; //이미지 url
  backGround: string; //이미지 url
  youtube: string;
  detail: string; //이미지 url
  works: Array<workType>;
}

interface coverProps {
  data: serverSideProps;
}

export default function ArtistDetail(props: coverProps) {
  const { data } = props;
  const artworks = data.works.map((art) => art.work);
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);

  return (
    <>
      {data ? (
        <>
          <Seo title={data.name} />
          <ArtistDetailPage
            artistId={data.artistId}
            intro={data.intro}
            subtitle={data.subTitle}
            content={data.content}
            profile={data.profile}
            background={data.backGround}
            youtube={data.youtube}
            detail={data.detail}
            artworks={artworks}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const artistId = query.params;
    const res = await axios.get(`http://www.ablind.co.kr/artist/${artistId}`, {
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
};
