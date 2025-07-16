// baseApi.js
import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://localhost:7102", // cập nhật baseURL nếu khác
});

// Add token to every request
baseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenA");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default baseApi;
