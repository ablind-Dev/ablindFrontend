import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";

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

export default function ArtistDetail(props: serverSideProps) {
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
  }, []);
  const router = useRouter();
  const temp = `${router.query.params}`;
  console.log(temp);
  return (
    <>
      <Seo title={temp} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //임시데이터
  return {
    props: {},
  };
};
