import axios from "axios";

const API = axios.create({
  baseURL: "https://code-kids-ezwr.vercel.app"
});

export const getWeekly = () => API.get("/weekly");
export const getMonthly = () => API.get("/monthly");