import axios from "axios";

const api = axios.create({
  baseURL: "https://code-kids-ezwr.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getWeekly = () => api.get("/weekly");

export const getMonthly = () => api.get("/monthly");

export default api;