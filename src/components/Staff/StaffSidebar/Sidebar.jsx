import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Shield,
  LogOut,
  LogIn,
} from "lucide-react";
import Sidebar from "react-sidebar";
import { Badge } from "react-bootstrap";
import { getUserByUserId } from "../../../apiHandler/authAPIHandler";
import "./Sidebar.scss";
import Image from "../../../assets/images/Image";
import AuthContext from "../../../context/AuthContext";
const navigationItems = [
  {
    title: "Dashboard",
    url: "/staff/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Withdrawal Requests",
    url: "/staff/withdrawal-requests",
    icon: CreditCard,
  },
];

export default function StaffSidebar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { logout } = useContext(AuthContext);
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
    logout();
    window.location.href = "/login";
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const getAvatarText = () => {
    if (user && user.fullName) return user.fullName.charAt(0).toUpperCase();
    if (user && user.userName) return user.userName.charAt(0).toUpperCase();
    return "ST";
  };

  const getRoleText = () => {
    if (user && user.role) {
      if (user.role === "staff") return "Staff";
      return user.role;
    }
    return "Staff";
  };

  const sidebarContent = (
    <div className="ap-sidebar">
      <div className="ap-sidebar-header">
        <div className="ap-header-content">
          <div className="ap-logo-container">
            <Image
              className="itc-header__logo-svg"
              src="logo"
              alt="Inter-Trans Connect Logo"
            />
            <div className="itc-header__logo-glow"></div>
          </div>

          <div>
            <h2 className="ap-title">StaffPanel</h2>
            <p className="ap-subtitle">Staff Management</p>
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
                  {item.title === "Withdrawal Requests" && (
                    <Badge
                      bg="warning"
                      text="dark"
                      className="ap-approval-badge"
                    >
                      12
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
                ? user.fullName || user.userName || "Staff User"
                : "Staff User"}
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
