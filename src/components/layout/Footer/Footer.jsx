import React from "react";
import "./Footer.scss";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Background Elements */}
      <div className="footer-bg-elements">
        <div className="footer-bg-circle footer-bg-circle-1"></div>
        <div className="footer-bg-circle footer-bg-circle-2"></div>
        <div className="footer-bg-circle footer-bg-circle-3"></div>
      </div>

      <div className="footer-container">
        <div className="footer-content">
          {/* Company Section */}
          <div className="footer-section footer-section--main">
            <div className="footer-logo">
              <h3 className="footer-brand">INTER-TRANS CONNECT</h3>
            </div>
            <p className="footer-description">
              Inter-Trans Connect is your trusted platform for hiring
              professional translators and interpreters worldwide, delivering
              seamless language solutions for all your needs.
            </p>
            <div className="footer-social">
              <h4 className="footer-social-title">Connect with Us</h4>
              <div className="footer-social-links">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <Facebook className="footer-social-icon" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <Twitter className="footer-social-icon" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <Instagram className="footer-social-icon" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <Youtube className="footer-social-icon" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="footer-link">
                  Find Jobs
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="/pricing" className="footer-link">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/news-blog" className="footer-link">
                  News & Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li>
                <a href="/services/translation" className="footer-link">
                  Translation
                </a>
              </li>
              <li>
                <a href="/services/interpretation" className="footer-link">
                  Interpretation
                </a>
              </li>
              <li>
                <a href="/services/localization" className="footer-link">
                  Localization
                </a>
              </li>
              <li>
                <a href="/services/proofreading" className="footer-link">
                  Proofreading
                </a>
              </li>
              <li>
                <a href="/services/consulting" className="footer-link">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Email:</span>
                <a
                  href="mailto:support@intertransconnect.com"
                  className="footer-contact-link"
                >
                  support@intertransconnect.com
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Phone:</span>
                <a href="tel:+84800123456" className="footer-contact-link">
                  +84 800-123-456
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Address:</span>
                <span className="footer-contact-text">
                  Thu Duc District, Ho Chi Minh City, Vietnam
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 Inter-Trans Connect. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="/privacy" className="footer-legal-link">
                Privacy Policy
              </a>
              <span className="footer-legal-divider">•</span>
              <a href="/terms" className="footer-legal-link">
                Terms of Service
              </a>
              <span className="footer-legal-divider">•</span>
              <a href="/cookies" className="footer-legal-link">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
