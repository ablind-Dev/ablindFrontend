import ArtistTab from "../components/Artist/ArtistTab";
import { GetServerSideProps } from "next";
import Seo from "../components/Seo";

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
  // const res = await axios.get(`https://localholst:3065/user`)
  // const data = res.data
  // return { props: { data } }
  // 임시 데이터
  const first: Artist = {
    artistId: 12345,
    name: "유아인",
    profile: "https://img.hankyung.com/photo/202006/BF.22832377.1-1200x.jpg",
    intro: "대체 불가능한,\n최고의 배우.",
  };
  const second: Artist = {
    artistId: 6789,
    name: "김현정",
    profile: "https://t1.daumcdn.net/cfile/tistory/99289D4F5EFED7F60C",
    intro: "퀸덤2 우승,\n우주소녀 김설아!!!",
  };
  const third: Artist = {
    artistId: 101112,
    name: "김민정",
    profile:
      "https://www.aespaclub.com/wp-content/uploads/2021/12/269857043_2430429203761332_3956040017795462405_n.jpg",
    intro: "에스파 곧 컴백,\n이준규 매우 기대중...",
  };
  const fourth: Artist = {
    artistId: 131415,
    name: "정수정",
    profile:
      "https://i.pinimg.com/736x/a4/23/d6/a423d6fda93ac1344bcdfd18059a949a.jpg",
    intro: "올타임 레전드는\n두덩이뿌니야...",
  };
  const fifth: Artist = {
    artistId: 161718,
    name: "장기용",
    profile:
      "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/PPFKL3FQMHB64Q3T2BUF6OF3SE.jpg",
    intro: "아니 사람이\n어떻게 이렇게 생겼지?..",
  };
  const sixth: Artist = {
    artistId: 192021,
    name: "호시",
    profile:
      "https://img.tvreportcdn.de/cms-content/uploads/2021/07/31/dcd06545-4c65-4549-b3ed-47a26d4a8ff6.jpg",
    intro: "10시10분\n멋쟁이호랑이처럼",
  };
  const artists = [first, second, third, fourth, fifth, sixth];
  return {
    props: {
      artists,
    },
  };
};
