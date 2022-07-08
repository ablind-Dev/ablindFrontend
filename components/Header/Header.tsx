import NavBar from "./NavBar";
import Auth from "./Auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";

interface ThemeState {
  theme: boolean; //true: white theme | false: black theme
}

export default function Header() {
  const router = useRouter();
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilThemeState);
  const defaultState: ThemeState = { ...recoilInfo };
  const backgroundColor = defaultState.theme ? "white" : "black";
  const logoColor = defaultState.theme ? "black" : "white";

  return (
    <div className="container">
      <Auth />
      <div className="logo-box">
        <Link href="/">
          <a className="logo">Ablind</a>
        </Link>
      </div>
      <NavBar />
      <style jsx>{`
        .container {
          padding-bottom: 25px;
          background-color: ${backgroundColor};
          transition: all 0.25s;
        }
        .logo-box {
          display: flex;
          justify-content: center;
        }
        .logo {
          text-decoration: none;
          color: ${logoColor};
          font-size: 36px;
          font-weight: bold;
          text-align: center;
          padding: 0px 0px 15px 0px;
          transition: all 0.25s;
      `}</style>
    </div>
  );
}
