import axios from "axios";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";

interface tokens {
  accessToken: string;
  refreshToken: string;
  date: string;
}
const axiosApiInstance = axios.create();
const accessToken = localStorage.getItem("accessToken");
const date = localStorage.getItem("date");
const refreshToken = Cookies.get("refreshToken");
// const refreshToken = localStorage.getItem("refresh");
let tokens: tokens;
if (accessToken && refreshToken && date) {
  const tmp: tokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    date: date,
  };
  tokens = tmp;
}

//Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      "Content-type": "application/json",
      Accept: "application/json",
      "ACCESS-TOKEN": tokens.accessToken,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// const [refreshCookie, setRefreshCookie] = useCookies();

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const [refreshCookie, setRefreshCookie] = useCookies();
    if (error.response.status === 403 && !originalRequest._retry) {
      console.log("토큰 만료");
      originalRequest._retry = true;
      const new_token = await reIssue(tokens);
      if (new_token.accessToken !== "") {
        originalRequest.headers["ACCESS-TOKEN"] = new_token.accessToken;
        localStorage.setItem("accessToken", new_token.accessToken);
        localStorage.setItem("date", new_token.date);
        setRefreshCookie("refreshToken", new_token.refreshToken, {
          path: "/",
          httpOnly: true,
        });
        // localStorage.setItem("refresh", new_token.refreshToken);
      }
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

const reIssue = (tokens: tokens): tokens => {
  let new_tokens: tokens = {
    accessToken: "",
    refreshToken: "",
    date: "",
  };
  axios
    .post(
      "https://www.ablind.co.kr/members/reissue",
      {},
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "ACCESS-TOKEN": tokens.accessToken,
          "REFRESH-TOKEN": tokens.refreshToken,
        },
      }
    )
    .then((res) => {
      console.log("갱신완료");
      console.log(res);
      new_tokens.accessToken = res.data.accessToken;
      new_tokens.refreshToken = res.data.refreshToken;
      new_tokens.date = res.data.date;
      return new_tokens;
    })
    .catch((res) => {
      console.log(res);
    });

  return new_tokens;
};

export default { axiosApiInstance };
