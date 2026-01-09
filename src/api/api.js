import axios from 'axios';

// please also set me as admin dashboard url when you deploy
export const adminUrl = process.env.REACT_APP_ADMIN_URL;
// uper pan url change karvu admin dashboard nu.......................
const api = axios.create({
    baseURL : process.env.REACT_APP_baseURL, //change with backend url
    // headers: { "Content-Type": "application/json" }
    withCredentials: true,

})

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
