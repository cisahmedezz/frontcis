import { Grid, Typography } from "@mui/material";
import React from "react";
import TextInput from "../../ui/forms/TextInput";
import { t } from "i18next";
import { useSelector } from "react-redux";

function ReviewBasic({ titles, document, currentLocale, user, currency, government }) {
  const banks = useSelector((state) => state.auth?.userData?.banks);
  const bank_branches = useSelector((state) => state.auth?.userData?.bank_branches);
  const currentBank = banks?.find((item) => item.SYS_MINOR == document?.bank_branch);
  const currentBankBranch = bank_branches?.find((item) => item.GBD_SERIAL == document?.bank_branch_id);
  const isMicrofinance = document?.type_id == 2;
  console.log("CURRENTBANK", currentBank, "////////////////", currentBankBranch);
  return (
    <div>
      <Typography variant="h4" textAlign="center">
        {t("Document.Basic")}{" "}
      </Typography>
      <Grid container>
        {Boolean(user?.company_id) && (
          <>
            <TextInput placeholder={t("Document.CompanyName")} value={user?.company?.name} />
            <TextInput
              placeholder={t("Document.For")}
              value={document?.favor === 1 ? t("Document.Company") : t("Document.Bank")}
            />
            {document?.favor == 2 && (
              <TextInput
                placeholder={t("Document.Bank")}
                value={currentLocale === "ar" ? currentBank?.SYS_ADESC : currentBank?.SYS_LDESC}
              />
            )}{" "}
            {document?.favor == 2 && (
              <TextInput
                placeholder={t("Document.BankBranch")}
                value={
                  currentLocale === "ar" ? currentBankBranch?.GBD_BRANCH_NAME : currentBankBranch?.GBD_BRANCH_NAME_EN
                }
              />
            )}{" "}
          </>
        )}
        <TextInput placeholder={t("Document.Benef")} value={document?.name} />
        <TextInput placeholder={titles?.age?.[currentLocale]} value={document?.age} />
        <TextInput placeholder={titles?.national_id?.[currentLocale]} value={document?.national_id} />
        <TextInput
          placeholder={isMicrofinance ? titles?.work?.[currentLocale] : t("Document.Profession")}
          value={document?.work}
        />
        <TextInput placeholder={titles?.work_address?.[currentLocale]} value={document?.work_address} />
        {/* <TextInput placeholder={titles?.work_address?.[currentLocale]} value={document?.from} />
        <TextInput placeholder={titles?.work_address?.[currentLocale]} value={document?.to} /> */}

        <TextInput
          placeholder={titles?.currency?.[currentLocale]}
          value={currentLocale === "ar" ? currency?.SYS_ADESC : currency?.SYS_LDESC}
        />
        <TextInput placeholder={titles?.government?.[currentLocale]} value={government?.SYS_ADESC} />
        <TextInput
          placeholder={t("Auth.Address")}
          value={Boolean(user?.company_id) ? document?.customer_address : user?.address}
        />
        <TextInput placeholder={titles?.email?.[currentLocale]} value={document?.email} />
        <TextInput placeholder={titles?.from?.[currentLocale]} value={document?.from_date?.slice(0, 10)} />
        <TextInput placeholder={titles?.to?.[currentLocale]} value={document?.to_date?.slice(0, 10)} />
      </Grid>
      <Grid container>
        <Grid item lg={6} md={12}>
          <Typography>{titles?.national_front?.[currentLocale]}</Typography>
          <img
            style={{ maxHeight: "300px", margin: "10px", maxWidth: "90%" }}
            src={`http://portal.cisegypt.com.eg:8800/cis/public/uploads/documents/${document?.image}`}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <Typography>{titles?.national_back?.[currentLocale]}</Typography>
          <img
            style={{ maxHeight: "300px", margin: "10px", maxWidth: "90%" }}
            src={`http://portal.cisegypt.com.eg:8800/cis/public/uploads/documents/${document?.back_image}`}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ReviewBasic;
