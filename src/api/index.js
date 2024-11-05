import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

export const apiLogin = (data) => api.post("/accounts/login/", data);
export const apiRegister = (data) => api.post("/accounts/register/", data);
export const apiForgot = (data) => api.post("/accounts/password-reset/", data);
export const apiReset = (data) =>
  api.post("/accounts/password-reset-confirm/", data);
