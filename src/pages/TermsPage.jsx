import React from "react";
import FadedHeader from "../ui/FadedHeader";
import { useFetch } from "../hooks/useFetch";
import { Container } from "@mui/material";
import LoaderPage from "./LoadPage";

function TermsPage() {
  const data = useFetch("condition");
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  return Boolean(data) ? (
    <div>
      <FadedHeader text={currentLocale === "ar" ? data?.title_ar : data?.title} img="insurance.webp" />
      <Container>
        <div dangerouslySetInnerHTML={{ __html: currentLocale === "ar" ? data?.description_ar : data?.description }} />
      </Container>
    </div>
  ) : (
    <LoaderPage />
  );
}

export default TermsPage;
