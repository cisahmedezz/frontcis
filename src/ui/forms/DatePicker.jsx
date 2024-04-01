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

export default function AppDatePicker({ placeholder, onChange, setBirthdate, error, fieldError, small }) {
  const [value, setValue] = React.useState(dayjs("2000-01-1T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
    setBirthdate(new Date(newValue?.$d));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          maxDate={dayjs("2000-08-18T21:11:54")}
          label={placeholder}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          defaultCalendarMonth="1/1/20000"
          error={true}
          fullWidth
          renderInput={(params) => (
            <TextField
              size={small ? "small" : null}
              color="secondary"
              error={fieldError ? true : false}
              helperText={<span style={{ color: "red" }}>{fieldError}</span>}
              defaultValue="2000-01-01"
              style={{ marginTop: "15px" }}
              {...params}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
