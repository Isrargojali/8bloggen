import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

// Attach token to each request
instance.interceptors.request.use((config) => {
  // Check for both "token" and "authToken" for backward compatibility
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
