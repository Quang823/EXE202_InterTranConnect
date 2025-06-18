import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileTranslatorSidebar from "./ProfileTranslatorSidebar";
import ProfileTranslatorMainSections from "./ProfileTranslatorMainSections";
import ProfileTranslatorModal from "./ProfileTranslatorModal";
import {
  getUserInfoByUserIdService,
  updateUserProfileService,
} from "../../../services/authService";
import { addTranslatorCertificate } from "../../../services/translatorService";
import { uploadToCloudinaryService } from "../../../services/uploadToCloudinaryService";
import "./Profile_Translator.scss";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/common/Loading/Loading";

const Profile_Translator = () => {
  const navigate = useNavigate();
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = sessionStorage.getItem("user");
        if (!storedUserData)
          throw new Error("User not found in session storage");

        const user = JSON.parse(storedUserData);
        const id = user?.id;
        if (!id) throw new Error("User ID not found in session storage");

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
    setEditData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinaryService(file);
      if (imageUrl) setEditData((prev) => ({ ...prev, avatarUrl: imageUrl }));
      else throw new Error("Failed to upload image to Cloudinary");
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
        setShowProfileModal(false);
      }
    } catch (error) {
      ToastManager.showError("Failed to update profile: " + error.message);
    }
  };

  const handleEditProfile = () => {
    setEditData({ ...userData });
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setEditData(null);
  };

  if (loading)
    return (
      <div className="profile-translator">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading profile...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="profile-translator">
        <div className="error-card">
          <div className="error-content">
            <p className="error-text">Error: {error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="profile-translator">
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
      </div>
      <div className="main-content">
        <div className="content-grid">
          <ProfileTranslatorSidebar
            userData={userData}
            handleEditProfile={handleEditProfile}
            userId={userData.id}
          />
          <ProfileTranslatorMainSections
            userData={userData}
            userId={userData.id}
          />
        </div>
      </div>
      <ProfileTranslatorModal
        show={showProfileModal}
        onClose={handleCloseProfileModal}
        editData={editData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        uploading={uploading}
        handleSaveProfile={handleSaveProfile}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <ToastContainer />
    </div>
  );
};

export default Profile_Translator;
