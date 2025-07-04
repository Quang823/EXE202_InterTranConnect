import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
  FileUp,
  ExternalLink,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";
import "./ApplyJob.scss";
import axios from "axios";
import useScrollToTop from "../../../../hooks/useScrollToTop.jsx";
import Loading from "../../../common/Loading/Loading.jsx";
import { processJobWorkWithFile } from "../../../../services/jobWorkService";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

// Function to generate random RGB gradient
const getRandomGradient = () => {
  const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const angle = Math.floor(Math.random() * 360);
  const color1 = getRandomRGB();
  const color2 = getRandomRGB();
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
};

const fetchJobApplications = async (interpreterId, accessToken) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/applications/interpreter/${interpreterId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch job applications");
  }
};

const ApplyJob = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 6;
  const navigate = useNavigate();

  useScrollToTop(currentPage);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const sessionData = JSON.parse(sessionStorage.getItem("user"));
        const interpreterId = sessionData?.id;

        if (!interpreterId) {
          setError("User not logged in");
          return;
        }

        const data = await fetchJobApplications(
          interpreterId,
          sessionData.accessToken
        );
        setJobApplications(data);
        console.log("res", data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/translator/jobDetails/${jobId}`);
  };

  const totalPages = Math.ceil(jobApplications.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobApplications.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFileUpload = async (event, jobId) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const sessionData = JSON.parse(sessionStorage.getItem("user"));
        const interpreterId = sessionData?.id;

        if (!interpreterId) {
          throw new Error("User not logged in");
        }

        const result = await processJobWorkWithFile(jobId, interpreterId, file);

        const updatedApplications = await fetchJobApplications(
          interpreterId,
          sessionData.accessToken
        );
        setJobApplications(updatedApplications);
      } catch (error) {
        console.error("Error uploading file:", error);
        setError(
          "Failed to upload file for job " + jobId + ": " + error.message
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Extract time from date string
  const extractTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div>
        <Loading isLoading={loading} fullScreen size="medium" color="#3b82f6" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="job-tracking-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Job Applications</h2>
        </div>
        <div className="header-right">
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search applications..."
              className="search-input-app"
            />
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
        {currentJobs.length === 0 ? (
          <div className="no-data-message">
            <h2>No Job Applications Found</h2>
          </div>
        ) : (
          currentJobs.map((job, index) => {
            const gradient = getRandomGradient();
            return (
              <div
                key={index}
                className={`job-card ${job.highlighted ? "highlighted" : ""}`}
              >
                <div className="card-header">
                  <div className="company-info">
                    <div
                      className="company-logo"
                      style={{ background: gradient }}
                    >
                      <span>ITC</span>
                    </div>
                    <div className="company-details">
                      <h3 className="job-title">{job.jobTitle}</h3>
                      <span className="salary">{job.price}</span>
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
                      <span>{formatDate(job.createdDate)}</span>
                    </div>
                    <div className="date-item">
                      <Clock size={14} />
                      <span>{extractTime(job.createdDate)}</span>
                    </div>
                  </div>

                  <div className="status-section">
                    <div
                      className={`status-indicator ${job.status.toLowerCase()}`}
                    >
                      <CheckCircle size={14} />
                      <span>{job.status}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    className="action-button view"
                    onClick={() => handleViewDetails(job.jobId)}
                  >
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
                    <input
                      type="file"
                      className="file-input"
                      onChange={(e) => handleFileUpload(e, job.jobId)} // Sử dụng job.jobId
                    />
                  </label>
                </div>
              </div>
            );
          })
        )}
      </div>

      {jobApplications.length > jobsPerPage && (
        <div className="pagination-container">
          <div className="pagination-info">
            <span>
              Showing {indexOfFirstJob + 1}-
              {Math.min(indexOfLastJob, jobApplications.length)} of{" "}
              {jobApplications.length} applications
            </span>
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`page-number ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
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
