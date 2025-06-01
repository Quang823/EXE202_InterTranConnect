import React, { useState, useEffect } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getUserInfoByUserIdService,
  updateUserProfileService,
} from "../../../services/authService";
import { uploadToCloudinaryService } from "../../../services/uploadToCloudinaryService";
import "./CustomerProfile.scss";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          avatarUrl: response.avatarUrl || "/api/placeholder/120/120",
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
        setUserData(editData);
        sessionStorage.setItem(
          "user",
          JSON.stringify({ id: editData.id, ...response })
        );
        ToastManager.showSuccess("Profile updated successfully!");
        setShowModal(false);
      }
    } catch (error) {
      alert("Failed to update profile: " + error.message);
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
    return <div className="cp-loading">Loading...</div>;
  }

  if (error) {
    return <div className="cp-error">Error: {error}</div>;
  }

  return (
    <div className="cp-container">
      <div className="cp-card">
        <div className="cp-header">
          <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
          <div className="cp-avatar-section">
            <div className="cp-avatar-wrapper">
              <img src={userData.avatarUrl} alt="Avatar" />
              <div className="cp-avatar-overlay" onClick={handleEditProfile}>
                <span>Update Photo</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cp-content">
          <div className="cp-section">
            <h3>Basic Information</h3>
            <p>
              <strong>Full Name:</strong> {userData.firstName}{" "}
              {userData.lastName}
            </p>
            <p>
              <strong>Email Address:</strong> {userData.email}
            </p>
            <p>
              <strong>Student ID:</strong> {userData.studentId}
            </p>
            <p>
              <strong>Password:</strong>{" "}
              <span className="cp-password">********</span>{" "}
              <button className="cp-change-password" onClick={() => {}}>
                Change password
              </button>
            </p>
          </div>
          <div className="cp-section">
            <h3>Additional Information</h3>
            <p>
              <strong>Other Name/Nickname:</strong> {userData.otherName}
            </p>
            <p>
              <strong>Company:</strong> {userData.company}
            </p>
            <p>
              <strong>Work Location:</strong> {userData.workLocation}
            </p>
          </div>
          <div className="cp-grid">
            <div className="cp-section">
              <h3>Contact Information</h3>
              <p>
                <strong>Mailing Address:</strong> {userData.mailingAddress}
              </p>
              <p>
                <strong>Phone Number:</strong> {userData.phoneNumber}
              </p>
              <p>
                <strong>Business Fax:</strong> {userData.businessFax}
              </p>
            </div>
            <div className="cp-section">
              <h3>Job Information</h3>
              <p>
                <strong>Company:</strong> {userData.company}
              </p>
              <p>
                <strong>Job Title:</strong> {userData.jobTitle}
              </p>
              <p>
                <strong>Department:</strong> {userData.department}
              </p>
            </div>
          </div>
          <div className="cp-section">
            <h3>Certificates</h3>
            {userData.certificates.length > 0 ? (
              userData.certificates.map((cert, index) => (
                <p key={index}>
                  <strong>{cert.name}:</strong> {cert.description}
                </p>
              ))
            ) : (
              <p>No certificates added</p>
            )}
          </div>
          <div className="cp-action-buttons">
            <button
              className="cp-edit-btn"
              onClick={() => {
                setEditData(userData);
                setShowModal(true);
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form className="cp-edit-form">
              <div className="cp-avatar-section cp-modal-avatar">
                <div className="cp-avatar-wrapper">
                  <img src={editData.avatarUrl} alt="Avatar" />
                  <label htmlFor="avatarInput" className="cp-avatar-overlay">
                    <span>{uploading ? "Uploading..." : "Update Photo"}</span>
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
              <div className="cp-name-section">
                <div className="cp-input-group1">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                  />
                </div>
                <div className="cp-input-group1">
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
              <div className="cp-input-group">
                <label htmlFor="email">Email</label>
                <div className="cp-input-with-icon">
                  <input
                    type="email"
                    id="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    disabled
                  />
                  <div className="cp-icon-wrapper cp-verified">
                    <Check size={18} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
              <div className="cp-input-group">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  value={editData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter student ID"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="password">Password</label>
                <div className="cp-input-with-icon">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={editData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                  />
                  <div
                    className="cp-icon-wrapper cp-clickable"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    <span>{showPassword ? "Hide" : "Show"}</span>
                  </div>
                </div>
              </div>
              <div className="cp-input-group">
                <label htmlFor="otherName">Other Name/Nickname</label>
                <input
                  type="text"
                  id="otherName"
                  value={editData.otherName}
                  onChange={handleInputChange}
                  placeholder="Enter other name/nickname"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  value={editData.company}
                  onChange={handleInputChange}
                  placeholder="Enter company"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="workLocation">Work Location</label>
                <input
                  type="text"
                  id="workLocation"
                  value={editData.workLocation}
                  onChange={handleInputChange}
                  placeholder="Enter work location"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="mailingAddress">Mailing Address</label>
                <input
                  type="text"
                  id="mailingAddress"
                  value={editData.mailingAddress}
                  onChange={handleInputChange}
                  placeholder="Enter mailing address"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={editData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="businessFax">Business Fax Number</label>
                <input
                  type="text"
                  id="businessFax"
                  value={editData.businessFax}
                  onChange={handleInputChange}
                  placeholder="Enter business fax number"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  value={editData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  value={editData.department}
                  onChange={handleInputChange}
                  placeholder="Enter department"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={editData.address}
                  onChange={handleInputChange}
                  placeholder="Your address"
                />
              </div>
              <div className="cp-input-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={editData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerProfile;
