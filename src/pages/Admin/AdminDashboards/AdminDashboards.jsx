import React, { useState, useContext } from "react";
import AdminDashboard from "../../../components/Admin/AdminDashboard/AdminDashboard";
import { useComplaintChat } from "../../../hooks/useComplaintChat";
// Giả sử AuthContext cung cấp user, accessToken
import AuthContext from "../../../context/AuthContext";

const AdminDashboards = () => {
  const { user, accessToken } = useContext(AuthContext) || {};
  const [messages, setMessages] = useState([]);
  const [newSignalRMessage, setNewSignalRMessage] = useState(null);

  // Nhận message khiếu nại realtime
  useComplaintChat(user?.id, accessToken, (message) => {
    setMessages((prev) => [...prev, message]);
    setNewSignalRMessage(message);
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-container container mx-auto">
        <AdminDashboard newSignalRMessage={newSignalRMessage} />
        {/* Hiển thị danh sách tin nhắn khiếu nại realtime */}
        <div style={{ marginTop: 24 }}>
          <h4>Tin nhắn khiếu nại realtime</h4>
          <div
            style={{
              maxHeight: 200,
              overflowY: "auto",
              background: "#f8f9fa",
              padding: 8,
              borderRadius: 8,
            }}
          >
            {messages.length === 0 && <div>Chưa có tin nhắn mới.</div>}
            {messages.map((msg, idx) => (
              <div key={msg.id || idx} style={{ marginBottom: 8 }}>
                <b>{msg.senderId === user?.id ? "Bạn" : msg.senderId}:</b>{" "}
                {msg.message}
                <div style={{ fontSize: 12, color: "#888" }}>
                  {msg.sentAt ? new Date(msg.sentAt).toLocaleString() : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboards;
