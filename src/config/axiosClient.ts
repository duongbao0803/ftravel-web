import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
});

export default axiosClient;
