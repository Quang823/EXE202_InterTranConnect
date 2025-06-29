import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobTranslator.scss";
import TranslatorLayout from "../../../routes/TranslatorRoute/TranslatorLayout";
import SearchSidebar from "./SearchSidebar/SearchSidebar";
import useScrollToTop from "../../../hooks/useScrollToTop.jsx";
import { TagIcon, LanguagesIcon, ClockIcon } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const JobTranslator = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [salaryRange, setSalaryRange] = useState([0, 9999]);
  const [jobListings, setJobListings] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    location: "",
    categories: [],
    sourceLanguages: [],
    targetLanguages: [],
    minSalary: 0,
    maxSalary: 9999,
  });
  const navigate = useNavigate();

  // Add scroll to top when page changes
  useScrollToTop(currentPage);

  // Pagination settings
  const itemsPerPage = 6;

  // Function to generate random RGB color
  const getRandomRGBColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Function to generate random gradient
  const getRandomGradient = () => {
    const color1 = getRandomRGBColor();
    const color2 = getRandomRGBColor();
    const color3 = getRandomRGBColor();
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
  };

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          pageSize: itemsPerPage,
          ...(searchParams.jobTitle && { jobTitle: searchParams.jobTitle }),
          ...(searchParams.location && { location: searchParams.location }),
          ...(searchParams.categories.length > 0 && {
            categories: searchParams.categories.join(","),
          }),
          ...(searchParams.sourceLanguages.length > 0 && {
            sourceLanguages: searchParams.sourceLanguages.join(","),
          }),
          ...(searchParams.targetLanguages.length > 0 && {
            targetLanguages: searchParams.targetLanguages.join(","),
          }),
          ...(searchParams.minSalary > 0 && {
            minSalary: searchParams.minSalary,
          }),
          ...(searchParams.maxSalary < 9999 && {
            maxSalary: searchParams.maxSalary,
          }),
        });

        const response = await axios.get(
          `${API_URL}/api/job?${queryParams.toString()}`
        );
        const { items, totalItems, totalPages } = response.data;

        // Map API data to the component's expected structure
        const mappedJobs = items.map((job) => ({
          id: job.id,
          title: job.jobTitle,
          customer: job.companyName,
          category: job.translationType,
          languagePair: `${job.sourceLanguage} - ${job.targetLanguage}`,
          hours: new Date(job.createdAt).toLocaleString(),
          salary: `$${job.totalFee}`,
        }));

        setJobListings(mappedJobs);
        setTotalItems(totalItems);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [currentPage, searchParams]);

  // Calculate pagination details
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleJobDetails = (jobId) => {
    navigate(`/translator/jobDetails/${jobId}`);
  };

  const toggleSelection = (array, item) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item);
    } else {
      return [...array, item];
    }
  };

  const handleCategoryChange = (category) => {
    const newCategories = toggleSelection(selectedCategory, category);
    setSelectedCategory(newCategories);
    setSearchParams((prev) => ({
      ...prev,
      categories: newCategories,
    }));
  };

  const handleExpertiseChange = (expertise) => {
    setSelectedExpertise(toggleSelection(selectedExpertise, expertise));
  };

  const handleSearchChange = (field, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <TranslatorLayout
      showSidebar={true}
      sidebarContent={
        <div className="ss-wrapper">
          <SearchSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedExpertise={selectedExpertise}
            setSelectedExpertise={setSelectedExpertise}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            handleCategoryChange={handleCategoryChange}
            handleExpertiseChange={handleExpertiseChange}
            searchParams={searchParams}
            handleSearchChange={handleSearchChange}
          />
        </div>
      }
      showHeader={false}
      showFooter={false}
    >
      <div className="results-container">
        <div className="results-header">
          <p>
            Showing {startIndex}-{endIndex} of {totalItems} results
          </p>
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
              <div className="job-header-trans">
                <div className="job-logo">
                  <div
                    className="logo-circle"
                    style={{ background: getRandomGradient() }}
                  >
                    <span style={{ color: "#fff", fontWeight: "bold" }}>
                      ITC
                    </span>
                  </div>
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
                  <span>{job.salary}</span>
                </div>
                <div className="job-action-button">
                  <div className="job-action">
                    <button
                      className="details-btn"
                      onClick={() => handleJobDetails(job.id)}
                    >
                      Job Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </TranslatorLayout>
  );
};

export default JobTranslator;
