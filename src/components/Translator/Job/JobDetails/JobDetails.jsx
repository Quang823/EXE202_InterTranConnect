import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../common/Loading/Loading";
import axios from "axios";
import "./JobDetails.scss";

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

      if (!interpreterId) {
        setApplyError("User not logged in.");
        return;
      }

      const payload = {
        jobId: id,
        interpreterId,
        message:
          applicationMessage || "I am interested in applying for this job.",
      };

      await axios.post(`${API_URL}/api/JobApplication`, payload, {
        headers: { Authorization: `Bearer ${sessionData.accessToken}` },
      });
      setApplySuccess(true);
      setApplyError(null);
    } catch (err) {
      setApplyError("Failed to submit application.");
      setApplySuccess(false);
      console.error("Application error:", err);
    }
  };

  // Handle back button navigation
  const handleBack = () => {
    navigate("/translator");
  };

  // Handle message form submission (optional, if you want to use the form for other purposes)
  const handleSendMessage = (e) => {
    e.preventDefault();
    // Add logic for sending a general message if needed
    alert("Message sent!"); // Placeholder
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

  return (
    <div className="job-listing-container">
      <header className="header">
        <button className="back-btn" onClick={handleBack}>
          BACK
        </button>
        <button className="next-btn">NEXT</button>
      </header>

      <main className="main-content">
        <div className="job-details2">
          <h1>{job.jobTitle}</h1>
          <div className="job-meta">
            <span className="status">{job.customer.fullName}</span>
            <span className="type">{job.translationType}</span>
            <span className="time">
              {new Date(job.createdAt).toLocaleString()}
            </span>
            <span className="salary">${job.totalFee}</span>
            <span className="location">{job.workCity}</span>
          </div>

          <section className="section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
            <h3>Key Aspects of Marketing Translation:</h3>
            <ul>
              <li>
                <span className="check">✓</span> Localization: Adapting tone,
                style, and cultural references to match the target market.
              </li>
              <li>
                <span className="check">✓</span> Brand Consistency: Ensuring the
                message aligns with the company’s identity across languages.
              </li>
              <li>
                <span className="check">✓</span> SEO Optimization: Translating
                and adapting keywords for global search rankings.
              </li>
              <li>
                <span className="check">✓</span> Creative Adaptation:
                Maintaining emotional impact while adjusting phrasing for
                different audiences.
              </li>
              <li>
                <span className="check">✓</span> Cross-Channel Integration:
                Applying translated content across websites, social media, and
                advertising.
              </li>
              <li>
                <span className="check">✓</span> Marketing translation helps
                brands connect with international customers, increase
                engagement, and build trust across diverse markets.
              </li>
            </ul>
          </section>

          <section className="section">
            <h2>Key Responsibilities</h2>
            <h3>Translate & Localize Content</h3>
            <ul>
              <li>
                <span className="check">✓</span> Convert marketing materials
                (ads, brochures, websites, social media posts, product
                descriptions) while maintaining cultural and brand consistency.
              </li>
            </ul>
            <h3>Ensure Brand Voice & Tone</h3>
            <ul>
              <li>
                <span className="check">✓</span> Adapt messaging to fit the
                target audience while preserving the brand’s unique voice and
                style.
              </li>
            </ul>
            <h3>SEO & Keyword Optimization</h3>
            <ul>
              <li>
                <span className="check">✓</span> Translate and optimize keywords
                for search engines to improve online visibility in different
                languages.
              </li>
            </ul>
            <h3>Transcreation & Copywriting</h3>
            <ul>
              <li>
                <span className="check">✓</span> Rewrite slogans, taglines, and
                promotional content to evoke the same emotions as the original.
              </li>
            </ul>
          </section>

          <section className="section">
            <h2>Professional Skills</h2>
            <ul>
              <li>
                <span className="check">✓</span> Language Proficiency: Fluent in
                both the source and target languages, with strong grammar,
                vocabulary, and writing skills.
              </li>
              <li>
                <span className="check">✓</span> Marketing & Branding Knowledge:
                Understanding of marketing strategies, consumer psychology, and
                brand positioning across cultures.
              </li>
              <li>
                <span className="check">✓</span> Transcreation & Copywriting:
                Ability to create and adapt slogans, taglines, and marketing
                messages while maintaining the original intent.
              </li>
            </ul>
          </section>
        </div>

        <aside className="sidebar">
          <button className="apply-btn" onClick={handleApplyJob}>
            Apply Job
          </button>
          {applyError && <p className="error">{applyError}</p>}
          {applySuccess && (
            <p className="success">Application submitted successfully!</p>
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
