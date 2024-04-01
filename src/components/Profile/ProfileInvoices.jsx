import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { t } from "i18next";
import { FiberManualRecord } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ProfileInvoices() {
  const documents = useSelector((state) => state?.auth?.userData?.presonal_data?.documents);
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t("Profile.DocumentNumber")}</TableCell>
            <TableCell align="left">{t("Profile.Price")}</TableCell>
            <TableCell align="left">{t("Document.ClientName")}</TableCell>
            <TableCell align="left">{t("Document.DocumentType")}</TableCell>
            <TableCell align="left">{t("Profile.Status")}</TableCell>
            <TableCell align="right">{t("Document.ExpiryDate")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((row, index) => {
            return (
              <TableRow
                onClick={() => navigate(`/portal/profile/document/${row.id}`)}
                className="table-row"
                key={row.title?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>#{row?.id}</TableCell>
                <TableCell align="left">{row?.total_price.toFixed(2)}</TableCell>

                <TableCell align="left">
                  {/* <FiberManualRecord
                    style={{ marginBottom: "-7px", color: "red" }}
                  />{" "} */}
                  {row?.name}
                </TableCell>
                <TableCell align="left">
                  {/* <FiberManualRecord
                    style={{ marginBottom: "-7px", color: "red" }}
                  />{" "} */}
                  {row?.type?.title?.ar}
                </TableCell>
                <TableCell align="left">
                  {/* <FiberManualRecord
                    style={{ marginBottom: "-7px", color: "red" }}
                  />{" "} */}
                  {t(`Document.${row?.status}`)}
                </TableCell>
                <TableCell align="right">
                  {index === 0 ? (
                    <Typography fontSize="14px" fontWeight="bold">
                      {new Date(row?.to_date).toLocaleDateString("en-GB")}
                    </Typography>
                  ) : (
                    <Typography fontSize="14px" fontWeight="bold">
                      {new Date(row?.to_date).toLocaleDateString("en-GB")}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
