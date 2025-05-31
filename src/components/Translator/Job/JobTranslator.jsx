
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./JobTranslator.scss";
// import TranslatorLayout from "../../../routes/TranslatorRoute/TranslatorLayout";
// import SearchSidebar from "./SearchSidebar/SearchSidebar";
// import {
//   BookmarkIcon,
//   TagIcon,
//   LanguagesIcon,
//   ClockIcon,
//   DollarSignIcon,
//   MapPinIcon,
// } from "lucide-react";

// const API_URL = import.meta.env.VITE_API_URL;
// const JobTranslator = () => {
//   const [selectedCategory, setSelectedCategory] = useState(["Interpretation"]);
//   const [selectedExpertise, setSelectedExpertise] = useState([
//     "Media & Broadcast",
//   ]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [salaryRange, setSalaryRange] = useState([0, 9999]);
//   const navigate = useNavigate();

//   // Pagination settings
//   const itemsPerPage = 6;
//   const jobListings = [
//     {
//       id: 1,
//       title: "Marketing Translation",
//       customer: "Name Customer",
//       category: "Technology",
//       languagePair: "VIE - ENG",
//       hours: "1 Hours",
//       salary: "$40000",
//       location: "Location",
//       timePosted: "10 min ago",
//     },
//     {
//       id: 2,
//       title: "Marketing Translation",
//       customer: "Name Customer",
//       category: "Commerce",
//       languagePair: "VIE - ENG",
//       hours: "1 Hours",
//       salary: "$28000",
//       location: "Location",
//       timePosted: "12 min ago",
//     },
//     {
//       id: 3,
//       title: "Marketing Translation",
//       customer: "Name Customer",
//       category: "Game",
//       languagePair: "VIE - ENG",
//       hours: "1 Hours",
//       salary: "$48000",
//       location: "Location",
//       timePosted: "15 min ago",
//     },
//     {
//       id: 4,
//       title: "Marketing Translation",
//       customer: "Name Customer",
//       category: "Commerce",
//       languagePair: "VIE - ENG",
//       hours: "1 Hours",
//       salary: "$42000",
//       location: "Location",
//       timePosted: "24 min ago",
//     },
//     {
//       id: 5,
//       title: "Marketing Translation",
//       customer: "Name Customer",
//       category: "Commerce",
//       languagePair: "VIE - ENG",
//       hours: "1 Hours",
//       salary: "$38000",
//       location: "Location",
//       timePosted: "26 min ago",
//     },
//     {
//       id: 6,
//       title: "Marketing Translation",
//       customer: "Name Customer",
//       category: "Commerce",
//       languagePair: "VIE - ENG",
//       hours: "1 Hours",
//       salary: "$38000",
//       location: "Location",
//       timePosted: "26 min ago",
//     },
//     {
//       id: 7,
//       title: "Marketing Translation",
//       customer: "Name Customer",
//       category: "Commerce",
//       languagePair: "VIE - ENG",
//       hours: "1 Hours",
//       salary: "$38000",
//       location: "Location",
//       timePosted: "26 min ago",
//     },
//   ];

//   // Calculate pagination details
//   const totalItems = jobListings.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentJobs = jobListings.slice(startIndex, endIndex);

//   const handleJobDetails = () => {
//     navigate("/translator/jobDetails");
//   };

//   const toggleSelection = (array, item) => {
//     if (array.includes(item)) {
//       return array.filter((i) => i !== item);
//     } else {
//       return [...array, item];
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(toggleSelection(selectedCategory, category));
//   };

//   const handleExpertiseChange = (expertise) => {
//     setSelectedExpertise(toggleSelection(selectedExpertise, expertise));
//   };

//   // Generate page numbers for pagination
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <TranslatorLayout
//       showSidebar={true}
//       sidebarContent={
//         <SearchSidebar
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//           selectedExpertise={selectedExpertise}
//           setSelectedExpertise={setSelectedExpertise}
//           salaryRange={salaryRange}
//           setSalaryRange={setSalaryRange}
//           handleCategoryChange={handleCategoryChange}
//           handleExpertiseChange={handleExpertiseChange}
//         />
//       }
//       showHeader={false}
//       showFooter={false}
//     >
//       <div className="results-container">
//         <div className="results-header">
//           <p>
//             Showing {startIndex + 1}-
//             {Math.min(endIndex, totalItems)} of {totalItems} results
//           </p>
//           <div className="sort-dropdown">
//             <select>
//               <option>Sort by latest</option>
//               <option>Sort by salary: high to low</option>
//               <option>Sort by salary: low to high</option>
//             </select>
//           </div>
//         </div>

