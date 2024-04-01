import { LoadingButton } from "@mui/lab";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { t } from "i18next";
import { useSelector } from "react-redux";
import FadedHeader from "../ui/FadedHeader";
import LoaderPage from "./LoadPage";
import { useFetch } from "../hooks/useFetch";

function Form() {
  const mode = useSelector((state) => state.theme.mode);
  const [fields, setFields] = React.useState({});
  const [value, setValue] = React.useState(0);
  const data = useFetch("how-it-work");
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  return (
    <div>
      <FadedHeader text={t("Navbar.Howitworks")} img="insurance.webp" />
      {data === null ? (
        <LoaderPage />
      ) : (
        <Container className={mode === "dark" ? "dark" : "light"}>
          <Card style={{ marginTop: "15px", padding: "15px" }}>
            {/* <Typography variant="h4" style={{ textAlign: "center" }}>
              {t("Navbar.Howitworks")}
            </Typography> */}
            <TabContext value={value}>
              <div className="flex-center tabs-container">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={() => {}}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    {data?.map((item, index) => {
                      return <Tab key={index} onClick={() => setValue(index)} label={item?.title?.[currentLocale]} />;
                    })}
                  </Tabs>
                </Box>
              </div>
              {data?.map((item, index) => {
                return (
                  <TabPanel key={index} value={index} index={index}>
                    <Grid container>
                      <Grid padding="0px 15px" item lg={6}>
                        <img
                          style={{ maxWidth: "100%" }}
                          src={`http://portal.cisegypt.com.eg:8800/cis/public/${item?.image}`}
                        />
                      </Grid>
                      <Grid padding="0px 15px" item lg={6}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description?.[currentLocale],
                          }}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                );
              })}
            </TabContext>
          </Card>
        </Container>
      )}
    </div>
  );
}

export default Form;
