import React from "react";
import "./Post_Client.scss";

const SalaryModal = ({ isOpen, onClose, formData, onChange }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };
  const hourlyRate = parseFloat(formData.hourlyRate) || 0;
  const platformFee = (hourlyRate * 0.3).toFixed(2);
  const totalFee = (hourlyRate + parseFloat(platformFee)).toFixed(2);

  const handleHourlyRateChange = (e) => {
    const value = e.target.value;
    onChange(e);
    onChange({
      target: {
        name: "platformFee",
        value: (parseFloat(value) * 0.3 || 0).toFixed(2),
      },
    });
    onChange({
      target: {
        name: "totalFee",
        value: (
          parseFloat(value) +
            parseFloat((parseFloat(value) * 0.3 || 0).toFixed(2)) || 0
        ).toFixed(2),
      },
    });
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        id="salary-modal"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h4>
            <span className="header-icon">💰</span> Salary Information
          </h4>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="form-fields">
          <div className="salary-input-section">
            <label htmlFor="hourlyRate" className="salary-label">
              Hourly Rate for Translator (VND/hr)
            </label>
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              placeholder="Enter hourly rate"
              value={formData.hourlyRate}
              onChange={handleHourlyRateChange}
              min="0"
              step="0.01"
            />
          </div>

          <div className="salary-breakdown">
            <h5>Salary Breakdown</h5>
            <div className="breakdown-item">
              <span className="breakdown-label">Hourly Rate:</span>
              <span className="breakdown-value">
                {formData.hourlyRate.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }) || "0.00"}
                VND/hr
              </span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">
                Platform Service Fee (30%):
              </span>
              <span className="breakdown-value">
                {platformFee.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                VND/hr
              </span>
            </div>
            <div className="breakdown-item total">
              <span className="breakdown-label">Total Fee:</span>
              <span className="breakdown-value">
                {totalFee.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                VND/hr
              </span>
            </div>
            <p className="breakdown-note">
              Note: The Platform Service Fee is automatically calculated as 30%
              of the Hourly Rate. The Total Fee is the sum of the Hourly Rate
              and the Platform Service Fee.
            </p>
          </div>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SalaryModal;
