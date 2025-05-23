import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, ExternalLink, Bookmark, Clock, MapPin, DollarSign, Star } from 'lucide-react';
import "./FavoriteJobs.scss";

const CompanyLogos = {
  up: () => <div className="company-logo up"><span>UP</span></div>,
  dribbble: () => <div className="company-logo dribbble"><span>DB</span></div>,
  apple: () => <div className="company-logo apple"><span>AP</span></div>,
  microsoft: () => <div className="company-logo microsoft"><span>MS</span></div>,
  twitter: () => <div className="company-logo twitter"><span>TW</span></div>,
  facebook: () => <div className="company-logo facebook"><span>FB</span></div>,
  slack: () => <div className="company-logo slack"><span>SL</span></div>,
  reddit: () => <div className="company-logo reddit"><span>RD</span></div>,
};

const FavoriteJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const jobsPerPage = 5;

  const jobs = [
    {
      company: "up",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Feb 2, 2019 19:28",
      status: "Active",
      highlighted: false,
      rating: 4.8,
      applicants: 24,
    },
    {
      company: "dribbble",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Dec 7, 2019 23:26",
      status: "Booked",
      highlighted: false,
      rating: 4.9,
      applicants: 18,
    },
    {
      company: "apple",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Feb 2, 2019 19:28",
      status: "Active",
      highlighted: false,
      rating: 4.7,
      applicants: 32,
    },
    {
      company: "microsoft",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Dec 7, 2019 23:26",
      status: "Booked",
      highlighted: true,
      rating: 4.9,
      applicants: 15,
    },
    {
      company: "twitter",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Dec 4, 2019 21:42",
      status: "Active",
      highlighted: false,
      rating: 4.6,
      applicants: 28,
    },
    {
      company: "facebook",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Dec 30, 2019 07:52",
      status: "Active",
      highlighted: false,
      rating: 4.8,
      applicants: 21,
    },
    {
      company: "slack",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Dec 30, 2019 05:18",
      status: "Active",
      highlighted: false,
      rating: 4.5,
      applicants: 19,
    },
    {
      company: "reddit",
      title: "Marketing Translation",
      location: "$50k-80k",
      date: "Mar 20, 2019 23:14",
      status: "Active",
      highlighted: false,
      rating: 4.4,
      applicants: 26,
    },
  ];

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyNow = (job) => {
    console.log(`Applying for ${job.title} at ${job.company}`);
  };

  const toggleJobSelection = (index) => {
    const newSelected = new Set(selectedJobs);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedJobs(newSelected);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={12} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={12} className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={12} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="favorite-jobs-container">
      <div className="jobs-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="page-title">
              <Heart className="title-icon" size={24} />
              Favorite Jobs
            </h1>
            <p className="page-subtitle">Discover and apply to your dream positions</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{jobs.length}</span>
              <span className="stat-label">Saved Jobs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{jobs.filter(job => job.status === 'Active').length}</span>
              <span className="stat-label">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="jobs-table-wrapper">
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th className="col-job">Job</th>
                <th className="col-company">Customer Information</th>
                <th className="col-status">Status</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job, index) => {
                const LogoComponent = CompanyLogos[job.company] || CompanyLogos.up;
                const globalIndex = indexOfFirstJob + index;
                const isSelected = selectedJobs.has(globalIndex);
                
                return (
                  <tr 
                    key={globalIndex} 
                    className={`job-row ${job.highlighted ? 'highlighted' : ''} ${isSelected ? 'selected' : ''}`}
                  >
                    <td className="job-details-cell">
                      <div className="job-details">
                        <div className="job-main-info">
                          <h3 className="job-title">{job.title}</h3>
                          <span className="job-type-badge">FULL TIME</span>
                        </div>
                        <div className="job-meta">
                          <div className="meta-item">
                            <DollarSign size={14} />
                            <span>{job.location}</span>
                          </div>
                          <div className="meta-item">
                            <Clock size={14} />
                            <span>{formatDate(job.date)}</span>
                          </div>
                          <div className="meta-item">
                            <MapPin size={14} />
                            <span>{job.applicants} applicants</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="company-cell">
                      <div className="company-info">
                        <LogoComponent />
                        <div className="company-details">
                          <div className="company-name">{job.company.toUpperCase()}</div>
                          <div className="company-rating">
                            <div className="stars">
                              {renderStars(job.rating)}
                            </div>
                            <span className="rating-text">{job.rating}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="status-cell">
                      <div className={`status-badge ${job.status.toLowerCase()}`}>
                        <div className="status-indicator"></div>
                        <span>{job.status}</span>
                      </div>
                    </td>
                    
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button 
                          className="action-btn bookmark-btn"
                          onClick={() => toggleJobSelection(globalIndex)}
                          title="Save to favorites"
                        >
                          <Bookmark size={16} className={isSelected ? 'filled' : ''} />
                        </button>
                        <button 
                          className="action-btn view-btn"
                          title="View details"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button 
                          className={`apply-btn ${job.highlighted ? 'featured' : ''}`}
                          onClick={() => handleApplyNow(job)}
                        >
                          Apply Now
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

      {jobs.length > jobsPerPage && (
        <div className="pagination-wrapper">
          <div className="pagination-info">
            <span>Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)} of {jobs.length} jobs</span>
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              className="pagination-btn next"
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
  );
};

export default FavoriteJobs;