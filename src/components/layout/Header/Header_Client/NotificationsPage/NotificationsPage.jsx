import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle, Trash2, ArrowLeft } from "lucide-react";
import ToastManager from "../../../../common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotificationsPage.scss";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockNotifications = [
          {
            id: 1,
            title: "New Translation Request",
            message:
              "You have a new request from Client A for document translation.",
            read: false,
            timestamp: "2025-06-23T17:42:00",
          },
          {
            id: 2,
            title: "Payment Received",
            message: "Payment of $50 has been confirmed for your recent work.",
            read: true,
            timestamp: "2025-06-23T16:30:00",
          },
          {
            id: 3,
            title: "Project Completed",
            message:
              "Your translation project has been successfully completed.",
            read: false,
            timestamp: "2025-06-23T15:15:00",
          },
          {
            id: 4,
            title: "System Update",
            message: "The platform has been updated with new features.",
            read: true,
            timestamp: "2025-06-23T14:00:00",
          },
        ];

        setNotifications(mockNotifications);
      } catch (error) {
        ToastManager.showError("Failed to load notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    ToastManager.showSuccess("Notification marked as read");
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    ToastManager.showSuccess("Notification deleted");
  };

  const clearAll = () => {
    setNotifications([]);
    ToastManager.showSuccess("All notifications cleared");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    ToastManager.showSuccess("All notifications marked as read");
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="notifications-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      {/* Sidebar */}
      <aside className="notifications-sidebar">
        <div className="sidebar-header">
          <div className="logo-section">
            <Bell className="logo-icon" />
            <h2>Notifications</h2>
          </div>
          {unreadCount > 0 && <div className="unread-badge">{unreadCount}</div>}
        </div>

        <nav className="sidebar-nav">
          <button
            className="nav-button back-button"
            onClick={() => navigate("/client/")}
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </nav>

        <div className="sidebar-stats">
          <div className="stat-item">
            <span className="stat-number">{notifications.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{unreadCount}</span>
            <span className="stat-label">Unread</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="notifications-main">
        <div className="main-header">
          <div className="header-content">
            <h1>Your Notifications</h1>
            <p>Stay updated with your latest activities</p>
          </div>

          {notifications.length > 0 && (
            <div className="header-actions">
              {unreadCount > 0 && (
                <button
                  className="action-button secondary"
                  onClick={markAllAsRead}
                >
                  <CheckCircle size={18} />
                  Mark All Read
                </button>
              )}
              <button className="action-button danger" onClick={clearAll}>
                <Trash2 size={18} />
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="notifications-content">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Bell size={64} />
              </div>
              <h3>No notifications yet</h3>
              <p>You're all caught up! New notifications will appear here.</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.read ? "unread" : "read"
                  }`}
                >
                  <div className="notification-content">
                    <div className="notification-header">
                      <h4 className="notification-title">
                        {notification.title}
                      </h4>
                      <span className="notification-time">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>

                    <p className="notification-message">
                      {notification.message}
                    </p>

                    <div className="notification-actions">
                      {!notification.read && (
                        <button
                          className="action-btn mark-read"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        className="action-btn delete"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {!notification.read && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
