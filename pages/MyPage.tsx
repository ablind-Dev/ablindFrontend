import { useResetRecoilState, useRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { recoilAuthState } from "../states/recoilAuthState";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Seo from "../components/Seo";
import Api from "../components/Auth/CustomApi";
import Router from "next/router";
import MyPageLayout from "../components/MyPage/MyPageLayout";

interface AuthState {
  state: boolean;
}

interface basicInfo {
  profile: string; //프사
  name: string;
  type: string; //회원인지 예술가인지 관리자인지
  address: string; //&로 분류
  bank: string; //은행
  bank_address: string; //계좌번호
}

interface serversideProps {
  info: basicInfo;
}

export default function MyPage(props: serversideProps) {
  const resetTheme = useResetRecoilState(recoilThemeState);
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const defaultState: AuthState = { ...recoilInfo };
  const router = Router;
  useEffect(() => {
    resetTheme();
  }, []);

  const { profile, name, type, address, bank, bank_address } = props.info;

  return (
    <div className="container">
      <Seo title="My Page" />
      {defaultState.state ? (
        <>
          <div className="back-box" />
          <MyPageLayout
            profile={profile}
            name={name}
            type={type}
            address={address}
            bank={bank}
            bank_address={bank_address}
          />
        </>
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 100%;
          position: relative;
          padding-bottom: 100px;
        }
        .back-box {
          width: 100%;
          height: 220px;
          background-color: #76ba99;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // try {
  //   const res = await axios.get("http://www.ablind.co.kr/artist", {
  //     headers: {
  //       "Content-type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });

  //   if (res.status === 200) {
  //     const artists = res.data;
  //     return {
  //       props: { artists },
  //     };
  //   }
  //   return { props: {} };
  // } catch (err) {
  //   console.log(err);
  //   return { props: {} };
  // }

  //더미 데이터
  const info: basicInfo = {
    profile:
      "https://image.cine21.com/resize/cine21/still/2008/1120/M0020005_untitled[H800-].jpg", //프사
    name: "이준규",
    type: "user", //회원인지 예술가인지 관리자인지
    address: "숭실대학교(123-456)&789-101", //&로 분류
    bank: "카카오뱅크", //은행
    bank_address: "123-456", //계좌번호
  };

  return {
    props: { info },
  };
};
