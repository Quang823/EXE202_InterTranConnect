import React from "react";
import { SearchIcon, MapPinIcon, ChevronDownIcon } from "lucide-react";

const SearchSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedExpertise,
  setSelectedExpertise,
  salaryRange,
  setSalaryRange,
  handleCategoryChange,
  handleExpertiseChange,
}) => {
  return (
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
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
