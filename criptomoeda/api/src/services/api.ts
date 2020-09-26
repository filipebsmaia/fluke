import axios from "axios";

const api = axios.create({
  baseURL: process.env.APP_API_URL,
  headers: { authorization: `Apikey ${process.env.APP_API_KEY}` },
});

export default api;
