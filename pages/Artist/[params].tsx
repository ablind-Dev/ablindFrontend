import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import Seo from "../../components/Seo";
import { useResetRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import { GetServerSideProps } from "next";

interface serverSideProps {
  title: string;
  subtitle: string;
  content: string;
  profile: string;
  youtube: string;
  detail: string;
  artworks: Array<string>;
}

export default function ArtistDetail() {
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
