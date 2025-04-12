import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaWallet,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../../hooks/useAuth";
import useScroll from "../../../hooks/useScroll";
import Image from "../../../assets/images/Image";

const Header_Translator = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const scrolling = useScroll(50);
  const handleLogout = () => {
    logout();
    navigate("/translator/home");
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
            {/* Logo*/}
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
                  <NavLink to="/translator/home" className="header-nav-item">
                    Home
                  </NavLink>
                  <NavLink to="/translator/jobs" className="header-nav-item">
                    Jobs
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
                  <NavLink to="/forum" className="header-nav-item">
                    Forum
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Col>

            {/* User Info và Language Switcher */}
            <Col
              xs={6}
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              <NavDropdown
                title={
                  <>
                    <FaGlobe style={{ marginRight: "5px" }} /> EN
                  </>
                }
                id="language-dropdown"
                align="end"
                className="header-language-switcher"
              >
                <NavDropdown.Item href="#">English</NavDropdown.Item>
                <NavDropdown.Item href="#">Spanish</NavDropdown.Item>
                <NavDropdown.Item href="#">French</NavDropdown.Item>
                <NavDropdown.Item href="#">Vietnamese</NavDropdown.Item>
              </NavDropdown>
              {user ? (
                <NavDropdown
                  title={user.fullName}
                  id="account-dropdown"
                  align="end"
                  data-bs-theme="light"
                >
                  <NavDropdown.Item href="/profile">
                    <FaUser style={{ marginRight: "8px" }} /> Setting Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/applied-jobs">
                    <FaBriefcase style={{ marginRight: "8px" }} /> Applied Jobs
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
              ) : (
                <>
                  <NavLink to="/login" className="header-auth-link">
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
                Smart Connections – Smooth Conversation
              </h1>
              <p className="header-banner-subtitle">
                Connecting You with Expert Translators and Interpreters
                Worldwide!
              </p>
              {/*Select Button */}
              <div className="header-select-group">
                <Form.Select className="header-custom-select">
                  <option>Select Job Category</option>
                  <option>Translation</option>
                  <option>Interpretation</option>
                  <option>Proofreading</option>
                </Form.Select>
                <Form.Select className="header-custom-select">
                  <option>Select Source Language</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Vietnamese</option>
                </Form.Select>
                <Form.Select className="header-custom-select">
                  <option>Select Target Language</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Vietnamese</option>
                </Form.Select>
                <Form.Select className="header-custom-select">
                  <option>Select Expertise</option>
                  <option>Legal</option>
                  <option>Medical</option>
                  <option>Technical</option>
                  <option>General</option>
                </Form.Select>
              </div>
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
    </header>
  );
};

export default Header_Translator;
