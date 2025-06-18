import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTranslatorCertificate } from "../../../services/translatorService";
import { uploadToCloudinaryService } from "../../../services/uploadToCloudinaryService";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Upload,
  ArrowLeft,
  Eye,
  User,
  FileText,
  Globe,
  Award,
  Languages,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import "./AddCertificatePage.scss";

const AddCertificatePage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [certificateData, setCertificateData] = useState({
    title: "",
    experience: "",
    education: "",
    website: "",
    cvFileUrl: null,
    photoUrl: null,
    workType: "",
    translationForm: "",
    translationLanguage: "",
    certificateNames: "",
    certificateFileUrl: null,
    userId: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    const fetchUserId = () => {
      try {
        const storedUserData = sessionStorage.getItem("user");
        if (!storedUserData) {
          throw new Error("User not found in session storage");
        }
        const parsedUser = JSON.parse(storedUserData);
        if (!parsedUser?.id) {
          throw new Error("User ID is missing");
        }
        setUserId(parsedUser.id);
        setCertificateData((prev) => ({ ...prev, userId: parsedUser.id }));
      } catch (error) {
        ToastManager.showError(error.message);
        navigate("/translator/edit_profile");
      }
    };
    fetchUserId();
  }, [navigate]);

  const handleCertificateInputChange = (e) => {
    const { id, value } = e.target;
    setCertificateData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCertificateFileChange = async (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadingField(field);
    try {
      const url = await uploadToCloudinaryService(file);
      if (url) setCertificateData((prev) => ({ ...prev, [field]: url }));
      else throw new Error(`Failed to upload ${field} to Cloudinary`);
    } catch (error) {
      ToastManager.showError(`Failed to upload ${field}: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadingField(null);
    }
  };

  const handleAddCertificate = async () => {
    try {
      const finalCertificateData = { ...certificateData, userId };
      const response = await addTranslatorCertificate(finalCertificateData);
      if (response || response.message) {
        ToastManager.showSuccess("Certificate added successfully!");
        setCertificateData({
          title: "",
          experience: "",
          education: "",
          website: "",
          cvFileUrl: null,
          photoUrl: null,
          workType: "",
          translationForm: "",
          translationLanguage: "",
          certificateNames: "",
          certificateFileUrl: null,
          userId: userId || "",
        });
      } else {
        ToastManager.showError(
          "Failed to add certificate: Unexpected response"
        );
      }
    } catch (error) {
      console.error("Error adding certificate:", error);
      ToastManager.showError("Failed to add certificate: " + error.message);
    }
  };

  const getFileIcon = (field) => {
    if (field.includes("photo"))
      return <User className="cert-file-upload__icon" />;
    return <FileText className="cert-file-upload__icon" />;
  };

  const getInputIcon = (field) => {
    const icons = {
      title: <Award className="cert-input__icon" />,
      experience: <Briefcase className="cert-input__icon" />,
      education: <GraduationCap className="cert-input__icon" />,
      website: <Globe className="cert-input__icon" />,
      workType: <Briefcase className="cert-input__icon" />,
      translationForm: <FileText className="cert-input__icon" />,
      translationLanguage: <Languages className="cert-input__icon" />,
      certificateNames: <Award className="cert-input__icon" />,
    };
    return icons[field] || <FileText className="cert-input__icon" />;
  };

  return (
    <div className="cert-add-page">
      <div className="cert-add-page__background">
        <div className="cert-add-page__gradient-orb cert-add-page__gradient-orb--1"></div>
        <div className="cert-add-page__gradient-orb cert-add-page__gradient-orb--2"></div>
        <div className="cert-add-page__gradient-orb cert-add-page__gradient-orb--3"></div>
      </div>

      <div className="cert-add-page__container">
        <div className="cert-add-page__header">
          <div className="button-container">
            <button
              className="cert-back-button"
              onClick={() => navigate(`/translator/edit_profile`)}
            >
              <ArrowLeft className="cert-back-button__icon" />
              <span>Back to Profile</span>
            </button>
            <button
              className="cert-back-button"
              onClick={() => navigate(`/translator/certificate_details`)}
            >
              <span>View Certificate</span>
              <Eye className="cert-back-button__icon cert-back-button__icon--view" />
            </button>
          </div>

          <div className="cert-page-title">
            <h1 className="cert-page-title__main">Add New Certificate</h1>
            <p className="cert-page-title__subtitle">
              Enhance your professional profile with certification details
            </p>
          </div>
        </div>

        <div className="cert-form-container">
          <form className="cert-form">
            <div className="cert-form__section">
              <h2 className="cert-section-title">Basic Information</h2>

              <div className="cert-form__grid">
                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("title")}
                    <input
                      type="text"
                      id="title"
                      className="cert-input__field"
                      value={certificateData.title}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="title" className="cert-input__label">
                      Certificate Title *
                    </label>
                  </div>
                </div>

                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("experience")}
                    <input
                      type="number"
                      id="experience"
                      className="cert-input__field"
                      value={certificateData.experience}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                      min="0"
                    />
                    <label htmlFor="experience" className="cert-input__label">
                      Years of Experience
                    </label>
                  </div>
                </div>

                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("education")}
                    <input
                      type="text"
                      id="education"
                      className="cert-input__field"
                      value={certificateData.education}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                    />
                    <label htmlFor="education" className="cert-input__label">
                      Education Background
                    </label>
                  </div>
                </div>

                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("website")}
                    <input
                      type="url"
                      id="website"
                      className="cert-input__field"
                      value={certificateData.website}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                    />
                    <label htmlFor="website" className="cert-input__label">
                      Website URL
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="cert-form__section">
              <h2 className="cert-section-title">Professional Details</h2>

              <div className="cert-form__grid">
                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("workType")}
                    <input
                      type="text"
                      id="workType"
                      className="cert-input__field"
                      value={certificateData.workType}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                    />
                    <label htmlFor="workType" className="cert-input__label">
                      Work Type
                    </label>
                  </div>
                </div>

                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("translationForm")}
                    <input
                      type="text"
                      id="translationForm"
                      className="cert-input__field"
                      value={certificateData.translationForm}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                    />
                    <label
                      htmlFor="translationForm"
                      className="cert-input__label"
                    >
                      Translation Form
                    </label>
                  </div>
                </div>

                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("translationLanguage")}
                    <input
                      type="text"
                      id="translationLanguage"
                      className="cert-input__field"
                      value={certificateData.translationLanguage}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                    />
                    <label
                      htmlFor="translationLanguage"
                      className="cert-input__label"
                    >
                      Translation Languages
                    </label>
                  </div>
                </div>

                <div className="cert-input-group">
                  <div className="cert-input__wrapper">
                    {getInputIcon("certificateNames")}
                    <input
                      type="text"
                      id="certificateNames"
                      className="cert-input__field"
                      value={certificateData.certificateNames}
                      onChange={handleCertificateInputChange}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="certificateNames"
                      className="cert-input__label"
                    >
                      Certificate Names *
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="cert-form__section">
              <h2 className="cert-section-title">File Uploads</h2>

              <div className="cert-upload-grid">
                <div className="cert-file-upload">
                  <input
                    type="file"
                    id="cvFileUrl"
                    className="cert-file-upload__input"
                    accept="application/pdf"
                    onChange={(e) =>
                      handleCertificateFileChange(e, "cvFileUrl")
                    }
                  />
                  <label
                    htmlFor="cvFileUrl"
                    className="cert-file-upload__label"
                  >
                    <div className="cert-file-upload__content">
                      {uploadingField === "cvFileUrl" ? (
                        <div className="cert-file-upload__spinner"></div>
                      ) : (
                        getFileIcon("cvFileUrl")
                      )}
                      <span className="cert-file-upload__text">
                        {certificateData.cvFileUrl
                          ? "CV Uploaded"
                          : "Upload CV (PDF)"}
                      </span>
                      <span className="cert-file-upload__subtext">
                        Click to browse or drag and drop
                      </span>
                      {certificateData.cvFileUrl && (
                        <a
                          href={certificateData.cvFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-file-upload__link"
                        >
                          View CV
                        </a>
                      )}
                    </div>
                  </label>
                </div>

                <div className="cert-file-upload">
                  <input
                    type="file"
                    id="photoUrl"
                    className="cert-file-upload__input"
                    accept="image/*"
                    onChange={(e) => handleCertificateFileChange(e, "photoUrl")}
                  />
                  <label htmlFor="photoUrl" className="cert-file-upload__label">
                    <div className="cert-file-upload__content">
                      {uploadingField === "photoUrl" ? (
                        <div className="cert-file-upload__spinner"></div>
                      ) : (
                        getFileIcon("photoUrl")
                      )}
                      <span className="cert-file-upload__text">
                        {certificateData.photoUrl
                          ? "Photo Uploaded"
                          : "Upload Photo"}
                      </span>
                      <span className="cert-file-upload__subtext">
                        JPG, PNG up to 5MB
                      </span>
                      {certificateData.photoUrl && (
                        <img
                          src={certificateData.photoUrl}
                          alt="Uploaded Photo"
                          className="cert-file-upload__preview"
                        />
                      )}
                    </div>
                  </label>
                </div>

                <div className="cert-file-upload cert-file-upload--full-width">
                  <input
                    type="file"
                    id="certificateFileUrl"
                    className="cert-file-upload__input"
                    accept="application/pdf,image/*"
                    onChange={(e) =>
                      handleCertificateFileChange(e, "certificateFileUrl")
                    }
                  />
                  <label
                    htmlFor="certificateFileUrl"
                    className="cert-file-upload__label"
                  >
                    <div className="cert-file-upload__content">
                      {uploadingField === "certificateFileUrl" ? (
                        <div className="cert-file-upload__spinner"></div>
                      ) : (
                        getFileIcon("certificateFileUrl")
                      )}
                      <span className="cert-file-upload__text">
                        {certificateData.certificateFileUrl
                          ? "Certificate Uploaded"
                          : "Upload Certificate File"}
                      </span>
                      <span className="cert-file-upload__subtext">
                        PDF or Image files accepted
                      </span>
                      {certificateData.certificateFileUrl && (
                        <img
                          src={certificateData.certificateFileUrl}
                          alt="Uploaded Certificate"
                          className="cert-file-upload__preview"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="cert-form__actions">
              <button
                type="button"
                className="cert-submit-button"
                onClick={handleAddCertificate}
                disabled={uploading}
              >
                <span className="cert-submit-button__text">
                  {uploading ? "Processing..." : "Add Certificate"}
                </span>
                <div className="cert-submit-button__bg"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCertificatePage;
