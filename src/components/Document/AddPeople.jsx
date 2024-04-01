import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../redux/api";
import CheckBoxInput from "../../ui/forms/CheckBoxInput";
import TextInput from "../../ui/forms/TextInput";

function AddPeople({ getData, id, getDocData, docData, people, setPeople }) {
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const focusRef = React.useRef();

  const [peopleRef, setPeopleRef] = React.useState([]);
  const [legalHeirs, setLegalHeirs] = React.useState(
    docData?.step !== 3 ? (docData?.document?.heir > 0 ? true : false) : false
  );

  const handleAddForm = () => {
    const newPerson = {
      id: generateId(),
      name: "",
      description: "",
      percentage: "",
      national_id: "",
    };
    setPeople([...people, newPerson]);
  };

  const handleRemoveForm = (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
  };

  const handleFormChange = (id, field, value) => {
    const updatedPeople = people.map((person) => {
      if (person.id === id) {
        return { ...person, [field]: value };
      }
      return person;
    });
    setPeople(updatedPeople);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const percentagesArray = people.map((item) => item.percentage);
  const wholePercentage =
    percentagesArray?.length === 0 ? 0 : percentagesArray?.reduce((acc, current) => parseInt(acc) + parseInt(current));
  const handleChange = (e) => {
    setOne((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  React.useEffect(() => {
    setPeopleRef(people);
  }, [people]);
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  const formData = new FormData();
  formData.append("document_id", docData?.id);
  if (legalHeirs) {
    formData.append("legal_heirs", legalHeirs);
  }
  people?.map((item, index) => {
    formData.append(`name[${index}]`, item?.name);
    formData.append(`percentage[${index}]`, item?.percentage);
    formData.append(`description[${index}]`, item?.description);
    formData.append(`national_id[${index}]`, item?.national_id);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(wholePercentage) < 100 && !legalHeirs) {
      toast.error(t("Document.BenefVal"));
    } else {
      setLoading(true);
      api
        .post(`document-step4`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setErr({});
          getData();
          getDocData();
        })
        .catch((err) => {
          setErr(err?.response);
          setLoading(false);
          toast.err("ERR");
        });
    }
  };

  console.log("ERROR", err?.data?.errors);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (parseInt(wholePercentage) < 100 && !legalHeirs) {
      toast.error(t("Document.BenefVal"));
    } else {
      setLoading(true);
      api
        .post(`update-benef/${docData?.document?.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          getData();
          getDocData();
          toast.success(t("Document.UpdateToast"));
        })
        .catch((err) => {
          setErr(err?.response);
          setLoading(false);
        });
    }
  };

  const handleCheckChange = (e) => {
    if (e.target.checked) {
      setLegalHeirs(true);
    } else {
      setLegalHeirs(false);
    }
  };
  return (
    <Box style={{ margin: "20px 0px" }}>
      <Typography variant="h6">{t("Document.IfNotChoosen")}</Typography>
      {/* {peopleRef?.map((item, index) => {
        return (
          <Grid key={index} container>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography className="todo-title-padding">{item.name}</Typography>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography className="todo-title-padding">{item.description}</Typography>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography className="todo-title-padding">
                {item?.national_id?.length === 14 ? item?.national_id : t("Document.NoResults")}
              </Typography>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography className="todo-title-padding">{item.percentage}</Typography>
            </Grid>
            <Grid marginTop="10px" item lg={2} md={2} sm={2} xs={2}>
              <Button
                onClick={
                  //   () => setPeople(people.find((chi) => chi.id === item.id))
                  //   () => setPeople(people.find((chi) => chi.id === item.id))
                  () =>
                    // console.log(
                    //   "PEOPLE",
                    //   people.filter((chi) => chi.id !== item.id)
                    // )
                    setPeople((prevState) => prevState.filter((chi) => chi.id !== item.id))
                }
                variant="contained"
                fullWidth
              >
                {t("Document.Delete")}
              </Button>
            </Grid>
          </Grid>
        );
      })} */}
      <div>
        <form
          onSubmit={
            wholePercentage > 100
              ? (e) => {
                  e.preventDefault();
                  toast.error(t("Document.BenefValidation"));
                }
              : docData?.step !== 3
              ? handleUpdate
              : handleSubmit
          }
        >
          {people.map((form, index) => (
            <div key={form.id}>
              <Grid container>
                <TextInput
                  type="text"
                  value={form.name}
                  onChange={(e) => handleFormChange(form.id, "name", e.target.value)}
                  placeholder={t("Document.UserName")}
                  required
                />
                <TextInput
                  type="text"
                  value={form.description}
                  onChange={(e) => handleFormChange(form.id, "description", e.target.value)}
                  placeholder={t("Document.UserStat")}
                  required
                />
                <TextInput
                  type="number"
                  value={form.percentage}
                  onChange={(e) => handleFormChange(form.id, "percentage", e.target.value)}
                  placeholder={t("Document.UserPercentage")}
                  required
                />
                <TextInput
                  type="text"
                  value={form.national_id === "null" ? "" : form.national_id}
                  onChange={(e) => handleFormChange(form.id, "national_id", e.target.value)}
                  placeholder={t("Document.UserNationalID")}
                  fieldError={err?.data?.errors?.[`national_id.${index}`]?.[0]}
                />
              </Grid>
              <div className="flex-between">
                <div />
                <Button variant="contained" onClick={() => handleRemoveForm(form.id)}>
                  {t("Document.Remove")}
                </Button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "20px" }} className="flex-between">
            <div />
            <Button style={{ background: "#1c407b" }} variant="contained" onClick={handleAddForm}>
              {t("Document.Add")} {t("Document.Benef")}
            </Button>
          </div>
          <CheckBoxInput
            onChange={handleCheckChange}
            placeholder={t("Document.LegalHeirs")}
            defaultChecked={legalHeirs}
          />
          <div className="flex-center">
            <LoadingButton
              style={{ marginTop: "30px" }}
              loading={loading ? true : false}
              type="submit"
              // onClick={() => handleSubmit()}
              variant="contained"
            >
              {docData?.step !== 3 ? t("Document.Update") : t("Document.Submit")}
            </LoadingButton>
          </div>
        </form>
        {/* <CheckBoxInput
          onChange={handleCheckChange}
          placeholder={t("Document.LegalHeirs")}
          defaultChecked={legalHeirs}
        />
        <div className="flex-center">
          <LoadingButton
            style={{ marginTop: "30px" }}
            loading={loading ? true : false}
            type="button"
            // onClick={() => handleSubmit()}
            onClick={() => (docData?.step !== 3 ? handleUpdate() : handleSubmit())}
            variant="contained"
          >
            {docData?.step !== 3 ? t("Document.Update") : t("Document.Submit")}
          </LoadingButton>
        </div> */}
      </div>
    </Box>
  );
}

export default AddPeople;
