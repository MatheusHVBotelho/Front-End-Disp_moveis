// src/api.js
import axios from "axios";

// Base URL da sua API (ajuste conforme o endereço real)
const api = axios.create({
  baseURL: "https://api-questoes-production.up.railway.app",
});

export default api;
