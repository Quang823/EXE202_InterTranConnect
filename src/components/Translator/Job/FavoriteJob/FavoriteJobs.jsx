import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FavoriteJobs.scss';


const LogoComponents = {
  up: () => <div className="job-app-company-logo up">UP</div>,
  dribbble: () => <div className="job-app-company-logo dribbble">DB</div>,
  apple: () => <div className="job-app-company-logo apple">AP</div>,
  microsoft: () => <div className="job-app-company-logo microsoft">MS</div>,
  twitter: () => <div className="job-app-company-logo twitter">TW</div>,
  facebook: () => <div className="job-app-company-logo facebook">FB</div>,
  slack: () => <div className="job-app-company-logo slack">SL</div>,
  reddit: () => <div className="job-app-company-logo reddit">RD</div>
};

const FavoriteJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const jobs = [
    { company: 'up', title: 'Marketing Translation', location: '$50k-80k', date: 'Feb 2, 2019 19:28', status: 'Active', highlighted: false },
    { company: 'dribbble', title: 'Marketing Translation', location: '$50k-80k', date: 'Dec 7, 2019 23:26', status: 'Booked', highlighted: false },
    { company: 'apple', title: 'Marketing Translation', location: '$50k-80k', date: 'Feb 2, 2019 19:28', status: 'Active', highlighted: false },
    { company: 'microsoft', title: 'Marketing Translation', location: '$50k-80k', date: 'Dec 7, 2019 23:26', status: 'Booked', highlighted: true },
    { company: 'twitter', title: 'Marketing Translation', location: '$50k-80k', date: 'Dec 4, 2019 21:42', status: 'Active', highlighted: false },
    { company: 'facebook', title: 'Marketing Translation', location: '$50k-80k', date: 'Dec 30, 2019 07:52', status: 'Active', highlighted: false },
    { company: 'slack', title: 'Marketing Translation', location: '$50k-80k', date: 'Dec 30, 2019 05:18', status: 'Active', highlighted: false },
    { company: 'reddit', title: 'Marketing Translation', location: '$50k-80k', date: 'Mar 20, 2019 23:14', status: 'Active', highlighted: false }
  ];

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyNow = (job) => {
    console.log(`Applying for ${job.title} at ${job.company}`);
    // Add your apply logic here
  };

  return (
    <div className="job-app-container">
      <div className="job-app-table-container">
        <table className="job-app-table">
          <thead className="job-app-header">
            <tr>
              <th className="job-app-header-cell">JOBS</th>
              <th className="job-app-header-cell">DATE APPLIED</th>
              <th className="job-app-header-cell">STATUS</th>
              <th className="job-app-header-cell">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => {
              const LogoComponent = LogoComponents[job.company] || LogoComponents.up;
              return (
                <tr key={index} className={`job-app-row ${job.highlighted ? 'job-app-highlighted' : 'job-app-row-hover'}`}>
                  <td className="job-app-cell">
                    <div className="job-app-info">
                      <div className="job-app-logo-container">
                        <LogoComponent />
                      </div>
                      <div>
                        <div className="job-app-title-container">
                          <span className="job-app-title">{job.title}</span>
                          <span className="job-app-type">FULL TIME</span>
                        </div>
                        <div className="job-app-location">{job.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="job-app-cell job-app-date-cell">{job.date}</td>
                  <td className="job-app-cell">
                    <span className="job-app-status">{job.status}</span>
                  </td>
                  <td className="job-app-cell">
                    <div className="job-app-action-buttons">
                      <button 
                        className={`job-app-apply-button ${job.highlighted ? 'job-app-highlighted-button' : ''}`}
                        onClick={() => handleApplyNow(job)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="job-app-pagination">
        <button
          className="job-app-nav-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`job-app-page-button ${currentPage === page ? 'job-app-active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page.toString().padStart(2, '0')}
          </button>
        ))}
        <button
          className="job-app-nav-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FavoriteJobs;