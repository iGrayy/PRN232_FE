// src/api/baseApi.js
import axios from 'axios';

console.log('⛔ VITE_API_URL =', import.meta.env.VITE_API_URL);

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default baseApi;
