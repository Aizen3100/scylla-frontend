import axios from 'axios';

// please also set me as admin dashboard url when you deploy
export const adminUrl = "https://scylla-admin.vercel.app"
// uper pan url change karvu admin dashboard nu.......................
const api = axios.create({
    baseURL : "https://scylla-server.onrender.com", //change with backend url
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
