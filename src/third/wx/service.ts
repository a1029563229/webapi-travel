import axios from 'axios';

const service = axios.create({
  baseURL: 'https://api.weixin.qq.com',
});

service.interceptors.response.use((res) => {
  return res.data;
});

export default service;
