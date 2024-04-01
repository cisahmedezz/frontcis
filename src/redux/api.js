import axios from "axios";
import store from "./store";

const api = axios.create({
  baseURL: "http://portal.cisegypt.com.eg:8800/cis/public/api",
});

const state = store.getState();
const token = state;

store.subscribe(() => {
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";
  } else {
    delete api.defaults.headers.common.authorization;
  }
});

export default api;
