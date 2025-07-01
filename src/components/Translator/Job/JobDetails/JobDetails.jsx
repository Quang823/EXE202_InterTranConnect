import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../common/Loading/Loading";
import axios from "axios";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "./JobDetails.scss";
import { startJobWork } from "../../../../apiHandler/jobWorkAPIHandler";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState(""); // State for application message
  const [applyError, setApplyError] = useState(null); // State for application errors
  const [applySuccess, setApplySuccess] = useState(false); // State for application success
  const [startSuccess, setStartSuccess] = useState(false); // State for start work success
  const [startError, setStartError] = useState(null); // State for start work errors
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Fetch job details from API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/job/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load job details.");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Handle Apply Job
  const handleApplyJob = async () => {
    try {
      const sessionData = JSON.parse(sessionStorage.getItem("user"));
      const interpreterId = sessionData?.id;
      const accessToken = sessionStorage.getItem("accessToken");

      if (!interpreterId || !accessToken) {
        setApplyError("User not logged in or missing token.");
        Swal.fire({
          icon: "error",
          title: "Apply Failed",
          text: "User not logged in or missing token.",
        });
        return;
      }

      const payload = {
        jobId: id,
        interpreterId,
        message:
          applicationMessage || "I am interested in applying for this job.",
      };

      const response = await axios.post(
        `${API_URL}/api/applications`,
        payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data?.statusCode === 404) {
        setApplyError(
          response.data?.message || "Failed to submit application."
        );
        setApplySuccess(false);
        Swal.fire({
          icon: "error",
          title: "Apply Failed",
          text: response.data?.message || "Failed to submit application.",
        });
      } else {
        setApplySuccess(true);
        setApplyError(null);
        Swal.fire({
          icon: "success",
          title: "Apply Successfully",
          text: "Your application has been submitted!",
        });
        // Refresh job data after applying
        const jobRes = await axios.get(`${API_URL}/api/job/${id}`);
        setJob(jobRes.data);
      }
    } catch (err) {
      setApplyError("Failed to submit application.");
      setApplySuccess(false);
      Swal.fire({
        icon: "error",
        title: "Apply Failed",
        text: "Failed to submit application.",
      });
      console.error("Application error:", err);
    }
  };

  const handleStartJobWork = async () => {
    try {
      const sessionData = JSON.parse(sessionStorage.getItem("user"));
      const interpreterId = sessionData?.id;

      if (!interpreterId) {
        setStartError("User not logged in.");
        return;
      }

      const result = await startJobWork(id, interpreterId);
      setStartSuccess(true);
      setStartError(null);
      const response = await axios.get(`${API_URL}/api/job/${id}`);
      setJob(response.data);
    } catch (err) {
      setStartError("Failed to start job work.");
      setStartSuccess(false);
      console.error("Start job error:", err);
    }
  };

  const handleBack = () => {
    navigate("/translator/");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  if (loading) {
    return (
      <div>
        <Loading isLoading={loading} fullScreen size="medium" color="#3b82f6" />
      </div>
    );
  }

  if (error || !job) {
    return <div>{error || "Job not found."}</div>;
  }

  // Kiểm tra điều kiện để hiển thị nút Start Work
  const shouldShowStartButton = job.applications?.some(
    (app) =>
      app.interpreterId === JSON.parse(sessionStorage.getItem("user"))?.id &&
      app.workStatus === 2
  );

  return (
    <div className="job-listing-container">
      {/* <header className="header">
        <button className="back-btn" onClick={handleBack}>
          BACK
        </button>
        <button className="next-btn">NEXT</button>
      </header> */}

      <main className="main-content1">
        <div className="job-details2">
          {/* Show centered message if resultFileUrl is null */}
          {job.uploadFileUrl === "" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                fontSize: "1.2rem",
                color: "#888",
                textAlign: "center",
              }}
            >
              There are no output files for this job.
            </div>
          ) : (
            // Display PDF if uploadFileUrl exists
            job.uploadFileUrl && (
              <section className="section">
                <h2>Job Document</h2>
                <div className="jd-pdf-viewer-container">
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                  >
                    <Viewer
                      fileUrl={job.uploadFileUrl}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </div>
              </section>
            )
          )}
        </div>

        <aside className="sidebarjob">
          {/* Hide Apply Job button if status is not 0 */}
          {job.status === 0 && (
            <button className="apply-btn" onClick={handleApplyJob}>
              Apply Job
            </button>
          )}
          {/* Show Start Work button if condition is met */}
          {shouldShowStartButton && (
            <button className="apply-btn" onClick={handleStartJobWork}>
              Start Work
            </button>
          )}
          {applyError && <p className="error">{applyError}</p>}
          {applySuccess && (
            <p className="success">Application submitted successfully!</p>
          )}
          {startError && <p className="error">{startError}</p>}
          {startSuccess && (
            <p className="success">Job work started successfully!</p>
          )}
          <div className="job-overview">
            <h2>Job Overview</h2>
            <div className="overview-item">
              <span className="icon">👤</span> Job Title: {job.jobTitle}
            </div>
            <div className="overview-item">
              <span className="icon">📂</span> Category: {job.translationType}
            </div>
            <div className="overview-item">
              <span className="icon">💰</span> Offered Salary: ${job.totalFee}
            </div>
            <div className="overview-item">
              <span className="icon">📍</span> Location: {job.workCity}
            </div>
            <div className="overview-item">
              <span className="icon">⏰</span> Deadline:{" "}
              {new Date(job.deadline).toLocaleString()}
            </div>
            <div className="overview-item">
              <span className="icon">🌐</span> Source Language:{" "}
              {job.sourceLanguage}
            </div>
            <div className="overview-item">
              <span className="icon">🌐</span> Target Language:{" "}
              {job.targetLanguage}
            </div>
            <div className="overview-item">
              <span className="icon">👥</span> Required Hires:{" "}
              {job.requiredHires}
            </div>
            <div className="overview-item">
              <span className="icon">👥</span> Current Hires: {job.currentHires}
            </div>
            <div className="overview-item">
              <span className="icon">📧</span> Contact Email: {job.contactEmail}
            </div>
            <div className="overview-item">
              <span className="icon">📞</span> Contact Phone: {job.contactPhone}
            </div>
            <div className="overview-item">
              <span className="icon">🏢</span> Company: {job.companyName}
            </div>
            <div className="overview-item">
              <span className="icon">🏠</span> Address: {job.contactAddress}
            </div>
          </div>
          <div className="message-form">
            <h2>Send Us Message</h2>
            <form onSubmit={handleSendMessage}>
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Phone Number" />
              <textarea
                placeholder="Message for job application"
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
              />
              <button type="submit" className="send-btn">
                Send Message
              </button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default JobDetails;
