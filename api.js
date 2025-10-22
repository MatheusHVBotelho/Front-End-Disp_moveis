import axios from "axios";

const api = axios.create({
  baseURL: "https://api-questoes-production.up.railway.app",
});

export default api;
