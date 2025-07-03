import React, { useState, useContext, useEffect } from "react";
import { useNotification } from "../../../../../hooks/useNotification";
import AuthContext from "../../../../../context/AuthContext";
import { getUserInfoByUserIdService } from "../../../../../services/authService";
import useRefreshUserInfo from "../../../../../hooks/useRefreshUserInfo";
import { Bell, X } from "lucide-react";
import "./NotificationBell.scss";

const NotificationBell = ({ onClick, mobile }) => {
  const { user, token, login, priority } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCertificateWarning, setShowCertificateWarning] = useState(false);
  const [showPriorityWarning, setShowPriorityWarning] = useState(false);

  const refreshUserInfo = useRefreshUserInfo();

  useNotification(user?.id, token, (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setShowDropdown(true); // Show dropdown on new notification
  });

  // Fetch latest approvalStatus from backend when mount or user.id changes
  useEffect(() => {
    refreshUserInfo();
  }, [user?.id]);

  useEffect(() => {
    if (showDropdown && notifications.length > 0) {
      const timer = setTimeout(() => {
        setShowDropdown(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showDropdown, notifications.length]);

  // Check for Talent role and approvalStatus
  useEffect(() => {
    if (user?.role === "Talent" && user?.approvalStatus === "NoCertificate") {
      setShowCertificateWarning(true);
    } else if (
      user?.role === "Talent" &&
      user?.approvalStatus === "PendingApproval"
    ) {
      setShowCertificateWarning(true);
    } else {
      setShowCertificateWarning(false);
    }
  }, [user]);

  // Check for Customer role and priority
  useEffect(() => {
    if (user?.role === "Customer" && priority === 0) {
      setShowPriorityWarning(true);
    } else {
      setShowPriorityWarning(false);
    }
  }, [user, priority]);

  const handleCloseCertificateWarning = () => {
    setShowCertificateWarning(false);
  };

  const handleClosePriorityWarning = () => {
    setShowPriorityWarning(false);
  };

  return (
    <div className="notification-bell">
      <div
        className="notification-bell__icon-wrapper"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <Bell className="notification-bell__icon" />
        {(notifications.length > 0 ||
          showCertificateWarning ||
          showPriorityWarning) && (
          <span className="notification-bell__dot"></span>
        )}
      </div>
      {showDropdown && notifications.length > 0 && (
        <div className="notification-bell__dropdown">
          {notifications.map((n, idx) => (
            <div key={idx} className="notification-bell__item">
              <strong>{n.title}</strong>
              <p>{n.message}</p>
              <small>{new Date().toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
      {showCertificateWarning && (
        <div className="notification-bell__dropdown notification-bell__warning">
          <div className="notification-bell__item">
            <div className="notification-bell__item-header">
              <strong>
                {user?.approvalStatus === "NoCertificate"
                  ? "Complete Your Profile"
                  : user?.approvalStatus === "PendingApproval"
                  ? "Certificate Pending Approval"
                  : ""}
              </strong>
              <X
                className="notification-bell__close"
                size={16}
                onClick={handleCloseCertificateWarning}
              />
            </div>
            <p>
              {user?.approvalStatus === "NoCertificate"
                ? "Translators are required to provide complete certificate information before applying for jobs. Please add your certificate in profile setting!!!"
                : user?.approvalStatus === "PendingApproval"
                ? "Please wait 24 hours for the certificate to be approved."
                : ""}
            </p>
          </div>
        </div>
      )}
      {showPriorityWarning && (
        <div className="notification-bell__dropdown notification-bell__warning">
          <div className="notification-bell__item">
            <div className="notification-bell__item-header">
              <strong>Top up your account to share your post!</strong>
              <X
                className="notification-bell__close"
                size={16}
                onClick={handleClosePriorityWarning}
              />
            </div>
            <p>
              Hey there! Just add some funds or grab a service package to start
              posting your job. Let's get it live! 😊
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
