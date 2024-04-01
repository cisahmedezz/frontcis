import { LoadingButton } from "@mui/lab";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function PaymentSuccess({ success }) {
  const [counter, setCounter] = React.useState(10);
  const { t } = useTranslation();
  const history = useNavigate();
  React.useEffect(() => {
    if (counter !== 0) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
      history("/");
    }
  }, [counter, history]);
  return (
    <div className="flex-center">
      <div className="payment-success-page">
        <div
          style={{
            border: "1px solid #000",
            padding: "50px",
            borderRadius: "20px",
            background: "rgba(2500,2500,2500, 0.5)",
            marginTop: "50px",
            marginBottom: "30px",
          }}
        >
          <h2 style={!success ? { color: "red" } : {}} className="text-center mb-3 bold">
            {success ? t("Document.PaymentSuccess") : t("Document.PaymentFailed")}
          </h2>
          <h2 className="text-center red">{counter}</h2>
          <div className="flex-center">
            <LoadingButton color="primary" onClick={() => history("/")} className="app-button mt-3" variant="contained">
              {t("Document.Skip")}
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
