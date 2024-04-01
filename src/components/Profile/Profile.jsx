import { Edit } from "@mui/icons-material";
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import React from "react";
import "./profile.css";
import ProfileInvoices from "./ProfileInvoices";
import ProfilePayments from "./ProfilePayments";
import UserInfo from "./UserInfo";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "../../ui/AppModal";
import ChangePassword from "./ChangePassword";
import { reduxGet } from "../../redux/actions/reusableActions";
import { GET_USER_DATA, LOGIN_FAILED } from "../../redux/actions/types";

function Profile() {
  const [value, setValue] = React.useState(0);
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const locale = localStorage.getItem("token");
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(reduxGet("profile", GET_USER_DATA, token, LOGIN_FAILED));
  }, []);

  return (
    <div>
      <AppModal
        open={showChangePassword}
        setOpen={setShowChangePassword}
        title={t("Profile.ChangePassword")}
        body={<ChangePassword setShow={setShowChangePassword} />}
      />
      <div className="flex-center">
        <div className="profile-avatar">{user?.name?.charAt(0)}</div>
      </div>
      <div className="flex-center">
        <Typography variant="h5">{user?.name}</Typography>
      </div>
      <div className="flex-center">
        <Button onClick={() => setShowChangePassword(true)} variant="contained">
          {t("Profile.ChangePassword")} <Edit fontSize="20" style={{ margin: "5px" }} />
        </Button>
      </div>
      <Container>
        <TabContext value={value}>
          <div className="flex-center tabs-container">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} aria-label="basic tabs example">
                <Tab onClick={() => setValue(0)} label={t("Profile.PersonalInfo")} />
                <Tab onClick={() => setValue(1)} label={t("Profile.Documents")} />
                {/* <Tab onClick={() => setValue(2)} label={t("Profile.PaymentHistory")} /> */}
              </Tabs>
            </Box>
          </div>
          <TabPanel value={0} index={0}>
            <UserInfo />
          </TabPanel>
          <TabPanel value={1} index={1}>
            <ProfileInvoices />
          </TabPanel>
          {/* <TabPanel value={2} index={2}>
            <ProfilePayments />
          </TabPanel> */}
        </TabContext>
      </Container>
    </div>
  );
}

export default Profile;
