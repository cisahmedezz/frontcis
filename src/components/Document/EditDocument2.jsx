import { CheckBox } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { AppBar, Button, Grid, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { t } from "i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../ui/forms/TextInput";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../redux/api";
import { toast } from "react-hot-toast";
import { GET_USER_DATA, LOGIN_FAILED } from "../../redux/actions/types";
import { reduxGet } from "../../redux/actions/reusableActions";
import SelectInputApi from "../../ui/forms/SelectInputApi";

function EditDocument({ document, setShow }) {
  //   const document = docData?.document;
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const currencies = useSelector((state) => state.auth?.userData?.currency);
  const governments = useSelector((state) => state.auth?.userData?.governments);
  const isCompany = user?.company_id == null ? false : true;
  const [inputs, setInputs] = React.useState({});
  const locale = localStorage.getItem("i18nextLng");
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const convertObject = (inputs) => {
    let data = [];
    for (let item in inputs) {
      data.push({
        theKey: item,
        theValue: inputs[item],
      });
    }
    return data;
  };

  const inputsArr = convertObject(inputs);
  console.log("RESS", convertObject(inputs));
  const formData = new FormData();
  inputsArr.map((item, index) => formData.append(item.theKey, item.theValue));

  const handleSubmit = () => {
    if (inputs?.national_id && inputs?.national_id?.length !== 14) {
      toast.error(t("Document.IDValidation"));
    } else if (inputs?.phone && inputs?.phone?.length !== 11) {
      toast.error(t("Document.PhoneValidation"));
    } else {
      setLoading(true);
      api
        .post(`update-document/${document?.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setLoading(false);
          dispatch(reduxGet("profile", GET_USER_DATA, token, LOGIN_FAILED));
          setShow(false);
        });
    }
  };

  return (
    <div>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton onClick={() => setShow(false)} edge="start" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
          <LoadingButton onClick={() => handleSubmit()} autoFocus color="inherit" loading={loading ? true : false}>
            save
          </LoadingButton>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" textAlign="center">
          {t("Document.Basic")}
        </Typography>

        <Grid container>
          {isCompany ? (
            <>
              <TextInput
                placeholder={t("Document.Name")}
                defaultValue={document?.name}
                name="name"
                onChange={handleChange}
              />
              <TextInput
                placeholder={t("Document.Age")}
                defaultValue={document?.age}
                name="age"
                onChange={handleChange}
              />
              <TextInput
                placeholder={t("Document.NationalID")}
                defaultValue={document?.national_id}
                name="national_id"
                onChange={handleChange}
              />
              <TextInput
                placeholder={t("Document.Email")}
                defaultValue={document?.email}
                name="email"
                onChange={handleChange}
              />
            </>
          ) : null}
          <TextInput
            placeholder={t("Document.Work")}
            defaultValue={document?.work}
            name="work"
            onChange={handleChange}
          />
          <TextInput
            placeholder={t("Document.WorkAddress")}
            defaultValue={document?.work_address}
            name="work_address"
            onChange={handleChange}
          />
          <TextInput placeholder={t("Document.IDImage")} name="image" onChange={handleChange} type="file" />
          <TextInput placeholder={t("Document.BackImage")} name="back_image" onChange={handleChange} type="file" />
          <SelectInputApi
            placeholder={t("Form.Currency")}
            defaultValue={document?.currency_id}
            name="currency_id"
            onChange={handleChange}
          >
            {currencies?.map((item, index) => (
              <MenuItem value={item?.SYS_MINOR}>{currentLocale === "ar" ? item?.SYS_ADESC : item?.SYS_LDESC}</MenuItem>
            ))}
          </SelectInputApi>
          <SelectInputApi
            placeholder={t("Form.Government")}
            defaultValue={document?.government}
            name="government"
            onChange={handleChange}
          >
            {governments?.map((item, index) => (
              <MenuItem value={item?.SYS_MINOR}>{currentLocale === "ar" ? item?.SYS_ADESC : item?.SYS_LDESC}</MenuItem>
            ))}
          </SelectInputApi>
        </Grid>
        {/* <Grid container>
        <Grid item lg={6} md={12}>
          <Typography>{t("Document.IDImage")}</Typography>
          <img
            style={{ maxHeight: "300px", margin: "10px" }}
            src={`http://portal.cisegypt.com.eg:8800/cis/public/uploads/documents/${document?.image}`}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <Typography>{t("Document.BackImage")}</Typography>
          <img
            style={{ maxHeight: "300px", margin: "10px" }}
            src={`http://portal.cisegypt.com.eg:8800/cis/public/uploads/documents/${document?.back_image}`}
          />
        </Grid>
      </Grid> */}
        {/* {user?.company_id == null ? (
        <>
          <Typography variant="h4" textAlign="center" marginTop="15px">
            {t("Document.AdditionalInfo")}
          </Typography>
          {document?.questions?.length === 0 ? (
            <Typography padding="10px 0px" variant="h5">
              لا يوجد
            </Typography>
          ) : (
            document?.questions?.map((item, index) => {
              return (
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography marginRight="5px" marginTop="10px" variant="h6">
                      <CheckBox />
                    </Typography>
                    <Typography variant="h6">{item?.title?.en}</Typography>
                  </div>
                </div>
              );
            })
          )}
        </>
      ) : null} */}
        {/* <Typography variant="h4" textAlign="center" marginTop="15px">
        {t("Document.AdditionalDangers")}
      </Typography>
      {document?.dangers?.length === 0 ? (
        <Typography variant="h5">لا يوجد</Typography>
      ) : (
        document?.dangers?.map((item, index) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography marginRight="5px" marginTop="10px" variant="h6">
                <CheckBox />
              </Typography>
              <Typography variant="h6">{item?.title?.ar}</Typography>
            </div>
          );
        })
      )} */}
        {/* {user?.company_id == null ? (
        <>
          <Typography variant="h4" textAlign="center" marginTop="15px">
            {t("Document.Users")}
          </Typography>
          {document?.benef?.map((item, index) => {
            return (
              <Grid
                style={{
                  border: "1px solid #555",
                  borderRadius: "12px",
                  margin: "5px 0px",
                  padding: "5px",
                }}
                container
              >
                <TextInput
                  placeholder={`Name ${index + 1}`}
                  defaultValue={item?.name}
                />
                <TextInput
                  placeholder={`National ID ${index + 1}`}
                  defaultValue={item?.national_id}
                />
                <TextInput
                  placeholder={`Description ${index + 1}`}
                  defaultValue={item?.description}
                />
                <TextInput
                  placeholder={`Percentage ${index + 1}`}
                  defaultValue={`${item?.percentage} %`}
                />
              </Grid>
            );
          })}
        </>
      ) : (
        <>
          <Typography variant="h4" textAlign="center" marginTop="15px">
            {t("Document.Guarantors")}
          </Typography>
          {document?.benef?.map((item, index) => {
            return (
              <Grid
                style={{
                  border: "1px solid #555",
                  borderRadius: "12px",
                  margin: "5px 0px",
                  padding: "5px",
                }}
                container
              >
                <TextInput
                  placeholder={`${t("Document.GuarantorName")}`}
                  defaultValue={item?.name}
                />
                <TextInput
                  placeholder={`${t("Document.GuarantorNationaID")} `}
                  defaultValue={item?.national_id}
                />
                <TextInput
                  placeholder={`${t("Document.GuarantorAddress")}`}
                  defaultValue={item?.description}
                />
                <TextInput
                  placeholder={`${t("Document.GuarantorPhone")}`}
                  defaultValue={`${item?.percentage}`}
                />
              </Grid>
            );
          })}
        </>
      )} */}
        {/* <Typography marginLeft="20px" marginTop="20px" variant="h5">
        {t("Document.TotalPrice")}: {document?.total_price}
      </Typography>
      <Typography marginLeft="20px" marginTop="20px" variant="h5">
        {t("Document.Status")}: {document?.status}
      </Typography> */}
      </Container>
    </div>
  );
}

export default EditDocument;
