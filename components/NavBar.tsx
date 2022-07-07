import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
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
          color: #646464;
        }
        .active {
          font-weight: bold;
          color: #76ba99;
        }
      `}</style>
    </nav>
  );
}
