import axios from "axios";
import { apiBaseURL } from "./config.js";

const api = axios.create({
  baseURL: apiBaseURL,
});

export default api;
