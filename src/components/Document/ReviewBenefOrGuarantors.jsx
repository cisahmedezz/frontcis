import { Grid, Typography } from "@mui/material";
import React from "react";
import TextInput from "../../ui/forms/TextInput";
import { t } from "i18next";

function ReviewBenefOrGuarantors({ document, wholePercentage }) {
  return (
    <div>
      {document?.type_id != 2 ? (
        <>
          <Typography variant="h4" textAlign="center" marginTop="15px">
            {t("Document.Users")}{" "}
          </Typography>
          {document?.heir === 1 ? (
            <Typography textAlign="center" variant="h5">
              {t("Document.LegalHeirs")}
            </Typography>
          ) : null}
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
                <TextInput placeholder={`${t("Document.UserName")} ${index + 1}`} value={item?.name} />
                <TextInput placeholder={`${t("Document.UserStat")} ${index + 1}`} value={item?.description} />
                <TextInput
                  placeholder={`${t("Document.UserNationalID")} ${index + 1}`}
                  value={item?.national_id?.length === 14 ? item?.national_id : t("Document.NoResults")}
                />
                <TextInput
                  placeholder={`${t("Document.UserPercentage")} ${index + 1}`}
                  value={`${item?.percentage} %`}
                />
              </Grid>
            );
          })}
          {wholePercentage !== 100 && (
            <Typography variant="h6">
              {t("Document.HeirsPercentage")}: {100 - wholePercentage}%
            </Typography>
          )}
          <hr />
        </>
      ) : (
        <>
          <Typography variant="h4" textAlign="center" marginTop="15px">
            {t("Document.Guarantors")}{" "}
          </Typography>

          {document?.benef?.length === 0 ? (
            <h2 className="text-center">لا يوجد ضامنين</h2>
          ) : (
            document?.benef?.map((item, index) => {
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
                  <TextInput placeholder={`${t("Document.GuarantorNationaID")} `} value={item?.national_id || "-"} />
                  <TextInput placeholder={`${t("Document.GuarantorAddress")}`} value={item?.description} />
                  <TextInput placeholder={`${t("Document.GuarantorPhone")}`} value={`${item?.percentage}`} />
                </Grid>
              );
            })
          )}
          <hr />
        </>
      )}
    </div>
  );
}

export default ReviewBenefOrGuarantors;
