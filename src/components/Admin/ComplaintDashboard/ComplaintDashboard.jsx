import React, { useEffect, useState, useRef } from "react";
import {
  fetchAllComplaints,
  fetchComplaintMessages,
  sendComplaintMessageService,
} from "../../../services/complainService";
import { getUserInfoByUserIdService } from "../../../services/authService";
import "./ComplaintDashboard.scss";
import { useComplaintChat } from "../../../hooks/useComplaintChat";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";

const complaintTypeMap = ["Job", "User", "Technical", "Payment", "Other"];

const ComplaintDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [userCache, setUserCache] = useState({}); // { userId: { fullName, avatarUrl } }
  const userId = useRef(null);
  const { user, accessToken: contextToken } = useContext(AuthContext) || {};
  const accessToken = contextToken || sessionStorage.getItem("accessToken");
  console.log("[ADMIN] user:", user);
  console.log("[ADMIN] accessToken:", accessToken);

  useEffect(() => {
    // Lấy userId admin hiện tại từ sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    userId.current = user.id;
    loadComplaints();
  }, []);

  useComplaintChat(user?.id, accessToken, (message) => {
    console.log("[ADMIN] SignalR message received:", message);
    console.log("[ADMIN] Current selectedComplaint:", selectedComplaint);
    if (
      message &&
      selectedComplaint &&
      message.complaintId === selectedComplaint.id
    ) {
      console.log(
        "[ADMIN] Reloading messages for complaint:",
        selectedComplaint.id
      );
      handleSelectComplaint(selectedComplaint);
    }
  });

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const data = await fetchAllComplaints();
      setComplaints(data || []);
    } catch (err) {
      // handle error
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
    setSending(true);
    try {
      await sendComplaintMessageService(selectedComplaint.id, {
        message: newMessage,
        attachment: "",
      });
      setNewMessage("");
      // reload messages
      await handleSelectComplaint(selectedComplaint);
    } catch (err) {
      // handle error
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="complaint-dashboard-container">
      <div className="complaint-list-panel">
        <div className="complaint-list-title">Complaint List</div>
        <div className="complaint-list-scroll">
          {loading ? (
            <div className="complaint-loading">Loading...</div>
          ) : (
            complaints.map((c) => (
              <div
                key={c.id}
                className={`complaint-list-item ${
                  selectedComplaint?.id === c.id ? "active" : ""
                }`}
                onClick={() => handleSelectComplaint(c)}
              >
                <div className="complaint-list-type">
                  {complaintTypeMap[c.complaintType] || "Other"}
                </div>
                <div className="complaint-list-user">
                  User: {c.userId?.slice(0, 8)}...
                </div>
                <div className="complaint-list-status">Status: {c.status}</div>
                <div className="complaint-list-time">
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="complaint-chat-panel">
        {selectedComplaint ? (
          <>
            <div className="complaint-chat-header">
              Complaint #{selectedComplaint.id} -{" "}
              {complaintTypeMap[selectedComplaint.complaintType]}
            </div>
            <div className="complaint-chat-messages">
              {messages.length === 0 ? (
                <div className="complaint-no-messages">No messages yet.</div>
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
                      className={`complaint-chat-message ${
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
                        <span className="message-sender">
                          {userInfo.fullName}
                        </span>
                        <span className="message-time">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleString()
                            : ""}
                        </span>
                      </div>
                      <div className="message-bubble">{msg.message}</div>
                      {isMine && (
                        <img
                          src={userInfo.avatarUrl}
                          alt="avatar"
                          className="message-avatar"
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <form className="complaint-chat-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={sending}
              />
              <button type="submit" disabled={sending || !newMessage.trim()}>
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="complaint-chat-empty">
            Select a complaint to view details and chat with the user.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDashboard;
