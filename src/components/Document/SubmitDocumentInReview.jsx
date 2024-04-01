import { LoadingButton } from "@mui/lab";
import React from "react";
import AppModal from "../../ui/AppModal";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import api from "../../redux/api";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import CheckBoxInput from "../../ui/forms/CheckBoxInput";

function SubmitDocumentInReview({ docNumber, getDoc }) {
  const [show, setShow] = React.useState(false);
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const [loading, setLoading] = React.useState(false);
  const [agree, setAgree] = React.useState(false);

  // Api Submit
  function apiSubmit() {
    setLoading(true);
    api
      .get(`review-document/${docNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getDoc();
        setShow(false);
        toast.success(t("Document.DocumentHasBeenUpdated"));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  const handleChange = (e) => {
    if (e.target.checked) {
      setAgree(true);
    } else {
      setAgree(false);
    }
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <CheckBoxInput onChange={handleChange} name="agreement" placeholder={t("Document.Declare")} />
      <AppModal
        open={show}
        setOpen={setShow}
        title={t("Document.SubmitDocument")}
        body={<Body apiSubmit={apiSubmit} setShow={setShow} loading={loading} />}
      />
      <div className="flex-center" style={{ marginTop: "20px" }}>
        <LoadingButton disabled={!agree} onClick={() => setShow(true)} variant="contained">
          {t("Document.SubmitDocument")}
        </LoadingButton>
      </div>
    </div>
  );
}

export default SubmitDocumentInReview;

// Modal Body Component

function Body({ apiSubmit, setShow, loading }) {
  return (
    <>
      <Typography textAlign="center" marginBottom="10px">
        {t("Document.WontBeAble")}
      </Typography>
      <div className="flex-between">
        <Button onClick={() => setShow(false)} variant="contained" color="secondary">
          {t("Document.Cancel")}
        </Button>
        <LoadingButton loading={loading} onClick={() => apiSubmit()} variant="contained" color="primary">
          {t("Document.Submit")}
        </LoadingButton>
      </div>
    </>
  );
}
