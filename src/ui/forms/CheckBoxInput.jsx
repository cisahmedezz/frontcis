import { Checkbox, FormControlLabel, Grid, InputLabel } from "@mui/material";
import React from "react";

function CheckBoxInput({ name, placeholder, onChange, value, defaultChecked, title }) {
  return (
    <Grid item lg={12} md={12} sm={12} xs={12}>
      <FormControlLabel
        title={title}
        control={<Checkbox defaultChecked={defaultChecked} color="secondary" name={name} onChange={onChange} />}
        label={placeholder}
        value={value}
      />
    </Grid>
  );
}

export default CheckBoxInput;
