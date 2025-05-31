import React, { useState } from "react";
import "./Post_Client.scss";

const ContactModal = ({ isOpen, onClose, formData, onChange }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        id="contact-modal"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4>
            <span className="header-icon">📞</span> Contact Information
          </h4>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="contactEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="contactPhoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="contactAddresss" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address (Optional)"
              value={formData.address}
              onChange={onChange}
            />
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
