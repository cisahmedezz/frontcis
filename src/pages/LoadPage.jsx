import { Box } from "@mui/material";
import React from "react";

function LoaderPage() {
  return (
    <Box style={{ height: "50vh", width: "100%" }} className="flex-center">
      <div class="loader"></div>
    </Box>
  );
}

export default LoaderPage;
