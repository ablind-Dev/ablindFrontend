import { useResetRecoilState, useRecoilState } from "recoil";
import { recoilThemeState } from "../states/recoilThemeState";
import { recoilAuthState } from "../states/recoilAuthState";
import { useState, useEffect } from "react";
import Router from "next/router";
import Api from "../components/Auth/CustomApi";
import NoOrder from "../components/Order/NoOrder";
import AdminLayout from "../components/Admin/AdminLayout";

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

export default function Admin() {
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
    Api.get("http://www.ablind.co.kr/mypage", {
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
    <>
      {info ? (
        info.role === "ADMIN" ? (
          <AdminLayout />
        ) : (
          <NoOrder />
        )
      ) : (
        <NoOrder />
      )}
    </>
  );
}
