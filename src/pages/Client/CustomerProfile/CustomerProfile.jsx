import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  CheckCircle,
  Linkedin,
  Facebook,
  Instagram,
  ExternalLink,
  Star,
  Award,
  GraduationCap,
  BookOpen,
  Zap,
  Search,
  Check,
  Eye,
  EyeOff,
  Edit,
  Crown,
  Sparkles,
  Gem,
} from "lucide-react";
import { FaCamera } from "react-icons/fa";
import {
  getUserInfoByUserIdService,
  updateUserProfileService,
} from "../../../services/authService";
import { uploadToCloudinaryService } from "../../../services/uploadToCloudinaryService";
import "./CustomerProfile.scss";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/common/Loading/Loading";

const CustomerProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    bio: "",
    password: "",
    avatarUrl: "",
    dateOfBirth: "",
    gender: "",
    studentId: "",
    otherName: "",
    mailingAddress: "",
    phoneNumber: "",
    businessFax: "",
    company: "",
    jobTitle: "",
    department: "",
    workLocation: "",
    certificates: [],
    priority: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to get membership info based on priority
  const getMembershipInfo = (priority) => {
    switch (priority) {
      case 1:
        return {
          name: "Partnership",
          icon: <Star className="membership-icon" />,
          color: "#8B5CF6",
          gradient: "linear-gradient(135deg, #8B5CF6, #A855F7)",
          badgeClass: "membership-partnership",
          avatarClass: "avatar-partnership",
          description: "Partnership Member",
        };
      case 2:
        return {
          name: "Advanced",
          icon: <Crown className="membership-icon" />,
          color: "#06B6D4",
          gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
          badgeClass: "membership-advanced",
          avatarClass: "avatar-advanced",
          description: "Advanced Member",
        };
      case 3:
        return {
          name: "Premium",
          icon: <Gem className="membership-icon" />,
          color: "#EC4899",
          gradient: "linear-gradient(135deg, #EC4899, #DB2777)",
          badgeClass: "membership-premium",
          avatarClass: "avatar-premium",
          description: "Premium Member",
        };
      default:
        return {
          name: "Free",
          icon: <CheckCircle className="membership-icon" />,
          color: "#6B7280",
          gradient: "linear-gradient(135deg, #6B7280, #9CA3AF)",
          badgeClass: "membership-free",
          avatarClass: "avatar-free",
          description: "Free Member",
        };
    }
  };

  const membershipInfo = getMembershipInfo(userData.priority);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        if (!storedUser) {
          throw new Error("User not found in session storage");
        }

        const user = JSON.parse(storedUser);
        const id = user?.id;
        if (!id) {
          throw new Error("User ID not found in session storage");
        }

        const response = await getUserInfoByUserIdService(id);

        const fullNameParts = (response.fullName || "").split(" ");
        setUserData({
          id,
          firstName: fullNameParts[0] || "",
          lastName: fullNameParts.slice(1).join(" ") || "",
          email: response.email || "",
          contactNumber: response.phoneNumber || "",
          address: response.address || "",
          bio: response.bio || "",
          password: "",
          avatarUrl:
            response.avatarUrl ||
            "https://res.cloudinary.com/dk3yac2ie/image/upload/v1749144659/y2pbt57hi0fapj5btjaw.png",
          dateOfBirth: response.dateOfBirth || "Not specified",
          gender: response.gender || "Not specified",
          studentId: response.studentId || "Add student ID",
          otherName: response.otherName || "Add other name/nickname",
          mailingAddress: response.mailingAddress || "Add mailing address",
          phoneNumber: response.phoneNumber || "Add phone number",
          businessFax: response.businessFax || "Add business fax number",
          company: response.company || "Add company",
          jobTitle: response.jobTitle || "Add job title",
          department: response.department || "Add department",
          workLocation: response.workLocation || "Add work location",
          certificates: response.certificates || [],
          priority: response.priority || 0,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinaryService(file);
      if (imageUrl) {
        setEditData((prev) => ({ ...prev, avatarUrl: imageUrl }));
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      ToastManager.showError("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const profileData = {
        id: editData.id,
        fullName: `${editData.firstName} ${editData.lastName}`.trim(),
        avatarUrl: editData.avatarUrl,
        email: editData.email,
        contactNumber: editData.contactNumber,
        dateOfBirth: editData.dateOfBirth,
        gender: editData.gender,
        studentId: editData.studentId,
        otherName: editData.otherName,
        mailingAddress: editData.mailingAddress,
        phoneNumber: editData.phoneNumber,
        businessFax: editData.businessFax,
        company: editData.company,
        jobTitle: editData.jobTitle,
        department: editData.department,
        workLocation: editData.workLocation,
        address: editData.address,
        bio: editData.bio,
        certificates: editData.certificates,
      };

      const response = await updateUserProfileService(profileData);

      if (response) {
        ToastManager.showSuccess("Profile updated successfully!");
        setShowModal(false);
      }
    } catch (error) {
      ToastManager.showError("Failed to update profile: " + error.message);
    }
  };

  const handleEditProfile = () => {
    setEditData({ ...userData });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  if (loading) {
    return (
      <div className="notifications-loading">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring spinner-ring-reverse"></div>
          </div>
          <div className="loading-text">
            <h3>Loading profile...</h3>
            <p>Please wait while we fetch your profile details</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customer-profile">
        <div className="error-card">
          <div className="error-content">
            <p className="error-text">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-profile">
      {/* Hero Section */}
      <div className={`hero-section hero-priority-${userData.priority || 0}`}>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Left Sidebar */}
          <div className="sidebar">
            <div
              className={`profile-card ${
                userData.priority === 3
                  ? "premium-member"
                  : userData.priority === 2
                  ? "advanced-member"
                  : userData.priority === 1
                  ? "partnership-member"
                  : ""
              }`}
            >
              <div className="profile-content">
                <div className="profile-header">
                  <div
                    className={`profile-avatar ${membershipInfo.avatarClass}`}
                  >
                    <img
                      src={userData.avatarUrl}
                      alt={`${userData.firstName} ${userData.lastName}`}
                    />
                    <div className="avatar-fallback">
                      {userData.firstName.charAt(0)}
                      {userData.lastName.charAt(0)}
                    </div>
                    {/* Membership ring effect */}
                    {userData.priority > 0 && (
                      <>
                        <div className="avatar-ring">
                          <div className="ring-pulse"></div>
                          <div className="ring-sparkle"></div>
                        </div>
                        <div
                          className={`avatar-dots avatar-dots-priority-${userData.priority}`}
                        >
                          {[...Array(3)].map((_, i) => (
                            <span
                              key={i}
                              className={`avatar-dot avatar-dot-${i}`}
                            ></span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <h1 className="profile-name">
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <p className="profile-role">Customer</p>

                  {/* Membership Badge */}
                  <div
                    className={`membership-badge ${membershipInfo.badgeClass}`}
                  >
                    <div className="membership-icon-wrapper">
                      {membershipInfo.icon}
                    </div>
                    <span className="membership-text">
                      {membershipInfo.name}
                    </span>
                    {userData.priority > 0 && (
                      <div className="membership-sparkles">
                        <Sparkles className="sparkle-icon" />
                      </div>
                    )}
                  </div>

                  <div className="verified-badge">
                    <CheckCircle className="verified-icon" />
                    <span className="verified-text">Verified Customer</span>
                  </div>

                  {/* Stats */}
                  <div className="stats-grid">
                    <div
                      className={`stat-item stat-projects ${
                        userData.priority === 3
                          ? "premium-stat"
                          : userData.priority === 2
                          ? "advanced-stat"
                          : userData.priority === 1
                          ? "partnership-stat"
                          : ""
                      }`}
                    >
                      <div className="stat-value">
                        {userData.certificates.length}
                      </div>
                      <div className="stat-label">Certificates</div>
                    </div>
                    <div
                      className={`stat-item stat-experience ${
                        userData.priority === 3
                          ? "premium-stat"
                          : userData.priority === 2
                          ? "advanced-stat"
                          : userData.priority === 1
                          ? "partnership-stat"
                          : ""
                      }`}
                    >
                      <div className="stat-value">
                        {userData.company ? "Yes" : "No"}
                      </div>
                      <div className="stat-label">Employed</div>
                    </div>
                  </div>
                </div>

                <div className="separator"></div>

                {/* Contact Info */}
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

                {/* Social Links */}
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

                <button
                  className={`hire-button mt-4 btn-priority-${
                    userData.priority || 0
                  }`}
                  onClick={handleEditProfile}
                >
                  <Edit className="hire-button__icon" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="main-sections">
            {/* About Section */}
            <div
              className={`section-card ${
                userData.priority === 3
                  ? "premium-section"
                  : userData.priority === 2
                  ? "advanced-section"
                  : userData.priority === 1
                  ? "partnership-section"
                  : ""
              }`}
            >
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  About
                </h2>
                <p className="section-text">
                  {userData.bio || "No bio available"}
                </p>
              </div>
            </div>

            {/* Basic Information */}
            <div
              className={`section-card ${
                userData.priority === 3
                  ? "premium-section"
                  : userData.priority === 2
                  ? "advanced-section"
                  : userData.priority === 1
                  ? "partnership-section"
                  : ""
              }`}
            >
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  Basic Information
                </h2>
                <ul className="list">
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Full Name:</strong> {userData.firstName}{" "}
                      {userData.lastName}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Email:</strong> {userData.email}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Student ID:</strong> {userData.studentId}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Date of Birth:</strong> {userData.dateOfBirth}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Gender:</strong> {userData.gender}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div
              className={`section-card ${
                userData.priority === 3
                  ? "premium-section"
                  : userData.priority === 2
                  ? "advanced-section"
                  : userData.priority === 1
                  ? "partnership-section"
                  : ""
              }`}
            >
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <Phone className="section-icon" />
                  Contact Information
                </h2>
                <ul className="list">
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Phone Number:</strong> {userData.phoneNumber}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Mailing Address:</strong>{" "}
                      {userData.mailingAddress}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Business Fax:</strong> {userData.businessFax}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Work Information */}
            <div
              className={`section-card ${
                userData.priority === 3
                  ? "premium-section"
                  : userData.priority === 2
                  ? "advanced-section"
                  : userData.priority === 1
                  ? "partnership-section"
                  : ""
              }`}
            >
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <Briefcase className="section-icon" />
                  Work Information
                </h2>
                <ul className="list">
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Company:</strong> {userData.company}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Job Title:</strong> {userData.jobTitle}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Department:</strong> {userData.department}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Work Location:</strong> {userData.workLocation}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Certificates Section */}
            {userData.certificates && userData.certificates.length > 0 && (
              <div
                className={`section-card ${
                  userData.priority === 3
                    ? "premium-section"
                    : userData.priority === 2
                    ? "advanced-section"
                    : userData.priority === 1
                    ? "partnership-section"
                    : ""
                }`}
              >
                <div className="section-content">
                  <h2 className="section-title">
                    <div className="title-accent"></div>
                    <GraduationCap className="section-icon" />
                    Certificates
                  </h2>
                  <div className="certificates-grid">
                    {userData.certificates.map((cert, index) => (
                      <div key={index} className="certificate-item">
                        <div className="certificate-icon">
                          <BookOpen className="cert-icon" />
                        </div>
                        <div className="certificate-content">
                          <h4 className="certificate-title">{cert.name}</h4>
                          <p className="certificate-issuer">{cert.issuer}</p>
                          <p className="certificate-date">{cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="wallet-modal-overlay" onClick={handleCloseModal}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wallet-modal__header">
              <h3 className="wallet-modal__title">
                <Edit style={{ marginRight: 8 }} /> Edit Profile
              </h3>
              <button
                className="wallet-modal__close"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <div className="wallet-modal__content">
              <form className="wallet-form">
                <div className="wallet-form__group">
                  <label htmlFor="firstName" className="wallet-form__label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={editData?.firstName || ""}
                    onChange={handleInputChange}
                    className="wallet-form__input"
                  />
                </div>
                <div className="wallet-form__group">
                  <label htmlFor="lastName" className="wallet-form__label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={editData?.lastName || ""}
                    onChange={handleInputChange}
                    className="wallet-form__input"
                  />
                </div>
                <div className="wallet-form__group">
                  <label htmlFor="email" className="wallet-form__label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={editData?.email || ""}
                    readOnly
                    className="wallet-form__input"
                  />
                </div>
                <div className="wallet-form__group">
                  <label htmlFor="phoneNumber" className="wallet-form__label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={editData?.phoneNumber || ""}
                    onChange={handleInputChange}
                    className="wallet-form__input"
                  />
                </div>
                <div className="wallet-form__group">
                  <label htmlFor="bio" className="wallet-form__label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={editData?.bio || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="wallet-form__input"
                  />
                </div>
                <div className="wallet-form__group">
                  <label htmlFor="avatarUrl" className="wallet-form__label">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                    className="wallet-form__input"
                  />
                  {uploading && <p>Uploading...</p>}
                </div>
                <div className="wallet-form__actions">
                  <button
                    type="button"
                    className="wallet-btn wallet-btn--secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="wallet-btn wallet-btn--primary"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CustomerProfile;
