import { LoadingButton } from "@mui/lab";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../redux/api";
import CheckBoxChildren from "../../ui/forms/CheckBoxChildren";
import CheckBoxInput from "../../ui/forms/CheckBoxInput";
import FileInput from "../../ui/forms/FileInput";
import MultipleFilesInput from "../../ui/forms/MultipleFilesInput";
import SelectInput from "../../ui/forms/SelectInput";
import SelectInputApi from "../../ui/forms/SelectInputApi";
import TextInput from "../../ui/forms/TextInput";
import {
  additionalInfo,
  firstForm,
  formErrors,
  formSchiema,
} from "../../utils/FormSchiema";

function BasicData({ getData, item, pageTitle }) {
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
  const [loading, setLoading] = React.useState(false);
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFields((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked ? "yes" : "no",
      }));
    } else if (e.target.type === "file") {
      if (e.target.multiple === true) {
        // Multiple Files Field
        setFields((prevState) => ({
          ...prevState,
          [e.target.name]: Array.from(e.target.files),
        }));
      } else {
        // Single File Field
        setFields((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.files[0],
        }));
      }
    } else {
      // Text & Select Fields Case
      setFields((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const formData = new FormData();

  // formSchiema.map((parentItem, parentIndex) => {
  //   fields[parentItem.name]?.map((childItem, childIndex) => {
  //     formData.append(`${parentItem.name}`, childItem);
  //   });
  // });

  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  formData.append("sub_doc_id", item?.id);
  formData.append("answer_locale", currentLocale);
  formData.append("answer", JSON.stringify(fields));

  React.useEffect(() => {}, [fields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post(`getting-replied-document`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setErr({});
        getData();
      })
      .catch((err) => {
        setErr(err?.response);
        setLoading(false);
        toast.error(t("Document.Error"));
        scrollToRef(pageTitle);
      });
  };
  const checkQuestions = item?.questions?.filter(
    (item) => item?.type === "check_box" || item.type === "check_box_children"
  );
  const disabledQuestions = item?.questions?.filter(
    (item) => item?.custom_type === "disabled"
  );

  const obj = {};

  React.useEffect(() => {
    checkQuestions.map((item) =>
      setFields(
        checkQuestions?.reduce(
          (ac, a) => ({ ...ac, [a?.title?.[currentLocale]]: "no" }),
          {}
        )
      )
    );
  }, []);
  React.useEffect(() => {
    disabledQuestions.map((item) =>
      setFields(
        disabledQuestions?.reduce(
          (ac, a) => ({ ...ac, [a?.title?.[currentLocale]]: a?.value }),
          {}
        )
      )
    );
  }, []);

  const arr = ["a", "b", "c"];
  const res = arr.reduce((acc, curr) => ((acc[curr] = ""), acc), {});

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <Grid container>
            {item?.questions.map((item, index) => {
              return item?.custom_type === "disabled" ? (
                <TextInput
                  key={index}
                  placeholder={item?.title?.[currentLocale]}
                  type={item.type.replace("input_", "")}
                  // required={true}
                  name={item?.title?.[currentLocale]}
                  onChange={handleChange}
                  fieldError={err?.data?.msg?.[item?.title?.[currentLocale]]}
                  disabled
                  defaultValue={item?.value}
                />
              ) : item.type === "input_text" ||
                item.type === "input_number" ||
                item.type === "input_date" ||
                item.type === "input_email" ? (
                // Text Input
                <TextInput
                  key={index}
                  placeholder={item?.title?.[currentLocale]}
                  type={item.type.replace("input_", "")}
                  // required={true}
                  name={item?.title?.[currentLocale]}
                  onChange={handleChange}
                  fieldError={err?.data?.msg?.[item?.title?.[currentLocale]]}
                />
              ) : item.type === "select_box" ? (
                // Selectt Input
                <SelectInput
                  key={index}
                  placeholder={item?.title?.[currentLocale]}
                  required={item.required}
                  name={item?.title?.[currentLocale]}
                  options={item?.details}
                  onChange={handleChange}
                  fieldError={formErrors.age}
                />
              ) : item.type === "image" ? (
                // Single File Input
                <FileInput
                  key={index}
                  placeholder={item.placeholder}
                  name={item.name}
                  required={item.required}
                  type="file"
                  onChange={handleChange}
                  fieldError={formErrors.name}
                />
              ) : item.type === "multiple-files" ? (
                // Multiple Files Input
                <MultipleFilesInput
                  key={index}
                  placeholder={item.placeholder}
                  name={item.name}
                  required={item.required}
                  type="file"
                  onChange={handleChange}
                  fieldError={formErrors.name}
                />
              ) : item.type === "check_box" ? (
                <CheckBoxInput
                  placeholder={item?.title?.[currentLocale]}
                  name={item?.title?.[currentLocale]}
                  onChange={handleChange}
                />
              ) : item.type === "check_box_children" ? (
                <CheckBoxChildren
                  setFields={setFields}
                  handleChange={handleChange}
                  placeholder={item?.title?.[currentLocale]}
                  name={item?.title?.[currentLocale]}
                  onChange={handleChange}
                  item={item}
                />
              ) : item.type === "select_box_api" ? (
                // Selectt Input
                <SelectInputApi
                  theId={item?.id}
                  setFields={setFields}
                  handleChange={handleChange}
                  key={index}
                  placeholder={item?.title?.[currentLocale]}
                  required={item.required}
                  name={item?.title?.[currentLocale]}
                  options={item?.data}
                  onChange={handleChange}
                  fieldError={err?.data?.msg?.[item?.title?.[currentLocale]]}
                />
              ) : null;
            })}
          </Grid>
          <div className="flex-center">
            <LoadingButton
              // loading
              size="medium"
              style={{ marginTop: "20px" }}
              variant="contained"
              color="primary"
              type="submit"
              loading={loading ? true : false}
            >
              {t("Document.Submit")}
            </LoadingButton>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default BasicData;
