import { ArrowDropDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";

function BranchDrawer({ branch }) {
  const [show, setShow] = React.useState(false);
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const mode = useSelector((state) => state.theme.mode);
  return (
    <div className="drawer-wrapper">
      <div
        style={{
          borderColor: show ? "#d62a33" : "#ddd",
          background: show ? "#999" : "none",
          marginBottom: show ? "5px" : "0",
          transition: "0.3s ease",
        }}
        onClick={() => setShow(!show)}
        className="drawer-title"
      >
        <div className="flex-between">
          <Typography fontWeight="bold" fontSize="20px">
            {branch?.name?.[currentLocale]}
          </Typography>
          <ArrowDropDown />
        </div>
      </div>
      <div className={show ? "show-info" : "hide-info"}>
        {branch?.address != null && (
          <Typography fontSize="18px" margin="0px 30px">
            <span style={{ fontWeight: "bold" }}>{t("Contact.Address")}</span>: {branch?.address?.[currentLocale]}
          </Typography>
        )}
        {branch?.phone != null && (
          <Typography fontSize="18px" margin="0px 30px">
            <span style={{ fontWeight: "bold" }}>{t("Contact.Phone")}</span>:{" "}
            <a style={{ color: mode === "dark" ? "#fff" : "#000" }} href={`tel:${branch?.phone}`}>
              {branch?.phone}
            </a>
          </Typography>
        )}
        {branch?.fax != null && (
          <Typography fontSize="18px" margin="0px 30px">
            <span style={{ fontWeight: "bold" }}>{t("Contact.Fax")}</span>: {branch?.fax}
          </Typography>
        )}
        {branch?.email != null && (
          <Typography fontSize="18px" margin="0px 30px">
            <span style={{ fontWeight: "bold" }}>{t("Auth.Email")}</span>: {branch?.email}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default BranchDrawer;
