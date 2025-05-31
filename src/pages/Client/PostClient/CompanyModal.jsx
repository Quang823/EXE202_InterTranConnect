import React, { useState } from "react";
import "./Post_Client.scss";

const CompanyModal = ({
  isOpen,
  onClose,
  formData,
  uploadFileUrl,
  onChange,
  onFileChange, // Thêm lại prop onFileChange
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        id="company-modal"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4>
            <span className="header-icon">📄</span> Company Information
          </h4>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="companyDescription" className="form-label">
              Company Description
            </label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              placeholder="Enter company description"
              value={formData.companyDescription}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="companyLogo" className="form-label">
              Company Logo
            </label>
            <div className="upload-section">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="companyLogo"
                  accept="image/*"
                  onChange={onFileChange} // Sử dụng onFileChange cho input file
                />
                <label htmlFor="companyLogo" className="file-input-label">
                  Choose File
                </label>
              </div>
              <p className="upload-hint">Upload Company Logo (Max 5 MB)</p>
              {uploadFileUrl && (
                <div className="logo-preview">
                  <img src={uploadFileUrl} alt="Company Logo" />
                </div>
              )}
            </div>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
