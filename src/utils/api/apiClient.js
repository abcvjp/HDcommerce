import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ''; // eslint-disable-line
  return config;
}, (error) => {
  // Do something with request error
  console.log('error while sending request');
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => response,
  (error) => {
    // Do something with response error
    console.log('response error');
    return Promise.reject(error);
  });

// Set up default config for http requests
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  withCredentials: true,
});

// Add a request interceptor for API client
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ''; // eslint-disable-line
  return config;
}, (error) => {
  // Do something with request error
  console.log('error while sending request');
  return Promise.reject(error);
});

export default API;
