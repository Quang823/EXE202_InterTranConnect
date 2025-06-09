import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  CheckCircle,
  Linkedin,
  Facebook,
  Instagram,
  ExternalLink,
  Star,
  Award,
  GraduationCap,
  BookOpen,
  Zap,
  Search,
} from "lucide-react";
import "./TranslatorProfile.scss";

const TranslatorProfile = () => {
  const { interpreterId } = useParams();
  const [translator, setTranslator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranslatorProfile = async () => {
      if (!interpreterId) {
        setError("Interpreter ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Simulate API call with mock data for demo
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setTranslator({
          name: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=face",
          role: "English–Vietnamese Translator",
          email: "sarah.johnson@email.com",
          phone: "+1 (555) 123-4567",
          languages: ["English", "Vietnamese", "French"],
          experience: "8+ years",
          location: "Ho Chi Minh City, Vietnam",
          about:
            "Passionate linguist with over 8 years of experience in professional translation and interpretation. Specialized in legal, technical, and business communications with a proven track record of accuracy and cultural sensitivity.",
          skills: [
            "Legal Translation",
            "Technical Writing",
            "Business Communication",
            "Medical Translation",
            "Literary Translation",
            "Conference Interpreting",
          ],
          certifications: [
            "Certified Translation Professional (CTP) - ATA",
            "Legal Translation Certificate - University of California",
            "Medical Translation Certification - IMIA",
          ],
          experienceDetails: [
            "Senior Translator at Global Communications Inc. (2020-Present)",
            "Freelance Legal Translator (2018-2020)",
            "In-house Translator at TechCorp Vietnam (2016-2018)",
          ],
          education: [
            "Master of Arts in Translation Studies - University of London (2016)",
            "Bachelor of Arts in English Literature - Vietnam National University (2014)",
          ],
          publications: [
            "Translation Quality Assessment in Legal Documents (2022)",
            "Cultural Adaptation in Business Translation (2021)",
            "Best Practices in Medical Translation (2020)",
          ],
          superpower:
            "Bridging cultures through precise and nuanced translation that captures not just words, but meaning and intent",
          lookingFor:
            "Challenging projects in legal and technical translation, long-term partnerships with international clients",
          rating: 4.9,
          reviewCount: 127,
          projectsCompleted: 450,
        });
      } catch (err) {
        setError(err.message || "Failed to load translator profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchTranslatorProfile();
  }, [interpreterId]);

  if (loading) {
    return (
      <div className="translator-profile">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="translator-profile">
        <div className="error-card">
          <div className="error-content">
            <p className="error-text">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!translator) {
    return (
      <div className="translator-profile">
        <div className="no-data-card">
          <div className="no-data-content">
            <p className="no-data-text">No data available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="translator-profile">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="profile-card">
              <div className="profile-content">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <img src={translator.avatar} alt={translator.name} />
                    <div className="avatar-fallback">
                      {translator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>

                  <h1 className="profile-name">{translator.name}</h1>
                  <p className="profile-role">{translator.role}</p>

                  <div className="verified-badge">
                    <CheckCircle className="verified-icon" />
                    <span className="verified-text">Verified Professional</span>
                  </div>

                  {/* Rating */}
                  <div className="rating-section">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`star ${
                            i < Math.floor(translator.rating)
                              ? "star-filled"
                              : "star-empty"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="rating-value">{translator.rating}</span>
                    <span className="rating-count">
                      ({translator.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="stats-grid">
                    <div className="stat-item stat-projects">
                      <div className="stat-value">
                        {translator.projectsCompleted}+
                      </div>
                      <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item stat-experience">
                      <div className="stat-value">{translator.experience}</div>
                      <div className="stat-label">Experience</div>
                    </div>
                  </div>
                </div>

                <div className="separator"></div>

                {/* Contact Info */}
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <span className="contact-text">{translator.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <span className="contact-text">{translator.phone}</span>
                  </div>
                  <div className="contact-item">
                    <MapPin className="contact-icon" />
                    <span className="contact-text">{translator.location}</span>
                  </div>
                  <div className="contact-item">
                    <Globe className="contact-icon" />
                    <span className="contact-text">
                      {translator.languages.join(", ")}
                    </span>
                  </div>
                  <div className="contact-item">
                    <Briefcase className="contact-icon" />
                    <span className="contact-text">
                      {translator.experience} Experience
                    </span>
                  </div>
                </div>

                <div className="separator"></div>

                {/* Social Links */}
                <div className="social-section">
                  <h3 className="social-title">Connect</h3>
                  <div className="social-links">
                    <button className="social-btn social-linkedin">
                      <Linkedin className="social-icon" />
                    </button>
                    <button className="social-btn social-facebook">
                      <Facebook className="social-icon" />
                    </button>
                    <button className="social-btn social-instagram">
                      <Instagram className="social-icon" />
                    </button>
                    <button className="social-btn social-external">
                      <ExternalLink className="social-icon" />
                    </button>
                  </div>
                </div>

                <button className="hire-button">Hire This Translator</button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="main-sections">
            {/* About Section */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  About
                </h2>
                <p className="section-text">{translator.about}</p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  Skills & Expertise
                </h2>
                <div className="skills-grid">
                  {translator.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <Award className="section-icon" />
                  Certifications
                </h2>
                <ul className="list">
                  {translator.certifications.map((cert, index) => (
                    <li key={index} className="list-item">
                      <CheckCircle className="list-icon" />
                      <span className="list-text">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Experience */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <Briefcase className="section-icon" />
                  Professional Experience
                </h2>
                <ul className="list">
                  {translator.experienceDetails.map((exp, index) => (
                    <li key={index} className="list-item">
                      <div className="list-bullet"></div>
                      <span className="list-text">{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <GraduationCap className="section-icon" />
                  Education
                </h2>
                <ul className="list">
                  {translator.education.map((edu, index) => (
                    <li key={index} className="list-item">
                      <div className="list-bullet"></div>
                      <span className="list-text">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Publications */}
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">
                  <div className="title-accent"></div>
                  <BookOpen className="section-icon" />
                  Publications & Projects
                </h2>
                <ul className="list">
                  {translator.publications.map((pub, index) => (
                    <li key={index} className="list-item">
                      <div className="list-bullet"></div>
                      <span className="list-text">{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Superpower & Looking For */}
            <div className="two-column-grid">
              <div className="section-card">
                <div className="section-content">
                  <h2 className="section-title">
                    <Zap className="section-icon superpower-icon" />
                    Superpower
                  </h2>
                  <p className="section-text">{translator.superpower}</p>
                </div>
              </div>

              <div className="section-card">
                <div className="section-content">
                  <h2 className="section-title">
                    <Search className="section-icon looking-icon" />
                    Looking For
                  </h2>
                  <p className="section-text">{translator.lookingFor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorProfile;
