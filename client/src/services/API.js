import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
