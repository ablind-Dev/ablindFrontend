import axios from "axios";
import { useState, useEffect } from "react";
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
  const [artworks, setArtworks] = useState([""]);
  const resetTheme = useResetRecoilState(recoilThemeState);
  useEffect(() => {
    resetTheme();
    if (data) {
      const getWorks = data.works.map((art) => art.work);
      setArtworks(getWorks);
    }
  }, [data]);

  return (
    <>
      {artworks[0] !== "" ? (
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

  //더미데이터
  // const artwork: workType = {
  //   id: 1,
  //   work: "https://photo.akmall.com/image4/goods/96/53/97/54/96539754_M_1500.jpg",
  // };
  // const artist = {
  //   artistId: 1,
  //   intro: "캠퍼스 라이프,\n컨버스 앰버서더.",
  //   name: "강슬기",
  //   subTitle: "캠퍼스 여신 - 컨버스 앰버서더 강슬기",
  //   content:
  //     "꼼데가르송의 레이 카와쿠보(Rei Kawakubo)와 뉴욕 그래픽 아티스트 필립 파고스키(Flip Pagowski)가 상상해낸\n독특한 하트-안드-아이 로고와, 컨버스의 클래식 아이콘인 척70이 만났습니다.\n심플하면서도 재치있는 협업으로 전세계적으로 주요한 스타일로 자리매김했습니다.",
  //   profile:
  //     "https://blog.kakaocdn.net/dn/cyxO85/btqZ1JefDo7/gchehboJxQPqK9UZibrnpk/img.jpg", //이미지 url
  //   backGround:
  //     "https://static.shoeprize.com/shoestory/banner/None/banner-47b0f8c8-a99a-11ec-b0f7-02b278c3e540.jpg",
  //   youtube: "https://youtu.be/f6UEdRyLI9c",
  //   detail:
  //     "https://image.musinsa.com/images/prd_img/2020022521594600000009869.jpg",
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
