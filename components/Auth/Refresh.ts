import axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const refreshToken = cookies.get("refreshToken");
  let token = localStorage.getItem("accessToken");
  const curDate = new Date();
  const authDate = new Date(
    `${localStorage.getItem("accessTokenExpiredTime")}`
  );

  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (curDate >= authDate && refreshToken && token) {
    // 토큰 갱신 서버통신
    const { data } = await axios.post(
      "http://www.ablind.co.kr/members/reissue",
      {},
      {
        headers: {
          "ACCESS-TOKEN": token,
          "REFRESH-TOKEN": refreshToken,
        },
      }
    );
    if (data) console.log("토큰 갱신");
    token = data.accessToken;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("accessTokenExpiredTime", data.date);
    cookies.set("refreshToken", data.refreshToken, {
      path: "/",
    });
  }

  config.headers!["ACCESS-TOKEN"] = `${token}`;

  return config;
};

const refreshErrorHandle = (err: any) => {
  console.log(err);
  console.log("에러 : 쿠키삭제할게요");
  cookies.remove("refreshToken");
};

export { refresh, refreshErrorHandle };
