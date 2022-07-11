import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const refreshToken = Cookies.get("refreshToken");
  let token = localStorage.getItem("accessToken");
  const curDate = new Date();
  const authDate = new Date(
    `${localStorage.getItem("accessTokenExpiredTime")}`
  );

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (curDate > authDate && refreshToken) {
    const body = {
      refreshToken,
    };

    // 토큰 갱신 서버통신
    const { data } = await axios.post(
      `http://www.ablind.co.kr/members/reissue`,
      body
    );

    token = data.data.jwtToken;
    localStorage.setItem("accessToken", data.data.jwtToken);
    localStorage.setItem("accessTokenExpiredTime", data.data.date);
    // setRefreshCookie("refreshToken", data.data.refresh_token, {
    //   path: "/",
    //   httpOnly: true,
    // });
  }

  config.headers!["Authorization"] = `Bearer ${token}`;

  return config;
};

const refreshErrorHandle = (err: any) => {
  Cookies.remove("refreshToken");
};

export { refresh, refreshErrorHandle };
