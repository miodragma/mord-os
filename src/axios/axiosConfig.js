import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mord-os-api.herokuapp.com',
});

instance.interceptors.request.use(request => {
  const isAuthorization = request.url.includes('jsonplaceholder') || request.url.includes('signup') || request.url.includes('login');
  if (!isAuthorization) {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  }
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default instance;
