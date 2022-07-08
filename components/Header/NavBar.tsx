import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { recoilThemeState } from "../../states/recoilThemeState";

interface ThemeState {
  theme: boolean; //true: white theme | false: black theme
}

export default function NavBar() {
  const router = useRouter();
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilThemeState);
  const defaultState: ThemeState = { ...recoilInfo };
  const color = defaultState.theme ? "#646464" : "white";
  return (
    <nav>
      <div className="container">
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : "non-active"}>
            Home
          </a>
        </Link>
        <Link href="/About">
          <a className={router.pathname === "/About" ? "active" : "non-active"}>
            About
          </a>
        </Link>
        <Link href="/Artist">
          <a
            className={router.pathname === "/Artist" ? "active" : "non-active"}
          >
            Artist
          </a>
        </Link>
        <Link href="/Shop">
          <a className={router.pathname === "/Shop" ? "active" : "non-active"}>
            Shop
          </a>
        </Link>
        <Link href="/NFT">
          <a className={router.pathname === "/NFT" ? "active" : "non-active"}>
            NFT's
          </a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          display: flex;
          flex-direction: row;
          gap: 100px;
        }
        nav a {
          text-decoration: none;
          font-size: 20px;
          letter-spacing: -0.05;
        }
        .non-active {
          color: ${color};
          ${defaultState.theme ? `font-weight:400;` : `font-weight:100;`}
          transition: all 0.25s;
        }
        .active {
          font-weight: bold;
          color: #76ba99;
        }
      `}</style>
    </nav>
  );
}
