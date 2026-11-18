import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.startsWith("/auth/")) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export const errMsg = (err) => {
  if (!err.response) return "Cannot connect to the server. Make sure the backend is running.";
  if (err.response.status === 401) return "Session expired. Please log in again.";
  return err.response.data?.message || "Something went wrong";
};

export const SPORTS = [
  "futsal",
  "basketball",
  "badminton",
  "cricket",
  "tennis",
  "table tennis",
  "swimming",
  "volleyball",
  "squash",
  "padel",
  "pickleball",
];

export default api;
