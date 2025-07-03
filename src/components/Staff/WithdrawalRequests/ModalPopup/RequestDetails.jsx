import React from "react";

const RequestDetails = ({
  request,
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusText,
}) => {
  if (!request) {
    return null;
  }

  return (
    <div className="withdrawal-modal">
      <div className="modal-content3">
        {/* Customer Info */}
        <div className="section customer-info">
          <h3>Customer Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Full Name:</span>
              <span className="value">{request.customer_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{request.customer_email}</span>
            </div>
            {request.customer_phone && (
              <div className="info-item">
                <span className="label">Phone Number:</span>
                <span className="value">{request.customer_phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Withdrawal Info */}
        <div className="section withdrawal-info">
          <h3>Withdrawal Information</h3>
          <div className="amount-container">
            <div className="amount">{formatCurrency(request.amount)}</div>
            <div className="request-date">Request Date: {formatDate(request.created_date)}</div>
          </div>
        </div>

        {/* Bank Info */}
        <div className="section bank-info">
          <h3>Bank Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Bank:</span>
              <span className="value">{request.bank_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Account Holder:</span>
              <span className="value">{request.customer_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Account Number:</span>
              <span className="value">{request.bank_account_number}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="section status-section">
          <h3>Processing Status</h3>
          <div className={`status-badge ${getStatusColor(request.status)}`}>
            {getStatusText(request.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;