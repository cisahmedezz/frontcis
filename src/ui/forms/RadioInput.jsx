import { Checkbox, FormControlLabel, Grid, InputLabel, Radio } from "@mui/material";
import React from "react";

function RadioInput({ name, placeholder, onChange, value, defaultChecked, title }) {
  return (
    <Grid item lg={12} md={12} sm={12} xs={12} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <input
        style={{ zoom: "150%" }}
        type="radio"
        name={name}
        onChange={onChange}
        defaultChecked={defaultChecked}
        value={value}
        title={title}
      />
      <label>{placeholder}</label>
    </Grid>
  );
}

export default RadioInput;
