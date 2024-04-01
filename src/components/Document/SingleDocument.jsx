import { Container, Grid, Paper, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "./Review";
import { useFetch } from "../../hooks/useFetch";

function SingleDocument() {
  const documents = useSelector((state) => state?.auth?.userData?.presonal_data?.documents);
  const userData = useSelector((state) => state?.auth?.userData?.presonal_data);
  const { id } = useParams();
  const currentDoc = documents?.find((item) => item?.id === parseInt(id));
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const docData = { document: currentDoc, step: 5 };
  const titles = useFetch("titles");
  const settings = useFetch(`settings/${currentDoc?.type_id}`);

  console.log("DOCUMENT", document);

  return (
    <Container style={{ marginTop: "10px" }}>
      <Typography className="hide-print" variant="h4" textAlign="center" marginTop="20px" marginBottom="20px">
        {docData?.document?.type?.title?.[currentLocale]}
      </Typography>
      <hr style={{ marginBottom: "20px" }} />
      <Review settings={settings} titles={titles} docData={docData} />
    </Container>
  );
}

export default SingleDocument;
