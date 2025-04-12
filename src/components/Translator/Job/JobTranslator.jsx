import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobTranslator.scss";
import {
  BookmarkIcon,
  SearchIcon,
  MapPinIcon,
  ChevronDownIcon,
  TagIcon,
  LanguagesIcon,
  ClockIcon,
  DollarSignIcon,
} from "lucide-react";

const JobTranslator = () => {
  const [selectedCategory, setSelectedCategory] = useState(["Interpretation"]);
  const [selectedExpertise, setSelectedExpertise] = useState([
    "Media & Broadcast",
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [salaryRange, setSalaryRange] = useState([0, 9999]);
  const navigate = useNavigate();

  const handleJobDetails = () => {
    navigate("jobDetails");
  };

  const jobListings = [
    {
      id: 1,
      title: "Marketing Translation",
      customer: "Name Customer",
      category: "Technology",
      languagePair: "VIE - ENG",
      hours: "1 Hours",
      salary: "$40000",
      location: "Location",
      timePosted: "10 min ago",
    },
    {
      id: 2,
      title: "Marketing Translation",
      customer: "Name Customer",
      category: "Commerce",
      languagePair: "VIE - ENG",
      hours: "1 Hours",
      salary: "$28000",
      location: "Location",
      timePosted: "12 min ago",
    },
    {
      id: 3,
      title: "Marketing Translation",
      customer: "Name Customer",
      category: "Game",
      languagePair: "VIE - ENG",
      hours: "1 Hours",
      salary: "$48000",
      location: "Location",
      timePosted: "15 min ago",
    },
    {
      id: 4,
      title: "Marketing Translation",
      customer: "Name Customer",
      category: "Commerce",
      languagePair: "VIE - ENG",
      hours: "1 Hours",
      salary: "$42000",
      location: "Location",
      timePosted: "24 min ago",
    },
    {
      id: 5,
      title: "Marketing Translation",
      customer: "Name Customer",
      category: "Commerce",
      languagePair: "VIE - ENG",
      hours: "1 Hours",
      salary: "$38000",
      location: "Location",
      timePosted: "26 min ago",
    },
  ];

  const toggleSelection = (array, item) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item);
    } else {
      return [...array, item];
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(toggleSelection(selectedCategory, category));
  };

  const handleExpertiseChange = (expertise) => {
    setSelectedExpertise(toggleSelection(selectedExpertise, expertise));
  };

  return (
    <div className="job-search-container">
      <div className="search-sidebar">
        <h2>Search by Job Title</h2>
        <div className="search-input">
          <input type="text" placeholder="Job title" />
          <SearchIcon className="search-icon" size={20} />
        </div>

        <div className="filter-section">
          <h3>Location</h3>
          <div className="location-select">
            <MapPinIcon className="location-icon" size={18} />
            <span>Choose Location</span>
            <ChevronDownIcon className="dropdown-icon" size={18} />
          </div>
        </div>

        <div className="filter-section">
          <h3>Category</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={selectedCategory.includes("Translation")}
                onChange={() => handleCategoryChange("Translation")}
              />
              Translation
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedCategory.includes("Interpretation")}
                onChange={() => handleCategoryChange("Interpretation")}
              />
              Interpretation
            </label>
          </div>
          <button className="show-more-btn">Show More</button>
        </div>

        <div className="filter-section">
          <h3>Expertise</h3>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              Commerce
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              General
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Hotels & Tourism
              <span className="count">10</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedExpertise.includes("Media & Broadcast")}
                onChange={() => handleExpertiseChange("Media & Broadcast")}
              />
              Media & Broadcast
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Financial Services
              <span className="count">10</span>
            </label>
          </div>
          <button className="show-more-btn">Show More</button>
        </div>

        <div className="filter-section">
          <h3>Source Language</h3>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              Japanese
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              English
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Chinese
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Korean
              <span className="count">10</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h3>Target Language</h3>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              Japanese
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              English
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Chinese
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Korean
              <span className="count">10</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h3>Date Posted</h3>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              All
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Last Hour
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Last 24 Hours
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Last 7 Days
              <span className="count">10</span>
            </label>
            <label>
              <input type="checkbox" />
              Last 30 Days
              <span className="count">10</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h3>Salary</h3>
          <div className="salary-slider">
            <input
              type="range"
              min="0"
              max="100000"
              value={salaryRange[1]}
              onChange={(e) =>
                setSalaryRange([salaryRange[0], parseInt(e.target.value)])
              }
            />
          </div>
          <div className="salary-range">
            <span>
              Salary: ${salaryRange[0]} - ${salaryRange[1]}
            </span>
            <button className="apply-btn">Apply</button>
          </div>
        </div>
      </div>

      <div className="results-container">
        <div className="results-header">
          <p>Showing 6-6 of 10 results</p>
          <div className="sort-dropdown">
            <select>
              <option>Sort by latest</option>
              <option>Sort by salary: high to low</option>
              <option>Sort by salary: low to high</option>
            </select>
          </div>
        </div>

        <div className="job-listings">
          {jobListings.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-time-badge">
                <span>{job.timePosted}</span>
                <button className="bookmark-btn">
                  <BookmarkIcon size={18} className="bookmark-icon" />
                </button>
              </div>

              <div className="job-header-trans">
                <div className="job-logo">
                  <div className={`logo-circle category-${job.id}`}></div>
                </div>
                <div className="job-title-info">
                  <h3>{job.title}</h3>
                  <p>{job.customer}</p>
                </div>
              </div>

              <div className="job-details-trans">
                <div className="detail-item">
                  <TagIcon className="detail-icon category-icon" size={16} />
                  <span>{job.category}</span>
                </div>
                <div className="detail-item">
                  <LanguagesIcon className="detail-icon lang-icon" size={16} />
                  <span>{job.languagePair}</span>
                </div>
                <div className="detail-item">
                  <ClockIcon className="detail-icon time-icon" size={16} />
                  <span>{job.hours}</span>
                </div>
                <div className="detail-item">
                  <DollarSignIcon
                    className="detail-icon salary-icon"
                    size={16}
                  />
                  <span>{job.salary}</span>
                </div>
                <div className="detail-item">
                  <MapPinIcon className="detail-icon location-icon" size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="job-action-button">
                  <div className="job-action">
                    <button className="details-btn" onClick={handleJobDetails}>
                      Job Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            className={`page-btn ${currentPage === 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            className={`page-btn ${currentPage === 2 ? "active" : ""}`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobTranslator;
