import axios from "axios";
import { getToken } from "../utils/handleToken";

const BASE_URL = "/api";
const token = getToken();

export const axiosClient = axios.create({ baseURL: BASE_URL });

axiosClient.interceptors.response.use((response) => {
  return response.data;
});

axiosClient.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
