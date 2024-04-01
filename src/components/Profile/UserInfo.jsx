import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reduxGet, reduxPostAuth } from "../../redux/actions/reusableActions";
import { GET_USER_DATA } from "../../redux/actions/types";
import AppModal from "../../ui/AppModal";
import TextInput from "../../ui/forms/TextInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LoaderPage from "../../pages/LoadPage";

function UserInfo() {
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const formRef = React.useRef();

  const [err, setErr] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const userData = {
    name: user?.name,
    phone: user?.phone,
    national_id: user?.national_id,
    gender: user?.gender,
    address: user?.address,
    email: user?.email,
    membership_id: user?.membership_id,
  };
  const [inputs, setInputs] = React.useState({ userData });
  const callBack = () => {
    toast.success(t("Auth.InfoUpdate"));
    dispatch(reduxGet("profile", GET_USER_DATA, token));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  React.useEffect(() => {
    setInputs(userData);
  }, [user]);
  const handleSubmit = () => {
    dispatch(reduxPostAuth(`update-profile/${user?.id}`, inputs, callBack, setErr, setLoading, "", token));
  };

  console.log("INPUTS", inputs);
  const info = [
    {
      label: t("Profile.Name"),
      value: user?.name,
      name: "name",
    },
    {
      label: t("Auth.PhoneNumber"),
      value: user?.phone,
      name: "phone",
    },
    {
      label: t("Auth.NationalID"),
      value: user?.national_id,
      name: "national_id",
    },
    {
      label: t("Auth.Address"),
      value: user?.address,
      name: "address",
    },
    {
      label: t("Auth.Email"),
      value: user?.email,
    },
    {
      label: t("Document.Age"),
      value: user?.age,
    },
  ];

  return !user ? (
    <LoaderPage />
  ) : (
    <form ref={formRef}>
      <div>
        <Grid container>
          {info?.map((item, index) => {
            return (
              <TextInput
                key={index}
                defaultValue={item?.value}
                placeholder={item?.label}
                // disabled={index === 4 || index === 2 ? true : false}
                value={index === 4 || index === 2 || index === 5 ? item?.value : null}
                onChange={handleChange}
                name={item?.name}
              />
            );
          })}

          {userData?.membership_id && (
            <TextInput
              defaultValue={userData?.membership_id}
              placeholder={t("Profile.MembershipNumber")}
              // disabled={index === 4 || index === 2 ? true : false}
              value={userData?.membership_id}
              name="membership_id"
            />
          )}
          <Grid style={{ padding: "10px 20px" }} item lg={6} md={6} sm={12} xs={12}>
            <Typography style={{ marginBottom: "5px" }}>{t("Auth.Gender")}</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" color="secondary" required>
                {t("Auth.Gender")}
              </InputLabel>
              <Select
                // disabled
                variant="outlined"
                fullWidth
                color="secondary"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("Auth.Gender")}
                required
                onChange={handleChange}
                name="gender"
                defaultValue={user?.gender}
                size="small"
                value={user?.gender}
              >
                <MenuItem value="male">{t("Auth.Male")}</MenuItem>
                <MenuItem value="female">{t("Auth.Female")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className="flex-center">
          <LoadingButton
            type="button"
            onClick={() => handleSubmit()}
            style={{ marginTop: "20px" }}
            variant="contained"
            loading={loading ? true : false}
          >
            {t("Auth.ConfirmUpdate")}
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}

export default UserInfo;
