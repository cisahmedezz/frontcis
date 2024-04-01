import React from "react";
import Navbar from "./layouts/Navbar";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./ui/forms/TextInput";
import "./ui/forms/forms-ui.css";
import { Button, Card, Grid, Typography } from "@mui/material";
import MyRouter from "./router";
import LoginPage from "./pages/LoginPage";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import Footer from "./layouts/Footer";
import { useLocation } from "react-router-dom";
import { reduxGet } from "./redux/actions/reusableActions";
import { GET_USER_DATA, LOGIN_FAILED } from "./redux/actions/types";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import api from "./redux/api";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const user = useSelector((state) => state.auth?.user);
  const mode = useSelector((state) => state.theme.mode);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#d62a33",
        contrastText: "#fff",
        light: "#ffa726",
        dark: "#941e24",
      },
      secondary: {
        light: "#1c407b",
        main: "#1c407b",
        contrastText: "#fff",
      },
      custom: {
        main: "#fff",
        contrastText: "#d62a33",
        light: "#d62a33",
        dark: "#d62a33",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#d62a33",
        contrastText: "#fff",
        light: "#ffa726",
        dark: "#941e24",
      },
      direction: "rtl",
      secondary: {
        light: "#1c407b",
        main: "#1c407b",
        contrastText: "#fff",
      },
      custom: {
        main: "#fff",
        contrastText: "#d62a33",
        light: "#d62a33",
        dark: "#d62a33",
      },
    },
  });

  const auth = user?.msg?.token ? true : false;
  const token = useSelector((state) => state.auth?.user?.msg?.token);

  React.useEffect(() => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  console.log("AUTH", user?.msg?.token);
  const dispatch = useDispatch();
  // const auth = true;
  React.useEffect(() => {
    localStorage.setItem("NEXT", "EN");
  }, []);
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const locale = localStorage.getItem("i18nextLng");
  React.useEffect(() => {
    if (auth) {
      dispatch(reduxGet("profile", GET_USER_DATA, token, LOGIN_FAILED));
    }
  }, [auth]);
  return locale !== "ar" ? (
    <div className={mode === "dark" ? "dark" : "light"}>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        {auth ? (
          <div>
            {" "}
            <Navbar />
            <MyRouter />
            <CssBaseline />
            <div className="hide-print">
              <a href="01092221122">
                <WhatsAppIcon className="english-whatsapp-icon" />
              </a>
            </div>
            <Footer />
          </div>
        ) : (
          <div>
            <LoginPage></LoginPage>
            <CssBaseline />
          </div>
        )}
      </ThemeProvider>
    </div>
  ) : (
    <div dir="rtl" className="App">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
          {auth ? (
            <div>
              {" "}
              <Navbar />
              <MyRouter />
              <Footer />
              <div className="hide-print">
                <a href="https://wa.me/+201200143585" target="_blank">
                  <WhatsAppIcon fontSize="large" className="arabic-whatsapp-icon" />
                </a>
              </div>
              <CssBaseline />
            </div>
          ) : (
            <div>
              <LoginPage></LoginPage>
              <CssBaseline />
            </div>
          )}
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;
