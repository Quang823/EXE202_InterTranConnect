import React from "react";

const ProgressTimeline = ({ job, formatDate }) => {
  const getJobStatus = (status) => {
    switch (status) {
      case 0:
        return "Open";
      case 1:
        return "Recruiting";
      case 2:
        return "InProgress";
      case 3:
        return "PartiallyCompleted";
      case 4:
        return "Completed";
      case 5:
        return "Canceled";
      case 6:
        return "FullyRecruited";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="post-history-detail-progress-timeline">
      <h2 className="post-history-detail-section-title">
        Order Progress Timeline
      </h2>
      <div className="post-history-detail-timeline">
        <div className="post-history-detail-timeline-item">
          <span>Order Placed</span>
          <span>{formatDate(job.createdAt)}</span>
        </div>
        {job.deadline && (
          <div className="post-history-detail-timeline-item">
            <span>Application Deadline</span>
            <span>{formatDate(job.deadline)}</span>
          </div>
        )}
        {job.deadline && (
          <div className="post-history-detail-timeline-item">
            <span>Project Completion</span>
            <span>
              {formatDate(
                new Date(
                  new Date(job.deadline).setDate(
                    new Date(job.deadline).getDate() + 7
                  )
                )
              )}
            </span>
          </div>
        )}
        <div className="post-history-detail-timeline-item active">
          <span>Status</span>
          <span>{getJobStatus(job.status)}</span>
        </div>
      </div>
      <div className="post-history-detail-timeline-duration">
        Estimated 1 Week Timeline
      </div>
    </div>
  );
};

export default ProgressTimeline;
