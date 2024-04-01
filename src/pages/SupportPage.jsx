import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import FadedHeader from "../ui/FadedHeader";
import { LoadingButton } from "@mui/lab";
import { Send } from "@mui/icons-material";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { postRequest } from "../postRequest";
import { toast } from "react-hot-toast";
import { useFetch } from "../hooks/useFetch";
import api from "../redux/api";

function SupportPage() {
  const mode = useSelector((state) => state.theme.mode);
  const token = useSelector((state) => state?.auth?.user?.msg?.token);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [err, setErr] = React.useState({});
  const contactCallBack = () => {
    setMessage("");
    toast.success("Your message has been sent successfully");
    getData();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest(
      "support",
      { message },
      contactCallBack,
      setErr,
      setLoading,
      token
    );
  };
  const getData = () => {
    api
      .get(`conversation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data.reverse()));
  };
  React.useEffect(() => {
    getData();
  }, []);
  // const data = useFetch("conversation");
  const locale = localStorage.getItem("i18nextLng");

  console.log("DATA", data);
  return (
    <div>
      <FadedHeader text={t("Navbar.Support")} img="./support.avif" />
      <Container style={{ marginBottom: "30px" }}>
        <Typography textAlign="center" marginTop="20px" variant="h5">
          {t("Support.Header")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box style={{ margin: "20px" }}>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ color: mode === "dark" ? "#fff" : "#000" }}
              placeholder={t("Support.Write")}
              rows={6}
            ></textarea>
          </Box>
          <div className="flex-center">
            <LoadingButton
              type="submit"
              style={{ margin: "0px 20px", marginBottom: "20px" }}
              size="large"
              fullWidth
              variant="contained"
              loading={loading ? true : false}
              endIcon={
                <Send
                  style={{
                    transform: locale !== "ar" ? "scaleX(1)" : "scaleX(-1)",
                  }}
                />
              }
            >
              {t("Support.Send")}
            </LoadingButton>
          </div>
        </form>
        {data?.length === 0 ? null : (
          <Paper
            style={{
              padding: "15px",
              marginTop: "30px",
              maxWidth: "500px",
              margin: "auto",
            }}
          >
            <Typography textAlign="center" margin="20px" variant="h5">
              {t("Support.RecentMessages")}
            </Typography>
            {data?.map((item, index) => {
              return (
                <div style={{ marginTop: "20px" }}>
                  {item?.replies?.map((item, index) => {
                    return (
                      <div className="flex-end">
                        <Typography
                          style={{
                            background: "#1c407b",
                            padding: "10px",
                            borderRadius: "4px",
                            color: "#fff",
                            maxWidth: "80%",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          }}
                          variant="p"
                        >
                          {item?.message}
                        </Typography>
                      </div>
                    );
                  })}
                  <br />
                  <div className="flex-start">
                    <Typography
                      style={{
                        background: "#d62a33",
                        padding: "10px",
                        borderRadius: "4px",
                        maxWidth: "80%",
                        color: "#fff",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      }}
                      variant="p"
                    >
                      {item?.message}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default SupportPage;
