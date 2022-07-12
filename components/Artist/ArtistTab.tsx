import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";
import ArtistBackCarousel from "../Resource/ArtistBackCarousel";
import Router from "next/router";

interface Artist {
  artistId: number;
  name: string;
  profile: string;
  intro: string;
}

interface staticPropsType {
  artists: Array<Artist>;
}

interface ThemeState {
  theme: boolean; //true: white theme | false: black theme
}

export default function ArtistTab(props: staticPropsType) {
  const { artists } = props;

  const title = "Ablind's Artist";
  const subtitle =
    "세상이 ‘할 수 없다’고 말할 때, 결과로 보여준 이들이 있습니다.\nablind의 불가능을 가능으로 바꾼 예술가들이 바로 그 사람들이죠.\n이 곳에서 당신의 예술가를 만나보세요.";

  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilThemeState);
  const defaultState: ThemeState = { ...recoilInfo };
  useEffect(() => {
    defaultState.theme = false;
    setRecoilInfo(defaultState);
  }, []);

  const imgs = artists.map((img) => img.profile);

  const router = Router;
  const moveToArtist = (artist: Artist) => {
    router.push({
      pathname: `Artist/${artist.artistId}`,
    });
  };

  return (
    <div className="container">
      <div className="upper-box">
        <ArtistBackCarousel imgs={imgs} />
        <div className="title-box">
          <span className="title">{title}</span>
          <span className="subtitle">{subtitle}</span>
        </div>
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
          <div
            key={index}
            className="artist"
            onClick={() => moveToArtist(artist)}
          >
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
          gap: 200px;
          padding: 80px 0px 140px 0px;
          background-color: black;
          width: 100%;
        }
        .upper-box {
          width: 100%;
          position: relative;
        }
        .title-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 60px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .title {
          font-size: 42px;
          font-weight: bold;
          background-color: white;
          color: black;
          padding: 10px 15px 10px 15px;
        }
        .subtitle {
          line-height: 25px;
          text-shadow: 2px 2px 6px gray;
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
          max-width: 1320px;
          display: flex;
          flex-direction: row;
          gap: 40px;
          flex-wrap: wrap;
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
