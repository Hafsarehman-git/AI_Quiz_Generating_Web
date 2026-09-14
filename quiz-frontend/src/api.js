import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
const api = axios.create({
  baseURL: API,
  withCredentials: true, 
});
export default api;
export const getdata = () => axios.get(`${API}/data`).then((r) => r.data);
export const uploadfile = (file) => {
  const form = new FormData();
  form.append("file", file); 
   return axios.post(`${API}/upload`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  }).then((r) => r.data);
};
