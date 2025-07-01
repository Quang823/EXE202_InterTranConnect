import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ExternalLink,
  Bookmark,
  Clock,
  MapPin,
  DollarSign,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobSidebar from "./JobSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PostHistory.scss";
import "./JobSidebar.scss";
import { getJobsByCustomerService } from "../../../services/jobService";
import Loading from "../../../components/common/Loading/Loading";

const PostHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState(new Set());
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const customerId = user?.id;

        if (!customerId) {
          throw new Error("Customer ID not found in session");
        }

        const fetchedJobs = await getJobsByCustomerService(customerId);
        console.log("Fetched Jobs (Full Response):", fetchedJobs); // Log the full response

        // Check if items is undefined or empty
        if (!fetchedJobs.items || fetchedJobs.items.length === 0) {
          setError("No jobs found for this customer.");
        } else {
          const transformedPosts = fetchedJobs.items.map((job) => ({
            jobId: job.id,
            company: job.companyName?.toLowerCase() || "Unknown",
            title: job.jobTitle || "No title",
            location: job.workCity || "Not specified",
            date: job.createdAt || new Date().toISOString(),
            status: getJobStatus(job.status),
            highlighted: false,
            rating: 4.5,
            applicants: job.applications?.length || 0,
            category: job.translationType || "Unknown",
            languagePair: `${job.sourceLanguage || "Unknown"} - ${
              job.targetLanguage || "Unknown"
            }`,
            pageCount: 50,
            companyLogoUrl: job.companyLogoUrl || null,
            hourlyRate: job.hourlyRate || 0,
            duration: "1 week",
          }));

          setPosts(transformedPosts);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        if (
          err.response &&
          err.response.status === 404 &&
          err.response.data === "No jobs found for this customer."
        ) {
          setError("No jobs found for this customer.");
        } else {
          setError(err.message || "An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetail = (post) => {
    navigate(`/client/post_detail/${post.jobId}`);
  };

  const togglePostSelection = (index) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedPosts(newSelected);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={12} className="ph-star ph-filled" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={12} className="ph-star ph-half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={12} className="ph-star ph-empty" />
      );
    }

    return stars;
  };

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

  if (loading) {
    return (
      <div className="notifications-loading">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring spinner-ring-reverse"></div>
          </div>
          <div className="loading-text">
            <h3>Loading post history...</h3>
            <p>Please wait while we fetch your post history</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <JobSidebar />
          </div>
          <div className="col-md-9">
            <div className="ph-post-history-container">
              <p className="certificate-detail-error">
                Please create a new job!!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <JobSidebar />
        </div>
        <div className="col-md-9">
          <div className="ph-post-history-container">
            <div className="ph-posts-header">
              <div className="ph-header-content">
                <div className="ph-header-left">
                  <h1 className="ph-page-title">
                    <Heart className="ph-title-icon" size={24} />
                    Post History
                  </h1>
                  <p className="ph-page-subtitle">
                    Discover and apply to your dream positions
                  </p>
                </div>
                <div className="ph-header-stats flex justify-center gap-6">
                  <div className="ph-stat-item text-center">
                    <span className="ph-stat-number">{posts.length}</span>
                    <span className="ph-stat-label">Saved Posts</span>
                  </div>
                  <div className="ph-stat-item text-center">
                    <span className="ph-stat-number">
                      {posts.filter((post) => post.status === "Open").length}
                    </span>
                    <span className="ph-stat-label">Active</span>
                  </div>
                  <div className="ph-stat-item text-center">
                    <span className="ph-stat-number">
                      {
                        posts.filter((post) => post.status === "Completed")
                          .length
                      }
                    </span>
                    <span className="ph-stat-label">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ph-posts-table-wrapper">
              <div className="ph-table-container">
                <table className="ph-posts-table">
                  <thead>
                    <tr>
                      <th className="ph-col-post">Post</th>
                      <th className="ph-col-company">Information</th>
                      <th className="ph-col-status">Status</th>
                      <th className="ph-col-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((post, index) => {
                      const globalIndex = indexOfFirstPost + index;
                      const isSelected = selectedPosts.has(globalIndex);

                      return (
                        <tr
                          key={globalIndex}
                          className={`ph-post-row ${
                            post.highlighted ? "ph-highlighted" : ""
                          } ${isSelected ? "ph-selected" : ""}`}
                        >
                          <td className="ph-post-details-cell">
                            <div className="ph-post-details">
                              <div className="ph-post-main-info">
                                <h3 className="ph-post-title">{post.title}</h3>
                                <span className="ph-post-type-badge">
                                  FULL TIME
                                </span>
                              </div>
                              <div className="ph-post-meta">
                                <div className="ph-meta-item">
                                  <Clock size={14} />
                                  <span>{formatDate(post.date)}</span>
                                </div>
                                <div className="ph-meta-item">
                                  <MapPin size={14} />
                                  <span>{post.applicants} applicants</span>
                                </div>
                                <div className="ph-meta-item">
                                  <span>{post.category}</span>
                                </div>
                                <div className="ph-meta-item">
                                  <span>{post.languagePair}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="ph-company-cell">
                            <div className="ph-company-info">
                              <img
                                src={post.companyLogoUrl}
                                alt={`${post.company} logo`}
                                className="ph-company-logo"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/40";
                                }}
                              />
                              <div className="ph-company-details">
                                <div className="ph-company-name">
                                  {post.company.toUpperCase()}
                                </div>
                                <div className="ph-company-rating">
                                  <div className="ph-stars">
                                    {renderStars(post.rating)}
                                  </div>
                                  <span className="ph-rating-text">
                                    {post.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="ph-status-cell">
                            <div
                              className={`ph-status-badge ${post.status.toLowerCase()}`}
                            >
                              <div className="ph-status-indicator"></div>
                              <span>{post.status}</span>
                            </div>
                          </td>

                          <td className="ph-actions-cell">
                            <div className="ph-action-buttons">
                              <button
                                className="ph-action-btn ph-bookmark-btn"
                                onClick={() => togglePostSelection(globalIndex)}
                                title="Save to favorites"
                              >
                                <Bookmark
                                  size={16}
                                  className={isSelected ? "ph-filled" : ""}
                                />
                              </button>
                              <button
                                className="ph-action-btn ph-view-btn"
                                title="View details"
                              >
                                <ExternalLink size={16} />
                              </button>
                              <button
                                className={`ph-apply-btn ${
                                  post.highlighted ? "ph-featured" : ""
                                }`}
                                onClick={() => handleViewDetail(post)}
                              >
                                View Detail
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {posts.length > postsPerPage && (
              <div className="ph-pagination-wrapper">
                <div className="ph-pagination-info">
                  <span>
                    Showing {indexOfFirstPost + 1}-
                    {Math.min(indexOfLastPost, posts.length)} of {posts.length}{" "}
                    posts
                  </span>
                </div>
                <div className="ph-pagination-controls">
                  <button
                    className="ph-pagination-btn ph-prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={18} />
                    <span>Previous</span>
                  </button>

                  <div className="ph-page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          className={`ph-page-btn ${
                            currentPage === page ? "ph-active" : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    className="ph-pagination-btn ph-next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span>Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHistory;
