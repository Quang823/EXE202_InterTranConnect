import React from "react";

const ProgressTimeline = ({ job, formatDate }) => (
  <div className="post-history-detail-progress-timeline">
    <h2 className="post-history-detail-section-title">
      Order Progress Timeline
    </h2>
    <div className="post-history-detail-timeline">
      <div className="post-history-detail-timeline-item">
        <span>Order Placed</span>
        <span>{formatDate(job.createdAt)}</span>
      </div>
      <div className="post-history-detail-timeline-item">
        <span>Application Deadline</span>
        <span>March 14, 2025</span>
      </div>
      <div className="post-history-detail-timeline-item">
        <span>Project Completion</span>
        <span>April 01, 2025</span>
      </div>
      <div className="post-history-detail-timeline-item active">
        <span>Status</span>
        <span>In Process</span>
      </div>
    </div>
    <div className="post-history-detail-timeline-duration">
      Estimated 1 Week Timeline
    </div>
  </div>
);

export default ProgressTimeline;
