
import React, { useState, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import './ApplyJob.scss';

const ApplyJob = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedApplications, setDisplayedApplications] = useState([]);
  const itemsPerPage = 8;
  

  const allApplications = useMemo(() => [
    { id: 1, company: 'Up', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Feb 2, 2019 19:28', status: 'Active', logo: '👆' },
    { id: 2, company: 'Dropbox', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Dec 7, 2019 23:26', status: 'Active', logo: '📦' },
    { id: 3, company: 'Apple', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Feb 2, 2019 19:28', status: 'Active', logo: '🍎' },
    { id: 4, company: 'Microsoft', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Dec 7, 2019 23:26', status: 'Active', logo: '🪟' },
    { id: 5, company: 'Twitter', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Dec 4, 2019 21:42', status: 'Active', logo: '🐦' },
    { id: 6, company: 'Facebook', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Dec 30, 2019 07:52', status: 'Active', logo: '👤' },
    { id: 7, company: 'Slack', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Dec 30, 2019 05:18', status: 'Active', logo: '💬' },
    { id: 8, company: 'Reddit', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Mar 20, 2019 23:14', status: 'Active', logo: '🔴' },
    { id: 9, company: 'Google', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Apr 15, 2019 14:25', status: 'Active', logo: '🔍' },
    { id: 10, company: 'LinkedIn', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'May 3, 2019 09:15', status: 'Active', logo: '🔗' },
    { id: 11, company: 'Netflix', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Jun 12, 2019 16:45', status: 'Active', logo: '🎬' },
    { id: 12, company: 'Amazon', position: 'Marketing Translation', location: 'Location', salary: '$50k', date: 'Jul 22, 2019 11:30', status: 'Active', logo: '📦' },
  ], []);


  const pageCount = useMemo(() => 
    Math.ceil(allApplications.length / itemsPerPage), 
    [allApplications, itemsPerPage]
  );


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };


  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    setDisplayedApplications(allApplications.slice(offset, offset + itemsPerPage));
  }, [currentPage, itemsPerPage, allApplications]);

  const renderLogoForCompany = (company, logo) => {
    const logoColors = {
      'Up': 'bg-green-500',
      'Dropbox': 'bg-pink-500',
      'Apple': 'bg-gray-900',
      'Microsoft': 'bg-blue-500 border border-blue-200',
      'Twitter': 'bg-blue-400',
      'Facebook': 'bg-blue-600',
      'Slack': 'bg-gray-200',
      'Reddit': 'bg-orange-500',
      'Google': 'bg-white',
      'LinkedIn': 'bg-blue-700',
      'Netflix': 'bg-red-600',
      'Amazon': 'bg-yellow-500'
    };
    
    const logoClass = `logo-container ${logoColors[company] || 'bg-gray-200'}`;
    
    return (
      <div className={logoClass}>
        {company === 'Microsoft' ? (
          <img src="/api/placeholder/16/16" alt="Microsoft logo" className="w-6 h-6" />
        ) : company === 'Slack' ? (
          <img src="/api/placeholder/16/16" alt="Slack logo" className="w-6 h-6" />
        ) : (
          <span>{logo}</span>
        )}
      </div>
    );
  };

  return (
    <div className="job-application-container">
      <div className="sidebar">
        <div className="sidebar-menu">
          <div className="menu-item active">
            <span className="icon">📋</span>
            <span className="text">Applied Jobs</span>
          </div>
          <div className="menu-item">
            <span className="icon">🔖</span>
            <span className="text">Favorite Jobs</span>
          </div>
          <div className="menu-item">
            <span className="icon">🔔</span>
            <span className="text">Job Alert</span>
            <span className="badge">09</span>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="header">
          <h1 className="title">Applied Jobs <span className="count">(589)</span></h1>
        </div>
        
        <div className="applications-table">
          <div className="table-header">
            <div className="column jobs-column">JOBS</div>
            <div className="column date-column">DATE APPLIED</div>
            <div className="column status-column">STATUS</div>
            <div className="column action-column">ACTION</div>
          </div>
          
          <div className="table-body">
            {displayedApplications.map((app, index) => (
              <div key={app.id} className={`table-row ${app.company === 'Microsoft' ? 'highlighted' : ''}`}>
                <div className="column jobs-column">
                  {renderLogoForCompany(app.company, app.logo)}
                  <div className="job-info">
                    <div className="job-title">{app.position}</div>
                    <div className="job-details">
                      <span className="location">
                        <span className="icon">📍</span> {app.location}
                      </span>
                      <span className="salary">
                        <span className="icon">💰</span> {app.salary}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="column date-column">{app.date}</div>
                <div className="column status-column">
                  <span className="status-badge active">
                    <span className="status-icon">✓</span> {app.status}
                  </span>
                </div>
                <div className="column action-column">
                  <button className="view-details-btn">View Details</button>
                  <button className="import-file-btn">
                    <span className="plus-icon">+</span>
                    Import File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={'pagination-arrow prev'}
            nextClassName={'pagination-arrow next'}
            pageClassName={'pagination-number'}
            pageLinkClassName={'pagination-link'}
            previousLinkClassName={'pagination-link'}
            nextLinkClassName={'pagination-link'}
            breakClassName={'pagination-break'}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;