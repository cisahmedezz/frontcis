import { Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";

function FormSucceed() {
  return (
    <div>
      <div className="flex-center">
        <Typography variant="h5" textAlign="center">
          {t("Document.FormSucceed")}
        </Typography>
      </div>
      <div className="flex-center">
        <img src="../portal/succeed.png" style={{ height: "300px" }} />
      </div>
    </div>
  );
}

export default FormSucceed;
