import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import api from "../../redux/api";
import SelectInputApi from "../../ui/forms/SelectInputApi";
import TextInput from "../../ui/forms/TextInput";
import ReusableDatePicker from "../../ui/forms/ReusableDaePicker";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

function BasicData({ titles, getData, item, pageTitle, getDocData, docData, settings }) {
  console.log("DOC DATA", docData?.document);

  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const currencies = useSelector((state) => state.auth?.userData?.currency);
  const govs = useSelector((state) => state.auth?.userData?.governments);
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const packages = settings?.packages;
  const { id } = useParams();
  // const govs = item?.questions?.[1]?.government;
  // const currencies = item?.questions?.[10]?.data;
  // const [package, setPackage] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [pack, setPack] = React.useState(docData?.document ? docData?.document?.package?.id : "");
  const [gov, setGov] = React.useState(docData?.document ? docData?.document?.government : "");
  const [work, setWork] = React.useState(docData?.document ? docData?.document?.work : "");
  const [workAddress, setWorkAddress] = React.useState(docData?.document ? docData?.document?.work_address : "");
  const [curr, setCurr] = React.useState(docData?.document ? docData?.document?.currency_id : 1);
  const [from, setFrom] = React.useState(docData?.document ? new Date(docData?.document?.from_date) : new Date());
  const [toDate, setToDate] = React.useState(docData?.document ? new Date(docData?.document?.to_date) : new Date());
  const [membership, setMembership] = React.useState("");
  const [err, setErr] = React.useState({});
  const [image, setImage] = React.useState("");
  const [backImage, setBackImage] = React.useState("");

  function toDateInputValue(date) {
    var local = new Date(date);
    local.setMinutes(local?.getMinutes() - local?.getTimezoneOffset());
    return local.toJSON()?.slice(0, 10);
  }

  function addOneYear(date) {
    if (date) {
      date.setFullYear(date.getFullYear() + 1);
      return toDateInputValue(date);
    }
  }

  React.useEffect(() => {
    setToDate(addOneYear(new Date(from)));
  }, [from]);

  const currentPackage = packages?.find((item) => item?.id === parseInt(pack));

  const formData = new FormData();
  formData.append("package_id", pack);
  formData.append("government", gov);
  formData.append("work", work);
  formData.append("work_address", workAddress);
  formData.append("currency_id", curr);
  formData.append("from_date", new Date(from).toLocaleDateString());
  formData.append("to_date", new Date(toDate).toLocaleDateString());
  formData.append("type_id", id);
  // formData.append("membership_id", membership);
  image !== "" ? formData.append("image", image) : null;
  backImage !== "" ? formData.append("back_image", backImage) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("submit-document", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getDocData();
      })
      .catch((err) => setErr(err?.response))
      .finally(() => setLoading(false));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post(`update-document/${docData?.document?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getDocData();
        toast.success(t("Document.UpdateToast"));
      })
      .catch((err) => setErr(err.response))
      .finally(() => setLoading(false));
  };

  console.log("ERR", err?.data?.errors?.package_id?.[0]?.en);
  console.log("DOC DATAAAAAA", docData);

  return (
    <div>
      <Container>
        <form onSubmit={docData?.document ? handleUpdate : handleSubmit}>
          <Grid container>
            <TextInput value={user?.name} placeholder={t("Document.For")} />
            <TextInput value={user?.national_id} placeholder={titles?.national_id?.[currentLocale]} />

            <SelectInputApi
              required
              fieldError={err?.data?.errors?.government?.[0]?.[currentLocale]}
              onChange={(e) => {
                setGov(e.target.value);
              }}
              value={gov}
              placeholder={titles?.government?.[currentLocale]}
            >
              {govs?.map((item, index) => (
                <MenuItem value={item?.SYS_MINOR}>{item?.SYS_ADESC}</MenuItem>
              ))}
            </SelectInputApi>
            <TextInput value={user?.address} placeholder={t("Auth.Address")} />
            <TextInput
              required
              fieldError={err?.data?.errors?.work?.[0]?.[currentLocale]}
              onChange={(e) => {
                setWork(e.target.value);
              }}
              value={work}
              placeholder={t("Document.Profession")}
            />
            <TextInput
              fieldError={err?.data?.errors?.work_address?.[0]?.[currentLocale]}
              onChange={(e) => {
                setWorkAddress(e.target.value);
              }}
              value={workAddress}
              placeholder={titles?.work_address?.[currentLocale]}
            />

            <Grid lg={6} md={6} sm={12} xs={12}>
              <Box className="app-input-wrapper">
                <Typography marginBottom="-15px">{titles?.from?.[currentLocale]}</Typography>
                <ReusableDatePicker
                  fieldError={err?.data?.errors?.from_date?.[0]?.[currentLocale]}
                  setBirthdate={setFrom}
                  minDate={docData?.document ? new Date(from) : new Date()}
                  defaultValue={from}
                />
              </Box>
            </Grid>
            <TextInput
              placeholder={titles?.to?.[currentLocale]}
              value={new Date(toDate).toLocaleDateString("en-GB")}
              disabled
            />
            <TextInput
              fieldError={err?.data?.errors?.image?.[0]?.[currentLocale]}
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              placeholder={titles?.national_front?.[currentLocale]}
            />
            <TextInput
              fieldError={err?.data?.errors?.back_image?.[0]?.[currentLocale]}
              onChange={(e) => setBackImage(e.target.files[0])}
              type="file"
              placeholder={titles?.national_back?.[currentLocale]}
            />
            <SelectInputApi
              required
              fieldError={err?.data?.errors?.currency_id?.[0]?.[currentLocale]}
              value={curr}
              onChange={(e) => {
                setCurr(e.target.value);
              }}
              placeholder={titles?.currency?.[currentLocale]}
            >
              {currencies?.map((item, index) => (
                <MenuItem value={item?.SYS_MINOR}>
                  {currentLocale === "ar" ? item?.SYS_ADESC : item?.SYS_LDESC}
                </MenuItem>
              ))}
            </SelectInputApi>
            <TextInput
              onChange={(e) => {
                setMembership(e.target.value);
              }}
              placeholder={t("Profile.MembershipNumber")}
              type="number"
              value={user?.membership_id}
              disabled
            />
            <SelectInputApi
              fieldError={err?.data?.errors?.package_id?.[0]?.[currentLocale]}
              required
              onChange={(e) => {
                setPack(e.target.value);
              }}
              value={pack}
              placeholder={titles?.package?.[currentLocale]}
            >
              {settings?.packages?.map((item, index) => (
                <MenuItem value={item?.id}>{item?.package}</MenuItem>
              ))}
            </SelectInputApi>
            <Grid container>
              <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                {t("Document.InsuranceCost")}: {currentPackage?.insurance_cost}
              </Grid>
              <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                {titles?.supervision_expenses?.[currentLocale]}: {currentPackage?.supervision_expenses}
              </Grid>
              {/* <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
              {titles?.cover_percentage?.[currentLocale]}: {currentPackage?.cover_percentage}
            </Grid> */}
              {/* <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
              {t("Document.DiscountPercentage")}: {currentPackage?.discount_percentage}
            </Grid> */}
              <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                {titles?.net_installment?.[currentLocale]}: {currentPackage?.net_installment}
              </Grid>
              <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                {titles?.relative_stamp?.[currentLocale]}: {currentPackage?.relative_stamp}
              </Grid>
              <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                {titles?.qualitive_stamp?.[currentLocale]}: {currentPackage?.qualitive_stamp}
              </Grid>
              <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                {titles?.insurance_expenses?.[currentLocale]}: {currentPackage?.insurance_expenses}
              </Grid>
              <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                {titles?.total_price?.[currentLocale]}: {currentPackage?.total_price}
              </Grid>
            </Grid>
          </Grid>
          <div className="flex-center">
            <LoadingButton
              // loading
              size="medium"
              style={{ marginTop: "20px" }}
              variant="contained"
              color="primary"
              type="submit"
              loading={loading ? true : false}
            >
              {docData?.document ? t("Document.Update") : t("Document.Submit")}
            </LoadingButton>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default BasicData;
