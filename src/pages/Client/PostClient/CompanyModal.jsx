// modals/CompanyModal.jsx
import React, { useState } from "react";

const CompanyModal = ({ isOpen, onClose, onSave }) => {
  const [companyName, setCompanyName] = useState("");
  const [file, setFile] = useState(null);

  const handleSave = () => {
    onSave({ companyName, file });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h3>Add Company/Organization Information</h3>
        <div>
          <label>Company/Organization Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label>Upload your Company/Organization Information</label>
          <div className="upload-section">
            <p>
              Browse file or drop here
              <br />
              Only PDF format. Max file size 12 MB.
            </p>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Add Information</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
