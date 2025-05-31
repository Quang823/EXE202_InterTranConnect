import React from "react";
import { Building, FileText, Mail, Phone, MapPin, Users } from "lucide-react";

const ContactInfo = ({ job }) => (
  <div className="post-history-detail-contact">
    <h2 className="post-history-detail-section-title">
      <Building size={20} /> Company & Contact Information
    </h2>
    <div className="post-history-detail-details-table">
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <Building size={16} /> Company Name:
        </span>
        <span className="post-history-detail-details-value">
          {job.companyName}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <FileText size={16} /> Company Description:
        </span>
        <span className="post-history-detail-details-value">
          {job.companyDescription || "No description available"}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <Mail size={16} /> Contact Email:
        </span>
        <span className="post-history-detail-details-value">
          {job.contactEmail}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <Phone size={16} /> Contact Phone:
        </span>
        <span className="post-history-detail-details-value">
          {job.contactPhone}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <MapPin size={16} /> Contact Address:
        </span>
        <span className="post-history-detail-details-value">
          {job.contactAddress}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <MapPin size={16} /> Work Address:
        </span>
        <span className="post-history-detail-details-value">
          {job.workAddressLine}, {job.workCity}, {job.workPostalCode},{" "}
          {job.workCountry}
        </span>
      </div>
      <div className="post-history-detail-details-row">
        <span className="post-history-detail-details-label">
          <Users size={16} /> Customer:
        </span>
        <span className="post-history-detail-details-value">
          {job.customer.fullName} ({job.customer.email})
        </span>
      </div>
    </div>
  </div>
);

export default ContactInfo;
