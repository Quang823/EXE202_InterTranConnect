import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import ISO6391 from "iso-639-1";
import "./Post_Client.scss";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { createJob } from "../../../services/jobService";
import { uploadToCloudinaryService } from "../../../services/uploadToCloudinaryService";
import CompanyModal from "./CompanyModal";
import ContactModal from "./ContactModal";
import SalaryModal from "./SalaryModal";
import WorkLocationModal from "./WorkLocationModal";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Post_Client = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    requiredHires: "",
    translationType: "",
    sourceLanguage: "",
    translationLanguage: "",
    description: "",
    uploadFileUrl: "",
    companyLogoUrl: "",
    salary: { hourlyRate: "", platformFee: "", totalFee: "" },
    companyInfo: { companyName: "", companyDescription: "", logo: "" },
    contactInfo: { email: "", phone: "", address: "" },
    workLocation: {
      workAddressLine: "",
      city: "",
      postalCode: "",
      country: "",
    },
    experience: "",
    education: "",
    translationForm: "",
    certificates: "",
    deadline: "",
    workingTime: "",
  });

  const [message, setMessage] = useState("");
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [isWorkLocationOpen, setIsWorkLocationOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isCompanyFilled, setIsCompanyFilled] = useState(false);
  const [isContactFilled, setIsContactFilled] = useState(false);
  const [isSalaryFilled, setIsSalaryFilled] = useState(false);
  const [isWorkLocationFilled, setIsWorkLocationFilled] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const languages = ISO6391.getAllNames().map((name) => ({
    value: name,
    label: name,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      salary: { ...prev.salary, [name]: value },
    }));
    if (value) setIsSalaryFilled(true);
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      companyInfo: { ...prev.companyInfo, [name]: value },
    }));
    if (value) setIsCompanyFilled(true);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));
    if (value) setIsContactFilled(true);
  };

  const handleWorkLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      workLocation: { ...prev.workLocation, [name]: value },
    }));
    if (value) setIsWorkLocationFilled(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage("No file selected. Please choose a file.");
      return;
    }
    if (file.type !== "application/pdf" || file.size > 12 * 1024 * 1024) {
      setMessage("Please upload a PDF file smaller than 12 MB.");
      return;
    }
    const uploadFileUrl = await uploadToCloudinaryService(file);
    if (!uploadFileUrl) {
      setMessage("Failed to upload file to Cloudinary.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      uploadFileUrl,
    }));
    setMessage(`File uploaded successfully: ${uploadFileUrl}`);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage("No logo selected. Please choose a file.");
      return;
    }
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setMessage("Please upload an image file smaller than 5 MB.");
      return;
    }
    const companyLogoUrl = await uploadToCloudinaryService(file);
    if (!companyLogoUrl) {
      setMessage("Failed to upload company logo to Cloudinary.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      companyLogoUrl,
      companyInfo: { ...prev.companyInfo, logo: companyLogoUrl },
    }));
    setMessage(`Company logo uploaded successfully: ${companyLogoUrl}`);
    setIsCompanyFilled(true);
  };

  const handlePostJob = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      const customerId = user.id;
      const jobData = {
        jobTitle: formData.jobTitle,
        requiredHires: parseInt(formData.requiredHires) || 1,
        translationType: formData.translationType,
        sourceLanguage: formData.sourceLanguage,
        targetLanguage: formData.translationLanguage,
        description: formData.description,
        uploadFileUrl: formData.uploadFileUrl,
        hourlyRate: parseFloat(formData.salary.hourlyRate) || 0,
        platformServiceFee: parseFloat(formData.salary.platformFee) || 0,
        totalFee: parseFloat(formData.salary.totalFee) || 0,
        companyName: formData.companyInfo.companyName,
        companyDescription: formData.companyInfo.companyDescription,
        companyLogoUrl: formData.companyLogoUrl,
        contactEmail: formData.contactInfo.email,
        contactPhone: formData.contactInfo.phone || "",
        contactAddress: formData.contactInfo.address,
        workAddressLine: formData.workLocation.workAddressLine,
        workCity: formData.workLocation.city,
        workPostalCode: formData.workLocation.postalCode || "",
        workCountry: formData.workLocation.country || "",
        customerId: customerId,
        ...(formData.translationType === "Written" && {
          deadline: formData.deadline,
        }),
        ...(formData.translationType === "Oral" && {
          workingTime: formData.workingTime,
        }),
      };

      if (!jobData.jobTitle || !jobData.contactEmail) {
        setMessage("Please fill in Title, ContactEmail");
        setIsSubmitting(false);
        return;
      }

      if (formData.translationType === "Oral" && !jobData.workingTime) {
        setMessage("Please specify the working time for Oral translation.");
        setIsSubmitting(false);
        return;
      }
      if (formData.translationType === "Written" && !jobData.uploadFileUrl) {
        setMessage("Please submit a file for translator.");
        setIsSubmitting(false);
        return;
      }

      if (
        !jobData.hourlyRate ||
        !jobData.platformServiceFee ||
        !jobData.totalFee ||
        !jobData.companyName
      ) {
        setMessage(
          "Please fill in Hourly Rate, Platform Fee, Total Fee, and Company Name."
        );
        setIsSubmitting(false);
        return;
      }

      const response = await createJob(jobData);
      setMessage("Job posted successfully!");
      ToastManager.showSuccess("Job posted successfully!");

      setFormData({
        jobTitle: "",
        requiredHires: "",
        translationType: "",
        sourceLanguage: "",
        translationLanguage: "",
        description: "",
        uploadFileUrl: "",
        companyLogoUrl: "",
        salary: { hourlyRate: "", platformFee: "", totalFee: "" },
        companyInfo: { companyName: "", companyDescription: "", logo: "" },
        contactInfo: { email: "", phone: "", address: "" },
        workLocation: {
          workAddressLine: "",
          city: "",
          postalCode: "",
          country: "",
        },
        experience: "",
        education: "",
        translationForm: "",
        certificates: "",
        deadline: "",
        workingTime: "",
      });
      setIsCompanyFilled(false);
      setIsContactFilled(false);
      setIsSalaryFilled(false);
      setIsWorkLocationFilled(false);
    } catch (error) {
      console.error("Error posting job:", error);
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(`Failed to create job: ${errorMsg}`);
      if (
        errorMsg?.toLowerCase().includes("not subscribed") ||
        errorMsg?.toLowerCase().includes("posting limit") ||
        errorMsg?.toLowerCase().includes("remaining posts")
      ) {
        ToastManager.showInfo(
          "You need to purchase a service package or have run out of posts for the period. Please top up your package to continue posting!"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsPdfPreviewOpen(false);
    }
  };

  return (
    <div className="post-job-container">
      <div className="post-job-form-wrapper">
        <h3 className="post-job-title">Post a job for a translator</h3>

        <h4 className="post-job-section-title">Basic Information</h4>

        <div className="post-job-basic-info">
          <div className="upload-section">
            <div className="upload-box">
              <span className="upload-icon">☁️</span>
              <p>Upload Documents here</p>
              <p className="upload-hint">
                Sample document (for candidates to review applicable)
              </p>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="file-upload"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="file-input-label"
                  data-content={
                    formData.uploadFileUrl ? "File uploaded" : "No file chosen"
                  }
                >
                  Choose File
                </label>
              </div>
              {formData.uploadFileUrl && (
                <button
                  className="preview-btn"
                  onClick={() => setIsPdfPreviewOpen(true)}
                >
                  Preview Document
                </button>
              )}
            </div>
          </div>

          <div className="post-job-form-fields">
            <div className="post-job-field-row">
              <div className="input-with-label">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Title/Headline"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="full-width-input"
                />
              </div>
              <div className="input-with-label">
                <label htmlFor="requiredHires">Required Hires</label>
                <input
                  type="number"
                  id="requiredHires"
                  name="requiredHires"
                  placeholder="e.g., 2"
                  value={formData.requiredHires}
                  onChange={handleInputChange}
                  className="full-width-input"
                  min="1"
                />
              </div>
            </div>

            <div className="post-job-field-row">
              <div className="input-with-label">
                <label htmlFor="translationType">Work Type</label>
                <select
                  id="translationType"
                  name="translationType"
                  value={formData.translationType}
                  onChange={handleInputChange}
                  className="full-width-input"
                >
                  <option value="">Work Type - Select...</option>
                  <option value="Written">Written - With Deadline Time</option>
                  <option value="Oral">Oral - With Working Time</option>
                </select>
              </div>
              {formData.translationType === "" && (
                <div className="input-with-label">
                  <label>Time (Select Work Type)</label>
                  <input
                    type="text"
                    value="Please select Work Type"
                    disabled
                    className="full-width-input"
                    style={{ backgroundColor: "#f0f0f0", color: "#888" }}
                  />
                </div>
              )}
              {formData.translationType === "Written" && (
                <div className="input-with-label">
                  <label htmlFor="deadline">Deadline</label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="full-width-input"
                    placeholder="Select Deadline"
                  />
                </div>
              )}
              {formData.translationType === "Oral" && (
                <div className="input-with-label">
                  <label htmlFor="workingTime">Working Time</label>
                  <input
                    type="datetime-local"
                    id="workingTime"
                    name="workingTime"
                    value={formData.workingTime}
                    onChange={handleInputChange}
                    className="full-width-input"
                    placeholder="Select Working Time"
                  />
                </div>
              )}
            </div>

            <div className="post-job-field-row">
              <div className="input-with-label">
                <label htmlFor="experience">Experience Requirement</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="full-width-input"
                >
                  <option value="">Experience Requirement - Select...</option>
                  <option value="Entry">Entry Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div className="input-with-label">
                <label htmlFor="education">Education (Optional)</label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="full-width-input"
                >
                  <option value="">Education (Optional) - Select...</option>
                  <option value="HighSchool">High School</option>
                  <option value="Bachelor">Bachelor's Degree</option>
                  <option value="Master">Master's Degree</option>
                </select>
              </div>
            </div>

            <div className="post-job-field-row">
              <div className="input-with-label">
                <label htmlFor="sourceLanguage">Source Language</label>
                <select
                  id="sourceLanguage"
                  name="sourceLanguage"
                  value={formData.sourceLanguage}
                  onChange={handleInputChange}
                  className="full-width-input"
                >
                  <option value="">Source Language - Select...</option>
                  {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-with-label">
                <label htmlFor="translationForm">Translation Form</label>
                <select
                  id="translationForm"
                  name="translationForm"
                  value={formData.translationForm}
                  onChange={handleInputChange}
                  className="full-width-input"
                >
                  <option value="">Translation Form - Select...</option>
                  <option value="Document">Document</option>
                  <option value="Live">Live Interpretation</option>
                </select>
              </div>
            </div>

            <div className="post-job-field-row">
              <div className="input-with-label">
                <label htmlFor="translationLanguage">Target Language</label>
                <select
                  id="translationLanguage"
                  name="translationLanguage"
                  value={formData.translationLanguage}
                  onChange={handleInputChange}
                  className="full-width-input"
                >
                  <option value="">Target Language - Select...</option>
                  {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-with-label">
                <label htmlFor="certificates">Relevant Certificates</label>
                <select
                  id="certificates"
                  name="certificates"
                  value={formData.certificates}
                  onChange={handleInputChange}
                  className="full-width-input"
                >
                  <option value="">Relevant Certificates - Select...</option>
                  <option value="None">None</option>
                  <option value="CertifiedTranslator">
                    Certified Translator
                  </option>
                  <option value="ATA">ATA Certification</option>
                </select>
              </div>
            </div>

            <div className="post-job-description">
              <label htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleInputChange}
                className="full-width-input"
              ></textarea>
            </div>
          </div>
        </div>

        <h4 className="post-job-section-title">Employer Information</h4>

        <div className="employer-info">
          <div className="employer-info-row">
            <button
              className={`info-link ${isCompanyFilled ? "filled" : ""}`}
              onClick={() => setIsCompanyOpen(true)}
            >
              <span className="info-icon">📄</span> Company Info
              {isCompanyFilled && <span className="filled-icon">✓</span>}
              <span className="plus-icon">+</span>
            </button>
            <button
              className={`info-link ${isContactFilled ? "filled" : ""}`}
              onClick={() => setIsContactOpen(true)}
            >
              <span className="info-icon">📞</span> Contact Info
              {isContactFilled && <span className="filled-icon">✓</span>}
              <span className="plus-icon">+</span>
            </button>
            {formData.translationType === "Oral" && (
              <button
                className={`info-link ${isWorkLocationFilled ? "filled" : ""}`}
                onClick={() => setIsWorkLocationOpen(true)}
              >
                <span className="info-icon">📍</span> Work Location
                {isWorkLocationFilled && <span className="filled-icon">✓</span>}
                <span className="plus-icon">+</span>
              </button>
            )}
            <button
              className={`info-link ${isSalaryFilled ? "filled" : ""}`}
              onClick={() => setIsSalaryOpen(true)}
            >
              <span className="info-icon">💰</span> Salary
              {isSalaryFilled && <span className="filled-icon">✓</span>}
              <span className="plus-icon">+</span>
            </button>
          </div>
        </div>

        <button
          className="post-job-btn"
          onClick={handlePostJob}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "POST JOB"}
        </button>

        {isPdfPreviewOpen && (
          <div className="wallet-modal-overlay" onClick={handleOverlayClick}>
            <div
              id="pdf-preview-modal"
              className="wallet-modal wallet-modal--wide"
              style={{ maxWidth: "90vw", width: "1000px", minHeight: "80vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="wallet-modal__header">
                <h3 className="wallet-modal__title">
                  <span className="header-icon">📜</span> Document Preview
                </h3>
                <button
                  className="wallet-modal__close"
                  onClick={() => setIsPdfPreviewOpen(false)}
                >
                  ×
                </button>
              </div>
              <div
                className="wallet-modal__content"
                style={{ height: "calc(80vh - 60px)", overflow: "auto" }}
              >
                {formData.uploadFileUrl &&
                  typeof formData.uploadFileUrl === "string" && (
                    <Worker
                      workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                    >
                      <Viewer
                        fileUrl={formData.uploadFileUrl}
                        plugins={[defaultLayoutPluginInstance]}
                      />
                    </Worker>
                  )}
              </div>
            </div>
          </div>
        )}

        <CompanyModal
          isOpen={isCompanyOpen}
          onClose={() => setIsCompanyOpen(false)}
          formData={formData.companyInfo}
          onChange={handleCompanyChange}
          onFileChange={handleLogoChange}
          uploadFileUrl={formData.companyLogoUrl}
        />
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          formData={formData.contactInfo}
          onChange={handleContactChange}
        />
        <SalaryModal
          isOpen={isSalaryOpen}
          onClose={() => setIsSalaryOpen(false)}
          formData={formData.salary}
          onChange={handleSalaryChange}
        />
        <WorkLocationModal
          isOpen={isWorkLocationOpen}
          onClose={() => setIsWorkLocationOpen(false)}
          formData={formData.workLocation}
          onChange={handleWorkLocationChange}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post_Client;
