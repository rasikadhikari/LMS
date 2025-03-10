import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:5000",
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
