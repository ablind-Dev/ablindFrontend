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
  return (
    <>
      <Seo title="Artist" />
      <ArtistTab artists={props.artists} />
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
};
