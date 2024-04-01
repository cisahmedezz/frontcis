import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../ui/forms/TextInput";

const FormRepeater = () => {
  const [forms, setForms] = useState([]);

  const handleAddForm = () => {
    const newForm = {
      id: generateId(),
      name: "",
      description: "",
      percentage: "",
      national_id: "",
    };
    setForms([...forms, newForm]);
  };

  console.log("FORMS", forms);

  const handleRemoveForm = (id) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
  };

  const handleFormChange = (id, field, value) => {
    const updatedForms = forms.map((form) => {
      if (form.id === id) {
        return { ...form, [field]: value };
      }
      return form;
    });
    setForms(updatedForms);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission with all the form data
    console.log(forms);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {forms.map((form) => (
          <div key={form.id}>
            <h3>Form ID: {form.id}</h3>
            <Grid container>
              <TextInput
                type="text"
                value={form.name}
                onChange={(e) => handleFormChange(form.id, "name", e.target.value)}
                placeholder="Name"
                required
              />
              <TextInput
                type="text"
                value={form.description}
                onChange={(e) => handleFormChange(form.id, "description", e.target.value)}
                placeholder="Description"
                required
              />
              <TextInput
                type="number"
                value={form.percentage}
                onChange={(e) => handleFormChange(form.id, "percentage", e.target.value)}
                placeholder="Percentage"
                required
              />
              <TextInput
                type="text"
                value={form.national_id}
                onChange={(e) => handleFormChange(form.id, "national_id", e.target.value)}
                placeholder="National ID"
                required
              />
            </Grid>
            <div className="flex-between">
              <div />
              <Button variant="contained" onClick={() => handleRemoveForm(form.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "20px" }} className="flex-between">
          <div />
          <Button variant="contained" onClick={handleAddForm}>
            Add Benef
          </Button>
        </div>
        <div className="flex-center">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormRepeater;
