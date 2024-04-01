import { LoadingButton } from "@mui/lab";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import FileInput from "../../ui/forms/FileInput";
import MultipleFilesInput from "../../ui/forms/MultipleFilesInput";
import SelectInput from "../../ui/forms/SelectInput";
import TextInput from "../../ui/forms/TextInput";
import { firstForm, formErrors, formSchiema } from "../../utils/FormSchiema";
import { Edit } from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import BasicInformation from "./BasicInformation";
import BasicData from "./BasicData";
import AdditionalDangers from "./AdditionalDangers";
import { t } from "i18next";
import UsersInfo from "./UsersInfo";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import LoaderPage from "../../pages/LoadPage";
import AddPeople from "./AddPeople";
import FormSucceed from "../../ui/forms/formSucceed";
import api from "../../redux/api";
import AdditionalInformation from "./AdditionalInformation";
import Terms from "./Terms";
import AddGuarantor from "./AddGuarantor";
import Review from "./Review";
import BasicDataCompany from "./BasicDataCompany";
import FormRepeater from "./AddPeople2";
import AppModal from "../../ui/AppModal";

function Form() {
  const titles = useFetch("titles");
  const mode = useSelector((state) => state.theme.mode);
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  const shares = useSelector((state) => state.auth?.userData?.shares);
  const pageTitle = React.useRef();
  const [fields, setFields] = React.useState({});
  const [currentItem, setCurrentItem] = React.useState();
  const [value, setValue] = React.useState(currentItem);
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [docData, setDocData] = React.useState(null);
  const [settings, setSettings] = React.useState(null);
  const isReviewd = docData?.document?.reviewed_at != null;
  const [people, setPeople] = React.useState(docData?.document?.benef != null ? docData?.document?.benef : []);
  const [show, setShow] = React.useState(!user?.company_id && user?.documents?.length === 0);

  const getData = () => {
    api
      .get(`get-specific-doc-type/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data));
  };
  const getSettings = () => {
    api
      .get(`settings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSettings(res.data));
  };
  React.useEffect(() => {
    getSettings();
    getData();
    getDocData();
  }, []);
  const getDocData = (data) => {
    api
      .post(`current-step/${id}`, data ? { new: "" } : {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDocData(res.data))
      .catch(() => {
        setDocData({});
        setTimeout(() => {
          setValue(0);
        }, 1);
      });
  };
  // React.useEffect(() => {
  //   getData();
  //   getDocData();
  // }, []);

  console.log("DOC DATA", docData);
  // const data = useFetch(`get-specific-doc-type/${id}`);
  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "select") {
      // Text & Select Fields Case
      setFields((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.value],
      }));
    } else if (e.target.type === "file") {
      if (e.target.multiple === true) {
        // Multiple Files Field
        setFields((prevState) => ({
          ...prevState,
          [e.target.name]: Array.from(e.target.files),
        }));
      } else {
        // Single File Field
        setFields((prevState) => ({
          ...prevState,
          [e.target.name]: [e.target.files[0]],
        }));
      }
    }
  };

  console.log("VALUE", value);

  // Convert fields Objet to Form Data
  const formData = new FormData();
  formSchiema.map((parentItem, parentIndex) => {
    fields[parentItem.name]?.map((childItem, childIndex) => {
      formData.append(`${parentItem.name}`, childItem);
    });
  });
  formData.append("Key", "Value");
  React.useEffect(() => {
    axios.post(`to-link`, formData).catch((err) => console.log(err));
  }, [fields]);
  // formSchiema.map((parentItem, levelOneIndex) => {
  //   if (Array.isArray(fields[parentItem.name])) {
  //     fields[parentItem.name].map((childItem, levelTwoIndex) => {
  //       formData.append(
  //         `${fields[parentItem.name]}${levelTwoIndex}`,
  //         childItem
  //       );
  //     });
  //   }
  // });
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";

  React.useEffect(() => {
    for (let item in data?.sub_documents) {
      console.log("ITEM", data?.sub_documents[item]);
      if (!data?.sub_documents[item]?.answered) {
        setCurrentItem(item);
        // setValue(parseInt(item));
        break;
      }
    }
  }, [data?.sub_documents]);

  React.useEffect(() => {
    setValue(parseInt(docData?.step));
  }, [docData]);

  const concatedArray = data?.sub_documents?.concat({
    title: { ar: "المراجعة", en: "Review" },
    id: 20,
  });

  console.log("DATASS", data);

  const modalBody = (
    <>
      <Typography textAlign="center" marginBottom="10px">
        سيتم إصدار سهم جديد بمجرد إصدار الوثيقة
      </Typography>
      <div className="flex-between">
        <Link to="/portal">
          <Button onClick={() => setShow(false)} variant="contained" color="secondary">
            {t("Document.Cancel")}
          </Button>
        </Link>
        <Button onClick={() => setShow(false)} variant="contained" color="primary">
          {t("Document.Submit")}
        </Button>
      </div>
    </>
  );

  return data === null ? (
    <LoaderPage />
  ) : (
    <div>
      {id == 1 && (
        <div className="flex-between hide-print" style={{ marginTop: "20px" }}>
          <div />
          <a href="http://portal.cisegypt.com.eg:8800/cis/public/custom_images/documents/test.pdf" target="_blank">
            <Button variant="contained">الشروط العامة</Button>
          </a>
        </div>
      )}
      <Container className={mode === "dark" ? "dark" : "light"}>
        <AppModal open={show} setOpen={setShow} title={shares?.message} body={modalBody} preventClose />
        <Card style={{ marginTop: "15px", padding: "15px" }}>
          <Typography className="hide-print" ref={pageTitle} variant="h4" style={{ textAlign: "center" }}>
            {docData?.document?.type?.title?.[currentLocale]}
          </Typography>
          <TabContext value={value}>
            <div className="flex-center tabs-container hide-print">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={() => {}}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {/* <Tab
                    onClick={() => setValue(0)}
                    label={t("Document.Basic")}
                  /> */}
                  {concatedArray?.map((item, index) => {
                    return (
                      <Tab
                        disabled={isReviewd}
                        onClick={() => (index <= docData?.step ? setValue(index) : null)}
                        label={`${index + 1}- ${
                          index === 2 ? t("Document.AdditionalDangers") : item?.title?.[currentLocale]
                        }`}
                        style={{ cursor: "auto" }}
                      />
                    );
                  })}
                </Tabs>
              </Box>
            </div>
            {/* <TabPanel value={0} index={0}>
              <BasicInformation />
            </TabPanel> */}
            {concatedArray?.map((item, index) => {
              return (
                <TabPanel value={index} index={index}>
                  {item?.id === 4 ? (
                    <>
                      <AddPeople
                        getDocData={getDocData}
                        id={item.id}
                        getData={getData}
                        docData={docData}
                        people={people}
                        setPeople={setPeople}
                      />
                      {/* <FormRepeater /> */}
                    </>
                  ) : item.id === 20 ? (
                    <Review docData={docData} setValue={setValue} fromForm getDocData={getDocData} />
                  ) : item.id === 2 ? (
                    <AdditionalInformation
                      getDocData={getDocData}
                      pageTitle={pageTitle}
                      getData={getData}
                      item={item}
                      docData={docData}
                      settings={settings}
                    />
                  ) : item.id === 3 ? (
                    <AdditionalDangers
                      settings={settings}
                      getDocData={getDocData}
                      pageTitle={pageTitle}
                      getData={getData}
                      item={item}
                      docData={docData}
                    />
                  ) : item.id === 5 || item?.id === 8 ? (
                    <Terms getDocData={getDocData} item={item} getData={getData} docData={docData} />
                  ) : item?.id === 7 ? (
                    <AddGuarantor id={item.id} getData={getData} />
                  ) : user?.company_id == null ? (
                    <BasicData
                      titles={titles}
                      getDocData={getDocData}
                      pageTitle={pageTitle}
                      getData={getData}
                      item={item}
                      docData={docData}
                      settings={settings}
                    />
                  ) : (
                    <BasicDataCompany
                      titles={titles}
                      getDocData={getDocData}
                      pageTitle={pageTitle}
                      getData={getData}
                      item={item}
                      docData={docData}
                      settings={settings}
                    />
                  )}
                </TabPanel>
              );
            })}
          </TabContext>
        </Card>
      </Container>
    </div>
  );
}

export default Form;
