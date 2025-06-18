import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle,
  Linkedin,
  Facebook,
  Instagram,
  ExternalLink,
  Edit,
  Award,
} from "lucide-react";
import { FaCamera } from "react-icons/fa";

const ProfileTranslatorSidebar = ({ userData, handleEditProfile, userId }) => {
  const navigate = useNavigate();

  const handleNavigateToAddCertificate = () => {
    if (userId) {
      navigate(`/translator/add_certificate`);
    } else {
      console.error("User ID is undefined or missing in userData:", userData);
    }
  };

  return (
    <div className="sidebar">
      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src={userData.avatarUrl}
                alt={`${userData.firstName} ${userData.lastName}`}
              />
              <div className="avatar-fallback">
                {userData.firstName.charAt(0)}
                {userData.lastName.charAt(0)}
              </div>
            </div>
            <h1 className="profile-name">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="profile-role">Translator</p>
            <div className="verified-badge">
              <CheckCircle className="verified-icon" />
              <span className="verified-text">Verified Translator</span>
            </div>
            <div className="stats-grid">
              <div className="stat-item stat-projects">
                <div className="stat-value">{userData.certificates.length}</div>
                <div className="stat-label">Certificates</div>
              </div>
              <div className="stat-item stat-experience">
                <div className="stat-value">
                  {userData.company ? "Yes" : "No"}
                </div>
                <div className="stat-label">Employed</div>
              </div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="contact-info">
            <div className="contact-item">
              <Mail className="contact-icon" />
              <span className="contact-text">{userData.email}</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span className="contact-text">{userData.phoneNumber}</span>
            </div>
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <span className="contact-text">
                {userData.address || userData.mailingAddress}
              </span>
            </div>
            <div className="contact-item">
              <Briefcase className="contact-icon" />
              <span className="contact-text">{userData.company}</span>
            </div>
          </div>
          <div className="separator"></div>
          <div className="social-section">
            <h3 className="social-title">Connect</h3>
            <div className="social-links">
              <button className="social-btn social-linkedin">
                <Linkedin className="social-icon" />
              </button>
              <button className="social-btn social-facebook">
                <Facebook className="social-icon" />
              </button>
              <button className="social-btn social-instagram">
                <Instagram className="social-icon" />
              </button>
              <button className="social-btn social-external">
                <ExternalLink className="social-icon" />
              </button>
            </div>
          </div>
          <button className="hire-button mt-4" onClick={handleEditProfile}>
            <Edit className="hire-button__icon" />
            Edit Profile
          </button>
          <button
            className="hire-button mt-4"
            onClick={handleNavigateToAddCertificate}
          >
            <Award className="hire-button__icon" />
            Upload Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTranslatorSidebar;
