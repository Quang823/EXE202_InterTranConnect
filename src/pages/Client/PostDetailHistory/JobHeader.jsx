import React from "react";
import { Building } from "lucide-react";

const JobHeader = ({ job }) => (
  <div className="post-history-detail-header">
    <div className="post-history-detail-header-content">
      <h1 className="post-history-detail-title">{job.jobTitle}</h1>
      <div className="post-history-detail-company">
        {job.companyLogoUrl && (
          <img
            src={job.companyLogoUrl}
            alt={job.companyName}
            className="post-history-detail-company-logo"
          />
        )}
        <span className="post-history-detail-requested-by">
          Requested by: {job.companyName}, {job.customer.fullName}
        </span>
      </div>
    </div>
  </div>
);

export default JobHeader;
