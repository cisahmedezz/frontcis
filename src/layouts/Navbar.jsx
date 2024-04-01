import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Brightness4Outlined, Brightness7Outlined, LightMode } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { emptyAction } from "../redux/actions/reusableActions";
import { CHANGE_THEME_MODE, LOGOUT } from "../redux/actions/types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../i18next";
import { useTranslation } from "react-i18next";

const pages = [
  // {
  //   title: "MyProfile",
  //   path: "/",
  // },
  {
    title: "Forms",
    path: "/",
  },
  {
    title: "AboutUs",
    path: "/about",
  },
  // {
  //   title: "Howitworks",
  //   path: "/how",
  // },
  {
    title: "Support",
    path: "/support",
  },

  {
    title: "ContactUs",
    path: "/contact",
  },
];
const settings = [
  {
    title: "Profile",
    path: "/prfile",
  },
];
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Navbar(props) {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const locale = localStorage.getItem("i18nextLng");
  const user = useSelector((state) => state.auth?.userData?.presonal_data);

  return (
    <AppBar color="custom" position="static" className="hide-print">
      <Container className="hide-print" maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              marginRight: { xs: "0", lg: "18%" },
            }}
          >
            <Link to="/portal/">
              <img className="nav-logo" src="https://cis-egypt.web.app/logo.png" />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link style={{ color: "#fff" }} to={`/portal${page.path}`}>
                  <MenuItem
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    style={{
                      width: "93vw",
                      color: "#d62a33 !important",
                      display: "flex",
                      justifyContent: locale === "ar" ? "flex-end" : "flex-start",
                      marginRight: "30px",
                    }}
                  >
                    <Typography style={{ color: "#d62a33 !important" }} textAlign="center">
                      <Link
                        style={{
                          color: mode === "dark" ? "#fff" : "#d62a33",
                          textAlign: "right",
                        }}
                        to={`/portal${page.path}`}
                      >
                        {t(`Navbar.${page.title}`)}
                      </Link>
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <img className="nav-logo" src="logo.png" /> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={`/portal${page.path}`}>
                <Button
                  style={{
                    color: "#d62a33",
                    fontWeight: "600",
                    margin: "0px 10px",
                  }}
                  color="primary"
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#d62a33", display: "block" }}
                >
                  {t(`Navbar.${page.title}`)}
                </Button>
              </Link>
            ))}
          </Box>
          {locale !== "ar" ? (
            <div
              className="pointer"
              onClick={() => {
                i18n.changeLanguage("ar");
                window.location.reload();
              }}
            >
              <Typography>العربية</Typography>
            </div>
          ) : (
            <div
              className="pointer"
              onClick={() => {
                i18n.changeLanguage("en");
                window.location.reload();
              }}
            >
              <Typography>English</Typography>
            </div>
          )}
          <IconButton
            style={{ margin: "0px 10px" }}
            sx={{ ml: 1 }}
            color="inherit"
            onClick={() => dispatch(emptyAction(CHANGE_THEME_MODE))}
          >
            {theme.palette.mode === "dark" ? <LightMode /> : <Brightness4Outlined />}
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name?.charAt(0)} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link style={{ color: mode === "dark" ? "#fff" : "#555" }} to="/portal/profile">
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{t(`Navbar.${setting.title}`)}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <MenuItem
                onClick={() => {
                  navigate("/portal");
                  dispatch(emptyAction(LOGOUT));
                }}
              >
                <Typography textAlign="center">{t(`Navbar.Logout`)}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Link to="/portal/">
            <Box marginLeft="30px">
              <img className="nav-logo-mobile" src="https://cis-egypt.web.app/logo.png" style={{ height: "50px" }} />
            </Box>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
