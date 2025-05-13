import React, { useEffect } from 'react';
import { Parallax } from "react-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import './InterTransConnect.scss';

const InterTransConnect = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="itc-container">
      {/* About Section */}
      <Parallax
        bgImage="/api/placeholder/1920/1080"
        strength={400}
        blur={{ min: -5, max: 5 }}
        className="itc-parallax-section"
      >
        <div className="itc-about-section">
          <div className="itc-content" data-aos="fade-up" data-aos-delay="200">
            <h1>Inter-TransConnect</h1>
            <h2>About Us</h2>
            <p>
              At Inter-Trans Connect, we believe that language is the key to global connection. Our mission is to create a seamless platform where translators and interpreters can find meaningful work opportunities.
            </p>
            <ul className="itc-features-list">
              <li><span className="itc-checkmark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></span> Why Choose Us? <br /> Global Network - Connect with certified translators & interpreters worldwide.</li>
              <li><span className="itc-checkmark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></span> Industry Expertise <br /> Specialists in legal, medical, technical, and marketing translations.</li>
              <li><span className="itc-checkmark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg></span> Quality Assurance <br /> Every translation goes through rigorous quality control.</li>
            </ul>
          </div>
        </div>
      </Parallax>

      {/* How It Works Section */}
      <section className="itc-how-it-works-section" data-aos="fade-up" data-aos-delay="100">
        <h2>How It Works</h2>
        <div className="itc-steps">
          <div className="itc-step" data-aos="fade-up" data-aos-delay="300">
            <div className="itc-step-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg></div>
            <h3>Create Account</h3>
          </div>
          <div className="itc-step" data-aos="fade-up" data-aos-delay="400">
            <div className="itc-step-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2l4-4h-3V9h-2v4H8z"/></svg></div>
            <h3>Upload Information</h3>
          </div>
          <div className="itc-step" data-aos="fade-up" data-aos-delay="500">
            <div className="itc-step-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg></div>
            <h3>Find Jobs</h3>
          </div>
          <div className="itc-step" data-aos="fade-up" data-aos-delay="600">
            <div className="itc-step-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-9.5-4l-1.5-1.5-3 3h12l-4-4z"/></svg></div>
            <h3>Apply Job</h3>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <Parallax
        bgImage="/api/placeholder/1920/1080"
        strength={400}
        blur={{ min: -5, max: 5 }}
        className="itc-parallax-section"
      >
        <div className="itc-video-section">
          <div className="itc-video-content" data-aos="fade-up" data-aos-delay="100">
            <div className="itc-play-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M8 5v14l11-7z"/></svg></div>
            <h2>Good Life Begin With A Good Job</h2>
            <div className="itc-video-steps">
              <div className="itc-video-step" data-aos="fade-up" data-aos-delay="300">
                <span className="itc-step-number">1</span>
                <h3>Grow Your Career</h3>
              </div>
              <div className="itc-video-step" data-aos="fade-up" data-aos-delay="400">
                <span className="itc-step-number">2</span>
                <h3>Flexible & Rewarding</h3>
              </div>
              <div className="itc-video-step" data-aos="fade-up" data-aos-delay="500">
                <span className="itc-step-number">3</span>
                <h3>Work-Life Balance</h3>
              </div>
            </div>
          </div>
        </div>
      </Parallax>

      {/* FAQ Section */}
      <section className="itc-faq-section" data-aos="fade-up" data-aos-delay="100">
        <h2>Frequently Asked Questions</h2>
        <div className="itc-faq-list">
          <div className="itc-faq-item" data-aos="fade-up" data-aos-delay="100">
            <h3>01 Can I upload a CV?</h3>
            <p>
              Log in to your Inter-Trans Connect account. Click on "Upload CV" and select your file (PDF, DOC, or DOCX). We will review your profile.
            </p>
          </div>
          <div className="itc-faq-item" data-aos="fade-up" data-aos-delay="400">
            <h3>02 How can I join Inter-TransConnect as a translator or interpreter?</h3>
          </div>
          <div className="itc-faq-item" data-aos="fade-up" data-aos-delay="500">
            <h3>03 How do I get paid?</h3>
          </div>
          <div className="itc-faq-item" data-aos="fade-up" data-aos-delay="600">
            <h3>04 Is there a certification requirement to join?</h3>
          </div>
          <div className="itc-faq-item" data-aos="fade-up" data-aos-delay="700">
            <h3>05 How can I increase my chances of getting more projects?</h3>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <Parallax
        bgImage="/api/placeholder/1920/1080"
        strength={400}
        blur={{ min: -5, max: 5 }}
        className="itc-parallax-section"
      >
        <div className="itc-why-us-section">
          <div className="itc-content" data-aos="fade-up" data-aos-delay="200">
            <h2>We're Only Working With The Best</h2>
            <p>
              At Inter-TransConnect, we partner with top-tier translators and interpreters to ensure the highest quality language services.
            </p>
            <div className="itc-benefits">
              <div className="itc-benefit" data-aos="fade-up" data-aos-delay="300">
                <span className="itc-benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>
                <h3>Quality Job</h3>
              </div>
              <div className="itc-benefit" data-aos="fade-up" data-aos-delay="400">
                <span className="itc-benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M4 4h16v12H4zm2 2v8h12V6zm2 12h8v2H8z"/></svg></span>
                <h3>Resume Builder</h3>
              </div>
              <div className="itc-benefit" data-aos="fade-up" data-aos-delay="500">
                <span className="itc-benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg></span>
                <h3>Specialized Knowledge</h3>
              </div>
              <div className="itc-benefit" data-aos="fade-up" data-aos-delay="600">
                <span className="itc-benefit-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="itc-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></span>
                <h3>Top Talents</h3>
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default InterTransConnect;