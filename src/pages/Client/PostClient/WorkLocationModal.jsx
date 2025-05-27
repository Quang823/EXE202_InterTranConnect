import React from "react";
import "./Post_Client.scss";

const WorkLocationModal = ({ isOpen, onClose, formData, onChange }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        id="work-location-modal"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4>
            <span className="header-icon">📍</span> Work Location
          </h4>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="workLocateAddress" className="form-label">
              Street Address
            </label>
            <input
              type="text"
              name="workAddressLine"
              placeholder="Enter Street Address"
              value={formData.workAddressLine}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="workCity" className="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="workPostalCode" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              placeholder="Enter Postal Code (Optional)"
              value={formData.postalCode}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="workCountry" className="form-label">
              Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="Enter Country"
              value={formData.country}
              onChange={onChange}
            />
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default WorkLocationModal;
