import React from "react";
import CompanyForm from "../components/Document/CompanyForm";
import Form from "../components/Document/Form";
import { useParams } from "react-router-dom";

function DocPage() {
  const { id } = useParams();
  return id != 2 ? <Form /> : <CompanyForm />;
}

export default DocPage;
