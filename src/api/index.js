import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

api.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.Authorization =
      "Token " + JSON.parse(localStorage.getItem("userInfo")).token;
  }
  console.log("token:   ", req.headers.Authorization);
  return req;
});

export const apiLogin = (data) => api.post("/accounts/login/", data);
export const apiRegister = (data) => api.post("/accounts/register/", data);
export const apiForgot = (data) => api.post("/accounts/password-reset/", data);
export const apiReset = (data) =>
  api.post("/accounts/password-reset-confirm/", data);

export const apiUpdateProfile = (data) => api.put("/accounts/profile/", data);
export const apiChangePassword = (data) =>
  api.put("/accounts/password-change/", data);
