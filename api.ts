// This file sets up the base Axios instance for making API requests

import axios from "axios";
import Config from "./src/config";

const api = axios.create({
  baseURL: Config.API_URL,
  
  headers: {Authorization: `Bearer MY_API_KEY_HERE`,},
});

export default api;