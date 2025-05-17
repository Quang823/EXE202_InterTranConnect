// modals/SalaryModal.jsx
import React, { useState } from "react";

const SalaryModal = ({ isOpen, onClose, onSave }) => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [translatorReceives, setTranslatorReceives] = useState("");

  const handleSave = () => {
    onSave({ hourlyRate, platformFee, translatorReceives });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h3>Set the payment for your job</h3>
        <p>
          Translators will see this rate when they apply for your job. Please
          set a fair price based on the complexity and scope of work.
        </p>
        <div>
          <label>Hourly Rate</label>
          <input
            type="text"
            placeholder="$/hr"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
        </div>
        <div>
          <label>Platform Service Fee</label>
          <input
            type="text"
            placeholder="$/hr"
            value={platformFee}
            onChange={(e) => setPlatformFee(e.target.value)}
          />
          <p>
            This is the intermediary fee charged by our platform to facilitate
            the transaction, and provide secure payments.
          </p>
        </div>
        <div>
          <label>Translator Will Receive</label>
          <input
            type="text"
            placeholder="$/hr"
            value={translatorReceives}
            onChange={(e) => setTranslatorReceives(e.target.value)}
          />
          <p>
            The estimated amount the translator will receive after the platform
            fee.
          </p>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SalaryModal;
