import { Checkbox, FormControlLabel, Grid, InputLabel } from "@mui/material";
import React from "react";
import SelectInputApi from "./SelectInputApi";
import TextInput from "./TextInput";

function CheckBoxChildren({ item, name, placeholder, onChange, handleChange }) {
  const [checked, setChecked] = React.useState(false);
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const checkRef = React.useRef();
  const handleCheckChange = (e) => {
    if (e.target.checked === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name={name}
              onChange={(e) => {
                onChange(e);
                handleCheckChange(e);
              }}
            />
          }
          label={placeholder}
        />
      </Grid>
      {item?.details?.map((ques, index) => {
        return ques.type === "select_box_api" ? (
          <SelectInputApi
            key={index}
            placeholder={ques?.details?.[currentLocale]}
            required={ques.required}
            name={ques?.details?.[currentLocale]}
            options={ques?.data}
            onChange={handleChange}
            // fieldError={formErrors.age}
            disabled={checked ? false : true}
          />
        ) : (
          <TextInput
            disabled={checked ? false : true}
            key={index}
            placeholder={ques?.details?.[currentLocale]}
            type={ques.type.replace("input_", "")}
            // required={true}
            name={ques?.details?.[currentLocale]}
            onChange={handleChange}
            // fieldError={err?.data?.msg?.[ques?.title?.[currentLocale]]}
          />
        );
      })}
    </Grid>
  );
}

export default CheckBoxChildren;
