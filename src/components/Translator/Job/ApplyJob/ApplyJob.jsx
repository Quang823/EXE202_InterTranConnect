import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import './ApplyJob.scss';

// Company logos (simplified placeholders)
const LogoComponents = {
  up: () => <div className="company-logo up">UP</div>,
  dribbble: () => <div className="company-logo dribbble">DB</div>,
  apple: () => <div className="company-logo apple">AP</div>,
  microsoft: () => <div className="company-logo microsoft">MS</div>,
  twitter: () => <div className="company-logo twitter">TW</div>,
  facebook: () => <div className="company-logo facebook">FB</div>,
  slack: () => <div className="company-logo slack">SL</div>,
  reddit: () => <div className="company-logo reddit">RD</div>
};

const ApplyJob = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const jobs = [
    { company: 'up', title: 'Marketing Translation', location: '$50k', date: 'Feb 2, 2019 19:28', status: 'Active', highlighted: false },
    { company: 'dribbble', title: 'Marketing Translation', location: '$50k', date: 'Dec 7, 2019 23:26', status: 'Active', highlighted: false },
    { company: 'apple', title: 'Marketing Translation', location: '$50k', date: 'Feb 2, 2019 19:28', status: 'Active', highlighted: false },
    { company: 'microsoft', title: 'Marketing Translation', location: '$50k', date: 'Dec 7, 2019 23:26', status: 'Active', highlighted: true },
    { company: 'twitter', title: 'Marketing Translation', location: '$50k', date: 'Dec 4, 2019 21:42', status: 'Active', highlighted: false },
    { company: 'facebook', title: 'Marketing Translation', location: '$50k', date: 'Dec 30, 2019 07:52', status: 'Active', highlighted: false },
    { company: 'slack', title: 'Marketing Translation', location: '$50k', date: 'Dec 30, 2019 05:18', status: 'Active', highlighted: false },
    { company: 'reddit', title: 'Marketing Translation', location: '$50k', date: 'Mar 20, 2019 23:14', status: 'Active', highlighted: false }
  ];

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Add your file handling logic here
    }
  };

  return (
    <div className="job-tracking-container">
      <div className="table-container">
        <table className="job-table">
          <thead className="table-header">
            <tr>
              <th className="header-cell">JOBS</th>
              <th className="header-cell">DATE APPLIED</th>
              <th className="header-cell">STATUS</th>
              <th className="header-cell">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => {
              const LogoComponent = LogoComponents[job.company] || LogoComponents.up;
              return (
                <tr key={index} className={`table-row ${job.highlighted ? 'highlighted' : 'row-hover'}`}>
                  <td className="table-cell">
                    <div className="job-info">
                      <div className="logo-container">
                        <LogoComponent />
                      </div>
                      <div>
                        <div className="job-title">{job.title}</div>
                        <div className="job-location">{job.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell date-cell">{job.date}</td>
                  <td className="table-cell">
                    <span className="status">{job.status}</span>
                  </td>
                  <td className="table-cell">
                    <div className="action-buttons">
                      <button className="view-button">
                        <Eye size={20} />
                      </button>
                      <label className="import-button">
                        <input
                          type="file"
                          className="file-input"
                          onChange={handleFileUpload}
                        />
                        <span className="import-label">
                          <svg className="plus-icon" viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" />
                          </svg>
                          Import File
                        </span>
                      </label>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="nav-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page.toString().padStart(2, '0')}
          </button>
        ))}
        <button
          className="nav-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ApplyJob;