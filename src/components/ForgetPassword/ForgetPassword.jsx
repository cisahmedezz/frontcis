import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { reduxPost } from "../../redux/actions/reusableActions";
import { forgetPasswordSchiema } from "../../utils/authSchiemas";

function ForgetPassword({ setOpen }) {
  const dispatch = useDispatch();
  const [confirmStage, setConfirmStage] = React.useState(false);
  const schiema = confirmStage
    ? forgetPasswordSchiema
    : forgetPasswordSchiema.slice(0, 1);
  const [inputs, setInputs] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [sendErr, setSendErr] = React.useState({});
  const [err, setErr] = React.useState();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendEmail = () => {
    dispatch(
      reduxPost(
        "forget-password",
        inputs,
        () => {
          setConfirmStage(true);
          setSendErr({});
          toast.success(t("Auth.CheckEmail"));
        },
        setSendErr,
        setLoading,
        ""
      )
    );
  };
  const confirmNewPassword = () => {
    dispatch(
      reduxPost(
        "confirm-code",
        inputs,
        () => {
          setConfirmStage(true);
          setErr({});
          setOpen(false);
          toast.success(t("Auth.PasswordChanged"));
        },
        setErr,
        setLoading,
        ""
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DONE");
    if (confirmStage) {
      dispatch(confirmNewPassword());
    } else {
      dispatch(sendEmail());
    }
  };

  console.log("SENDERR", sendErr);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {schiema.map((item, index) => {
          return (
            <TextField
              disabled={index === 0 && confirmStage ? true : false}
              key={index}
              style={{ marginBottom: "15px" }}
              size="small"
              color="secondary"
              fullWidth
              label={t(`Auth.${item.placeholder}`)}
              placeholder={t(`Auth.${item.placeholder}`)}
              name={item.name}
              onChange={handleChange}
              required
              error={err?.data?.errors?.[item.name]?.[0]}
              helperText={err?.data?.errors?.[item.name]?.[0]}
            />
          );
        })}
        <Typography marginBottom="10px" marginTop="-15px" color="red">
          {sendErr?.data?.msg}
        </Typography>
        <Typography marginBottom="10px" marginTop="-15px" color="red">
          {err?.data?.msg}
        </Typography>
        <LoadingButton
          loading={loading ? true : false}
          type="submit"
          variant="contained"
          fullWidth
        >
          {t("Document.Submit")}
        </LoadingButton>
      </form>
    </div>
  );
}

export default ForgetPassword;
