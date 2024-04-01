import { FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function MultipleFilesInput({
  placeholder,
  name,
  type,
  required,
  onChange,
  fieldError,
}) {
  return (
    <Grid item lg={6} md={6} sm={12} xs={12}>
      <Box className="app-input-wrapper">
        <Typography>
          {placeholder}{" "}
          {required ? <span style={{ color: "red" }}>*</span> : null}
        </Typography>
        <input
          placeholder={placeholder}
          name={name}
          required={required}
          error
          type={type}
          multiple
          onChange={onChange}
        />
        <FormHelperText className="form-error">
          {fieldError ? fieldError : null}
        </FormHelperText>
      </Box>
    </Grid>
  );
}

export default MultipleFilesInput;
