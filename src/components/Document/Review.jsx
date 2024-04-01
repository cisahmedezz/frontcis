import { CheckBox, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import TextInput from "../../ui/forms/TextInput";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, useParams } from "react-router-dom";
import SubmitDocumentInReview from "./SubmitDocumentInReview";
import ReviewTables from "./ReviewTables";
import LoaderPage from "../../pages/LoadPage";
import ReviewBasic from "./ReviewBasic";
import ReviewBenefOrGuarantors from "./ReviewBenefOrGuarantors";
import api from "../../redux/api";
import ReviewPrint from "./ReviewPrintBasic";
import ReviewPrintMicroFinance from "./ReviewPrintMicroFinance";

function Review({ docData, getDocData }) {
  const { pathname } = useLocation();
  const titles = useFetch("titles");
  const currencies = useSelector((state) => state.auth?.userData?.currency);
  const document = docData?.document;
  const isMicrofinance = document?.type_id == 2;
  const currency = currencies?.find((item) => item?.SYS_MINOR == document?.currency_id);
  const governments = useSelector((state) => state.auth?.userData?.governments);
  const userData = useSelector((state) => state?.auth?.userData?.presonal_data);
  const government = governments?.find((item) => item?.SYS_MINOR === parseInt(document?.government));
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const benefPercentages = document?.benef?.map((item) => item.percentage);
  const wholePercentage = document?.benef?.length !== 0 ? benefPercentages?.reduce((acc, curr) => acc + curr) : 0;
  const allowCompanyPrint = user?.company_id && document?.status === "accepted";
  console.log("THE USER", user?.company);
  const [payLoading, setPayLoading] = React.useState(false);
  console.log("IS MICROFINANCE", isMicrofinance);
  return !Boolean(titles) ? (
    <LoaderPage />
  ) : (
    <div className="review">
      {document?.status === "PAID" || allowCompanyPrint ? (
        <div className="flex-between">
          <div />
          <Button className="hide-print" variant="contained" onClick={() => window.print()}>
            اطبع الوثيقة
          </Button>
        </div>
      ) : null}
      <div className="hide-print">
        {(pathname.includes("form") && userData?.company_id != null) ||
        (document?.status === "rejected" && pathname.includes("form"))
          ? Boolean(document?.reviewed_at) && (
              <>
                <div className="flex-center">
                  <LoadingButton style={{ margin: "10px 0px" }} variant="contained" onClick={() => getDocData("new")}>
                    {t("Document.StartNewDocument")}
                  </LoadingButton>
                </div>
              </>
            )
          : null}

        {document?.status === "UNPAID" ||
          (document?.status === "accepted" && user?.company_id == null && (
            <div className="flex-center hide-print">
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

        <ReviewBasic
          currentLocale={currentLocale}
          titles={titles}
          document={document}
          user={user}
          currency={currency}
          government={government}
        />
        <hr />
        {document?.type_id != 2 ? (
          <>
            <Typography variant="h4" textAlign="center" marginTop="15px">
              {t("Document.AdditionalInfo")}{" "}
            </Typography>

            {document?.questions?.length === 0 ? (
              <Typography padding="10px 0px" variant="h5">
                {t("Document.NoResults")}
              </Typography>
            ) : (
              document?.questions?.map((item, index) => {
                return (
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography marginRight="5px" marginTop="10px" variant="h6">
                        <CheckBox />
                      </Typography>
                      <Typography variant="h6">{item?.title?.[currentLocale]}</Typography>
                    </div>
                  </div>
                );
              })
            )}
            <hr />
          </>
        ) : null}

        <ReviewBenefOrGuarantors document={document} wholePercentage={wholePercentage} />
        <hr />
        <ReviewTables titles={titles} document={document} currentLocale={currentLocale} />
        <Typography marginLeft="20px" marginTop="20px" variant="h5">
          {t("Document.TotalPrice")}: {document?.total_price.toFixed(2)}{" "}
          <span style={{ fontSize: "14px", margin: "-px 5px" }}>
            {currentLocale === "ar" ? currency?.SYS_ADESC : currency?.SYS_LDESC}
          </span>
        </Typography>
        <Typography marginLeft="20px" marginTop="20px" variant="h5">
          {t("Document.Status")}: {t(`Document.${document?.status}`)}
        </Typography>
        <Typography marginLeft="20px" marginTop="20px" variant="h5">
          {t("Document.Comment")}: {document?.comment}
        </Typography>
        {pathname.includes("form") && document?.reviewed_at == null && (
          <SubmitDocumentInReview docNumber={document?.id} getDoc={getDocData} />
        )}
      </div>
      <div className={`${document?.status === "PAID" || allowCompanyPrint ? "view-print" : "hide-print"}`}>
        {isMicrofinance ? (
          <ReviewPrintMicroFinance document={document} user={user} />
        ) : (
          <ReviewPrint document={document} user={user} />
        )}
      </div>
    </div>
  );
}

export default Review;
