import { LoadingButton } from "@mui/lab";
import { Button, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../redux/api";
import CheckBoxInput from "../../ui/forms/CheckBoxInput";

function Terms({ item, getData, docData, getDocData }) {
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  console.log("DOCDATA", docData);
  const [fields, setFields] = React.useState(
    docData?.step === 5
      ? {
          agreement: "yes",
        }
      : {
          agreement: "no",
        }
  );
  const [err, setErr] = React.useState();
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const [loading, setLoading] = React.useState(false);
  const formData = new FormData();
  formData.append("document_id", docData?.id);
  const handleChange = (e) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked ? "yes" : "no",
    }));
  };

  const handleSubmit = () => {
    // e.preventDefault();
    setLoading(true);
    api
      .post(`document-step5`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setErr({});
        getData();
        getDocData();
      })
      .catch((err) => {
        setErr(err?.response);
        setLoading(false);
        toast.error(t("Document.Error"));
      });
  };
  console.log(fields);
  return (
    <div>
      {item?.data?.map((item, index) => {
        return (
          <div style={{ direction: "rtl" }}>
            <div dangerouslySetInnerHTML={{ __html: item?.condition?.["ar"] }} />
          </div>
        );
      })}
      <CheckBoxInput
        onChange={handleChange}
        name="agreement"
        placeholder={t("Document.Agree")}
        defaultChecked={docData?.step === 5}
      />
      <div className="flex-center">
        <LoadingButton
          style={{ marginTop: "30px" }}
          loading={loading ? true : false}
          type="button"
          onClick={() => handleSubmit()}
          variant="contained"
          disabled={fields?.agreement === "yes" ? false : true}
        >
          {t("Document.Submit")}
        </LoadingButton>
      </div>
    </div>
  );
}

export default Terms;
