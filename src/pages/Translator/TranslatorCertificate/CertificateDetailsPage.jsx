import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTranslatorCertificates } from "../../../services/translatorService";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CertificateDetailsPage.scss";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
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
  X,
} from "lucide-react";

const CertificateDetailsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [showCvModal, setShowCvModal] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const storedUserData = sessionStorage.getItem("user");
        if (!storedUserData) {
          throw new Error("User not found in session storage");
        }
        const parsedUser = JSON.parse(storedUserData);
        if (!parsedUser?.id) {
          throw new Error("User ID is missing");
        }
        setUser(parsedUser);
        const response = await fetchTranslatorCertificates(parsedUser.id);
        console.log("res", response);
        setCertificates(response);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to load certificates");
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [user?.id]);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowPdfModal(true);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
    setSelectedCertificate(null);
  };

  const handleViewCv = (cvUrl) => {
    setSelectedCv(cvUrl);
    setShowCvModal(true);
  };

  const closeCvModal = () => {
    setShowCvModal(false);
    setSelectedCv(null);
  };

  const isPdfFile = (url) => {
    return url && url.toLowerCase().endsWith(".pdf");
  };

  if (loading) {
    return <div className="certificate-detail-page">Loading...</div>;
  }

  if (error || !certificates || certificates.length === 0) {
    return (
      <div className="certificate-detail-page">
        <div className="certificate-detail-page__background">
          <div className="certificate-detail-page__gradient-orb cert-add-page__gradient-orb--1"></div>
          <div className="certificate-detail-page__gradient-orb cert-add-page__gradient-orb--2"></div>
          <div className="certificate-detail-page__gradient-orb cert-add-page__gradient-orb--3"></div>
        </div>
        <div className="certificate-detail-page__container">
          <div className="certificate-detail-page-header">
            <div className="certificate-detail-page-button-container">
              <button
                className="certificate-detail-page-back-button"
                onClick={() => navigate(`/translator/edit_profile`)}
              >
                <ArrowLeft className="certificate-detail-page-back-button__icon" />
                <span>Back to Profile</span>
              </button>
              <button
                className="certificate-detail-page-back-button"
                onClick={() => navigate(`/translator/add_certificate`)}
              >
                <span>Back to add new Certificate</span>
                <Eye className="certificate-detail-page-back-button__icon cert-back-button__icon--view" />
              </button>
            </div>
            <div className="certificate-detail-page-title">
              <h1 className="certificate-detail-page-title__main">
                Your Certificates
              </h1>
              <p className="certificate-detail-page-title__subtitle">
                Enhance your professional profile with certification details
              </p>
            </div>
          </div>
          <div className="certificate-detail-page-content">
            <p className="certificate-detail-error">No certificate yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-detail-page">
      <div className="certificate-detail-page__background">
        <div className="certificate-detail-page__gradient-orb cert-add-page__gradient-orb--1"></div>
        <div className="certificate-detail-page__gradient-orb cert-add-page__gradient-orb--2"></div>
        <div className="certificate-detail-page__gradient-orb cert-add-page__gradient-orb--3"></div>
      </div>
      <div className="certificate-detail-page__container">
        <div className="certificate-detail-page-header">
          <div className="certificate-detail-page-button-container">
            <button
              className="certificate-detail-page-back-button"
              onClick={() => navigate(`/translator/edit_profile`)}
            >
              <ArrowLeft className="certificate-detail-page-back-button__icon" />
              <span>Back to Profile</span>
            </button>
            <button
              className="certificate-detail-page-back-button"
              onClick={() => navigate(`/translator/add_certificate`)}
            >
              <span>Back to add new Certificate</span>
              <Eye className="certificate-detail-page-back-button__icon cert-back-button__icon--view" />
            </button>
          </div>
          <div className="certificate-detail-page-title">
            <h1 className="certificate-detail-page-title__main">
              Your Certificates
            </h1>
            <p className="certificate-detail-page-title__subtitle">
              Enhance your professional profile with certification details
            </p>
          </div>
        </div>

        <div className="certificate-detail-page-content">
          {certificates.map((cert, index) => (
            <table key={cert.id || index} className="certificate-detail-table">
              <thead>
                <tr>
                  <th colSpan="2" className="certificate-detail-title">
                    {cert.title}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">
                    Experience (years):
                  </td>
                  <td className="certificate-detail-cell value">
                    {cert.experience}
                  </td>
                </tr>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">Education:</td>
                  <td className="certificate-detail-cell value">
                    {cert.education}
                  </td>
                </tr>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">Website:</td>
                  <td className="certificate-detail-cell value">
                    <a
                      href={cert.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="certificate-detail-link"
                    >
                      {cert.website}
                    </a>
                  </td>
                </tr>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">CV:</td>
                  <td className="certificate-detail-cell value">
                    <button
                      onClick={() => handleViewCv(cert.cvFileUrl)}
                      className="certificate-detail-link"
                    >
                      View CV
                    </button>
                  </td>
                </tr>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">Work Type:</td>
                  <td className="certificate-detail-cell value">
                    {cert.workType}
                  </td>
                </tr>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">
                    Translation Form:
                  </td>
                  <td className="certificate-detail-cell value">
                    {cert.translationForm}
                  </td>
                </tr>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">
                    Translation Language:
                  </td>
                  <td className="certificate-detail-cell value">
                    {cert.translationLanguage}
                  </td>
                </tr>
                <tr className="certificate-detail-row">
                  <td className="certificate-detail-cell label">
                    Certificate Names:
                  </td>
                  <td className="certificate-detail-cell value">
                    {cert.certificateNames}
                  </td>
                </tr>
                {cert.photoUrl && (
                  <tr className="certificate-detail-row">
                    <td className="certificate-detail-cell label">Photo:</td>
                    <td className="certificate-detail-cell value">
                      <img
                        src={cert.photoUrl}
                        alt={`Photo for ${cert.title}`}
                        className="certificate-detail-image"
                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                      />
                    </td>
                  </tr>
                )}
                {cert.certificateFileUrl && (
                  <tr className="certificate-detail-row">
                    <td className="certificate-detail-cell label">
                      Certificate:
                    </td>
                    <td className="certificate-detail-cell value">
                      <button
                        onClick={() => handleViewCertificate(cert)}
                        className="certificate-detail-link"
                      >
                        View Certificate
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ))}
        </div>

        <ToastContainer />
      </div>

      {showPdfModal && (
        <div className="pdf-modal">
          <div className="pdf-modal-content">
            <span className="close-button" onClick={closePdfModal}>
              &times;
            </span>
            {isPdfFile(selectedCertificate?.certificateFileUrl) ? (
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer
                  fileUrl={selectedCertificate?.certificateFileUrl}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            ) : (
              <img
                src={selectedCertificate?.certificateFileUrl}
                alt={`Certificate for ${selectedCertificate?.title}`}
                className="certificate-detail-certificate-image"
                onError={(e) => (e.target.src = "/fallback-certificate.jpg")}
              />
            )}
          </div>
        </div>
      )}

      {showCvModal && (
        <div className="cv-modal">
          <div className="cv-modal-content">
            <span className="close-button" onClick={closeCvModal}>
              &times;
            </span>
            {isPdfFile(selectedCv) ? (
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <Viewer
                  fileUrl={selectedCv}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            ) : (
              <img
                src={selectedCv}
                alt="Selected CV"
                className="certificate-detail-cv-image"
                onError={(e) => (e.target.src = "/fallback-cv.jpg")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateDetailsPage;
