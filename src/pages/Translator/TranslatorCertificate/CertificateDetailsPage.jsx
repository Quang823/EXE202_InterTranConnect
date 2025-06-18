import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTranslatorCertificates } from "../../../services/translatorService";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CertificateDetailsPage.scss";
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
const CertificateDetailsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setCertificates(response);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to load certificates");
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [user?.id]);

  if (loading) {
    return <div className="certificate-detail-page">Loading...</div>;
  }

  if (error || !certificates || certificates.length === 0) {
    return (
      <div className="certificate-detail-page">
        <p className="certificate-detail-error">
          Error: {error || "No certificates found"}
        </p>
        <button
          className="certificate-detail-btn-secondary"
          onClick={() => navigate(`/profile-translator/${user.id}`)}
        >
          Back to Profile
        </button>
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
            <div key={index} className="certificate-detail-item">
              <h2 className="certificate-detail-title">{cert.title}</h2>
              <div className="certificate-detail-group">
                <label>Experience (years):</label>
                <span>{cert.experience}</span>
              </div>
              <div className="certificate-detail-group">
                <label>Education:</label>
                <span>{cert.education}</span>
              </div>
              <div className="certificate-detail-group">
                <label>Website:</label>
                <span>
                  <a
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-detail-link"
                  >
                    {cert.website}
                  </a>
                </span>
              </div>
              <div className="certificate-detail-group">
                <label>CV:</label>
                <span>
                  <a
                    href={cert.cvFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-detail-link"
                  >
                    View CV
                  </a>
                </span>
              </div>
              <div className="certificate-detail-group">
                <label>Work Type:</label>
                <span>{cert.workType}</span>
              </div>
              <div className="certificate-detail-group">
                <label>Translation Form:</label>
                <span>{cert.translationForm}</span>
              </div>
              <div className="certificate-detail-group">
                <label>Translation Language:</label>
                <span>{cert.translationLanguage}</span>
              </div>
              <div className="certificate-detail-group">
                <label>Certificate Names:</label>
                <span>{cert.certificateNames}</span>
              </div>
              {cert.photoUrl && (
                <div className="certificate-detail-group">
                  <label>Photo:</label>
                  <img
                    src={cert.photoUrl}
                    alt="Translator Photo"
                    className="certificate-detail-image"
                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  />
                </div>
              )}
              {cert.certificateFileUrl && (
                <div className="certificate-detail-group">
                  <label>Certificate:</label>
                  <img
                    src={cert.certificateFileUrl}
                    alt="Certificate"
                    className="certificate-detail-certificate-image"
                    onError={(e) =>
                      (e.target.src = "/fallback-certificate.jpg")
                    }
                  />
                </div>
              )}
              <hr className="certificate-detail-separator" />
            </div>
          ))}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default CertificateDetailsPage;
