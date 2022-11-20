import axios from 'axios';
import { config } from '../constants/constants';

import { toast } from 'react-toastify';
import { toastConfig } from '../components/UI/Toast/Toast';

const instance = axios.create({
  baseURL: config.url.BASE_URL,
});

instance.interceptors.request.use(request => {
  const isAuthorization = request.url.includes('jsonplaceholder') || request.url.includes('signup') || request.url.includes('login');
  if (!isAuthorization) {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  }
  return request;
}, err => {
  console.log(err);
  const message = err.response?.data?.message || err.message;
  toast.error(message, { ...toastConfig })
  return Promise.reject(err);
});

instance.interceptors.response.use(response => {
  return response;
}, err => {
  console.log(err);
  console.log(err.response.config.url)
  if (err.response.status === 401 && (err.response.config.url !== '/auth/user' || err.response.config.url !== '/auth/login')) {

  }
  const message = err.response?.data?.message || err.message;
  toast.error(message, { ...toastConfig })
  return Promise.reject(err);
});

export default instance;
