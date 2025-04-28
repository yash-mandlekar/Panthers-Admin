import axios, { AxiosInstance } from 'axios';

// Backend Base URL
const BASE_URL: string = `http://localhost:3000`;

// Create Axios Instance
export const axiosI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,             
  headers: {
    'Content-Type': 'application/json', // Default Content Type
  },
});
