import React, { useEffect } from "react";
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
  FaEllipsisV,
  FaSeedling,
  FaGavel,
  FaShoppingBag,
  FaGraduationCap,
  FaMoneyBillWave,
  FaGamepad,
  FaBriefcaseMedical,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

import "./Content.scss";

const Content = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
    });
  }, []);

  const jobs = [
    {
      time: "10 min ago",
      title: "Marketing Translation",
      customer: "Name Customer",
      field: "Technology",
      language: "VIE - ENG",
      duration: "1 Hours",
      price: "$4000-$4200",
    },
    {
      time: "12 min ago",
      title: "Marketing Translation",
      customer: "Name Customer",
      field: "Media",
      language: "VIE - ENG",
      duration: "1 Hours",
      price: "$2800-$3200",
    },
    {
      time: "15 min ago",
      title: "Marketing Translation",
      customer: "Name Customer",
      field: "Game",
      language: "VIE - ENG",
      duration: "1 Hours",
      price: "$4800-$5000",
    },
    {
      time: "24 min ago",
      title: "Marketing Translation",
      customer: "Name Customer",
      field: "Commerce",
      language: "VIE - ENG",
      duration: "1 Hours",
      price: "$4200-$4800",
    },
    {
      time: "26 min ago",
      title: "Marketing Translation",
      customer: "Name Customer",
      field: "Commerce",
      language: "VIE - ENG",
      duration: "1 Hours",
      price: "$3800-$4000",
    },
  ];

  const categories = [
    {
      icon: <FaSeedling className="category-icon" />,
      name: "General",
      jobs: 1254,
    },
    {
      icon: <FaGavel className="category-icon" />,
      name: "Legal",
      jobs: 816,
    },
    {
      icon: <FaShoppingBag className="category-icon" />,
      name: "Commerce",
      jobs: 2082,
    },
    {
      icon: <FaBullhorn className="category-icon" />,
      name: "Marketing & Advertising",
      jobs: 1520,
    },
    {
      icon: <FaBriefcaseMedical className="category-icon" />,
      name: "Medical",
      jobs: 1022,
    },
    {
      icon: <FaGraduationCap className="category-icon" />,
      name: "Education",
      jobs: 1496,
    },
    {
      icon: <FaMoneyBillWave className="category-icon" />,
      name: "Financial & Economic",
      jobs: 1529,
    },
    {
      icon: <FaGamepad className="category-icon" />,
      name: "Game",
      jobs: 1244,
    },
  ];

  const articles = [
    {
      type: "News",
      date: "30 March 2024",
      title: "We Are Seeking A Skilled And Detail-Oriented Translator...",
      image: "/api/placeholder/600/350",
      link: "#",
    },
    {
      type: "Blog",
      date: "30 March 2024",
      title:
        "Translation Vs. Interpretation: Key Differences And Career Insights",
      image: "/api/placeholder/600/350",
      link: "#",
    },
  ];

  return (
    <div className="content-container">
      <div className="job-list">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="job-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="job-header">
              <span className="job-time">{job.time}</span>
              <span className="job-action">
                <FaEllipsisV />
              </span>
            </div>
            <div className="job-body">
              <div className="job-title-section">
                <FaBullhorn className="job-icon" />
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-customer">{job.customer}</div>
                </div>
              </div>
              <div className="job-details">
                <span className="job-field">
                  <FaBriefcase className="detail-icon" />
                  {job.field}
                </span>
                <span className="job-language">
                  <FaLanguage className="detail-icon" />
                  {job.language}
                </span>
                <span className="job-duration">
                  <FaClock className="detail-icon" />
                  {job.duration}
                </span>
                <span className="job-price">
                  <FaDollarSign className="detail-icon" />
                  {job.price}
                </span>
                <span className="job-location">
                  <FaMapMarkerAlt className="detail-icon" />
                  Location
                </span>
                <button className="job-button">Job Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-container" data-aos="fade-up">
        <Parallax
          bgImage="/api/placeholder/800/600"
          strength={300}
          className="hero-parallax"
        >
          <div className="hero-section">
            <div className="hero-content">
              <h1
                className="hero-title"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Good Life Begins With
                <br />A Good Company
              </h1>

              <p
                className="hero-description"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                "Good Life Begins With A Good Job" suggests that having a
                fulfilling and well-suited job is the foundation for a happy and
                successful life. A job that aligns with one's skills, passions,
                and financial needs can contribute to overall well-being,
                stability, and personal growth.
              </p>

              <div
                className="hero-buttons"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <button className="btn-primary">Search Job</button>
                <button className="btn-secondary">See more</button>
              </div>
            </div>
          </div>
        </Parallax>

        <div className="stats-section">
          <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="stat-number">12k+</div>
            <div className="stat-title">Clients worldwide</div>
            <div className="stat-description">
              <FaCheck className="stat-icon" />
              <p>
                Clients Worldwide refers to businesses, organizations, or
                individuals from different countries and regions who seek
                services globally.
              </p>
            </div>
          </div>

          <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="stat-number">20k+</div>
            <div className="stat-title">Active resume</div>
            <div className="stat-description">
              <FaCheck className="stat-icon" />
              <p>
                An Active Resume is a dynamic and engaging version of a
                traditional resume that highlights your skills, achievements,
                and experiences.
              </p>
            </div>
          </div>

          <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="stat-number">18k+</div>
            <div className="stat-title">Companies</div>
            <div className="stat-description">
              <FaCheck className="stat-icon" />
              <p>
                Global Career Opportunities – Work with international clients,
                companies, and organizations in various industries such as
                technology.
              </p>
            </div>
          </div>
        </div>
      </div>

  
      <div className="expertise-section" data-aos="zoom-in-up">
        <h2
          className="section-title"
          data-aos="zoom-in-up"
          data-aos-delay="100"
        >
          Browse by Expertise
        </h2>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="icon-container">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <div className="job-count">{category.jobs} jobs</div>
            </div>
          ))}
        </div>
      </div>

 
      <div className="news-blog-section" data-aos="fade-up">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            News and Blog
          </h2>
          <p
            href="#"
            className="view-all"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            View All
          </p>
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
                <img src={article.image} alt={article.title} />
              </div>
              <div className="article-date">{article.date}</div>
              <h3 className="article-title">{article.title}</h3>
              <a href={article.link} className="read-more">
                Read more <FaArrowRight className="arrow-icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
