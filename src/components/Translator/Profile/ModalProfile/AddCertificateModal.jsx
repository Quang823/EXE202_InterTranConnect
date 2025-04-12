import React, { useState } from "react";
import "./AddCertificateModal.scss";
import { FiUpload, FiFileText, FiX } from "react-icons/fi"; // Icons from react-icons

const AddCertificateModal = ({ isOpen, onClose }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [certificateFiles, setCertificateFiles] = useState([]);

  // Handle profile photo upload
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  // Handle CV upload
  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
    }
  };

  // Handle certificate upload
  const handleCertificateChange = (e) => {
    const files = Array.from(e.target.files);
    setCertificateFiles((prev) => [...prev, ...files]);
  };

  // Handle form submission
  const handleSave = () => {
    // Add your save logic here (e.g., send data to an API)
    console.log({
      profilePhoto,
      cvFile,
      certificateFiles,
    });
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content1">
        <div className="modal-header">
          <h2>Certificate Information</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          {/* Personal Section */}
          <div className="section">
            <h3>Personal</h3>
            <div className="form-row">
              <div className="form-group1">
                <label>Basic Information</label>
                <div className="profile-photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    id="profile-photo"
                    hidden
                  />
                  <label htmlFor="profile-photo" className="upload-box">
                    {profilePhoto ? (
                      <span>{profilePhoto.name}</span>
                    ) : (
                      <>
                        <FiUpload className="upload-icon" />
                        <p>Browse photo or drop here</p>
                        <p className="upload-info">
                          A photo larger than 400 pixels. Max photo size 5 MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="form-group-stack">
                <div className="form-group-stack-info">
                  <div className="form-group-info">
                    <label>Full name</label>
                    <input type="text" placeholder="Full name" />
                  </div>
                  <div className="form-group-info">
                    <label>Title/headline</label>
                    <input type="text" placeholder="Title/headline" />
                  </div>
                </div>
                <div className="form-group-stack-info2">
                  <div className="form-group2">
                    <label>Experience</label>
                    <select>
                      <option>Select...</option>
                    </select>
                  </div>
                  <div className="form-group2">
                    <label>Educations</label>
                    <select>
                      <option>Select...</option>
                    </select>
                  </div>
                  <div className="form-group2">
                    <label>Personal website</label>
                    <input type="url" placeholder="Website url..." />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CV/Resume Section */}
          <div className="section">
            <h3>My CV/Resume</h3>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCvChange}
                  id="cv-upload"
                  hidden
                />
                <label htmlFor="cv-upload" className="upload-box cv-upload">
                  {cvFile ? (
                    <div className="file-info">
                      <FiFileText className="file-icon" />
                      <span>{cvFile.name}</span>
                      <span className="file-size">
                        {(cvFile.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>
                  ) : (
                    <>
                      <FiUpload className="upload-icon" />
                      <p>Add CV/Resume file here, only .pdf</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Certificate Section */}
          <div className="section">
            <h3>Professional Certificate</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Work type</label>
                <select>
                  <option>Select...</option>
                </select>
              </div>
              <div className="form-group">
                <label>Translation form</label>
                <select>
                  <option>Select...</option>
                </select>
              </div>
              <div className="form-group">
                <label>Translation language</label>
                <select>
                  <option>Select...</option>
                </select>
              </div>
              <div className="form-group">
                <label>Relevant certificates</label>
                <select>
                  <option>Select...</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Upload certificate</label>
                <input
                  type="file"
                  accept=".doc,.docx,.pdf"
                  multiple
                  onChange={handleCertificateChange}
                  id="certificate-upload"
                  hidden
                />
                <label htmlFor="certificate-upload" className="upload-box">
                  <FiUpload className="upload-icon" />
                  <p>Docs / WFF...</p>
                </label>
              </div>
            </div>
            <div className="certificate-list">
              {certificateFiles.map((file, index) => (
                <div key={index} className="file-info">
                  <FiFileText className="file-icon" />
                  <span>{file.name}</span>
                  <span className="file-size">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCertificateModal;
