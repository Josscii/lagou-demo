import axios from "axios";
import { userCache } from "../constants/cache";
import { BASE_URL } from "../constants/url";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${userCache?.token}`,
  },
});

export default api;
