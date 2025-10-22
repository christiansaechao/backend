import axios from "axios";
import { useUserStore } from "../store/useUserStore";

// takes in url, data, config
const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
