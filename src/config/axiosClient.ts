import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ftravelapi.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
