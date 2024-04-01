import { LoadingButton } from "@mui/lab";
import { Button, Card, Container, Grid, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import { t } from "i18next";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../redux/api";
import CheckBoxChildren from "../../ui/forms/CheckBoxChildren";
import CheckBoxInput from "../../ui/forms/CheckBoxInput";
import FileInput from "../../ui/forms/FileInput";
import MultipleFilesInput from "../../ui/forms/MultipleFilesInput";
import SelectInput from "../../ui/forms/SelectInput";
import SelectInputApi from "../../ui/forms/SelectInputApi";
import TextInput from "../../ui/forms/TextInput";
import { additionalInfo, firstForm, formErrors, formSchiema } from "../../utils/FormSchiema";
import RadioInput from "../../ui/forms/RadioInput";
import { convertArrayToChunks, removeNumbersFromString } from "../../helperFunctions";

function AdditionalDangers({ settings, getData, item, pageTitle, docData, getDocData }) {
  const scrollToRef = (ref) =>
    window.scrollTo({
      top: ref.current.offsetTop - 90,
      left: 0,
      behavior: "smooth",
    });
  const [fields, setFields] = React.useState({});
  const [value, setValue] = React.useState(0);
  const [err, setErr] = React.useState();
  const token = useSelector((state) => state.auth?.user?.msg?.token);
  const defaultDangers = docData?.document?.dangers?.map((item) => item?.danger_id);
  const arrayChunks = convertArrayToChunks(settings?.dangers || []);
  console.log("DEFAULT DANGERS", defaultDangers);
  React.useEffect(() => {
    let arr = [];
    for (let i = 0; i < arrayChunks.length; i++) {
      const chunk = arrayChunks[i];
      for (let j = 0; j < chunk.length; j++) {
        const item = chunk[j];
        console.log(item.id, "ITEM ID");
        if (defaultDangers.includes(item.id)) {
          arr[i] = item.id;
        }
      }
    }
    console.log("FINAL ARRAY", arr);
    setSelectedOptions(arr);
  }, []);
  // const [additionalInfo, setAdditionalInfo] = React.useState(
  //   docData?.document?.dangers?.map((item) => item?.danger_id?.toString())
  // );
  const [selectedOptions, setSelectedOptions] = React.useState(defaultDangers);
  const filteredOptions = selectedOptions.filter((item) => {
    return Number(item) > 0;
  });
  const [loading, setLoading] = React.useState(false);
  const parsedInfo = selectedOptions.map((item) => parseInt(item));
  const choosenArray = settings?.dangers?.filter((item) => parsedInfo?.includes(item?.id));
  const choosenPrices = choosenArray.map((item) => item?.price);
  const totalPrice =
    choosenArray?.length === 0
      ? 0
      : choosenArray?.length === 1
      ? choosenArray?.[0]?.price
      : choosenPrices?.reduce((acc, curr) => acc + curr);

  // const handleChange = (e) => {
  //   if (e.target.type === "radio") {
  //     setFields((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: e.target.checked
  //         ? setAdditionalInfo(additionalInfo.concat([e.target.value]))
  //         : setAdditionalInfo(additionalInfo.filter((item) => item !== e.target.value)),
  //     }));
  //   }
  // };

  const formData = new FormData();
  const locale = localStorage.getItem("i18nextLng");
  const currentLocale = locale !== "ar" ? "en" : "ar";
  formData.append("dangers", JSON.stringify(filteredOptions));
  formData.append("document_id", docData?.id);

  React.useEffect(() => {}, [fields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post(`document-step3`, formData, {
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
        scrollToRef(pageTitle);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post(`update-danger/${docData?.document?.id}`, formData, {
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
        scrollToRef(pageTitle);
      });
  };

  console.log("GROUPS ARRAY", arrayChunks);

  let additionalIds = docData?.document?.dangers?.map((item) => item?.title?.en);
  console.log("ADDITIONAL INFO", selectedOptions);

  // Function to handle changes in the select elements
  const handleSelectChange = (event, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleDefaultValue = (group) => {
    const groupIds = group?.map((item) => item.id);
    const choosenId = selectedOptions.find((item) => groupIds.includes(item));
    return choosenId ? choosenId : "0";
  };

  return (
    <div>
      <Container>
        <form onSubmit={docData?.step !== 2 ? handleUpdate : handleSubmit}>
          <Grid container>
            {arrayChunks?.map((group, index) => (
              <SelectInputApi
                key={index}
                // value={selectedOptions[index] || "0"}
                value={handleDefaultValue(group)}
                onChange={(e) => handleSelectChange(e, index)}
                placeholder={removeNumbersFromString(group[0].title[currentLocale])}
              >
                {group.map((item) => (
                  <MenuItem title={item?.description?.[currentLocale]} key={item.id} value={item.id}>
                    {item.title[currentLocale]}
                  </MenuItem>
                ))}
              </SelectInputApi>
            ))}
          </Grid>
          <Typography marginTop="10px">
            {t("Document.TotalPrice")}: {docData?.document?.package?.total_price + totalPrice}
          </Typography>
          <div className="flex-center">
            <LoadingButton
              // loading
              size="medium"
              style={{ marginTop: "20px" }}
              variant="contained"
              color="primary"
              type="submit"
              loading={loading ? true : false}
            >
              {docData?.step !== 2 ? t("Document.Update") : t("Document.Submit")}
            </LoadingButton>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default AdditionalDangers;
