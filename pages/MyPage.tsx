import { useResetRecoilState, useRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { recoilAuthState } from "../states/recoilAuthState";
import { useState, useEffect } from "react";
import Seo from "../components/Seo";
import Router from "next/router";
import MyPageLayout from "../components/MyPage/MyPageLayout";
import Api from "../components/Auth/CustomApi";

interface AuthState {
  state: boolean;
}

interface basicInfo {
  image: string; //프사
  email: string;
  phoneNumber: string;
  name: string;
  role: string; //회원인지 예술가인지 관리자인지
  address: string; //&로 분류
  account: string; //은행
  account_name: string; //계좌번호
}

export default function MyPage() {
  const resetTheme = useResetRecoilState(recoilThemeState);
  const [recoilInfo, setRecoilInfo] = useRecoilState(recoilAuthState);
  const defaultState: AuthState = { ...recoilInfo };
  const router = Router;
  useEffect(() => {
    resetTheme();
    getMyProfile();
  }, []);

  const [info, setInfo] = useState<basicInfo>();
  const getMyProfile = () => {
    Api.get("https://www.ablind.co.kr/mypage", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        setInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Seo title="My Page" />
      {defaultState.state ? (
        <>
          <div className="back-box" />
          {info ? (
            <MyPageLayout
              profile={info.image ? info.image : ""}
              name={info.name}
              type={info.role}
              address={info.address}
              bank={info.account}
              bank_address={info.account_name}
            />
          ) : (
            <></>
          )}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await axios.get("https://www.ablind.co.kr/mypage", {
//       headers: {
//         "Content-type": "application/json",
//         Accept: "application/json",
//         "ACCESS-TOKEN": `${localStorage.getItem("accessToken")}`,
//       },
//     });

//     if (res.status === 200) {
//       const info = res.data;
//       return {
//         props: { info },
//       };
//     }
//     return { props: {} };
//   } catch (err) {
//     console.log(err);
//     return { props: {} };
//   }

//더미 데이터
// const info: basicInfo = {
//   profile:
//     "https://image.cine21.com/resize/cine21/still/2008/1120/M0020005_untitled[H800-].jpg", //프사
//   name: "이준규",
//   type: "user", //회원인지 예술가인지 관리자인지
//   address: "숭실대학교(123-456)&789-101", //&로 분류
//   bank: "카카오뱅크", //은행
//   bank_address: "123-456", //계좌번호
// };

// return {
//   props: { info },
// };
// };
