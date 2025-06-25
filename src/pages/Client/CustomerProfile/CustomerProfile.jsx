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
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      <div className="customer-profile">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading profile...</p>
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
      <div className="hero-section">
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
                  <p className="profile-role">Customer</p>

                  <div className="verified-badge">
                    <CheckCircle className="verified-icon" />
                    <span className="verified-text">Verified Customer</span>
                  </div>

                  {/* Stats */}
                  <div className="stats-grid">
                    <div className="stat-item stat-projects">
                      <div className="stat-value">
                        {userData.certificates.length}
                      </div>
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
                  className="hire-button mt-4"
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
            <div className="section-card">
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
            <div className="section-card">
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
            <div className="section-card">
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
                      <strong>Mailing Address:</strong>{" "}
                      {userData.mailingAddress}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Phone Number:</strong> {userData.phoneNumber}
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

            {/* Job Information */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <Briefcase className="section-icon" />
                  Job Information
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

            {/* Certificates */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <Award className="section-icon" />
                  Certificates
                </h2>
                {userData.certificates.length > 0 ? (
                  <ul className="list">
                    {userData.certificates.map((cert, index) => (
                      <li key={index} className="list-item">
                        <CheckCircle className="list-icon" />
                        <span className="list-text">
                          <strong>{cert.name}:</strong> {cert.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="section-text">No certificates added</p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <BookOpen className="section-icon" />
                  Additional Information
                </h2>
                <ul className="list">
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Other Name/Nickname:</strong> {userData.otherName}
                    </span>
                  </li>
                  <li className="list-item">
                    <div className="list-bullet"></div>
                    <span className="list-text">
                      <strong>Address:</strong> {userData.address}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {editData && (
                <div className="edit-form">
                  <div className="avatar-section modal-avatar">
                    <div className="avatar-wrapper">
                      <img src={editData.avatarUrl} alt="Avatar" />
                      <label htmlFor="avatarInput" className="avatar-overlay">
                        <FaCamera className="camera-icon" />
                        <span>
                          {uploading ? "Uploading..." : "Update Photo"}
                        </span>
                      </label>
                      <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                        disabled={uploading}
                      />
                    </div>
                  </div>

                  <div className="name-section">
                    <div className="input-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={editData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={editData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-with-icon">
                      <input
                        type="email"
                        id="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        disabled
                      />
                      <div className="icon-wrapper verified">
                        <Check size={18} />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="studentId">Student ID</label>
                    <input
                      type="text"
                      id="studentId"
                      value={editData.studentId}
                      onChange={handleInputChange}
                      placeholder="Enter student ID"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-with-icon">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={editData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                      />
                      <div
                        className="icon-wrapper clickable"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                        <span>{showPassword ? "Hide" : "Show"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="otherName">Other Name/Nickname</label>
                    <input
                      type="text"
                      id="otherName"
                      value={editData.otherName}
                      onChange={handleInputChange}
                      placeholder="Enter other name/nickname"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      value={editData.company}
                      onChange={handleInputChange}
                      placeholder="Enter company"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="workLocation">Work Location</label>
                    <input
                      type="text"
                      id="workLocation"
                      value={editData.workLocation}
                      onChange={handleInputChange}
                      placeholder="Enter work location"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="mailingAddress">Mailing Address</label>
                    <input
                      type="text"
                      id="mailingAddress"
                      value={editData.mailingAddress}
                      onChange={handleInputChange}
                      placeholder="Enter mailing address"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={editData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="businessFax">Business Fax Number</label>
                    <input
                      type="text"
                      id="businessFax"
                      value={editData.businessFax}
                      onChange={handleInputChange}
                      placeholder="Enter business fax number"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                      type="text"
                      id="jobTitle"
                      value={editData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="Enter job title"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="department">Department</label>
                    <input
                      type="text"
                      id="department"
                      value={editData.department}
                      onChange={handleInputChange}
                      placeholder="Enter department"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      value={editData.address}
                      onChange={handleInputChange}
                      placeholder="Your address"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      value={editData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CustomerProfile;
