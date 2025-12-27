import { AxiosRequestConfig } from "axios";

export const axiosRequestConfiguration: AxiosRequestConfig = {
  // baseURL: "https://tasker.hamrahi.in/api",
  baseURL: "http://localhost:8000/api",
  // baseURL: "http://localhost:8000/",
  responseType: "json",

  headers: {
    "Content-Type": "application/json",
  },
};
