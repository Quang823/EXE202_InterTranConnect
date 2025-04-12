import React from "react";
import "./Footer.scss";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-sections">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              Inter-Trans Connect is your trusted platform for hiring
              professional translators and interpreters worldwide, delivering
              seamless language solutions for all your needs.
            </p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@intertransconnect.com</p>
            <p>Phone: +84 800-123-456</p>
            <p>Address: Thu Duc District, Ho Chi Minh City, Vietnam</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/jobs">Jobs</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect with Us</h4>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Inter-Trans Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
