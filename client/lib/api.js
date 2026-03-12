import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
});

export const setToken = (token) => {
  API.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
};

export default API;
