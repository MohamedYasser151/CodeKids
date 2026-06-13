import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8083"
});

export const getWeekly = () => API.get("/weekly");
export const getMonthly = () => API.get("/monthly");