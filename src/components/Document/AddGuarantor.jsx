import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "../../redux/api";
import TextInput from "../../ui/forms/TextInput";
import { hasDuplicates } from "../../helperFunctions";

function AddGuarantor({ getData, id, getDocData, docData, people, setPeople }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [peopleRef, setPeopleRef] = React.useState([]);
  const generateId = () => {
    return Math.random().toString(36);
  };
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

  console.log("docData inside", docData);

  const handleRemoveForm = (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
  };

  const handleFormChange = (id, field, value) => {
    const updatedPeople = people?.map((person) => {
      if (person.id === id) {
        return { ...person, [field]: value };
      }
      return person;
    });
    setPeople(updatedPeople);
  };

  const percentagesArray = people?.map((item) => item.percentage);
  const wholePercentage =
    percentagesArray?.length === 0
      ? null
      : percentagesArray?.reduce((acc, current) => parseInt(acc) + parseInt(current));
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
  people?.map((item, index) => {
    formData.append(`name[${index}]`, item?.name);
    formData.append(`percentage[${index}]`, item?.percentage);
    formData.append(`description[${index}]`, item?.description);
    formData.append(`national_id[${index}]`, item?.national_id);
  });

  const nationalIds = people?.map((item) => item.national_id);

  const isDuplicatedId = hasDuplicates(nationalIds?.concat([docData?.document?.national_id]));

  console.log("NATIONAL IDS", isDuplicatedId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDuplicatedId) {
      toast.error(t("Document.DuplicatedId"));
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
          setPeople([
            {
              id: generateId(),
              name: "",
              description: "",
              percentage: "",
              national_id: "",
            },
          ]);
        })
        .catch((err) => {
          setErr(err?.response);
          setLoading(false);
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (isDuplicatedId) {
      toast.error(t("Document.DuplicatedId"));
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
  return (
    <Box style={{ margin: "20px 0px" }}>
      <form onSubmit={docData?.step !== 3 ? handleUpdate : handleSubmit}>
        {people?.map((form, index) => (
          <div key={form.id}>
            <Grid container>
              <TextInput
                type="text"
                value={form.name}
                onChange={(e) => handleFormChange(form.id, "name", e.target.value)}
                placeholder={t("Document.GuarantorName")}
                required
              />
              <TextInput
                type="text"
                value={form.description}
                onChange={(e) => handleFormChange(form.id, "description", e.target.value)}
                placeholder={t("Document.GuarantorAddress")}
                required
              />
              <TextInput
                type="number"
                value={form.percentage}
                onChange={(e) => handleFormChange(form.id, "percentage", e.target.value)}
                placeholder={t("Document.GuarantorPhone")}
                fieldError={err?.data?.errors?.[`percentage.${index}`]?.[0]}
                required
              />
              <TextInput
                type="text"
                value={form.national_id === "null" ? "" : form.national_id}
                onChange={(e) => handleFormChange(form.id, "national_id", e.target.value)}
                placeholder={t("Document.GuarantorNationaID")}
                fieldError={err?.data?.errors?.[`national_id.${index}`]?.[0]}
              />
            </Grid>
            <div className="flex-between">
              <div />
              {index !== 0 && (
                <Button variant="contained" onClick={() => handleRemoveForm(form.id)}>
                  {t("Document.Remove")}
                </Button>
              )}
            </div>
          </div>
        ))}
        <div style={{ marginTop: "20px" }} className="flex-between">
          <div />
          <Button variant="contained" onClick={handleAddForm} style={{ backgroundColor: "#1c407b" }}>
            {t("Document.Add")} {t("Document.Guarantor")}
          </Button>
        </div>

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
    </Box>
  );
}

export default AddGuarantor;
