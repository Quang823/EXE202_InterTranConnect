import React, { useEffect, useState } from "react";
import { getJobsByCustomerService } from "../../../services/jobService";
import {
  fetchReviewableBPDVByJob,
  fetchReviewsByUser,
  createReviewService,
} from "../../../services/reviewService";
import { Star, FileText, MessageSquare, CheckCircle } from "lucide-react";
import "./Review.scss";

const Review = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [bpdvList, setBpdvList] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingBPDV, setLoadingBPDV] = useState(false);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null); // {bpdv, jobId}
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  // Lấy user từ sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  // Lấy danh sách job của customer
  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      setError("");
      try {
        const jobsData = await getJobsByCustomerService(user.id);
        setJobs(Array.isArray(jobsData?.items) ? jobsData.items : []);
      } catch (err) {
        setError("Không thể tải danh sách job.");
      } finally {
        setLoadingJobs(false);
      }
    };
    if (user.id) fetchJobs();
  }, [user.id]);

  // Lấy lịch sử review của customer
  useEffect(() => {
    const fetchReviewHistory = async () => {
      setLoadingHistory(true);
      setError("");
      try {
        const history = await fetchReviewsByUser(user.id);
        console.log("history", history);
        setReviewHistory(history || []);
      } catch (err) {
        setError("Không thể tải lịch sử review.");
      } finally {
        setLoadingHistory(false);
      }
    };
    if (user.id) fetchReviewHistory();
  }, [user.id]);

  // Khi chọn job, lấy danh sách BPDV đã hoàn thành
  const handleSelectJob = async (jobId) => {
    setSelectedJobId(jobId);
    setLoadingBPDV(true);
    setError("");
    try {
      const bpdv = await fetchReviewableBPDVByJob(jobId);
      setBpdvList(bpdv || []);
    } catch (err) {
      setError("Không thể tải danh sách BPDV.");
      setBpdvList([]);
    } finally {
      setLoadingBPDV(false);
    }
  };

  // Open review modal
  const openReviewModal = (bpdv, jobId) => {
    setReviewTarget({ bpdv, jobId });
    setReviewRating(5);
    setReviewMessage("");
    setReviewError(null);
    setIsReviewModalOpen(true);
  };
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewTarget(null);
    setReviewError(null);
  };

  // Handle submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewTarget) return;
    setReviewLoading(true);
    setReviewError(null);
    try {
      await createReviewService({
        reviewerId: user.id,
        revieweeId: reviewTarget.bpdv.id,
        jobId: reviewTarget.jobId,
        rating: reviewRating,
        comment: reviewMessage,
        createdAt: new Date().toISOString(),
      });

      closeReviewModal();
      // Optionally: reload review history or show success toast
    } catch (err) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="review-customer-container">
      {/* Background Orbs */}
      <div className="review-background">
        <div className="review-background__orb review-background__orb--1"></div>
        <div className="review-background__orb review-background__orb--2"></div>
        <div className="review-background__orb review-background__orb--3"></div>
      </div>

      <div className="review-container">
        {/* Header */}
        <header className="review-header">
          <div className="review-header__content">
            <div className="review-header__icon">
              <Star className="w-8 h-8" />
            </div>
            <div>
              <h1 className="review-header__title">Review Management</h1>
              <p className="review-header__subtitle">
                Manage your job reviews and feedback
              </p>
            </div>
          </div>
        </header>

        {/* Cards Layout */}
        <div className="review-cards">
          {/* Jobs Card */}
          <div className="review-card">
            <div className="review-card__header">
              <h3 className="review-card__title">
                <FileText className="w-6 h-6" />
                Your Jobs
              </h3>
            </div>
            <div className="review-card__content">
              {loadingJobs ? (
                <p className="loading-text">Loading jobs...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                <ul className="job-list-container">
                  {jobs.length === 0 && <li>You have no jobs.</li>}
                  {jobs.map((job) => (
                    <li
                      key={job.id}
                      className={selectedJobId === job.id ? "selected" : ""}
                    >
                      <span>{job.jobTitle || `Job #${job.id}`}</span>
                      <button onClick={() => handleSelectJob(job.id)}>
                        View completed services
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Review History Card */}
          <div className="review-card">
            <div className="review-card__header">
              <h3 className="review-card__title">
                <MessageSquare className="w-6 h-6" />
                Review History
              </h3>
            </div>
            <div className="review-card__content">
              {loadingHistory ? (
                <p className="loading-text">Loading review history...</p>
              ) : reviewHistory.length === 0 ? (
                <p>You have not written any reviews yet.</p>
              ) : (
                <ul className="review-history-list-container">
                  {reviewHistory.map((review) => (
                    <li key={review.id}>
                      <div>
                        <strong>Review comment: </strong>
                        <span style={{ fontWeight: 400 }}>
                          {review.comment}
                        </span>
                        <p>{review.content}</p>
                        <span>
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              size={18}
                              fill={idx < review.rating ? "#facc15" : "none"}
                              stroke={
                                idx < review.rating ? "#facc15" : "#cbd5e1"
                              }
                              style={{
                                marginRight: 2,
                                verticalAlign: "middle",
                              }}
                            />
                          ))}
                          <span style={{ marginLeft: 8, color: "#374151" }}>
                            {review.rating}/5
                          </span>
                          {review.createdAt && (
                            <span style={{ marginLeft: 8, color: "#6b7280" }}>
                              {new Date(review.createdAt).toLocaleString()}
                            </span>
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* BPDV Section */}
        {selectedJobId && (
          <div className="bpdv-section-container">
            <div className="review-card__header">
              <h3 className="review-card__title">
                <CheckCircle className="w-6 h-6" />
                Completed Services for this Job
              </h3>
            </div>
            {loadingBPDV ? (
              <p className="loading-text">Loading services...</p>
            ) : bpdvList.length === 0 ? (
              <p>No completed services to review for this job.</p>
            ) : (
              <ul className="bpdv-list-container">
                {bpdvList.map((bpdv) => (
                  <li key={bpdv.id}>
                    <span>
                      {bpdv.fullName && bpdv.email
                        ? `${bpdv.fullName}, ${bpdv.email}`
                        : `Service #${bpdv.id}`}
                    </span>
                    <button
                      onClick={() => openReviewModal(bpdv, selectedJobId)}
                    >
                      Review
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="wallet-modal-overlay" onClick={closeReviewModal}>
            <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
              <div className="wallet-modal__header">
                <h3 className="wallet-modal__title">
                  <Star className="w-5 h-5" />
                  Write a Review
                </h3>
                <button
                  className="wallet-modal__close"
                  onClick={closeReviewModal}
                >
                  ×
                </button>
              </div>
              <div className="wallet-modal__content">
                {reviewError && (
                  <div className="wallet-modal__error">{reviewError}</div>
                )}
                <form className="wallet-form" onSubmit={handleSubmitReview}>
                  <div className="wallet-form__group">
                    <label className="wallet-form__label">Rating</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`star-icon${
                            reviewRating >= star ? " filled" : ""
                          }`}
                          onClick={() => setReviewRating(star)}
                          size={28}
                          style={{ cursor: "pointer", marginRight: 4 }}
                          fill={reviewRating >= star ? "#facc15" : "none"}
                          stroke={reviewRating >= star ? "#facc15" : "#cbd5e1"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="wallet-form__group">
                    <label className="wallet-form__label">Message</label>
                    <textarea
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                      className="wallet-form__input"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="wallet-form__group">
                    <label className="wallet-form__label">Date</label>
                    <input
                      type="text"
                      value={new Date().toLocaleString()}
                      className="wallet-form__input"
                      disabled
                    />
                  </div>
                  <div className="wallet-form__actions">
                    <button
                      type="button"
                      className="wallet-btn wallet-btn--secondary"
                      onClick={closeReviewModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="wallet-btn wallet-btn--primary"
                      disabled={reviewLoading}
                    >
                      {reviewLoading ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
