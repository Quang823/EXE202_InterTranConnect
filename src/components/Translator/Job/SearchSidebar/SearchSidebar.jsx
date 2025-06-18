import React, { useState, useEffect } from "react";
import { SearchIcon, MapPinIcon, ChevronDownIcon } from "lucide-react";
import axios from "axios";

const SearchSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedExpertise,
  setSelectedExpertise,
  salaryRange,
  setSalaryRange,
  handleCategoryChange,
  handleExpertiseChange,
  searchParams,
  handleSearchChange,
}) => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const countryList = response.data
          .map((country) => country.name.common)
          .sort(); // Sắp xếp theo thứ tự bảng chữ cái
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Could not load countries. Please try again later.");
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (e, field) => {
    handleSearchChange(field, e.target.value);
  };

  const handleLanguageChange = (language, type) => {
    const currentLanguages = searchParams[type];
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter((lang) => lang !== language)
      : [...currentLanguages, language];
    handleSearchChange(type, newLanguages);
  };

  const handleSalaryChange = (value) => {
    const newRange = [salaryRange[0], parseInt(value)];
    setSalaryRange(newRange);
    handleSearchChange("minSalary", newRange[0]);
    handleSearchChange("maxSalary", newRange[1]);
  };

  return (
    <div className="search-sidebar">
      <h2>Search by Job Title</h2>
      <div className="search-input">
        <input
          type="text"
          placeholder="Job title"
          value={searchParams.jobTitle}
          onChange={(e) => handleInputChange(e, "jobTitle")}
        />
        <SearchIcon className="search-icon" size={20} />
      </div>

      <div className="filter-section">
        <h3>Location</h3>
        <div className="search-input1">
          <select
            value={searchParams.location}
            onChange={(e) => handleInputChange(e, "location")}
            className="location-select"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {error && <p className="error-message">{error}</p>}
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
        <h3>Source Language</h3>
        <div className="checkbox-group">
          {[
            "English",
            "Japanese",
            "Chinese",
            "Korean",
            "French",
            "German",
            "Spanish",
          ].map((lang) => (
            <label key={`source-${lang}`}>
              <input
                type="checkbox"
                checked={searchParams.sourceLanguages.includes(lang)}
                onChange={() => handleLanguageChange(lang, "sourceLanguages")}
              />
              {lang}
            </label>
          ))}
        </div>
        <button className="show-more-btn">Show More</button>
      </div>

      <div className="filter-section">
        <h3>Target Language</h3>
        <div className="checkbox-group">
          {[
            "English",
            "Japanese",
            "Chinese",
            "Korean",
            "French",
            "German",
            "Spanish",
          ].map((lang) => (
            <label key={`target-${lang}`}>
              <input
                type="checkbox"
                checked={searchParams.targetLanguages.includes(lang)}
                onChange={() => handleLanguageChange(lang, "targetLanguages")}
              />
              {lang}
            </label>
          ))}
        </div>
        <button className="show-more-btn">Show More</button>
      </div>

      <div className="filter-section">
        <h3>Salary Range</h3>
        <div className="salary-slider">
          <input
            type="range"
            min="0"
            max="100000"
            value={salaryRange[1]}
            onChange={(e) => handleSalaryChange(e.target.value)}
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
