/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import React from "react";
import Form from "./components/Document/Form";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import ContactUsPage from "./pages/ContactUsPage";
import HowitworksPage from "./pages/HowitworksPage";
import DocumentTypes from "./components/Document/DocumentTypes";
import SingleDocument from "./components/Document/SingleDocument";
import { useSelector } from "react-redux";
import CompanyForm from "./components/Document/CompanyForm";
import DocPage from "./pages/DocPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsPage from "./pages/TermsPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import PaymentSuccess from "./pages/PaymentSuccess";

function MyRouter() {
  const user = useSelector((state) => state.auth?.userData?.presonal_data);
  return (
    <div className="container">
      <>
        <Routes>
          {/* <Route path="/" element={<h1>HOME PAGE</h1>} /> */}
          <Route path="/portal/profile" element={<ProfilePage />} />
          <Route path="/portal/about" element={<AboutPage />} />
          <Route path="/portal/support" element={<SupportPage />} />
          <Route path="/portal/contact" element={<ContactUsPage />} />
          <Route path="/portal/how" element={<HowitworksPage />} />
          <Route path="/portal/form/:id" element={<DocPage />} />
          <Route path="/portal/" element={<DocumentTypes />} />
          <Route path="/portal/profile/document/:id" element={<SingleDocument />} />
          <Route path="/portal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/portal/terms-conditions" element={<TermsPage />} />
          <Route path="/portal/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/portal/payment-success" element={<PaymentSuccess success />} />
          <Route path="/portal/payment-failed" element={<PaymentSuccess />} />
        </Routes>
      </>
    </div>
  );
}

export default MyRouter;
