import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Shield,
  LogOut,
  LogIn,
} from "lucide-react";
import Sidebar from "react-sidebar";
import { Badge } from "react-bootstrap";
import { getUserByUserId } from "../../../apiHandler/authAPIHandler";
import "./AdminSidebars.scss";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Account Management",
    url: "/admin/accountAdmin",
    icon: Users,
  },
  {
    title: "Approval",
    url: "/admin/accountAccept",
    icon: UserCheck,
  },
  {
    title: "Revenue Management",
    url: "/admin/revenue",
    icon: UserCheck,
  },
  {
    title: "Subscription Management",
    url: "/admin/subscription",
    icon: UserCheck,
  },
  {
    title: "Complaint Management",
    url: "/admin/complaint",
    icon: UserCheck,
  },
];

export default function AdminSidebars({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("user"));
    if (sessionData && sessionData.id) {
      // Lấy thông tin user mới nhất từ API
      getUserByUserId(sessionData.id)
        .then((data) => setUser(data))
        .catch(() => setUser(sessionData)); // fallback nếu lỗi
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const getAvatarText = () => {
    if (user && user.fullName) return user.fullName.charAt(0).toUpperCase();
    if (user && user.userName) return user.userName.charAt(0).toUpperCase();
    return "AD";
  };

  const getRoleText = () => {
    if (user && user.role) {
      if (user.role === "admin") return "System Administrator";
      return user.role;
    }
    return "System Administrator";
  };

  const sidebarContent = (
    <div className="ap-sidebar">
      <div className="ap-sidebar-header">
        <div className="ap-header-content">
          <div className="ap-logo-container">
            <Shield className="ap-logo-icon" />
          </div>
          <div>
            <h2 className="ap-title">AdminPanel</h2>
            <p className="ap-subtitle">System Management</p>
          </div>
        </div>
      </div>

      <div className="ap-sidebar-content">
        <div className="ap-sidebar-group">
          <div className="ap-sidebar-menu">
            {navigationItems.map((item) => (
              <div key={item.title} className="ap-menu-item">
                <Link
                  to={item.url}
                  className={`ap-menu-button ${
                    location.pathname === item.url ? "ap-active" : ""
                  }`}
                >
                  <item.icon className="ap-menu-icon" />
                  <span className="ap-menu-title">{item.title}</span>
                  {item.title === "Approval" && (
                    <Badge
                      bg="warning"
                      text="dark"
                      className="ap-approval-badge"
                    >
                      5
                    </Badge>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ap-sidebar-footer">
        <div className="ap-footer-content">
          <div className="ap-avatar-container1">
            <span className="ap-avatar-text">{getAvatarText()}</span>
          </div>
          <div className="ap-user-info">
            <p className="ap-user-name">
              {user
                ? user.fullName || user.userName || "Admin User"
                : "Admin User"}
            </p>
            <p className="ap-user-role">{getRoleText()}</p>
          </div>
        </div>
        {user ? (
          <button className="ap-logout-button" onClick={handleLogout}>
            <LogOut className="ap-logout-icon" />
            Logout
          </button>
        ) : (
          <button className="ap-login-button" onClick={handleLogin}>
            <LogIn className="ap-login-icon" />
            Login
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Sidebar
      sidebar={sidebarContent}
      docked={true}
      styles={{ sidebar: { width: "250px" } }}
    >
      <div className="ap-layout-container">{children}</div>
    </Sidebar>
  );
}
