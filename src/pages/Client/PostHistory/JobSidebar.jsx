import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, MapPinIcon, ChevronDownIcon } from "lucide-react";
import "./JobSidebar.scss";

const JobSidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSourceLanguages, setSelectedSourceLanguages] = useState([]);
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState([]);
  const [selectedDatePosted, setSelectedDatePosted] = useState([]);
  const navigate = useNavigate();
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSourceLanguageChange = (lang) => {
    setSelectedSourceLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleTargetLanguageChange = (lang) => {
    setSelectedTargetLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleDatePostedChange = (date) => {
    setSelectedDatePosted((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const handleSalaryApply = () => {
    console.log(
      `Applying salary range: $${salaryRange[0]} - $${salaryRange[1]}`
    );
  };

  const handleCreatePost = () => {
    navigate("/client/create_post");
  };
  return (
    <div className="jobSidebar-container">
      <div className="jobSidebar-header">
        <button className="jobSidebar-back">Back</button>
        <button className="jobSidebar-create" onClick={handleCreatePost}>
          Create New Post
        </button>
      </div>
      <div className="jobSidebar-content">
        <div className="jobSidebar-section">
          <h3>Search by Job Title</h3>
          <div className="jobSidebar-search-input">
            <input type="text" placeholder="Job title" />
            <SearchIcon className="jobSidebar-search-icon" size={20} />
          </div>
        </div>

        <div className="jobSidebar-section">
          <h3>Location</h3>
          <div className="jobSidebar-location-select">
            <MapPinIcon className="jobSidebar-location-icon" size={18} />
            <span>Choose Location</span>
            <ChevronDownIcon className="jobSidebar-dropdown-icon" size={18} />
          </div>
        </div>

        <div className="jobSidebar-section">
          <h3>Category</h3>
          <div className="jobSidebar-checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes("Translation")}
                onChange={() => handleCategoryChange("Translation")}
              />
              Translation
              <span className="jobSidebar-count">10</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes("Interpretation")}
                onChange={() => handleCategoryChange("Interpretation")}
              />
              Interpretation
              <span className="jobSidebar-count">10</span>
            </label>
          </div>
          <button
            className="jobSidebar-showMore"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>

        {showMore && (
          <>
            <div className="jobSidebar-section">
              <h3>Source Language</h3>
              <div className="jobSidebar-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSourceLanguages.includes("Japanese")}
                    onChange={() => handleSourceLanguageChange("Japanese")}
                  />
                  Japanese
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSourceLanguages.includes("English")}
                    onChange={() => handleSourceLanguageChange("English")}
                  />
                  English
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSourceLanguages.includes("Chinese")}
                    onChange={() => handleSourceLanguageChange("Chinese")}
                  />
                  Chinese
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSourceLanguages.includes("Korean")}
                    onChange={() => handleSourceLanguageChange("Korean")}
                  />
                  Korean
                  <span className="jobSidebar-count">10</span>
                </label>
              </div>
            </div>

            <div className="jobSidebar-section">
              <h3>Target Language</h3>
              <div className="jobSidebar-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTargetLanguages.includes("Japanese")}
                    onChange={() => handleTargetLanguageChange("Japanese")}
                  />
                  Japanese
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTargetLanguages.includes("English")}
                    onChange={() => handleTargetLanguageChange("English")}
                  />
                  English
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTargetLanguages.includes("Chinese")}
                    onChange={() => handleTargetLanguageChange("Chinese")}
                  />
                  Chinese
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTargetLanguages.includes("Korean")}
                    onChange={() => handleTargetLanguageChange("Korean")}
                  />
                  Korean
                  <span className="jobSidebar-count">10</span>
                </label>
              </div>
            </div>

            <div className="jobSidebar-section">
              <h3>Date Posted</h3>
              <div className="jobSidebar-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDatePosted.includes("All")}
                    onChange={() => handleDatePostedChange("All")}
                  />
                  All
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDatePosted.includes("Last Hour")}
                    onChange={() => handleDatePostedChange("Last Hour")}
                  />
                  Last Hour
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDatePosted.includes("Last 24 Hours")}
                    onChange={() => handleDatePostedChange("Last 24 Hours")}
                  />
                  Last 24 Hours
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDatePosted.includes("Last 7 Days")}
                    onChange={() => handleDatePostedChange("Last 7 Days")}
                  />
                  Last 7 Days
                  <span className="jobSidebar-count">10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDatePosted.includes("Last 30 Days")}
                    onChange={() => handleDatePostedChange("Last 30 Days")}
                  />
                  Last 30 Days
                  <span className="jobSidebar-count">10</span>
                </label>
              </div>
            </div>

            <div className="jobSidebar-section">
              <h3>Salary</h3>
              <div className="jobSidebar-salary-slider">
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
              <div className="jobSidebar-salary-range">
                <span>
                  Salary: ${salaryRange[0]} - ${salaryRange[1]}
                </span>
                <button
                  className="jobSidebar-apply-btn"
                  onClick={handleSalaryApply}
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobSidebar;
