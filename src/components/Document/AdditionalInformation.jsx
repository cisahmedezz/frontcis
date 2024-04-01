import { LoadingButton } from "@mui/lab";
import { Container, Grid } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../redux/api";
import CheckBoxInput from "../../ui/forms/CheckBoxInput";

function AdditionalInformation({ settings, getData, item, pageTitle, docData, getDocData }) {
  const scrollToRef = (ref) =>
    window.scrollTo({
      top: ref.current.offsetTop - 90,
      left: 0,
      behavior: "smooth",
    });
  const [fields, setFields] = React.useState({});
  const [value, setValue] = React.useState(0);
  const [err, setErr] = React.useState();
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const [additionalInfo, setAdditionalInfo] = React.useState(
    docData?.document?.questions?.map((item) => item?.question_id?.toString())
  );
  const [loading, setLoading] = React.useState(false);
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFields((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked
          ? setAdditionalInfo(additionalInfo.concat([e.target.value]))
          : setAdditionalInfo(additionalInfo.filter((item) => item !== e.target.value)),
      }));
    }
  };
  const formData = new FormData();
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  formData.append("questions", JSON.stringify(additionalInfo));
  formData.append("document_id", docData?.id);
  React.useEffect(() => {}, [fields]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post(`document-step2`, formData, {
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
        scrollToRef(pageTitle);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post(`update-questions/${docData?.document?.id}`, formData, {
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
        scrollToRef(pageTitle);
      });
  };
  let additionalIds = docData?.document?.questions?.map((item) => item?.title?.en);
  return (
    <div>
      <Container>
        <form onSubmit={docData?.step !== 1 ? handleUpdate : handleSubmit}>
          <Grid container>
            {settings?.additional_question?.map((item, index) => {
              if (additionalIds?.includes(item?.title?.en)) {
              }
              return (
                <CheckBoxInput
                  placeholder={item?.title?.[currentLocale]}
                  name={item?.title?.[currentLocale]}
                  onChange={handleChange}
                  value={item?.id}
                  defaultChecked={additionalIds?.includes(item?.title?.en) ? true : false}
                />
              );
            })}
          </Grid>
          <div className="flex-center">
            <LoadingButton
              size="medium"
              style={{ marginTop: "20px" }}
              variant="contained"
              color="primary"
              type="submit"
              loading={loading ? true : false}
            >
              {docData?.step !== 1 ? t("Document.Update") : t("Document.Submit")}
            </LoadingButton>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default AdditionalInformation;
