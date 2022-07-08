import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";

interface Artist {
  name: string;
  profile: string;
  intro: string;
}

interface ThemeState {
  theme: boolean; //true: white theme | false: black theme
}

export default function ArtistTab() {
  const title = "Ablind's Artist";
  const subtitle =
    "세상이 ‘할 수 없다’고 말할 때, 결과로 보여준 이들이 있습니다.\nablind의 불가능을 가능으로 바꾼 예술가들이 바로 그 사람들이죠.\n이 곳에서 당신의 예술가를 만나보세요.";

  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilThemeState);
  const defaultState: ThemeState = { ...recoilInfo };
  useEffect(() => {
    defaultState.theme = false;
    setRecoilInfo(defaultState);
  }, []);

  //임시 데이터
  const first: Artist = {
    name: "유아인",
    profile: "https://img.hankyung.com/photo/202006/BF.22832377.1-1200x.jpg",
    intro: "대체 불가능한,\n최고의 배우.",
  };
  const second: Artist = {
    name: "김현정",
    profile: "https://t1.daumcdn.net/cfile/tistory/99289D4F5EFED7F60C",
    intro: "퀸덤2 우승,\n우주소녀 김설아!!!",
  };
  const third: Artist = {
    name: "김민정",
    profile:
      "https://www.aespaclub.com/wp-content/uploads/2021/12/269857043_2430429203761332_3956040017795462405_n.jpg",
    intro: "에스파 곧 컴백,\n이준규 매우 기대중...",
  };
  const fourth: Artist = {
    name: "정수정",
    profile:
      "https://i.pinimg.com/736x/a4/23/d6/a423d6fda93ac1344bcdfd18059a949a.jpg",
    intro: "올타임 레전드는\n두덩이뿌니야...",
  };
  const fifth: Artist = {
    name: "장기용",
    profile:
      "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/PPFKL3FQMHB64Q3T2BUF6OF3SE.jpg",
    intro: "아니 사람이\n어떻게 이렇게 생겼지?..",
  };
  const sixth: Artist = {
    name: "호시",
    profile:
      "https://img.tvreportcdn.de/cms-content/uploads/2021/07/31/dcd06545-4c65-4549-b3ed-47a26d4a8ff6.jpg",
    intro: "10시10분\n멋쟁이호랑이처럼",
  };
  const artists = [first, second, third, fourth, fifth, sixth];

  //스크롤 페이드 애니메이션

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">{title}</span>
        <span className="subtitle">{subtitle}</span>
      </div>
      <div className="name-box">
        {artists.map((artist, index) => (
          <div key={index} className="name">
            {artist.name}
          </div>
        ))}
      </div>
      <div className="artist-box">
        {artists.map((artist, index) => (
          <div key={index} className="artist">
            <img src={artist.profile} alt={artist.name} />
            <div className="hover-box">
              <span className="artist-name">작가 {artist.name}</span>
              <span className="artist-intro">{artist.intro}</span>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          white-space: pre-wrap;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 80px;
          padding: 100px 0px 100px 0px;
          background-color: black;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          color: white;
        }
        .title-box {
          text-align: center;
        }
        .title {
          font-size: 22px;
          font-weight: bold;
        }
        .subtitle {
          line-height: 25px;
        }
        .name-box {
          display: flex;
          flex-direction: row;
          gap: 20px;
          justify-content: center;
          padding-bottom: 20px;
        }
        .name {
          cursor: pointer;
          color: white;
          transition: all 0.25s;
        }
        .name:hover {
          color: #76ba99;
        }
        .artist-box {
          display: flex;
          flex-direction: row;
          gap: 40px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .artist {
          width: 300px;
          height: 420px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }

        .artist img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .hover-box {
          position: absolute;
          width: 300px;
          height: 420px;
          top: 0px;
          left: 0px;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(5.5px);
          -webkit-backdrop-filter: blur(5.5px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 20px;
          cursor: pointer;
          opacity: 0;
          transition: all 0.25s linear;
        }
        .artist-name {
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          font-size: 22px;
          font-weight: 700;
        }
        .artist-intro {
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          font-size: 18px;
          padding-top: 6px;
        }

        .artist:hover .hover-box {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
