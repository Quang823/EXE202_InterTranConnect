import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Plus, FileUp, ExternalLink, Search, Filter, MoreHorizontal, Calendar, Clock, CheckCircle } from 'lucide-react';
import "./ApplyJob.scss";

// Company logos with more professional styling
const CompanyLogos = {
  up: () => (
    <div className="company-logo up">
      <span>UP</span>
    </div>
  ),
  dribbble: () => (
    <div className="company-logo dribbble">
      <span>DB</span>
    </div>
  ),
  apple: () => (
    <div className="company-logo apple">
      <span>AP</span>
    </div>
  ),
  microsoft: () => (
    <div className="company-logo microsoft">
      <span>MS</span>
    </div>
  ),
  twitter: () => (
    <div className="company-logo twitter">
      <span>TW</span>
    </div>
  ),
  facebook: () => (
    <div className="company-logo facebook">
      <span>FB</span>
    </div>
  ),
  slack: () => (
    <div className="company-logo slack">
      <span>SL</span>
    </div>
  ),
  reddit: () => (
    <div className="company-logo reddit">
      <span>RD</span>
    </div>
  ),
};

const ApplyJob = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const jobs = [
    {
      company: "up",
      title: "Marketing Translation",
      location: "$50k",
      date: "Feb 2, 2019 19:28",
      status: "Active",
      highlighted: false,
    },
    {
      company: "dribbble",
      title: "Marketing Translation",
      location: "$50k",
      date: "Dec 7, 2019 23:26",
      status: "Active",
      highlighted: false,
    },
    {
      company: "apple",
      title: "Marketing Translation",
      location: "$50k",
      date: "Feb 2, 2019 19:28",
      status: "Active",
      highlighted: false,
    },
    {
      company: "microsoft",
      title: "Marketing Translation",
      location: "$50k",
      date: "Dec 7, 2019 23:26",
      status: "Active",
      highlighted: true,
    },
    {
      company: "twitter",
      title: "Marketing Translation",
      location: "$50k",
      date: "Dec 4, 2019 21:42",
      status: "Active",
      highlighted: false,
    },
    {
      company: "facebook",
      title: "Marketing Translation",
      location: "$50k",
      date: "Dec 30, 2019 07:52",
      status: "Active",
      highlighted: false,
    },
    {
      company: "slack",
      title: "Marketing Translation",
      location: "$50k",
      date: "Dec 30, 2019 05:18",
      status: "Active",
      highlighted: false,
    },
    {
      company: "reddit",
      title: "Marketing Translation",
      location: "$50k",
      date: "Mar 20, 2019 23:14",
      status: "Active",
      highlighted: false,
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // Add your file handling logic here
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Extract time from date string
  const extractTime = (dateString) => {
    const parts = dateString.split(' ');
    return parts[parts.length - 1];
  };

  return (
    <div className="job-tracking-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Job Applications</h2>
        </div>
        <div className="header-right">
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search applications..." className="search-input-app" />
          </div>
          <button className="filter-button">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="add-button">
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>
      </div>

      <div className="job-cards-container">
        {currentJobs.map((job, index) => {
          const LogoComponent = CompanyLogos[job.company] || CompanyLogos.up;
          return (
            <div key={index} className={`job-card ${job.highlighted ? 'highlighted' : ''}`}>
              <div className="card-header">
                <div className="company-info">
                  <LogoComponent />
                  <div className="company-details">
                    <h3 className="job-title">{job.title}</h3>
                    <span className="salary">{job.location}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-icon-button">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
              
              <div className="card-content">
                <div className="date-info">
                  <div className="date-item">
                    <Calendar size={14} />
                    <span>{formatDate(job.date)}</span>
                  </div>
                  <div className="date-item">
                    <Clock size={14} />
                    <span>{extractTime(job.date)}</span>
                  </div>
                </div>
                
                <div className="status-section">
                  <div className={`status-indicator ${job.status.toLowerCase()}`}>
                    <CheckCircle size={14} />
                    <span>{job.status}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <button className="action-button view">
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button className="action-button link">
                  <ExternalLink size={16} />
                  <span>Open</span>
                </button>
                <label className="action-button upload">
                  <FileUp size={16} />
                  <span>Upload</span>
                  <input type="file" className="file-input" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {jobs.length > jobsPerPage && (
        <div className="pagination-container">
          <div className="pagination-info">
            <span>Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)} of {jobs.length} applications</span>
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-button prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-number ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              className="pagination-button next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>  
        </div>
      )}
    </div>
  );
};

export default ApplyJob;