import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { t } from "i18next";
import React from "react";
import FileInput from "../../ui/forms/FileInput";
import MultipleFilesInput from "../../ui/forms/MultipleFilesInput";
import SelectInput from "../../ui/forms/SelectInput";
import TextInput from "../../ui/forms/TextInput";
import {
  additionalDangers,
  additionalInfo,
  firstForm,
  formErrors,
  formSchiema,
} from "../../utils/FormSchiema";

function UsersInfo() {
  const numbersArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const numbersArray2 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const [peopleNumber, setPopleNumbr] = React.useState(0);
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

  const peopleLength = numbersArray.splice(0, peopleNumber);
  console.log("PEO", peopleNumber, peopleLength);

  const locale = localStorage.getItem("i18nextLng");
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item lg={12} md={6} sm={12} xs={12}>
            <Box className="app-input-wrapper">
              <Typography style={{ marginBottom: "5px" }}>
                {t("Document.Number")} {<span style={{ color: "red" }}>*</span>}
              </Typography>
              <Select
                style={{ width: "100%" }}
                onChange={(e) => setPopleNumbr(e.target.value)}
                color="secondary"
                margin="0px 15px"
                size="small"
                fullWidth
                name="people-number"
                defaultValue={0}
              >
                <MenuItem onChange value={0}>
                  {t("Document.Number")}
                </MenuItem>
                {numbersArray2.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Grid>
          {peopleLength.map((item, index) => {
            return (
              <Grid container>
                <TextInput
                  placeholder={`${t("Document.NameNumber")} ${index + 1}`}
                />
                <TextInput placeholder={`${t("Document.s")} ${index + 1}`} />
              </Grid>
            );
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

export default UsersInfo;
