import React, { useState, useEffect, useRef } from "react";
import {
  fetchComplaints,
  fetchComplaintMessages,
  sendComplaintMessageService,
  createComplaintService,
} from "../../services/complainService";
import { getJobsByCustomerService } from "../../services/jobService";
import { fetchJobApplications } from "../../services/jobApplicationService";
import { uploadToCloudinaryService } from "../../services/uploadToCloudinaryService";
import { getUserInfoByUserIdService } from "../../services/authService";
import "./ComplaintChatWidget.scss";

const ComplaintChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    complaintType: 0,
    relatedJobApplicationId: "",
    relatedUserId: "",
    message: "",
    attachment: "",
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [userCache, setUserCache] = useState({});
  const userId = useRef(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    userId.current = user.id;
    if (open) {
      loadComplaints();
      fetchJobsForCustomer();
    }
  }, [open]);

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const data = await fetchComplaints();
      setComplaints(data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load complaints");
      setLoading(false);
    }
  };

  const loadMessages = async (complaintId) => {
    setLoading(true);
    try {
      const data = await fetchComplaintMessages(complaintId);
      setMessages(data || []);
      // Lấy thông tin user cho tất cả senderId chưa có trong cache
      const uniqueSenderIds = Array.from(
        new Set((data || []).map((m) => m.senderId))
      );
      const missingIds = uniqueSenderIds.filter((id) => !userCache[id]);
      if (missingIds.length > 0) {
        const newCache = { ...userCache };
        await Promise.all(
          missingIds.map(async (id) => {
            try {
              const info = await getUserInfoByUserIdService(id);
              newCache[id] = {
                fullName: info.fullName || "User",
                avatarUrl:
                  info.avatarUrl || "https://ui-avatars.com/api/?name=U",
              };
            } catch {
              newCache[id] = {
                fullName: "User",
                avatarUrl: "https://ui-avatars.com/api/?name=U",
              };
            }
          })
        );
        setUserCache(newCache);
      }
    } catch (err) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectComplaint = async (complaint) => {
    setSelectedComplaint(complaint);
    setLoading(true);
    try {
      const msgs = await fetchComplaintMessages(complaint.id);
      setMessages(msgs || []);
      // Lấy thông tin user cho tất cả senderId chưa có trong cache
      const uniqueSenderIds = Array.from(
        new Set((msgs || []).map((m) => m.senderId))
      );
      const missingIds = uniqueSenderIds.filter((id) => !userCache[id]);
      if (missingIds.length > 0) {
        const newCache = { ...userCache };
        await Promise.all(
          missingIds.map(async (id) => {
            try {
              const info = await getUserInfoByUserIdService(id);
              newCache[id] = {
                fullName: info.fullName || "User",
                avatarUrl:
                  info.avatarUrl || "https://ui-avatars.com/api/?name=U",
              };
            } catch {
              newCache[id] = {
                fullName: "User",
                avatarUrl: "https://ui-avatars.com/api/?name=U",
              };
            }
          })
        );
        setUserCache(newCache);
      }
    } catch (err) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedComplaint) return;
    try {
      await sendComplaintMessageService(selectedComplaint.id, {
        message: newMessage,
        attachment: "",
      });
      setNewMessage("");
      loadMessages(selectedComplaint.id);
    } catch (err) {
      setError("Failed to send message");
    }
  };

  const handleCreateComplaint = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createComplaintService(newComplaint);
      setNewComplaint({
        complaintType: 0,
        relatedJobApplicationId: "",
        relatedUserId: "",
        message: "",
        attachment: "",
      });
      setCreating(false);
      loadComplaints();
    } catch (err) {
      setError("Failed to create complaint");
      setCreating(false);
    }
  };

  const fetchJobsForCustomer = async () => {
    setLoadingJobs(true);
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      const customerId = user.id;
      const jobsData = await getJobsByCustomerService(customerId);
      // jobsData.items nếu là dạng phân trang
      setJobs(jobsData.items || jobsData || []);
    } catch (err) {
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  const fetchApplicationsForJob = async (jobId) => {
    setLoadingApplications(true);
    try {
      const apps = await fetchJobApplications(jobId);
      setApplications(apps || []);
    } catch (err) {
      setApplications([]);
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleJobChange = async (e) => {
    const jobId = e.target.value;
    setNewComplaint({ ...newComplaint, relatedJobApplicationId: "", jobId });
    if (jobId) {
      await fetchApplicationsForJob(jobId);
    } else {
      setApplications([]);
    }
  };

  const handleApplicationChange = (e) => {
    setNewComplaint({
      ...newComplaint,
      relatedJobApplicationId: e.target.value,
    });
  };

  const handleAttachmentChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadToCloudinaryService(file);
    setNewComplaint({ ...newComplaint, attachment: url });
  };

  return (
    <>
      {/* Nút mở chat khiếu nại */}
      {!open && (
        <button
          className="complaint-widget-btn"
          title="Complaint Chat"
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="complaint-widget-btn-text">Support</span>
        </button>
      )}

      {/* Khung chat khiếu nại */}
      {open && (
        <div className="complaint-widget-box">
          <div className="complaint-widget-header">
            <div className="complaint-widget-header-content">
              <div className="complaint-widget-header-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Complaint & Support</span>
            </div>
            <button
              className="complaint-widget-close"
              onClick={() => setOpen(false)}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="complaint-widget-body">
            {/* Danh sách khiếu nại */}
            <div className="complaint-widget-list">
              <div className="complaint-widget-list-title">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Complaint List
              </div>

              {loading && (
                <div className="complaint-widget-loading">
                  <div className="complaint-widget-spinner"></div>
                  Loading...
                </div>
              )}

              <div className="complaint-widget-list-scroll">
                {complaints.map((c) => (
                  <div
                    key={c.id}
                    className={`complaint-widget-list-item ${
                      selectedComplaint?.id === c.id ? "active" : ""
                    }`}
                    onClick={() => handleSelectComplaint(c)}
                  >
                    <div className="complaint-item-icon">
                      <svg
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div className="complaint-item-content">
                      <div className="complaint-item-type">
                        {c.complaintType === 0 ? "Complaint" : "Other"}
                      </div>
                      <div className="complaint-item-id">#{c.id}</div>
                    </div>
                  </div>
                ))}
              </div>

              <form
                className="complaint-create-form"
                onSubmit={handleCreateComplaint}
              >
                <div className="complaint-create-title">
                  Create New Complaint
                </div>
                <div className="complaint-form-group">
                  <label className="complaint-form-label">Complaint Type</label>
                  <select
                    className="complaint-form-select"
                    value={newComplaint.complaintType}
                    onChange={(e) =>
                      setNewComplaint({
                        ...newComplaint,
                        complaintType: Number(e.target.value),
                      })
                    }
                    required
                  >
                    <option value={0}>Job - Job Related Complaint</option>
                    <option value={1}>User - User Related Complaint</option>
                    <option value={2}>Technical - Technical Issue</option>
                    <option value={3}>Payment - Payment Issue</option>
                    <option value={4}>Other - Other</option>
                  </select>
                  <div className="complaint-form-desc">
                    Select the type of complaint that best fits your issue.
                  </div>
                </div>
                <div className="complaint-form-group">
                  <label className="complaint-form-label">Select Job</label>
                  <select
                    className="complaint-form-select"
                    value={newComplaint.jobId || ""}
                    onChange={handleJobChange}
                    required
                    disabled={loadingJobs}
                  >
                    <option value="">-- Select Job --</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.jobTitle}
                      </option>
                    ))}
                  </select>
                  <div className="complaint-form-desc">
                    Only show jobs you've posted.
                  </div>
                </div>
                <div className="complaint-form-group">
                  <label className="complaint-form-label">
                    Select Applicant (application)
                  </label>
                  <select
                    className="complaint-form-select"
                    value={newComplaint.relatedJobApplicationId || ""}
                    onChange={handleApplicationChange}
                    required
                    disabled={loadingApplications || !newComplaint.jobId}
                  >
                    <option value="">-- Select Applicant --</option>
                    {applications.map((app) => (
                      <option key={app.applicationId} value={app.applicationId}>
                        {app.interpreter?.fullName
                          ? `${
                              app.interpreter.fullName
                            } (${app.applicationId.slice(0, 8)}...)`
                          : app.applicationId}
                      </option>
                    ))}
                  </select>
                  <div className="complaint-form-desc">
                    Only show applicants who have applied for this job.
                  </div>
                </div>
                <div className="complaint-form-group">
                  <label className="complaint-form-label">
                    Complaint Message
                  </label>
                  <textarea
                    className="complaint-form-textarea"
                    placeholder="Type your complaint message..."
                    value={newComplaint.message}
                    onChange={(e) =>
                      setNewComplaint({
                        ...newComplaint,
                        message: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="complaint-form-group">
                  <label className="complaint-form-label">
                    Attach (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleAttachmentChange}
                  />
                  {newComplaint.attachment && (
                    <div
                      className="complaint-form-desc"
                      style={{ color: "#2e7d32" }}
                    >
                      Attached file
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={creating}
                  className="complaint-form-btn"
                >
                  {creating ? (
                    <>
                      <div className="complaint-widget-spinner small"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        style={{ verticalAlign: "middle", marginRight: 4 }}
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14m7-7H5"
                        />
                      </svg>
                      Create Complaint
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Khung chat */}
            <div className="complaint-widget-chat">
              {!selectedComplaint ? (
                <div className="complaint-widget-empty">
                  <div className="empty-icon">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      />
                    </svg>
                  </div>
                  <p>Select a complaint to start chatting</p>
                </div>
              ) : (
                <>
                  <div className="complaint-widget-chat-header">
                    <div className="chat-header-info">
                      <div className="chat-status-dot"></div>
                      <span>Complaint #{selectedComplaint.id}</span>
                    </div>
                  </div>

                  <div className="complaint-widget-chat-messages">
                    {messages.length === 0 ? (
                      <div className="no-messages">
                        <svg
                          width="32"
                          height="32"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg, idx) => {
                        const isMine = msg.senderId === userId.current;
                        const userInfo = userCache[msg.senderId] || {
                          fullName: "User",
                          avatarUrl: "https://ui-avatars.com/api/?name=U",
                        };
                        return (
                          <div
                            key={idx}
                            className={`complaint-widget-chat-message ${
                              isMine ? "mine" : "other"
                            }`}
                          >
                            <div className="message-meta">
                              {!isMine && (
                                <img
                                  src={userInfo.avatarUrl}
                                  alt="avatar"
                                  className="message-avatar"
                                />
                              )}
                              <span className="sender-name">
                                {userInfo.fullName}
                              </span>
                              <span className="message-time">
                                {msg.createdAt
                                  ? new Date(msg.createdAt).toLocaleString()
                                  : ""}
                              </span>
                              {isMine && (
                                <img
                                  src={userInfo.avatarUrl}
                                  alt="avatar"
                                  className="message-avatar"
                                />
                              )}
                            </div>
                            <div className="message-bubble">{msg.message}</div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <form
                    className="complaint-widget-chat-form"
                    onSubmit={handleSendMessage}
                  >
                    <div className="chat-input-container">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        required
                      />
                      <button type="submit" className="send-btn">
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m12 19-7-7 7-7m7 7H5"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </>
              )}

              {error && (
                <div className="complaint-widget-error">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintChatWidget;
