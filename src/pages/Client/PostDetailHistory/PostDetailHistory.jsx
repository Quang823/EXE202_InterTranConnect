import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getJobDetailByJobIdService } from "../../../services/jobService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PostDetailHistory.scss";
import JobHeader from "./JobHeader";
import OrderDetails from "./OrderDetails";
import DocumentPreview from "./DocumentPreview";
import ContactInfo from "./ContactInfo";
import ProgressTimeline from "./ProgressTimeline";
import Applications from "./Applications";
import ApplyForm from "./ApplyForm";

const PostDetailHistory = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [application, setApplication] = useState({
    translatorName: "",
    email: "",
    appliedAt: new Date().toISOString(),
    status: "Pending",
  });
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDetails = await getJobDetailByJobIdService(jobId);
        setJob(jobDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleBack = () => {
    navigate("/client/post_history");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      setIsApplying(false);
      setApplication({
        translatorName: "",
        email: "",
        appliedAt: new Date().toISOString(),
        status: "Pending",
      });
      const updatedJob = await getJobDetailByJobIdService(jobId);
      setJob(updatedJob);
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    }
  };

  const user = JSON.parse(sessionStorage.getItem("user"));
  const isTranslator = user?.role === "translator";
  const canApply =
    job?.status === 0 && job?.applications.length === 0 && isTranslator;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="post-history-detail-container">
              <div className="post-history-detail-loading">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading job details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="post-history-detail-container">
              <div className="post-history-detail-error">
                <p>Error: {error}</p>
                <button
                  className="post-history-detail-back-btn"
                  onClick={handleBack}
                >
                  <ArrowLeft size={16} /> Back to Post History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="post-history-detail-container">
            <button
              className="post-history-detail-back-btn"
              onClick={handleBack}
            >
              <ArrowLeft size={16} /> Back to Post History
            </button>
            <div className="row">
              <div className="col-md-6">
                <JobHeader job={job} />
                <DocumentPreview job={job} />
              </div>
              <div className="col-md-6">
                {/* <p className="post-history-detail-description">
                  {job.description}
                </p> */}
                <OrderDetails job={job} formatDate={formatDate} />
                <ContactInfo job={job} />
                <ProgressTimeline job={job} formatDate={formatDate} />
                <Applications job={job} />
                {canApply && (
                  <ApplyForm
                    application={application}
                    isApplying={isApplying}
                    setIsApplying={setIsApplying}
                    handleInputChange={handleInputChange}
                    handleApply={handleApply}
                  />
                )}

                <div className="post-history-detail-connect">
                  <p>
                    <strong>Connect with Translators Now!</strong> Click{" "}
                    <a href="#" className="post-history-detail-connect-link">
                      View Profile
                    </a>{" "}
                    to chat directly with the translator before making your
                    selection!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailHistory;
