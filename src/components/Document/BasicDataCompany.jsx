import { LoadingButton } from "@mui/lab";
import { Container, Grid, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../redux/api";
import ReusableDatePicker from "../../ui/forms/ReusableDaePicker";
import SelectInputApi from "../../ui/forms/SelectInputApi";
import TextInput from "../../ui/forms/TextInput";
import RedStar from "../../ui/RedStar";
import { useLocation, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { calculateAge, getDateFrom16YearsAgo } from "../../helperFunctions";

function BasicDataCompany({ titles, docData, getDocData }) {
  // Variables
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const shares = useSelector((state) => state.auth?.userData?.shares);
  const currencies = useSelector((state) => state.auth?.userData?.currency);
  const banks = useSelector((state) => state.auth?.userData?.banks);
  const bank_branches = useSelector((state) => state.auth?.userData?.bank_branches);
  const govs = useSelector((state) => state.auth?.userData?.governments);
  const { id } = useParams();
  const { pathname } = useLocation();
  const settings = useFetch(`settings/${pathname.includes("form") ? id : docData?.document?.type_id}}`);

  // Input States
  const [loading, setLoading] = React.useState(false);
  const [pack, setPack] = React.useState(docData?.document ? docData?.document?.package?.id : "");
  const [name, setName] = React.useState(docData?.document ? docData?.document?.name : "");
  const [nationalID, setNationalID] = React.useState(docData?.document ? docData?.document?.national_id : "");
  const [email, setEmail] = React.useState(docData?.document ? docData?.document?.email : "");
  const [gender, setGender] = React.useState(docData?.document ? docData?.document?.gender : "");
  const [phone, setPhone] = React.useState(docData?.document ? docData?.document?.phone : "");
  const [age, setAge] = React.useState(docData?.document ? docData?.document?.age : "");
  const [gov, setGov] = React.useState(docData?.document ? docData?.document?.government : "");
  const [work, setWork] = React.useState(docData?.document ? docData?.document?.work : "");
  const [workAddress, setWorkAddress] = React.useState(docData?.document ? docData?.document?.work_address : "");
  const [curr, setCurr] = React.useState(docData?.document ? docData?.document?.currency_id : 1);
  const [from, setFrom] = React.useState(docData?.document ? new Date(docData?.document?.from_date) : new Date());
  const [toDate, setToDate] = React.useState(docData?.document ? new Date(docData?.document?.to_date) : "");
  const [address, setAddress] = React.useState(docData?.document ? docData?.document?.customer_address : "");
  const [image, setImage] = React.useState("");
  const [backImage, setBackImage] = React.useState("");
  const [insuranceCost, setInsuranceCost] = React.useState(docData?.document ? docData?.document?.insurance_cost : "");
  const [birthdate, setBirthdate] = React.useState(docData?.document ? new Date(docData?.document?.birth_date) : "");
  const [err, setErr] = React.useState({});
  const [forWho, setForWho] = React.useState(docData?.document ? docData?.document?.favor?.toString() : "2");
  const [bankBranch, setBankBranch] = React.useState(docData?.document ? docData?.document?.bank_branch : null);
  const [bankBranchId, setBankBranchId] = React.useState(docData?.document ? docData?.document?.bank_branch_id : null);
  const currentPackage = settings?.packages?.find((item) => item?.id === parseInt(pack));
  const minBirthDate = getDateFrom16YearsAgo();
  const formData = new FormData();
  const formRef = React.useRef();

  // Handle Formdata
  formData.append("government", gov);
  formData.append("type_id", id);
  formData.append("work", work);
  formData.append("work_address", workAddress);
  formData.append("currency_id", curr);
  formData.append("from_date", new Date(from).toLocaleDateString());
  formData.append("to_date", new Date(toDate).toLocaleDateString());
  formData.append("name", name);
  formData.append("age", calculateAge(birthdate));
  formData.append("phone", phone);
  formData.append("gender", gender);
  formData.append("email", email);
  formData.append("national_id", nationalID);
  formData.append("customer_address", address);
  image !== "" ? formData.append("image", image) : null;
  backImage !== "" ? formData.append("back_image", backImage) : null;
  id == 2 ? formData.append("insurance_cost", insuranceCost) : formData.append("package_id", pack);
  formData.append("birth_date", new Date(birthdate).toLocaleDateString());
  formData.append("favor", forWho);
  formData.append("bank_branch", bankBranch);
  formData.append("bank_branch_id", bankBranchId);

  // Use Effects

  React.useEffect(() => {
    if (id != 2) {
      setToDate(addOneYear(new Date(from)));
    }
  }, [from]);

  React.useEffect(() => {
    formRef.current.reset();
  }, [docData]);

  // Handlign Functions ---------

  // First Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nationalID.length !== 14) {
      toast.error(t("Document.IDValidation"));
    } else if (phone.length !== 11) {
      toast.error(t("Document.PhoneValidation"));
    } else if (insuranceCost > shares?.max_loan) {
      toast.error(t("Document.InsuranceCostValidation"));
    } else {
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
        .catch((err) => setErr(err.response))
        .finally(() => setLoading(false));
    }
  };

  // Update existed data
  const handleUpdate = (e) => {
    e.preventDefault();
    if (nationalID.length !== 14) {
      toast.error(t("Document.IDValidation"));
    } else if (phone.length !== 11) {
      toast.error(t("Document.PhoneValidation"));
    } else if (insuranceCost > shares?.max_loan) {
      toast.error(t("Document.InsuranceCostValidation"));
    } else {
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
    }
  };

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

  return (
    <div>
      <Container>
        <form ref={formRef} onSubmit={docData?.document ? handleUpdate : handleSubmit}>
          <Grid container>
            <TextInput
              lg={12}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={t("Document.CompanyName")}
              value={user?.company?.name}
            />
            <SelectInputApi
              required
              fieldError={err?.data?.errors?.gender?.[0]?.[currentLocale]}
              onChange={(e) => {
                setForWho(e.target.value);
              }}
              placeholder={t("Document.For")}
              value={forWho}
            >
              <MenuItem style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null} value="2">
                {t("Document.Bank")}
              </MenuItem>
              <MenuItem style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null} value="1">
                {t("Document.Company")}
              </MenuItem>
            </SelectInputApi>
            {forWho == 2 && (
              <SelectInputApi
                required
                fieldError={err?.data?.errors?.currency_id?.[0]?.[currentLocale]}
                onChange={(e) => {
                  setBankBranch(e.target.value);
                }}
                placeholder={t("Document.Bank")}
                value={forWho == 2 && bankBranch}
              >
                {banks?.map((item, index) => (
                  <MenuItem
                    style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null}
                    key={index}
                    value={item?.SYS_MINOR}
                  >
                    {currentLocale === "ar" ? item?.SYS_ADESC : item?.SYS_LDESC}
                  </MenuItem>
                ))}
              </SelectInputApi>
            )}
            {forWho == 2 && (
              <SelectInputApi
                required
                fieldError={err?.data?.errors?.currency_id?.[0]?.[currentLocale]}
                onChange={(e) => {
                  setBankBranchId(e.target.value);
                }}
                placeholder={t("Document.BankBranch")}
                value={forWho == 2 && bankBranchId}
              >
                {bank_branches
                  ?.filter((item) => item.GBD_BANK_NO == bankBranch)
                  ?.map((item, index) => (
                    <MenuItem
                      style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null}
                      key={index}
                      value={item?.GBD_SERIAL}
                    >
                      {currentLocale === "ar" ? item?.GBD_BRANCH_NAME : item?.GBD_BRANCH_NAME}
                    </MenuItem>
                  ))}
              </SelectInputApi>
            )}
            <TextInput
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={t("Document.Benef")}
              fieldError={err?.data?.errors?.name?.[0]?.[currentLocale]}
              value={name}
            />

            <TextInput
              required
              onChange={(e) => {
                setNationalID(e.target.value);
              }}
              type="number"
              placeholder={titles?.national_id?.[currentLocale]}
              fieldError={err?.data?.errors?.national_id?.[0]?.[currentLocale]}
              value={nationalID}
            />
            <TextInput
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="number"
              placeholder={titles?.phone?.[currentLocale]}
              fieldError={err?.data?.errors?.phone?.[0]?.[currentLocale]}
              value={phone}
            />
            <TextInput
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={titles?.email?.[currentLocale]}
              type="email"
              fieldError={err?.data?.errors?.email?.[0]?.[currentLocale]}
              value={email}
            />

            <SelectInputApi
              required
              fieldError={err?.data?.errors?.gender?.[0]?.[currentLocale]}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              placeholder={titles?.gender?.[currentLocale]}
            >
              <MenuItem style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null} value="male">
                {t("Auth.Male")}
              </MenuItem>
              <MenuItem style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null} value="female">
                {t("Auth.Female")}
              </MenuItem>
            </SelectInputApi>

            <SelectInputApi
              required
              fieldError={err?.data?.errors?.government?.[0]?.[currentLocale]}
              onChange={(e) => {
                setGov(e.target.value);
              }}
              placeholder={titles?.government?.[currentLocale]}
              value={gov}
            >
              {govs?.map((item, index) => (
                <MenuItem
                  style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null}
                  value={item?.SYS_MINOR}
                >
                  {item?.SYS_ADESC}
                </MenuItem>
              ))}
            </SelectInputApi>
            <TextInput
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder={t("Auth.Address")}
              type="text"
              fieldError={err?.data?.errors?.customer_address?.[0]?.[currentLocale]}
              value={address}
            />
            <TextInput
              required
              fieldError={err?.data?.errors?.work?.[0]?.[currentLocale]}
              onChange={(e) => {
                setWork(e.target.value);
              }}
              placeholder={t("Document.Profession")}
              value={work}
            />
            <TextInput
              fieldError={err?.data?.errors?.image?.[0]?.[currentLocale]}
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              placeholder={titles?.national_front?.[currentLocale]}
            />
            <TextInput
              fieldError={err?.data?.errors?.image?.[0]?.[currentLocale]}
              onChange={(e) => setBackImage(e.target.files[0])}
              type="file"
              placeholder={titles?.national_back?.[currentLocale]}
            />
            <SelectInputApi
              required
              fieldError={err?.data?.errors?.currency_id?.[0]?.[currentLocale]}
              onChange={(e) => {
                setCurr(e.target.value);
              }}
              placeholder={titles?.currency?.[currentLocale]}
              value={curr}
            >
              {currencies?.map((item, index) => (
                <MenuItem
                  style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null}
                  value={item?.SYS_MINOR}
                >
                  {currentLocale === "ar" ? item?.SYS_ADESC : item?.SYS_LDESC}
                </MenuItem>
              ))}
            </SelectInputApi>
            <TextInput
              fieldError={err?.data?.errors?.work_address?.[0]?.[currentLocale]}
              onChange={(e) => {
                setWorkAddress(e.target.value);
              }}
              placeholder={titles?.work_address?.[currentLocale]}
              value={workAddress}
            />
            <Grid lg={6} sm={12}>
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
            {id == 2 ? (
              <Grid lg={6} sm={12}>
                <Box className="app-input-wrapper">
                  <Typography marginBottom="-15px">{titles?.to?.[currentLocale]}</Typography>
                  <ReusableDatePicker
                    fieldError={err?.data?.errors?.to_date?.[0]?.[currentLocale]}
                    setBirthdate={setToDate}
                    minDate={new Date(from)}
                    defaultValue={toDate}
                  />
                </Box>
              </Grid>
            ) : (
              <TextInput
                placeholder={titles?.to?.[currentLocale]}
                value={new Date(toDate).toLocaleDateString("en-GB")}
                disabled
              />
            )}

            <Grid lg={6} sm={12}>
              <Box className="app-input-wrapper">
                <Typography marginBottom="-15px">
                  {titles?.birth_date?.[currentLocale]} ({t("Document.MinAge")}) <RedStar />
                </Typography>
                <ReusableDatePicker
                  defaultValue={minBirthDate}
                  fieldError={err?.data?.errors?.birth_date?.[0]?.[currentLocale]}
                  setBirthdate={setBirthdate}
                  maxDate={minBirthDate}
                  small
                />
              </Box>
            </Grid>
            <TextInput
              onChange={(e) => {
                setAge(e.target.value);
              }}
              placeholder={`${titles?.age?.[currentLocale]} (${t("Document.MinAge")}) `}
              type="number"
              fieldError={err?.data?.errors?.age?.[0]?.[currentLocale]}
              value={calculateAge(birthdate)}
            />
            {id == 2 ? (
              <TextInput
                placeholder={titles?.insurance_cost?.[currentLocale]}
                onChange={(e) => setInsuranceCost(e.target.value)}
                type="number"
                value={insuranceCost}
              />
            ) : (
              <>
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
                    <MenuItem style={currentLocale === "ar" ? { justifyContent: "flex-end" } : null} value={item?.id}>
                      {item?.package}
                    </MenuItem>
                  ))}
                </SelectInputApi>

                <Grid container>
                  <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                    {t("Document.InsuranceCost")}: {currentPackage?.insurance_cost}
                  </Grid>
                  <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                    {titles?.supervision_expenses?.[currentLocale]}: {currentPackage?.supervision_expenses}
                  </Grid>
                  <Grid lg={6} md={6} sm={12} xs={12} style={{ padding: "5px 20px" }}>
                    {titles?.cover_percentage?.[currentLocale]}: {currentPackage?.cover_percentage}
                  </Grid>
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
              </>
            )}
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

export default BasicDataCompany;
