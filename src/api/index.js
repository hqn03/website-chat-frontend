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

export const apiUpdateProfile = (data) =>
  api.put("/accounts/profile-update/", data);
export const apiChangePassword = (data) =>
  api.put("/accounts/password-change/", data);

// Admin/users
export const apiGetUsers = () => api.get("/accounts/users/");
export const apiCreateUser = (data) => api.post("/accounts/users/", data);
export const apiUpdateRole = (data) =>
  api.patch(`/accounts/users/${data.id}/update-role/`, data);
export const apiDeleteUser = (id) => api.delete(`/accounts/users/${id}/`);

// admin/rooms
export const apiGetRooms = () => api.get("/accounts/rooms/");
export const apiCreateRoom = (data) => api.post("/accounts/rooms/", data);
export const apiUpdateRoom = (data) =>
  api.put(`/accounts/rooms/${data.id}/`, data);
export const apiDeleteRoom = (id) => api.delete(`/accounts/rooms/${id}/`);
