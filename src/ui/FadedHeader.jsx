import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

function FadedHeader({ text, img }) {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <div style={{ backgroundImage: `url(${img})` }} className="events-header bg-primary">
      <div
        style={{
          backgroundImage:
            mode === "dark"
              ? "linear-gradient(rgba(65, 65, 65, 0), rgba(86, 86, 86, 0.16), rgb(0, 0, 0))"
              : "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.16), rgb(245, 245, 245))",
        }}
        className="events-header-inner"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography className="primary" variant="h3">
            {text}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default FadedHeader;
