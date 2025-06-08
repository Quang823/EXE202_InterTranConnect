import React, { useState } from "react";
import "./SearchSection.scss";
import { MdSearch, MdFilterList } from "react-icons/md";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <section className="search-sections">
      {/* Background Elements */}
      <div className="search-sections__bg">
        <div className="search-sections__bg-circle search-sections__bg-circle--1"></div>
        <div className="search-sections__bg-circle search-sections__bg-circle--2"></div>
      </div>

      <div className="search-sections__container">
        <form className="search-section-search-form" onSubmit={handleSearch}>
          <div className="search-section-search-container">
            <input
              type="text"
              placeholder="Search translators, jobs, or languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-section-search-input"
            />
            <MdSearch className="search-section-search-icon" />
          </div>
          <button type="button" className="search-section-filter-btn">
            <MdFilterList className="search-section-filter-icon" />
            <span className="search-section-filter-text">Filters</span>
          </button>
          <a href="#" className="search-section-advanced-search">
            Advanced Search
          </a>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
