import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { roundUp } from "../../helperFunctions";
import { useSelector } from "react-redux";

function ReviewTables({ titles, document, currentLocale }) {
  const isMicrofinance = document?.type_id == 2;
  const user = useSelector((state) => state.auth?.userData?.presonal_data);

  console.log("USER INFO", user);
  return (
    <div>
      <div className="flex-center" style={{ width: "100%" }}>
        <Typography variant="h4" textAlign="center">
          {t("Document.Package")}
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ margin: "20px 0px", border: "1px solid #555" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {!isMicrofinance && <TableCell>{t("Form.Package")}</TableCell>}

              {isMicrofinance ? (
                <TableCell>{titles?.insurance_cost?.[currentLocale]}</TableCell>
              ) : (
                <TableCell>{t("Document.InsuranceCost")}</TableCell>
              )}
              {isMicrofinance ? (
                <TableCell>{t("Document.InsuranceCost")}</TableCell>
              ) : (
                <TableCell>{titles?.cover_percentage?.[currentLocale]}</TableCell>
              )}
              <TableCell>{titles?.net_installment?.[currentLocale]}</TableCell>
              <TableCell align="left">{titles?.relative_stamp?.[currentLocale]}</TableCell>
              <TableCell align="left">{titles?.qualitive_stamp?.[currentLocale]}</TableCell>
              <TableCell align="left">{titles?.supervision_expenses?.[currentLocale]}</TableCell>
              {/* <TableCell align="left">{titles?.cover_percentage?.[currentLocale]}</TableCell> */}
              <TableCell align="left">{titles?.insurance_expenses?.[currentLocale]}</TableCell>
              <TableCell align="right">{titles?.total_price?.[currentLocale]}</TableCell>
            </TableRow>
          </TableHead>
          {isMicrofinance ? (
            <TableBody>
              <TableRow>
                <TableCell>{document?.insurance_cost?.toFixed(2)}</TableCell>
                <TableCell>{((document?.insurance_cost * user?.company?.coverage_ratio) / 100).toFixed(2)}</TableCell>
                <TableCell>{document?.net_installment?.toFixed(2)}</TableCell>
                <TableCell align="left">{document?.relative_stamp?.toFixed(2)}</TableCell>
                <TableCell align="left">{document?.qualitive_stamp?.toFixed(2)}</TableCell>
                <TableCell align="left">{document?.supervision_expenses?.toFixed(2)}</TableCell>
                {/* <TableCell align="left">{document?.cover_percentage}</TableCell> */}
                <TableCell align="left">{document?.insurance_expenses?.toFixed(2)}</TableCell>
                <TableCell align="right">{roundUp(document?.total_price)}</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>{document?.package?.package}</TableCell>
                <TableCell>{document?.package?.insurance_cost?.toFixed(2)}</TableCell>
                <TableCell>{document?.package?.cover_percentage?.toFixed(2)}</TableCell>
                <TableCell>{document?.package?.net_installment?.toFixed(2)}</TableCell>
                <TableCell align="left">{document?.package?.relative_stamp?.toFixed(2)}</TableCell>
                <TableCell align="left">{document?.package?.qualitive_stamp?.toFixed(2)}</TableCell>
                <TableCell align="left">{document?.package?.supervision_expenses?.toFixed(2)}</TableCell>
                {/* <TableCell align="left">{document?.cover_percentage}</TableCell> */}
                <TableCell align="left">{document?.package?.insurance_expenses?.toFixed(2)}</TableCell>
                <TableCell align="right">{roundUp(document?.package?.total_price)}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <hr />
      {!isMicrofinance && (
        <>
          <div className="flex-center" style={{ width: "100%" }}>
            <Typography variant="h4" textAlign="center">
              {t("Document.AdditionalDangers")}
            </Typography>
          </div>
          <TableContainer component={Paper} style={{ margin: "20px 0px", border: "1px solid #555" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("Document.TheAdditionalDangers")}</TableCell>
                  <TableCell align="left">{titles?.net_installment?.[currentLocale]}</TableCell>
                  <TableCell align="left">{titles?.relative_stamp?.[currentLocale]}</TableCell>
                  <TableCell align="left">{titles?.qualitive_stamp?.[currentLocale]}</TableCell>
                  <TableCell align="left">{titles?.supervision_expenses?.[currentLocale]}</TableCell>
                  {/* <TableCell align="left">{titles?.cover_percentage?.[currentLocale]}</TableCell> */}
                  <TableCell align="left">{titles?.insurance_expenses?.[currentLocale]}</TableCell>
                  <TableCell align="left">قيمة التأمين</TableCell>
                  <TableCell align="right">{titles?.total_price?.[currentLocale]}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {document?.dangers?.map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell>{item?.title?.[currentLocale]}</TableCell>
                      <TableCell align="left">{item?.net_installment?.toFixed(2)}</TableCell>
                      <TableCell align="left">{item?.relative_stamp?.toFixed(2)}</TableCell>
                      <TableCell align="left">{item?.qualitive_stamp?.toFixed(2)}</TableCell>
                      <TableCell align="left">{item?.supervision_expenses?.toFixed(2)}</TableCell>
                      {/* <TableCell align="left">{document?.cover_percentage}</TableCell> */}
                      <TableCell align="left">{item?.issuance_expenses?.toFixed(2)}</TableCell>
                      <TableCell align="left">{item?.insurance_amount?.toFixed(2)}</TableCell>
                      <TableCell align="right">{item?.price?.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default ReviewTables;
