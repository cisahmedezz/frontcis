import { CheckBox } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, MenuItem, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxGet } from "../../redux/actions/reusableActions";
import { GET_USER_DATA, LOGIN_FAILED } from "../../redux/actions/types";
import AppDialog from "../../ui/AppDialog";
import AppModal from "../../ui/AppModal";
import SelectInputApi from "../../ui/forms/SelectInputApi";
import TextInput from "../../ui/forms/TextInput";
import EditDocument from "./EditDocument";
import EditGuarantors from "./EditGuarantors";
import api from "../../redux/api";

function CompanyReview({ docData, setValue, fromForm, getDocData }) {
  const [show, setShow] = React.useState();
  const [showGuarantors, setShowGuarantors] = React.useState();
  const currencies = useSelector((state) => state.auth?.userData?.currency);
  const document = docData?.document;
  const currency = currencies?.find((item) => item?.SYS_MINOR == document?.currency_id);
  const governments = useSelector((state) => state.auth?.userData?.governments);
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const dispatch = useDispatch();

  const government = governments?.find((item) => item?.SYS_MINOR === parseInt(document?.government));

  console.log("GOV", government);
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";

  return (
    <div>
      <Typography variant="h4" className="hide-print" textAlign="center">
        {t("Document.Basic")}
      </Typography>
      {fromForm ? (
        <>
          <div className="flex-center">
            <LoadingButton style={{ margin: "10px 0px" }} variant="contained" onClick={() => getDocData("new")}>
              {t("Document.StartNewDocument")}
            </LoadingButton>
          </div>
          {document?.status === "UNPAID" ||
            (document?.status === "accepted" && (
              <div className="flex-center">
                <LoadingButton
                  loading={payLoading}
                  style={{ margin: "10px 0px" }}
                  variant="contained"
                  onClick={() => {
                    setPayLoading(true);
                    api
                      .get(`document-payment/${document?.id}`)
                      .then((res) => console.log("PAID NOW", (window.location.href = res.data)));
                  }}
                >
                  {t("Document.PayNow")}
                </LoadingButton>
              </div>
            ))}
        </>
      ) : null}

      <div className="flex-center">
        <Button style={{ margin: "10px 0px" }} variant="contained" onClick={() => setShow(true)}>
          {t("Document.EditDocumentBasic")}
        </Button>
      </div>

      <AppDialog open={show} setOpen={setShow} body={<EditDocument document={docData} setShow={setShow} />} />
      <AppDialog
        open={showGuarantors}
        setOpen={setShowGuarantors}
        body={<EditGuarantors document={docData} setShow={setShowGuarantors} />}
      />
      <Grid container>
        <TextInput placeholder={t("Document.Name")} value={document?.name} />
        <TextInput placeholder={t("Document.Age")} value={document?.age} />
        <TextInput placeholder={t("Document.NationalID")} value={document?.national_id} />
        <TextInput placeholder={t("Document.Work")} value={document?.work} />
        <TextInput placeholder={t("Document.WorkAddress")} value={document?.work_address} />
        <TextInput placeholder={t("Form.Currency")} value={currency?.SYS_LDESC} />
        <TextInput placeholder={t("Form.Government")} value={government?.SYS_ADESC} />
        <TextInput placeholder={t("Document.Email")} value={document?.email} />
        <TextInput placeholder={t("Document.InsuranceCost")} value={document?.insurance_cost} />
        <TextInput placeholder={t("Document.SupervisionExpenses")} value={document?.supervision_expenses} />
        <TextInput placeholder={t("Document.CoverPercentage")} value={document?.cover_percentage} />
        <TextInput placeholder={t("Document.InsuranceExpenses")} value={document?.insurance_expenses} />
        <TextInput placeholder={t("Document.NetInstallment")} value={document?.net_installment} />
        <TextInput placeholder={t("Document.QualitiveStamp")} value={document?.qualitive_stamp} />
        <TextInput placeholder={t("Document.RelativeStamp")} value={document?.relative_stamp} />
        <TextInput placeholder={t("Document.TotalPrice")} value={document?.total_price} />
        <TextInput placeholder={t("Document.From")} value={document?.from_date?.slice(0, 10)} />
        <TextInput placeholder={t("Document.To")} value={document?.to_date?.slice(0, 10)} />
      </Grid>
      <Grid container>
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
      </Grid>
      {user?.company_id == null ? (
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
      ) : null}
      {user?.company_id == null ? (
        <>
          <Typography variant="h4" textAlign="center" marginTop="15px">
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
          )}
        </>
      ) : null}
      {user?.company_id == null ? (
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
                <TextInput placeholder={`Name ${index + 1}`} value={item?.name} />
                <TextInput placeholder={`National ID ${index + 1}`} value={item?.national_id} />
                <TextInput placeholder={`Description ${index + 1}`} value={item?.description} />
                <TextInput placeholder={`Percentage ${index + 1}`} value={`${item?.percentage} %`} />
              </Grid>
            );
          })}
        </>
      ) : (
        <>
          <Typography variant="h4" textAlign="center" marginTop="15px">
            {t("Document.Guarantors")}
          </Typography>
          <div className="flex-center">
            <Button style={{ margin: "10px 0px" }} variant="contained" onClick={() => setShowGuarantors(true)}>
              {t("Document.EditGuarantors")}
            </Button>
          </div>
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
                <TextInput placeholder={`${t("Document.GuarantorName")}`} value={item?.name} />
                <TextInput placeholder={`${t("Document.GuarantorNationaID")} `} value={item?.national_id} />
                <TextInput placeholder={`${t("Document.GuarantorAddress")}`} value={item?.description} />
                <TextInput placeholder={`${t("Document.GuarantorPhone")}`} value={`${item?.percentage}`} />
              </Grid>
            );
          })}
        </>
      )}
      <Typography marginLeft="20px" marginTop="20px" variant="h5">
        {t("Document.TotalPrice")}: {document?.total_price.toFixed(2)}
      </Typography>
      <Typography marginLeft="20px" marginTop="20px" variant="h5">
        {t("Document.Status")}: {document?.status}
      </Typography>
      <Typography marginLeft="20px" marginTop="20px" variant="h5">
        {t("Document.Comment")}: {document?.comment}
      </Typography>
    </div>
  );
}

export default CompanyReview;
