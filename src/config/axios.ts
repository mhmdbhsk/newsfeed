import axios from 'axios';
import { NewsData } from '@dto';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

console.log(API_KEY);

axiosInstance.interceptors.request.use((config) => {
  config.headers = Object.assign(
    {
      Authorization: `${API_KEY}`,
    },
    config.headers
  );
  return config;
});

axiosInstance.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  function (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
);
