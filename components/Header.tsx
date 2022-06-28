import NavBar from "./NavBar";
import Auth from "./Auth";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
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
          padding-bottom: 20px;
        }
        .logo-box {
          display: flex;
          justify-content: center;
        }
        .logo {
          text-decoration: none;
          color: black;
          font-size: 36px;
          font-weight: bold;
          text-align: center;
          padding: 0px 0px 15px 0px;
        }
      `}</style>
    </div>
  );
}
