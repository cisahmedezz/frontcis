import { Facebook, Twitter } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  const pages = [
    {
      title: "Forms",
      path: "/",
    },
    {
      title: "Profile",
      path: "/profile",
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
  const mode = useSelector((state) => state.theme.mode);
  return (
    <Box
      className="hide-print"
      style={{
        padding: "40px",
        marginTop: "20px",
        background: mode === "dark" ? "#222" : "#eee",
      }}
    >
      <Container>
        <Grid container>
          <Grid item lg={4} md={6} sm={12} className="flex-center">
            <div>
              <img src="https://cis-egypt.web.app/logo.png" />
              <Box marginLeft="20px">
                <Facebook className="social-icon" />
                <Twitter className="social-icon" />
              </Box>
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} style={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Typography variant="h5" marginBottom="10px">
                CIS
              </Typography>
              {pages.map((item, index) => {
                return (
                  <Link style={{ color: mode === "dark" ? "#fff" : "#333" }} to={`/portal${item.path}`}>
                    <Typography display="block" variant="p">
                      {t(`Navbar.${item.title}`)}
                    </Typography>
                  </Link>
                );
              })}
              <Link style={{ color: mode === "dark" ? "#fff" : "#333" }} to="/portal/terms-conditions"></Link>
            </Box>
          </Grid>
          <Grid item lg={4} md={6} sm={12} style={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <Typography variant="h5" marginBottom="10px">
                {t("Navbar.QuickLinks")}
              </Typography>
              <Typography display="block" variant="p">
                {t(`Contact.Terms`)}
              </Typography>
              <Link style={{ color: mode === "dark" ? "#fff" : "#333" }} to="/portal/privacy-policy">
                <Typography display="block" variant="p">
                  {t(`Contact.Privacy`)}
                </Typography>
              </Link>
              <Link style={{ color: mode === "dark" ? "#fff" : "#333" }} to="/portal/return-policy">
                <Typography display="block" variant="p">
                  {t(`Contact.Return`)}
                </Typography>
              </Link>
              <a
                style={{ color: mode === "dark" ? "#fff" : "#333" }}
                href="https://cisegypt.com.eg/%d8%b4%d9%83%d8%a7%d9%88%d9%89-%d8%a7%d9%84%d8%b9%d9%85%d9%84%d8%a7%d8%a1/"
                target="_blank"
              >
                <Typography display="block" variant="p">
                  {t(`Document.Clients`)}
                </Typography>
              </a>
              <a
                style={{ color: mode === "dark" ? "#fff" : "#333" }}
                href="https://cisegypt.com.eg/%d8%b1%d9%88%d8%a7%d8%a8%d8%b7-%d8%b3%d8%b1%d9%8a%d8%b9%d8%a9/"
                target="_blank"
              >
                <Typography display="block" variant="p">
                  {t(`Document.Links`)}
                </Typography>
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
