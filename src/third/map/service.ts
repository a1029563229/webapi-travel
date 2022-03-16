import axios from 'axios';

const service = axios.create({
  baseURL: 'https://restapi.amap.com/v3',
});

service.interceptors.response.use((res) => {
  return res.data;
});

export default service;
