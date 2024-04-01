import React from "react";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import PasswordInput from "../../ui/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { reduxPostAuth } from "../../redux/actions/reusableActions";
import { toast } from "react-hot-toast";
import { t } from "i18next";

function ChangePassword({ setShow }) {
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [inputs, setInputs] = React.useState({});
  console.log("ERR", err);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const callBack = () => {
    toast.success(t("Auth.PasswordUpdated"));
    setShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      reduxPostAuth(
        "change-password",
        inputs,
        callBack,
        setErr,
        setLoading,
        "",
        token
      )
    );
  };
  const schiema = [
    {
      label: "OldPassword",
      name: "old_password",
    },
    {
      label: "NewPassword",
      name: "password",
    },
    {
      label: "ConfirmNew",
      name: "confirm_password",
    },
  ];
  return (
    <form onSubmit={handleSubmit}>
      {schiema.map((item, index) => {
        return (
          <div key={index} style={{ marginBottom: "20px" }}>
            <PasswordInput
              placeholder={item.label}
              label={item.label}
              fullWidth
              size="small"
              color="secondary"
              small
              onChange={handleChange}
              name={item.name}
            />
          </div>
        );
      })}
      <Typography marginTop="-10px" marginBottom="10px" color="red">
        {err?.status === 422 ? err?.data?.message : err?.data?.msg}
      </Typography>
      <LoadingButton
        loading={loading ? true : false}
        type="submit"
        fullWidth
        variant="contained"
      >
        {t("Profile.ChangePassword")}
      </LoadingButton>
    </form>
  );
}

export default ChangePassword;
