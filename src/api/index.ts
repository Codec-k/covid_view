import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8088/api",
});
// 获取地址列表
export const getApiList = () => api.post("/list").then((res) => res.data);
