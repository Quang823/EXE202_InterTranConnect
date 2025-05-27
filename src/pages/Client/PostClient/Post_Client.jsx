import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "./Post_Client.scss";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { createJob } from "../../../services/jobService";
import { uploadToCloudinaryService } from "../../../services/uploadToCloudinaryService";
import CompanyModal from "./CompanyModal";
import ContactModal from "./ContactModal";
import SalaryModal from "./SalaryModal";
import WorkLocationModal from "./WorkLocationModal";

const Post_Client = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
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
  });

  const [message, setMessage] = useState("");
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [isWorkLocationOpen, setIsWorkLocationOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      companyInfo: { ...prev.companyInfo, [name]: value },
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));
  };

  const handleWorkLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      workLocation: { ...prev.workLocation, [name]: value },
    }));
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
  };

  const handlePostJob = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      const customerId = user.id;
      const jobData = {
        Title: formData.jobTitle,
        TranslationType: formData.translationType,
        SourceLanguage: formData.sourceLanguage,
        TranslationLanguage: formData.translationLanguage,
        Description: formData.description,
        UploadFile: formData.uploadFileUrl,
        CompanyLogo: formData.companyLogoUrl,
        HourlyRate: formData.salary.hourlyRate,
        PlatformServiceFee: formData.salary.platformFee,
        TotalFee: formData.salary.totalFee,
        CompanyName: formData.companyInfo.companyName,
        CompanyDescription: formData.companyInfo.companyDescription,
        ContactEmail: formData.contactInfo.email,
        ContactPhone: formData.contactInfo.phone,
        ContactAddress: formData.contactInfo.address,
        WorkAddressLine: formData.workLocation.workAddressLine,
        WorkCity: formData.workLocation.city,
        WorkPostalCode: formData.workLocation.postalCode,
        WorkCountry: formData.workLocation.country,
        CustomerId: customerId,
        Experience: formData.experience,
        Education: formData.education,
        TranslationForm: formData.translationForm,
        Certificates: formData.certificates,
      };

      if (!jobData.Title || !jobData.ContactEmail || !jobData.UploadFile) {
        setMessage("Please fill in Title, ContactEmail, and upload a file.");
        return;
      }

      await createJob(jobData);
      setMessage("Job posted successfully!");
    } catch (error) {
      setMessage(`Failed to create job: ${error.message}`);
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
              <input
                type="text"
                name="jobTitle"
                placeholder="Title/Headline"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
              <select
                name="translationType"
                value={formData.translationType}
                onChange={handleInputChange}
              >
                <option value="">Work Type - Select...</option>
                <option value="Written">Written</option>
                <option value="Oral">Oral</option>
              </select>
            </div>

            <div className="post-job-field-row">
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              >
                <option value="">Experience Requirement - Select...</option>
                <option value="Entry">Entry Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
              >
                <option value="">Education (Optional) - Select...</option>
                <option value="HighSchool">High School</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
              </select>
            </div>

            <div className="post-job-field-row">
              <select
                name="sourceLanguage"
                value={formData.sourceLanguage}
                onChange={handleInputChange}
              >
                <option value="">Translation Language - Select...</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
              </select>
              <select
                name="translationForm"
                value={formData.translationForm}
                onChange={handleInputChange}
              >
                <option value="">Translation Form - Select...</option>
                <option value="Document">Document</option>
                <option value="Live">Live Interpretation</option>
              </select>
            </div>

            <div className="post-job-field-row">
              <select
                name="translationLanguage"
                value={formData.translationLanguage}
                onChange={handleInputChange}
              >
                <option value="">Translation Language - Select...</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
              </select>
              <select
                name="certificates"
                value={formData.certificates}
                onChange={handleInputChange}
              >
                <option value="">Relevant Certificates - Select...</option>
                <option value="None">None</option>
                <option value="CertifiedTranslator">
                  Certified Translator
                </option>
                <option value="ATA">ATA Certification</option>
              </select>
            </div>

            <div className="post-job-description">
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>

        <h4 className="post-job-section-title">Employer Information</h4>

        <div className="employer-info">
          <div className="employer-info-row">
            <button
              className="info-link"
              onClick={() => setIsCompanyOpen(true)}
            >
              <span className="info-icon">📄</span> Company Info
              <span className="plus-icon">+</span>
            </button>
            <button
              className="info-link"
              onClick={() => setIsContactOpen(true)}
            >
              <span className="info-icon">📞</span> Contact Info
              <span className="plus-icon">+</span>
            </button>
            <button
              className="info-link"
              onClick={() => setIsWorkLocationOpen(true)}
            >
              <span className="info-icon">📍</span> Work Location
              <span className="plus-icon">+</span>
            </button>
            <button className="info-link" onClick={() => setIsSalaryOpen(true)}>
              <span className="info-icon">💰</span> Salary
              <span className="plus-icon">+</span>
            </button>
          </div>
        </div>

        <button className="post-job-btn" onClick={handlePostJob}>
          POST JOB
        </button>
        {message && (
          <p className={`message ${message.includes("Failed") ? "error" : ""}`}>
            {message}
          </p>
        )}

        {/* PDF Preview Modal */}
        {isPdfPreviewOpen && (
          <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
              id="pdf-preview-modal"
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h4>
                  <span className="header-icon">📜</span> Document Preview
                </h4>
                <button
                  className="modal-close"
                  onClick={() => setIsPdfPreviewOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="pdf-viewer-container">
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

        {/* Other Modals */}
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
    </div>
  );
};

export default Post_Client;
