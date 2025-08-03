import React from "react";
import { Book, Globe, FileText, DollarSign, Clock } from "lucide-react";

const OrderDetails = ({ job, formatDate }) => (
  <div className="post-history-detail-order-details">
    <h2 className="post-history-detail-section-title">
      <Book size={20} /> Order Details
    </h2>
    <div className="post-history-detail-details-table">
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <Globe size={16} /> Languages:
        </span>
        <span className="post-history-detail-details-value">
          {job.sourceLanguage} → {job.targetLanguage}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <FileText size={16} /> Translation Type:
        </span>
        <span className="post-history-detail-details-value">
          {job.translationType || "Unknown"}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <DollarSign size={16} /> Job Wage:
        </span>
        <span className="post-history-detail-details-value">
          {job.hourlyRate?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <DollarSign size={16} /> Platform Service Fee:
        </span>
        <span className="post-history-detail-details-value">
          {job.platformServiceFee?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <DollarSign size={16} /> Total Amount:
        </span>
        <span className="post-history-detail-details-value">
          {job.totalFee?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <Clock size={16} /> Order Date:
        </span>
        <span className="post-history-detail-details-value">
          {formatDate(job.createdAt)}
        </span>
      </div>
    </div>
  </div>
);

export default OrderDetails;
