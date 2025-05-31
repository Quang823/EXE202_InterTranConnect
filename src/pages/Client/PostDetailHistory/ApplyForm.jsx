import React from "react";
import { Send } from "lucide-react";

const ApplyForm = ({
  application,
  isApplying,
  setIsApplying,
  handleInputChange,
  handleApply,
}) => (
  <div className="post-history-detail-apply-section">
    <h2 className="post-history-detail-section-title">
      <Send size={20} /> Apply for This Job
    </h2>
    <button
      className="post-history-detail-apply-btn"
      onClick={() => setIsApplying(true)}
    >
      Apply Now
    </button>
    {isApplying && (
      <form
        onSubmit={handleApply}
        className="post-history-detail-application-form"
      >
        <div className="post-history-detail-form-group">
          <label htmlFor="translatorName">Translator Name</label>
          <input
            type="text"
            id="translatorName"
            name="translatorName"
            value={application.translatorName}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="post-history-detail-form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={application.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        <div className="post-history-detail-form-actions">
          <button type="submit" className="post-history-detail-submit-btn">
            Submit Application
          </button>
          <button
            type="button"
            className="post-history-detail-cancel-btn"
            onClick={() => setIsApplying(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    )}
  </div>
);

export default ApplyForm;
