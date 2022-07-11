// src/lib/customApi.ts
import axios from "axios";
import { refresh, refreshErrorHandle } from "./Refresh";

const Api = axios.create({
  baseURL: `http://www.ablind.co.kr`,
  timeout: 10000,
  params: {},
});

Api.interceptors.request.use(refresh, refreshErrorHandle);

export default Api;
