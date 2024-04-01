import { Container, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useFetch } from "../hooks/useFetch";
import FadedHeader from "../ui/FadedHeader";
import LoaderPage from "./LoadPage";

function AboutPage() {
  const data = useFetch("about-us");
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  return (
    <div>
      <FadedHeader text={t("Navbar.AboutUs")} img="./insurance.webp" />
      {data === null ? (
        <LoaderPage />
      ) : (
        <Container>
          <Typography
            color="grey"
            textAlign="center"
            marginTop="20px"
            variant="h5"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: data?.header?.[currentLocale],
              }}
            />
          </Typography>
          <Grid marginBottom="40px" marginTop="40px" container>
            {data?.subjects?.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  lg={4}
                  marginBottom="30px"
                  padding="0px 20px"
                >
                  <Typography style={{ maxWidth: "300px" }} variant="p">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.subject?.[currentLocale],
                      }}
                    />
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </div>
  );
}

export default AboutPage;
