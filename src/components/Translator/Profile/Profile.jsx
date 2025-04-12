import React, { useState } from 'react';
import { Check, Eye, EyeOff, Plus } from 'lucide-react';
import AddCertificateModal from '../Profile/ModalProfile/AddCertificateModal';
import './Profile.scss';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="ep-container">
      <div className="ep-card">
        <div className="ep-header">
          <h2>Edit Profile</h2>
          <div className="ep-avatar-section">
            <div className="ep-avatar-wrapper">
              <img src="/api/placeholder/100/100" alt="Avatar" />
              <div className="ep-avatar-overlay">
                <span>Change</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ep-content">
          <div className="ep-form-section">
            <div className="ep-name-section">
              <div className="ep-input-group1">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Nam" />
              </div>
              <div className="ep-input-group1">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Nguyễn" />
              </div>
            </div>

            <div className="ep-input-group">
              <label htmlFor="email">Email</label>
              <div className="ep-input-with-icon">
                <input type="email" id="email" placeholder="namnpse173557@fpt.edu.vn" />
                <div className="ep-icon-wrapper ep-verified">
                  <Check size={16} />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            <div className="ep-input-group">
              <label htmlFor="password">Password</label>
              <div className="ep-input-with-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                />
                <div className="ep-icon-wrapper ep-clickable" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </div>
              </div>
            </div>

            <div className="ep-input-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input type="text" id="contactNumber" placeholder="0987654321" />
            </div>

            <div className="ep-input-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" placeholder="Location" />
            </div>
          </div>
        </div>

        <div className="ep-action-buttons">
          <button className="ep-certificate-btn" onClick={openModal}>
            <Plus size={16} />
            Add Certificate
          </button>
          <div className="ep-form-actions">
            <button className="ep-cancel-btn">Cancel</button>
            <button className="ep-save-btn">Save Changes</button>
          </div>
        </div>
      </div>

      <AddCertificateModal isOpen={showModal} onClose={closeModal} />
    </div>
  );
};

export default Profile;