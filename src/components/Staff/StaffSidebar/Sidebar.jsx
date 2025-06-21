import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import "./Sidebar.scss";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/staff/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Yêu cầu rút tiền",
    url: "/staff/withdrawal-requests",
    icon: CreditCardIcon,
  },
];

export default function Sidebar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("user"));
    if (sessionData) {
      setUser(sessionData);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="wp-app-container">
      {/* Sidebar */}
      <aside className={`wp-sidebar ${isSidebarOpen ? "wp-sidebar-open" : ""}`}>
        {/* Sidebar Header */}
        <div className="wp-sidebar-header">
          <div className="wp-header-content">
            <div className="wp-logo-container">
              <CreditCardIcon className="wp-logo-icon" />
            </div>
            <div>
              <h2 className="wp-app-title">WithdrawPro</h2>
              <p className="wp-app-subtitle">Staff Management</p>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <nav className="wp-sidebar-content">
          <div className="wp-nav-group">
            <h3 className="wp-nav-group-label">Quản lý</h3>
            <ul className="wp-nav-list">
              {navigationItems.map((item) => (
                <li key={item.title} className="wp-nav-item">
                  <Link
                    to={item.url}
                    className={`wp-nav-link ${
                      location.pathname === item.url ? "wp-nav-link-active" : ""
                    }`}
                  >
                    <item.icon className="wp-nav-icon" />
                    <span>{item.title}</span>
                    {item.title === "Yêu cầu" && (
                      <span className="wp-badge">12</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="wp-sidebar-footer">
          {user ? (
            <>
              <div className="wp-user-info">
                <div className="wp-user-avatar">
                  <span className="wp-avatar-initial">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="wp-user-details">
                  <p className="wp-user-name">{user.fullName}</p>
                  <p className="wp-user-email">{user.email}</p>
                </div>
              </div>
              <button className="wp-logout-button" onClick={handleLogout}>
                <ArrowLeftOnRectangleIcon className="wp-logout-icon" />
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              className="wp-login-button"
              onClick={() => navigate("/login")}
            >
              <ArrowRightOnRectangleIcon className="wp-login-icon" />
              Đăng nhập
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="wp-main-content">
        {/* Mobile Header */}
        <header className="wp-mobile-header">
          <button onClick={toggleSidebar} className="wp-menu-toggle">
            ☰
          </button>
          <h1 className="wp-mobile-title">WithdrawPro</h1>
          <div className="wp-notification">
            <button className="wp-notification-button">
              <BellIcon className="wp-notification-icon" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="wp-content-area">{children}</div>
      </main>
    </div>
  );
}