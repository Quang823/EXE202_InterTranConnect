import React, { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBullhorn,
  FaBriefcase,
  FaLanguage,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaEllipsisH,
  FaSeedling,
  FaGavel,
  FaShoppingBag,
  FaGraduationCap,
  FaMoneyBillWave,
  FaGamepad,
  FaBriefcaseMedical,
  FaCheck,
  FaArrowRight,
  FaBookmark,
  FaRegBookmark,
  FaFilter,
  FaStar,
  FaRegStar,
  FaChevronRight,
  FaUsers,
  FaGlobe,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../../apiHandler/jobAPIHandler";

import "./content.scss";

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const Content = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        if (data && Array.isArray(data.items)) {
          const formattedJobs = data.items.map((job) => ({
            title: job.jobTitle,
            customer: job.companyName,
            language: `${job.sourceLanguage} - ${job.targetLanguage}`,
            price: `$${job.totalFee}`,
            field: job.translationType,
            createdAt: job.createdAt,
            id: job.id,
          }));
          setJobs(formattedJobs);
        } else {
          console.error("Fetched data is not in the expected format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const categories = [
    {
      icon: <FaSeedling className="category-icon" />,
      name: "General",
      jobs: 1254,
      color: "#10b981",
    },
    {
      icon: <FaGavel className="category-icon" />,
      name: "Legal",
      jobs: 816,
      color: "#6366f1",
    },
    {
      icon: <FaShoppingBag className="category-icon" />,
      name: "Commerce",
      jobs: 2082,
      color: "#f59e0b",
    },
    {
      icon: <FaBullhorn className="category-icon" />,
      name: "Marketing",
      jobs: 1520,
      color: "#ec4899",
    },
    {
      icon: <FaBriefcaseMedical className="category-icon" />,
      name: "Medical",
      jobs: 1022,
      color: "#ef4444",
    },
    {
      icon: <FaGraduationCap className="category-icon" />,
      name: "Education",
      jobs: 1496,
      color: "#8b5cf6",
    },
    {
      icon: <FaMoneyBillWave className="category-icon" />,
      name: "Financial",
      jobs: 1529,
      color: "#14b8a6",
    },
    {
      icon: <FaGamepad className="category-icon" />,
      name: "Game",
      jobs: 1244,
      color: "#f43f5e",
    },
  ];

  const articles = [
    {
      type: "News",
      date: "30 March 2024",
      title: "We Are Seeking A Skilled And Detail-Oriented Translator...",
      image: "/api/placeholder/600/350",
      link: "#",
      author: "John Smith",
      authorAvatar: "/api/placeholder/40/40",
      readTime: "5 min read",
    },
    {
      type: "Blog",
      date: "30 March 2024",
      title:
        "Translation Vs. Interpretation: Key Differences And Career Insights",
      image: "/api/placeholder/600/350",
      link: "#",
      author: "Sarah Johnson",
      authorAvatar: "/api/placeholder/40/40",
      readTime: "8 min read",
    },
  ];

  return (
    <div className="content-container">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade">
        <Parallax
          bgImage="/api/placeholder/1920/1080"
          strength={300}
          className="hero-parallax"
        >
          <div className="hero-content-wrapper">
            <div className="hero-content">
              <div
                className="hero-badge"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                <span>Translation Services</span>
              </div>
              <h1
                className="hero-title1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Good Life Begins With
                <br />
                <span>A Good Company</span>
              </h1>

              <p
                className="hero-description"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Having a fulfilling and well-suited job is the foundation for a
                happy and successful life. A job that aligns with your skills,
                passions, and financial needs contributes to overall well-being
                and growth.
              </p>

              <div
                className="search-container"
                data-aos="fade-up"
                data-aos-delay="400"
              >
              </div>
            </div>
            <div className="hero-image" data-aos="fade-left" data-aos-delay="500">
              <img src="https://cdn.maestra.ai/images/2025/01/13112749/Artboard-2025-01-13T142713.708-1.webp" alt="Translation Services" />
            </div>
          </div>
        </Parallax>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="stat-icon-container">
              <div className="stat-icon-bg"></div>
              <FaBriefcase className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-number">12k+</div>
              <div className="stat-title">Clients worldwide</div>
              <div className="stat-description">
                <FaCheck className="check-icon" />
                <p>
                  Businesses and individuals from different countries who seek
                  translation services globally.
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="stat-icon-container">
              <div className="stat-icon-bg"></div>
              <FaGraduationCap className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-number">20k+</div>
              <div className="stat-title">Active resume</div>
              <div className="stat-description">
                <FaCheck className="check-icon" />
                <p>
                  Dynamic profiles highlighting skills, achievements, and
                  experiences of professional translators.
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="stat-icon-container">
              <div className="stat-icon-bg"></div>
              <FaShoppingBag className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-number">18k+</div>
              <div className="stat-title">Companies</div>
              <div className="stat-description">
                <FaCheck className="check-icon" />
                <p>
                  Global career opportunities with international clients and
                  organizations across various industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="jobs-section">
        <div className="section-header">
          <div className="section-title-container" data-aos="fade-right">
            <h2 className="section-title">Recent Translation Jobs</h2>
          </div>
          <div className="section-actions" data-aos="fade-left">
            <button className="filter-btn">
              <FaFilter className="filter-icon" />
              Filter
            </button>
            <button className="view-all-btn">
              View All
              <FaChevronRight className="arrow-icon" />
            </button>
          </div>
        </div>

        <div className="job-list">
          {jobs.map((job, index) => (
            <div
              key={index}
              className={`job-card ${index % 3 === 0 ? "featured" : ""}`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              {index % 3 === 0 && <div className="featured-badge">Featured</div>}
              <div className="job-header">
                <div className="job-actions">
                  <FaRegBookmark className="bookmark-icon" />
                  <FaEllipsisH className="more-icon" />
                </div>
              </div>
              <div className="job-body">
                <div className="job-title-section">
                  <div className="job-icon-container">
                    <FaBullhorn className="job-icon" />
                  </div>
                  <div className="job-title-info">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-meta">
                      <p className="job-customer">{job.customer}</p>
                      <div className="job-rating">
                        <div className="stars">
                          <FaStar className="star filled" />
                          <FaStar className="star filled" />
                          <FaStar className="star filled" />
                          <FaStar className="star filled" />
                          <FaRegStar className="star" />
                        </div>
                        <span className="rating-text">4.5 (67)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="job-details">
                  <div className="job-detail">
                    <FaBriefcase className="detail-icon" />
                    <span>{job.field}</span>
                  </div>
                  <div className="job-detail">
                    <FaLanguage className="detail-icon" />
                    <span>{job.language}</span>
                  </div>
                  <div className="job-detail">
                    <FaDollarSign className="detail-icon" />
                    <span>{job.price}</span>
                  </div>
                  <div className="job-detail">
                    <FaClock className="detail-icon" />
                    <span>{formatDateTime(job.createdAt)}</span>
                  </div>
                </div>
                <button className="job-button" onClick={() => navigate(`/translator/jobDetails/${job.id}`)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="expertise-section" data-aos="fade-up">
        <div className="section-title-container" data-aos="fade-up">
          <h2 className="section-title">Browse by Expertise</h2>
        </div>

        <div className="category-tabs">
          <button
            className={`category-tab ${
              activeCategory === "All" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All Categories
          </button>
          {categories.slice(0, 4).map((category, index) => (
            <button
              key={index}
              className={`category-tab ${
                activeCategory === category.name ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
          <button className="category-tab more-tab">
            More
            <FaChevronRight className="more-icon" />
          </button>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
              style={{ "--category-color": category.color }}
            >
              <div className="icon-container">
                <div className="icon-bg"></div>
                {category.icon}
              </div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <div className="job-count">{category.jobs} jobs</div>
                <button className="category-button">
                  View Jobs
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News and Blog Section */}
      <section className="news-blog-section" data-aos="fade-up">
        <div className="section-header">
          <div className="section-title-container" data-aos="fade-right">
            <h2 className="section-title">News and Blog</h2>
          </div>
          <button
            className="view-all view-all-button"
            data-aos="fade-left"
            onClick={() => {
              /* Add your click handler here */
            }}
          >
            View All
            <FaChevronRight className="arrow-icon" />
          </button>
        </div>

        <div className="articles-container">
          {articles.map((article, index) => (
            <div
              key={index}
              className="article-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="article-image">
                <div className="article-type">{article.type}</div>
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                />
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <div className="article-date">{article.date}</div>
                  <div className="article-read-time">{article.readTime}</div>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <div className="article-author">
                  <img
                    src={article.authorAvatar || "/placeholder.svg"}
                    alt={article.author}
                    className="author-avatar"
                  />
                  <span className="author-name">{article.author}</span>
                </div>
                <a href={article.link} className="read-more">
                  Read more <FaArrowRight className="arrow-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-aos="fade-up">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Translation Career?</h2>
          <p className="cta-description">
            Join our platform today and connect with clients from around the
            world. Start earning money with your language skills.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
        <div className="cta-image">
          <img src="https://cdn.maestra.ai/images/2025/01/13112749/Artboard-2025-01-13T142713.708-1.webp" alt="Translation career" />
        </div>
      </section>
    </div>
  );
};

export default Content;
