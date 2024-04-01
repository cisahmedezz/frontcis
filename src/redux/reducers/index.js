import { combineReducers } from "redux";
import authReducer from "./authReucer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import webDataReducer from "./webDataReducer";
import themeReducer from "./themeReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"],
  blacklist: [],
};
const authConfig = {
  key: "auth-config",
  storage,
  whitelist: ["auth"],
  blacklist: [],
};
const userConfig = {
  key: "user-config",
  storage,
  whitelist: ["user"],
  blacklist: [],
};
const themeConfig = {
  key: "theme",
  storage,
  whitelist: ["mode"],
  blacklist: [],
};
const webDataConfig = {
  key: "web-data",
  storage,
  whitelist: ["sliders", "categories", "contact_us", "about_us"],
  blacklist: [],
};
const rootReducer = combineReducers({
  theme: persistReducer(themeConfig, themeReducer),
  auth: persistReducer(authConfig, authReducer),
  user: persistReducer(userConfig, userReducer),
  webData: persistReducer(webDataConfig, webDataReducer),
});

export default persistReducer(persistConfig, rootReducer);
