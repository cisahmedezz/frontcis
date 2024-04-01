import { RemoveRedEye, RemoveRedEyeSharp, VisibilityOff } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";

function PasswordInput({ placeholder, name, error, helperText, onChange, small, title }) {
  const [showPassword, setShowPassord] = React.useState(false);
  return (
    <>
      {title && <Typography marginBottom="5px">{t(`Auth.${placeholder}`)}</Typography>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          color="secondary"
          label={t(`Auth.${placeholder}`)}
          placeholder={t(`Auth.${placeholder}`)}
          fullWidth
          type={showPassword ? "text" : "password"}
          required
          name={name}
          error={error}
          helperText={helperText}
          onChange={onChange}
          size={small ? "small" : "medium"}
        />
        <Box
          style={{
            zIndex: "2",
            cursor: "pointer",
            marginTop: "6px",
          }}
          onClick={() => setShowPassord(!showPassword)}
          marginLeft="-40px"
        >
          {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
        </Box>
      </div>
    </>
  );
}

export default PasswordInput;
