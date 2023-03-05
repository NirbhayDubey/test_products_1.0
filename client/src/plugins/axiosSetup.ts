import axios from "axios";
import { storageRequest } from "../helpers/storageRequests";

const API_BASE_URL = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = storageRequest.getAuth();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      storageRequest.removeAuth();
      document.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
