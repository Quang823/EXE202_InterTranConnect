import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle,
  Trash2,
  ArrowLeft,
  Clock,
  User,
  DollarSign,
  Settings,
} from "lucide-react";
import ToastManager from "../../components/common/Toast/ToastManager";
import "./NotificationsPage.scss";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API delay with loading animation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockNotifications = [
          {
            id: 1,
            title: "New Translation Request",
            message:
              "You have a new request from Client A for document translation.",
            read: false,
            timestamp: "2025-06-23T17:42:00",
            type: "request",
            priority: "high",
          },
          {
            id: 2,
            title: "Payment Received",
            message: "Payment of $150 has been confirmed for your recent work.",
            read: false,
            timestamp: "2025-06-23T16:30:00",
            type: "payment",
            priority: "medium",
          },
          {
            id: 3,
            title: "Project Completed",
            message:
              "Your translation project 'Legal Documents - Case #2024-156' has been successfully completed and delivered.",
            read: true,
            timestamp: "2025-06-23T15:15:00",
            type: "completed",
            priority: "low",
          },
          {
            id: 4,
            title: "System Update",
            message:
              "The platform has been updated with new features including advanced search and improved dashboard.",
            read: true,
            timestamp: "2025-06-23T14:00:00",
            type: "system",
            priority: "low",
          },
          {
            id: 5,
            title: "Deadline Reminder",
            message:
              "Project 'Marketing Materials Translation' is due in 2 days. Please ensure timely completion.",
            read: false,
            timestamp: "2025-06-23T13:30:00",
            type: "reminder",
            priority: "high",
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

  const getNotificationIcon = (type) => {
    const iconMap = {
      request: User,
      payment: DollarSign,
      completed: CheckCircle,
      system: Settings,
      reminder: Clock,
    };
    return iconMap[type] || Bell;
  };

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
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - notificationTime.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return notificationTime.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === "unread") return !n.read;
    if (selectedFilter === "read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="notifications-loading">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring spinner-ring-reverse"></div>
          </div>
          <div className="loading-text">
            <h3>Loading notifications...</h3>
            <p>Please wait while we fetch your latest updates</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        {/* Header Section */}
        <div className="notifications-header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => navigate("/")} className="back-button">
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </button>

              <div className="header-divider"></div>

              <div className="header-title">
                <div className="title-icon">
                  <Bell className="bell-icon" />
                  {unreadCount > 0 && (
                    <div className="notification-badge">{unreadCount}</div>
                  )}
                </div>
                <div className="title-text">
                  <h1>Notifications</h1>
                  <p>Stay updated with your latest activities</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {notifications.length > 0 && (
              <div className="header-actions">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="action-button primary"
                  >
                    <CheckCircle size={18} />
                    <span>Mark All Read</span>
                  </button>
                )}
                <button onClick={clearAll} className="action-button danger">
                  <Trash2 size={18} />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {[
            {
              label: "Total",
              value: notifications.length,
              color: "blue",
              icon: Bell,
            },
            { label: "Unread", value: unreadCount, color: "red", icon: Bell },
            {
              label: "High Priority",
              value: notifications.filter((n) => n.priority === "high").length,
              color: "orange",
              icon: Clock,
            },
            {
              label: "This Week",
              value: notifications.length,
              color: "green",
              icon: CheckCircle,
            },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className={`stat-card stat-card-${stat.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                  <div className={`stat-icon stat-icon-${stat.color}`}>
                    <IconComponent size={24} />
                  </div>
                </div>
                <div
                  className={`stat-gradient stat-gradient-${stat.color}`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <div className="tabs-container">
            {[
              {
                key: "all",
                label: "All Notifications",
                count: notifications.length,
              },
              { key: "unread", label: "Unread", count: unreadCount },
              {
                key: "read",
                label: "Read",
                count: notifications.length - unreadCount,
              },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`tab-button ${
                  selectedFilter === filter.key ? "active" : ""
                }`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className="tab-count">{filter.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-content">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Bell size={48} />
              </div>
              <h3>No notifications found</h3>
              <p>
                {selectedFilter === "all"
                  ? "You're all caught up! New notifications will appear here."
                  : `No ${selectedFilter} notifications at the moment.`}
              </p>
            </div>
          ) : (
            <div className="notifications-list">
              {filteredNotifications.map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      !notification.read ? "unread" : "read"
                    } ${
                      notification.priority === "high" ? "high-priority" : ""
                    } notification-type-${notification.type}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {notification.priority === "high" && (
                      <div className="priority-indicator"></div>
                    )}

                    <div className="notification-content">
                      <div className="notification-main">
                        {/* Icon */}
                        <div
                          className={`notification-icon notification-icon-${
                            notification.type
                          } ${
                            notification.priority === "high"
                              ? "high-priority"
                              : ""
                          }`}
                        >
                          <IconComponent size={20} />
                        </div>

                        {/* Content */}
                        <div className="notification-body">
                          <div className="notification-header">
                            <h4 className="notification-title">
                              {notification.title}
                            </h4>
                            <div className="notification-meta">
                              <span className="notification-time">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {!notification.read && (
                                <div className="unread-dot"></div>
                              )}
                            </div>
                          </div>

                          <p className="notification-message">
                            {notification.message}
                          </p>

                          {/* Action Buttons */}
                          <div className="notification-actions">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="action-btn mark-read"
                              >
                                <CheckCircle size={16} />
                                <span>Mark as Read</span>
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="action-btn delete"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Gradient Effect */}
                    <div className="hover-gradient"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
