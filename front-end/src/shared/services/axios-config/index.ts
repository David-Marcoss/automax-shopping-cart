import axios from "axios";

import Environment from "../../environments";

import { errorInterceptor, responseInterceptor } from "./interceptors";

export const Api = axios.create({
  baseURL: Environment.API_URL,
  // headers: {
  //     "Authorization": "Bearer " + localStorage.getItem("APP_KEY_AUTH_TOKEN")
  // }
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);
