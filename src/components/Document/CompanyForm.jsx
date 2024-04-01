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
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import LoaderPage from "../../pages/LoadPage";
import AddPeople from "./AddGuarantor";
import FormSucceed from "../../ui/forms/formSucceed";
import api from "../../redux/api";
import AdditionalInformation from "./AdditionalInformation";
import Terms from "./Terms";
import AddGuarantor from "./AddGuarantor";
import Review from "./Review";
import BasicDataCompany from "./BasicDataCompany";
import { reduxGet } from "../../redux/actions/reusableActions";
import { GET_USER_DATA, LOGIN_FAILED } from "../../redux/actions/types";
import CompanyReview from "./CompanyReview";

function CompanyForm() {
  const titles = useFetch("titles");
  const mode = useSelector((state) => state.theme.mode);
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const pageTitle = React.useRef();
  const [fields, setFields] = React.useState({});
  const [currentItem, setCurrentItem] = React.useState();
  const [value, setValue] = React.useState(currentItem);
  const { id } = useParams();
  const [data, setData] = React.useState(null);
  const [docData, setDocData] = React.useState({ document: { benef: [] } });
  const [ren, setRen] = React.useState(false);
  const dispatch = useDispatch();
  const documents = useSelector((state) => state?.auth?.userData?.presonal_data?.documents);
  const isReviewd = docData?.document?.reviewed_at != null;
  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  console.log("DOC DATA IS", docData);
  const [people, setPeople] = React.useState(
    docData?.document?.benef.length > 0
      ? docData?.document?.benef
      : [
          {
            id: generateId(),
            name: "",
            description: "",
            percentage: "",
            national_id: "",
          },
        ]
  );
  console.log("PEOPLE", people);

  React.useEffect(() => {
    // dispatch(reduxGet("profile", GET_USER_DATA, token, LOGIN_FAILED));
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setRen(true);
    }, 1000);
  }, []);

  console.log(documents?.[0]?.step, "DOCUMENT STEPNES");
  const getData = () => {
    api
      .get(`get-specific-doc-type/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data));
  };
  React.useEffect(() => {
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
  // }, []);

  console.log("docData outside", docData);

  React.useEffect(() => {
    if (documents?.[0]?.step == 5) {
      // setValue(0);
    }
  }, [documents, docData]);

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
  // React.useEffect(() => {
  //   axios.post(`to-link`, formData).catch((err) => console.log(err));
  // }, [fields]);
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
    setValue(parseInt(docData == 5 ? 0 : docData?.step));
  }, [docData]);

  const concatedArray = data?.sub_documents?.concat({
    title: { ar: "المراجعة", en: "Review" },
    id: 20,
  });

  console.log("THE VALUE ISS", value);

  return data === null ? (
    <LoaderPage />
  ) : (
    <div>
      <Container className={mode === "dark" ? "dark" : "light"}>
        <Card style={{ marginTop: "15px", padding: "15px" }}>
          <Typography className="hide-print" ref={pageTitle} variant="h4" style={{ textAlign: "center" }}>
            {docData?.document?.type?.title?.[currentLocale]}
          </Typography>
          {currentItem ? (
            <TabContext value={value}>
              <div className="flex-center tabs-container hide-print">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
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
                          label={`${index === 0 ? index + 1 : index - 1}- ${
                            index === 3 ? t("Document.Guarantors") : item?.title?.[currentLocale]
                          }`}
                          style={{
                            cursor: "auto",
                            display: index === 1 || index == 2 ? "none" : "block",
                          }}
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
                      <AddPeople
                        getDocData={getDocData}
                        id={item.id}
                        getData={getData}
                        docData={docData}
                        people={people}
                        setPeople={setPeople}
                      />
                    ) : item.id === 20 ? (
                      <Review docData={docData} setValue={setValue} fromForm getDocData={getDocData} />
                    ) : item.id === 2 ? (
                      <AdditionalInformation
                        getDocData={getDocData}
                        pageTitle={pageTitle}
                        getData={getData}
                        item={item}
                        docData={docData}
                      />
                    ) : item.id === 3 ? (
                      <AdditionalDangers
                        getDocData={getDocData}
                        pageTitle={pageTitle}
                        getData={getData}
                        item={item}
                        docData={docData}
                      />
                    ) : item.id === 5 || item?.id === 8 ? (
                      <Terms getDocData={getDocData} item={item} getData={getData} docData={docData} />
                    ) : item?.id === 7 ? (
                      // <AddGuarantor id={item.id} getData={getData} />
                      <div />
                    ) : (
                      <BasicDataCompany
                        titles={titles}
                        docData={docData}
                        getDocData={getDocData}
                        pageTitle={pageTitle}
                        getData={getData}
                        item={item}
                      />
                    )}
                  </TabPanel>
                );
              })}
            </TabContext>
          ) : (
            <div style={{ padding: "50px 0px" }}>
              <Typography variant="h5" textAlign="center" marginBottom="100px">
                {t("Document.FilledSucc")}
              </Typography>
              <div className="flex-center">
                <Link to={`/portal/profile/document/${data?.id}`}>
                  <Button variant="contained">{t("Document.ClickToReview")}</Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default CompanyForm;
