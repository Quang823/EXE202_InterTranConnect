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
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboards;
