import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Typography } from "@mui/material";
import { t } from "i18next";

export default function ReusableDatePicker({
  placeholder,
  onChange,
  setBirthdate,
  error,
  fieldError,
  minDate,
  defaultValue,
  maxDate,
  large,
  title,
}) {
  const [value, setValue] = React.useState(dayjs(new Date(defaultValue)));

  console.log("DEFAULT VALUE", defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    setBirthdate(new Date(newValue?.$d));
  };

  return (
    <>
      {title && (
        <Typography marginBottom="-10px">
          {t("Auth.Birthdate")} ({t("Document.MinAge")}){" "}
        </Typography>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            minDate={minDate ? dayjs(minDate) : null}
            maxDate={maxDate ? dayjs(maxDate) : null}
            label={placeholder}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            error={true}
            fullWidth
            renderInput={(params) => (
              <TextField
                size={large ? "large" : "small"}
                color="secondary"
                error={fieldError ? true : false}
                helperText={<span style={{ color: "red" }}>{fieldError}</span>}
                style={{ marginTop: "15px" }}
                {...params}
              />
            )}
          />
        </Stack>
      </LocalizationProvider>
    </>
  );
}
