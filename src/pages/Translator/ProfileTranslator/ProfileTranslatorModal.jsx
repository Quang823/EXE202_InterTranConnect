import React from "react";
import { FaCamera } from "react-icons/fa";
import { Eye, EyeOff, Check } from "lucide-react";

const ProfileTranslatorModal = ({
  show,
  onClose,
  editData,
  handleInputChange,
  handleImageChange,
  uploading,
  handleSaveProfile,
  showPassword,
  togglePasswordVisibility,
}) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Profile</h3>
          <button className="modal-close" onClick={onClose}>
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSaveProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTranslatorModal;
