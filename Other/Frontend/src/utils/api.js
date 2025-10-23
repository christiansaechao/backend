import axios from "axios";
import { useUserStore } from "../store/useUserStore";

// takes in url, data, config
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;