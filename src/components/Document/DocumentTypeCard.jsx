import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { t } from "i18next";

export default function DocumentTypeCard({ title, description, image, id }) {
  const [seeMore, setSeeMore] = React.useState(false);
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 345 }} style={{ marginBottom: "20px", transition: "0.7s ease" }}>
      <CardActionArea>
        <Link to={`/portal/form/${id}`}>
          <CardMedia
            component="img"
            height="140"
            image={`http://portal.cisegypt.com.eg:8800/cis/public/${image}`}
            alt="green iguana"
          />
        </Link>
        <CardContent style={{ minHeight: "120px", transition: "0.7s ease", cursor: "auto" }}>
          <Link to={`/portal/form/${id}`} style={{ color: "#d62a33" }}>
            <Typography fontSize="16px" fontWeight="bold" gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </Link>
          {seeMore ? (
            <>
              <Typography style={{ cursor: "auto" }} variant="span" color="text.secondary">
                {description}
              </Typography>
              {description.length > 80 && (
                <Typography
                  onClick={() => setSeeMore(false)}
                  color="#d62a33"
                  variant="span"
                  style={{ cursor: "pointer" }}
                  marginLeft="5px"
                >
                  {t("Document.ReadLess")}
                </Typography>
              )}
            </>
          ) : (
            <>
              <Typography style={{ cursor: "auto" }} variant="span" color="text.secondary">
                {description?.length > 80 ? `${description?.substring(0, 80)}......` : description}{" "}
              </Typography>
              {description.length > 80 && (
                <Typography
                  onClick={() => setSeeMore(true)}
                  color="#d62a33"
                  variant="span"
                  style={{ cursor: "pointer" }}
                >
                  {t("Document.ReadMore")}
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