//         <div className="job-listings">
//           {currentJobs.map((job) => (
//             <div className="job-card" key={job.id}>
//               <div className="job-time-badge">
//                 <span>{job.timePosted}</span>
//                 <button className="bookmark-btn">
//                   <BookmarkIcon size={18} className="bookmark-icon" />
//                 </button>
//               </div>

//               <div className="job-header-trans">
//                 <div className="job-logo">
//                   <div className={`logo-circle category-${job.id}`}></div>
//                 </div>
//                 <div className="job-title-info">
//                   <h3>{job.title}</h3>
//                   <p>{job.customer}</p>
//                 </div>
//               </div>

//               <div className="job-details-trans">
//                 <div className="detail-item">
//                   <TagIcon className="detail-icon category-icon" size={16} />
//                   <span>{job.category}</span>
//                 </div>
//                 <div className="detail-item">
//                   <LanguagesIcon className="detail-icon lang-icon" size={16} />
//                   <span>{job.languagePair}</span>
//                 </div>
//                 <div className="detail-item">
//                   <ClockIcon className="detail-icon time-icon" size={16} />
//                   <span>{job.hours}</span>
//                 </div>
//                 <div className="detail-item">
//                   <DollarSignIcon
//                     className="detail-icon salary-icon"
//                     size={16}
//                   />
//                   <span>{job.salary}</span>
//                 </div>
//                 <div className="detail-item">
//                   <MapPinIcon className="detail-icon location-icon" size={16} />
//                   <span>{job.location}</span>
//                 </div>
//                 <div className="job-action-button">
//                   <div className="job-action">
//                     <button className="details-btn" onClick={handleJobDetails}>
//                       Job Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="pagination">
//           {pageNumbers.map((page) => (
//             <button
//               key={page}
//               className={`page-btn ${currentPage === page ? "active" : ""}`}
//               onClick={() => setCurrentPage(page)}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       </div>
//     </TranslatorLayout>
//   );
// };

// export default JobTranslator;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobTranslator.scss";
import TranslatorLayout from "../../../routes/TranslatorRoute/TranslatorLayout";
import SearchSidebar from "./SearchSidebar/SearchSidebar";
import {
  TagIcon,
  LanguagesIcon,
  ClockIcon,
  DollarSignIcon,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const JobTranslator = () => {
  const [selectedCategory, setSelectedCategory] = useState(["Interpretation"]);
  const [selectedExpertise, setSelectedExpertise] = useState(["Media & Broadcast"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [salaryRange, setSalaryRange] = useState([0, 9999]);
  const [jobListings, setJobListings] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Pagination settings
  const itemsPerPage = 6;

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/job?page=${currentPage}&pageSize=${itemsPerPage}`);
        const { items, totalItems, totalPages } = response.data;

        // Map API data to the component's expected structure
        const mappedJobs = items.map((job) => ({
          id: job.id,
          title: job.jobTitle,
          customer: job.companyName,
          category: job.translationType,
          languagePair: `${job.sourceLanguage} - ${job.targetLanguage}`,
          hours: new Date(job.createdAt).toLocaleString(), // Format createdAt as needed
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
  }, [currentPage]);

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
    setSelectedCategory(toggleSelection(selectedCategory, category));
  };

  const handleExpertiseChange = (expertise) => {
    setSelectedExpertise(toggleSelection(selectedExpertise, expertise));
  };

  return (
    <TranslatorLayout
      showSidebar={true}
      sidebarContent={
        <SearchSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedExpertise={selectedExpertise}
          setSelectedExpertise={setSelectedExpertise}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          handleCategoryChange={handleCategoryChange}
          handleExpertiseChange={handleExpertiseChange}
        />
      }
      showHeader={false}
      showFooter={false}
    >
      <div className="results-container">
        <div className="results-header">
          <p>
            Showing {startIndex}-
            {endIndex} of {totalItems} results
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
                  <DollarSignIcon className="detail-icon salary-icon" size={16} />
                  <span>{job.salary}</span>
                </div>
                <div className="job-action-button">
                  <div className="job-action">
                    <button className="details-btn" onClick={() => handleJobDetails(job.id)}>
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