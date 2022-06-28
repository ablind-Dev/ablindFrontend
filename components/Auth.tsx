import Link from "next/link";
import { useRouter } from "next/router";

export default function Auth() {
  const router = useRouter();
  return (
    <nav>
      <Link href="/SignIn">
        <a className={router.pathname === "/SignIn" ? "active" : "non-active"}>
          Sign In
        </a>
      </Link>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: row;
          justify-content: end;
          padding: 20px 50px 0px 0px;
        }
        nav a {
          text-decoration: none;
          font-size: 18px;
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
