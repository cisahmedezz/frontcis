import { LoadingButton } from "@mui/lab";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import FileInput from "../../ui/forms/FileInput";
import MultipleFilesInput from "../../ui/forms/MultipleFilesInput";
import SelectInput from "../../ui/forms/SelectInput";
import TextInput from "../../ui/forms/TextInput";
import { firstForm, formErrors, formSchiema } from "../../utils/FormSchiema";
import { Edit } from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { t } from "i18next";

function BasicInformation() {
  const [fields, setFields] = React.useState({});
  const [value, setValue] = React.useState(0);
  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "select") {
      // Text & Select Fields Case
      setFields((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.value],
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
          [e.target.name]: [e.target.files[0]],
        }));
      }
    }
  };

  const formData = new FormData();

  formSchiema.map((parentItem, parentIndex) => {
    fields[parentItem.name]?.map((childItem, childIndex) => {
      formData.append(`${parentItem.name}`, childItem);
    });
  });

  formData.append("Key", "Value");

  React.useEffect(() => {
    axios.post(`to-link`, formData).catch((err) => console.log(err));
  }, [fields]);

  const locale = localStorage.getItem("i18nextLng");
  return (
    <div>
      <Container>
        <Grid container>
          {firstForm.questions.map((item, index) => {
            return item.type === "text" || item.type === "number" || item.type === "date" || item.type === "email" ? (
              // Text Input
              <TextInput
                key={index}
                placeholder={locale !== "ar" ? item.title_en : item.title_ar}
                type={item.type}
                required={item.required}
                name={item.name}
                onChange={handleChange}
                fieldError={formErrors.name}
              />
            ) : item.type === "select" ? (
              // Selectt Input
              <SelectInput
                key={index}
                placeholder={locale !== "ar" ? item.title_en : item.title_ar}
                required={item.required}
                name={item.name}
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
          >
            {t("Document.Submit")}
          </LoadingButton>
        </div>
      </Container>
    </div>
  );
}

export default BasicInformation;
