import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import FadedHeader from "../ui/FadedHeader";
import { LoadingButton } from "@mui/lab";
import { LocationOn, Send } from "@mui/icons-material";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { postRequest } from "../postRequest";
import { toast } from "react-hot-toast";
import { branchesData } from "../utils/dummyData";
import BranchDrawer from "../components/BranchDrawer";
import { useFetch } from "../hooks/useFetch";

function ContactUsPage() {
  const mode = useSelector((state) => state.theme.mode);
  const token = useSelector((state) => state?.auth?.user?.msg?.token);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState({});
  const contactCallBack = () => {
    setMessage("");
    toast.success("Your message has been sent successfully");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AHMED");
    postRequest("contact-us", { message }, contactCallBack, setErr, setLoading, token);
  };
  const data = useFetch("branches");
  console.log("BRANCHES", data);
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  return (
    <div>
      <FadedHeader text={t("Navbar.ContactUs")} img="./support.avif" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6905.67772814653!2d31.282704!3d30.070153!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f9905bfae25%3A0xab5fafbb1d07558a!2s115%20El-Abaseya%2C%20As%20Sarayat%2C%20El%20Weili%2C%20Cairo%20Governorate%204391070%2C%20Egypt!5e0!3m2!1sen!2sus!4v1679915361406!5m2!1sen!2sus"
        width="100%"
        height="400"
        allowFullScreen
      ></iframe>
      <Container style={{ marginBottom: "30px" }}>
        <Typography textAlign="center" margin="20px 0px" variant="h5">
          {t("Contact.Branches")}
        </Typography>
        <Grid container>
          {data?.map((item, index) => {
            return (
              item?.length !== 0 && (
                <Grid style={{ marginBottom: "20px" }} item lg={6} md={6} sm={12} xs={12}>
                  <div style={{ display: "flex" }}>
                    <LocationOn style={{ marginTop: "5px", marginRight: "5px" }} />
                    <Typography variant="h5">{item?.[0]?.zone?.[currentLocale]}</Typography>
                  </div>
                  {item?.map((branch, idx) => {
                    return <BranchDrawer branch={branch} key={idx} />;
                  })}
                </Grid>
              )
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default ContactUsPage;
