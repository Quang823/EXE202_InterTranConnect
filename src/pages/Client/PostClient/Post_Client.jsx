// Post_Client.jsx
import React, { useState } from "react";
import "./Post_Client.scss";
import SalaryModal from "./SalaryModal";
import CompanyModal from "./CompanyModal";
import ContactModal from "./ContactModal";
import WorkLocationModal from "./WorkLocationModal";

const Post_Client = () => {
  // State for controlling modal visibility
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isWorkLocationModalOpen, setIsWorkLocationModalOpen] = useState(false);

  // State for storing form data
  const [formData, setFormData] = useState({
    salary: {},
    companyInfo: {},
    contactInfo: {},
    workLocation: {},
  });

  // Handlers for saving modal data
  const handleSalarySave = (data) => {
    setFormData((prev) => ({ ...prev, salary: data }));
  };

  const handleCompanySave = (data) => {
    setFormData((prev) => ({ ...prev, companyInfo: data }));
  };

  const handleContactSave = (data) => {
    setFormData((prev) => ({ ...prev, contactInfo: data }));
  };

  const handleWorkLocationSave = (data) => {
    setFormData((prev) => ({ ...prev, workLocation: data }));
  };

  return (
    <div className="post-client-container">
      <div className="form-wrapper">
        <h3>Post a job for a translator</h3>

        {/* Basic Information Section */}
        <h4>Basic Information</h4>
        <div className="basic-info">
          <div className="upload-section">
            <svg
              className="upload-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p>
              UPLOAD DOCUMENTS HERE
              <br />
              Sample Document (PDF files only, drop to review if applicable)
            </p>
          </div>

          <div className="form-fields">
            <div className="field-row">
              <input type="text" placeholder="FULL NAME" />
              <input type="text" placeholder="TITLE/HEADLINE" />
            </div>
            <div className="field-row">
              <select>
                <option>WORK TYPE - Select...</option>
              </select>
              <select>
                <option>TRANSLATION LANGUAGE - Select...</option>
              </select>
            </div>
            <div className="field-row">
              <select>
                <option>EXPERIENCE REQUIREMENT - Select...</option>
              </select>
              <select>
                <option>EDUCATION (OPTIONAL) - Select...</option>
              </select>
            </div>
            <div className="field-row">
              <select>
                <option>TRANSLATION FORM - Select...</option>
              </select>
              <select>
                <option>RELEVANT CERTIFICATES - Select...</option>
              </select>
            </div>
          </div>
        </div>

        <div className="job-description">
          <textarea placeholder="JOB DESCRIPTION"></textarea>
        </div>

        {/* Employer Information Section */}
        <h4>Employer Information</h4>
        <div className="employer-info-container">
          <div className="employer-info-row">
            <input
              type="text"
              placeholder="ADD COMPANY/ORGANIZATION INFORMATION Browse file or drop here, only pdf"
              className="employer-input company-info-input"
              onClick={() => setIsCompanyModalOpen(true)}
              value={
                formData.companyInfo.companyName
                  ? formData.companyInfo.companyName
                  : ""
              }
              readOnly
            />
            <input
              type="text"
              placeholder="CONTACT INFORMATION Email, Phone Number"
              className="employer-input contact-info-input"
              onClick={() => setIsContactModalOpen(true)}
              value={
                formData.contactInfo.email ? formData.contactInfo.email : ""
              }
              readOnly
            />
            <input
              type="text"
              placeholder="WORK LOCATION"
              className="employer-input work-location-input"
              onClick={() => setIsWorkLocationModalOpen(true)}
              value={
                formData.workLocation.locationName
                  ? formData.workLocation.locationName
                  : ""
              }
              readOnly
            />
            <input
              type="text"
              placeholder="SALARY Hourly rate, per project, or negotiable..."
              className="employer-input salary-input"
              onClick={() => setIsSalaryModalOpen(true)}
              value={
                formData.salary.hourlyRate
                  ? `$${formData.salary.hourlyRate}/hr`
                  : ""
              }
              readOnly
            />
          </div>
          <button className="post-job-btn">POST JOB</button>
        </div>
      </div>

      {/* Modals */}
      <SalaryModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        onSave={handleSalarySave}
      />
      <CompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        onSave={handleCompanySave}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSave={handleContactSave}
      />
      <WorkLocationModal
        isOpen={isWorkLocationModalOpen}
        onClose={() => setIsWorkLocationModalOpen(false)}
        onSave={handleWorkLocationSave}
      />
    </div>
  );
};

export default Post_Client;
