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
      <div className="modal-content">
        {/* Customer Info */}
        <div className="section customer-info">
          <h3>Thông tin khách hàng</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Họ tên:</span>
              <span className="value">{request.customer_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{request.customer_email}</span>
            </div>
            {request.customer_phone && (
              <div className="info-item">
                <span className="label">Số điện thoại:</span>
                <span className="value">{request.customer_phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Withdrawal Info */}
        <div className="section withdrawal-info">
          <h3>Thông tin rút tiền</h3>
          <div className="amount-container">
            <div className="amount">{formatCurrency(request.amount)}</div>
            <div className="request-date">
              Ngày yêu cầu: {formatDate(request.created_date)}
            </div>
          </div>
        </div>

        {/* Bank Info */}
        <div className="section bank-info">
          <h3>Thông tin ngân hàng</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Ngân hàng:</span>
              <span className="value">{request.bank_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Chủ tài khoản:</span>
              <span className="value">{request.customer_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Số tài khoản:</span>
              <span className="value">{request.bank_account_number}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="section status-section">
          <h3>Trạng thái xử lý</h3>
          <div className={`status-badge ${getStatusColor(request.status)}`}>
            {getStatusText(request.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;