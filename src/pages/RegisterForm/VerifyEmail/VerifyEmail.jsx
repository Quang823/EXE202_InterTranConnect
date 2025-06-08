import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Mail, Clock } from "lucide-react";
import "./VerifyEmail.scss";

const VerifyEmail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "your-email@example.com";

  useEffect(() => {
    const card = document.querySelector(".verify-email__card");
    if (card) card.classList.add("verify-email__card--animated");
  }, []);

  return (
    <div className="verify-email-page">
      <div className="verify-email__container">
        <Row className="verify-email-row">
          <Col md={12} className="verify-email-content">
            <div className="verify-email__card">
              <div className="verify-email__card-glow"></div>
              <div className="verify-email__header">
                <div className="verify-email__icon-wrapper">
                  <div className="verify-email__icon-bg"></div>
                  <Mail className="verify-email__icon" />
                  <div className="verify-email__icon-pulse"></div>
                </div>
                <h1 className="verify-email__title">
                  <span className="verify-email__title-line">Verify</span>
                  <span className="verify-email__title-line verify-email__title-line--accent">
                    Your Email
                  </span>
                </h1>
                <div className="verify-email__title-decoration"></div>
              </div>
              <div className="verify-email__content">
                <div className="verify-email__email-display">
                  <Mail className="verify-email__email-icon" />
                  <div className="verify-email__email-text">
                    <p className="verify-email__message">
                      Please check your{" "}
                      <span className="verify-email__email-badge">{email}</span>{" "}
                      to verify your account.
                    </p>
                  </div>
                </div>
                <div className="verify-email__instructions">
                  <div className="verify-email__step">
                    <span className="verify-email__step-number">1</span>
                    <p>
                      Open your email and click the verification link sent to
                      you.
                    </p>
                  </div>
                  <div className="verify-email__step">
                    <span className="verify-email__step-number">2</span>
                    <p>
                      If you don’t see the email, check your spam or junk
                      folder.
                    </p>
                  </div>
                </div>
                <div className="verify-email__timer">
                  <Clock className="verify-email__timer-icon" />
                  <span>Resend link in: 00:59</span>
                </div>
              </div>
              <div className="verify-email__actions">
                <button
                  className="verify-email__back-btn"
                  onClick={() => navigate("/login")}
                >
                  <span className="verify-email__btn-text">Back to Login</span>
                  <div className="verify-email__btn-shimmer"></div>
                </button>
                <button className="verify-email__resend-btn">
                  <span className="verify-email__btn-text">Resend Email</span>
                  <div className="verify-email__btn-shimmer"></div>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* Animated Background */}
      <div className="verify-email__bg">
        <div className="verify-email__bg-circle verify-email__bg-circle--1"></div>
        <div className="verify-email__bg-circle verify-email__bg-circle--2"></div>
        <div className="verify-email__bg-circle verify-email__bg-circle--3"></div>
        <div className="verify-email__bg-circle verify-email__bg-circle--4"></div>
      </div>
      {/* Floating Particles */}
      <div className="verify-email__particles">
        <div className="verify-email__particle verify-email__particle--1"></div>
        <div className="verify-email__particle verify-email__particle--2"></div>
        <div className="verify-email__particle verify-email__particle--3"></div>
        <div className="verify-email__particle verify-email__particle--4"></div>
        <div className="verify-email__particle verify-email__particle--5"></div>
        <div className="verify-email__particle verify-email__particle--6"></div>
        <div className="verify-email__particle verify-email__particle--7"></div>
        <div className="verify-email__particle verify-email__particle--8"></div>
        <div className="verify-email__particle verify-email__particle--9"></div>
        <div className="verify-email__particle verify-email__particle--10"></div>
      </div>
    </div>
  );
};

export default VerifyEmail;
