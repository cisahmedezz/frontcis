import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { t } from "i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../redux/api";
import { toast } from "react-hot-toast";
import { GET_USER_DATA, LOGIN_FAILED } from "../../redux/actions/types";
import { reduxGet } from "../../redux/actions/reusableActions";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import BasicData from "./BasicData";

function EditBasicData({ document, setShow, getDocData }) {
  //   const document = docData?.document;
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const [inputs, setInputs] = React.useState({});
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const dispatch = useDispatch();

  return (
    <div>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton onClick={() => setShow(false)} edge="start" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
          <div />
        </Toolbar>
      </AppBar>
      <Typography textAlign="center" variant="h5" marginTop="10px">
        {t("Document.EditDocumentBasic")}
      </Typography>
      <BasicData
        docData={document}
        getDocData={() => {
          dispatch(reduxGet("/profile", GET_USER_DATA, token, LOGIN_FAILED));
          setShow(false);
        }}
      />

      <Container style={{ marginTop: "20px" }}></Container>
    </div>
  );
}

export default EditBasicData;
