import React, { useState, useEffect, useRef, useContext } from "react";
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
import AuthContext from "../../context/AuthContext";
import { useComplaintChat } from "../../hooks/useComplaintChat";
import {
  CheckCircle,
  X,
  MessageCircle,
  AlertCircle,
  Send,
  PlusCircle,
} from "lucide-react";

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
  const { user, token } = useContext(AuthContext);

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

  useComplaintChat(user?.id, token, (message) => {
    if (selectedComplaint && message.complaintId === selectedComplaint.id) {
      loadMessages(selectedComplaint.id);
    }
  });

  return (
    <>
      {!open && (
        <button
          className="complaint-widget-btn"
          title="Complaint Chat"
          onClick={() => setOpen(true)}
        >
          <MessageCircle size={24} color="#ffffff" />
          <span className="complaint-widget-btn-text">Support</span>
        </button>
      )}

      {open && (
        <div className="complaint-widget-box">
          <div className="complaint-widget-header">
            <div className="complaint-widget-header-content">
              <div className="complaint-widget-header-icon">
                <MessageCircle size={20} color="#ffffff" />
              </div>
              <span>Complaint & Support</span>
            </div>
            <button
              className="complaint-widget-close"
              onClick={() => setOpen(false)}
            >
              <X size={18} color="#ffffff" />
            </button>
          </div>

          <div className="complaint-widget-body">
            <div className="complaint-widget-list">
              <div className="complaint-widget-list-title">
                <CheckCircle size={16} color="#1f2937" />
                <span>Complaint List</span>
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
                      <CheckCircle size={12} color="#ffffff" />
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
                      <PlusCircle size={16} color="#ffffff" />
                      Create Complaint
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="complaint-widget-chat">
              {!selectedComplaint ? (
                <div className="complaint-widget-empty">
                  <div className="empty-icon">
                    <MessageCircle size={48} color="#6b7280" />
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
                        <AlertCircle size={32} color="#6b7280" />
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
                        <Send size={18} color="#ffffff" />
                      </button>
                    </div>
                  </form>
                </>
              )}

              {error && (
                <div className="complaint-widget-error">
                  <AlertCircle size={16} color="#dc3545" />
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
