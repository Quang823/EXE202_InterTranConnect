import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHistory,
  FaWallet,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../../hooks/useAuth";
import useScroll from "../../../hooks/useScroll";
import Image from "../../../assets/images/Image";
import ToastManager from "../../common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header_Client = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const scrolling = useScroll(50);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      ToastManager.showSuccess("Translator hired!");
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/client/home");
  };

  const handlePostClick = (e) => {
    if (!user) {
      e.preventDefault();
      ToastManager.showError("Please log in to post a job.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <header className="header-header-wrapper">
      {/* Navbar */}
      <Navbar
        expand="lg"
        className={`header-custom-navbar ${scrolling ? "header-scrolled" : ""}`}
      >
        <Container>
          <Row className="w-100 align-items-center">
            {/* Logo */}
            <Col xs={6} md={3} className="d-flex align-items-center">
              <Navbar.Brand href="/" className="d-flex align-items-center">
                <Image
                  src="logo"
                  className="header-header-logo-image"
                  alt="Inter-Trans Connect Logo"
                />
                <span className="header-brand-name">INTER-TRANS CONNECT</span>
              </Navbar.Brand>
            </Col>

            {/* Navigation Menu */}
            <Col xs={6} md={7} className="d-flex justify-content-center">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="header-navbar-nav">
                  <NavLink to="/client/home" className="header-nav-item">
                    Home
                  </NavLink>
                  <NavLink
                    to="/client/create_post"
                    className="header-nav-item"
                    onClick={handlePostClick}
                  >
                    Post
                  </NavLink>
                  <NavLink to="/news-blog" className="header-nav-item">
                    News & Blog
                  </NavLink>
                  <NavLink to="/about" className="header-nav-item">
                    About Us
                  </NavLink>
                  <NavLink to="/contact" className="header-nav-item">
                    Contact Us
                  </NavLink>
                  <NavLink to="/pricing" className="header-nav-item">
                    Pricing
                  </NavLink>
                  {user ? (
                    <NavLink to="/client/forum" className="header-nav-item">
                      Forum
                    </NavLink>
                  ) : (
                    <></>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>

            {/* User Info và Language Switcher */}
            <Col
              xs={6}
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              {user ? (
                <>
                  <NavDropdown
                    title={
                      <>
                        <FaGlobe style={{ marginRight: "5px" }} /> EN
                      </>
                    }
                    id="language-dropdown"
                    align="end"
                    className="header-language-switcher me-2"
                  >
                    <NavDropdown.Item href="#">English</NavDropdown.Item>
                    <NavDropdown.Item href="#">Spanish</NavDropdown.Item>
                    <NavDropdown.Item href="#">French</NavDropdown.Item>
                    <NavDropdown.Item href="#">Vietnamese</NavDropdown.Item>
                  </NavDropdown>

                  {/* Dropdown */}
                  <NavDropdown
                    title={user.fullName || "User"}
                    id="account-dropdown"
                    align="end"
                    data-bs-theme="light"
                    className="header-account-dropdown"
                  >
                    <NavDropdown.Item href="/client/edit_profile">
                      <FaUser style={{ marginRight: "8px" }} /> Setting Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/client/post_history">
                      <FaHistory style={{ marginRight: "8px" }} /> Post History
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/wallet">
                      <FaWallet style={{ marginRight: "8px" }} /> Wallet
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt
                        style={{ marginRight: "8px", color: "red" }}
                      />{" "}
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="header-auth-link me-2">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="header-auth-link">
                    Register
                  </NavLink>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Banner Section */}
      <div className="header-banner-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="header-banner-title">
                Top Translators – Connect TODAY!
              </h1>
              <p className="header-banner-subtitle">
                Professional Translators – Meeting all your translation needs!
              </p>
              <Button
                className={`header-client-cta-button ${
                  isLoading ? "header-client-loading" : ""
                }`}
                onClick={handleClick}
              >
                {isLoading ? "Processing..." : "Hire a Translator Now"}
              </Button>

              {/* Số liệu thống kê */}
              <div className="header-stats-group">
                <div className="header-stat-item">
                  <span className="header-stat-number">25,850</span>
                  <span className="header-stat-label">Jobs</span>
                </div>
                <div className="header-stat-item">
                  <span className="header-stat-number">10,000</span>
                  <span className="header-stat-label">Users</span>
                </div>
                <div className="header-stat-item">
                  <span className="header-stat-number">100</span>
                  <span className="header-stat-label">Companies</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Thêm ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </header>
  );
};

export default Header_Client;
