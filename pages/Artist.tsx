import ArtistTab from "../components/Artist/ArtistTab";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Seo from "../components/Seo";
import axios from "axios";

interface Artist {
  artistId: number;
  name: string;
  profile: string;
  intro: string;
}

interface staticPropsType {
  artists: Array<Artist>;
}

export default function Artist(props: staticPropsType) {
  const { artists } = props;

  return (
    <>
      <Seo title="Artist" />
      <ArtistTab artists={artists} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axios.get("http://www.ablind.co.kr/artist", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      const artists = res.data;
      return {
        props: { artists },
      };
    }
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }

  //더미 데이터
  // const artist: Artist = {
  //   artistId: 1,
  //   name: "강슬기",
  //   profile:
  //     "https://blog.kakaocdn.net/dn/cyxO85/btqZ1JefDo7/gchehboJxQPqK9UZibrnpk/img.jpg",
  //   intro: "캠퍼스 라이프,\n컨버스 앰버서더.",
  // };

  // const artists = [
  //   artist,
  //   artist,
  //   artist,
  //   artist,
  //   artist,
  //   artist,
  //   artist,
  //   artist,
  // ];

  // return {
  //   props: { artists },
  // };
};
