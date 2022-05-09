import axios from 'axios';

axios.interceptors.request.use((config) => config, (error) => {
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
    'content-type': 'application/json'
  },
  responseType: 'json',
  withCredentials: true,
});

export default API;
