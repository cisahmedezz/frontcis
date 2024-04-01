import { FormHelperText, Grid, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function SelectInputApi({
  placeholder,
  name,
  required,
  onChange,
  fieldError,
  lg,
  md,
  xs,
  sm,
  options,
  disabled,
  theId,
  children,
  value,
}) {
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  console.log("THE ID", theId);
  return (
    <Grid item lg={lg ? lg : 6} md={md ? md : 6} sm={sm ? sm : 12} xs={xs ? xs : 12}>
      <Box className="app-input-wrapper">
        <Typography style={{ marginBottom: "5px" }}>
          {placeholder} {required ? <span style={{ color: "red" }}>*</span> : null}
        </Typography>
        <Select
          value={value}
          defaultValue="0"
          fullWidth
          label={placeholder}
          name={name}
          required={required}
          size="small"
          onChange={onChange}
          //   className="app-input"
          error={fieldError ? true : false}
          color="secondary"
          disabled={disabled}
        >
          <MenuItem style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null} value="0">
            {placeholder}
          </MenuItem>
          {children}
        </Select>
        <FormHelperText className="form-error">{fieldError ? fieldError : null}</FormHelperText>
      </Box>
    </Grid>
  );
}

export default SelectInputApi;
