import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, Clock, CheckCircle, XCircle, Search, Filter, RefreshCw, FileSpreadsheet, Eye, Trash2, Check, MoreHorizontal, X } from 'lucide-react';
import './StaffDashboard.scss';

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [timeFilter, setTimeFilter] = useState('');
  const [requestsData, setRequestsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWithdrawalRequests = async () => {
    try {
      setLoading(true);
      const accessToken = sessionStorage.getItem('accessToken');
      
      const response = await fetch(
        `http://localhost:5000/api/withdrawal-requests?pageNumber=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'accept': '*/*'
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      setRequestsData(data.items || []);
    } catch (error) {
      console.error('Error fetching withdrawal requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalRequests();
  }, [currentPage, pageSize]);

  // Filtered data based on search and filters
  const filteredData = useMemo(() => {
    return requestsData.filter(request => {
      const matchesSearch = searchTerm === '' || 
        request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All Status' || 
        request.status === statusFilter;

      const matchesTime = timeFilter === '' || 
        request.requestDate.startsWith(timeFilter);

      return matchesSearch && matchesStatus && matchesTime;
    });
  }, [requestsData, searchTerm, statusFilter, timeFilter]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = requestsData.length;
    const pending = requestsData.filter(r => r.status === 'Pending').length;
    const approved = requestsData.filter(r => r.status === 'Approved').length;
    const rejected = requestsData.filter(r => r.status === 'Rejected').length;

    // Calculate today's requests
    const today = new Date().toISOString().split('T')[0];
    const todayRequests = requestsData.filter(r => r.requestDate.startsWith(today)).length;

    // Calculate approval rate
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    const rejectionRate = total > 0 ? Math.round((rejected / total) * 100) : 0;

    return {
      total,
      pending,
      approved,
      rejected,
      todayRequests,
      approvalRate,
      rejectionRate
    };
  }, [requestsData]);

  const statsData = [
    {
      icon: <DollarSign size={24} color="#22c55e" />,
      title: 'Total Requests',
      value: statistics.total.toString(),
      subtitle: `${statistics.todayRequests} requests today`,
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: <Clock size={24} color="#f59e0b" />,
      title: 'Pending',
      value: statistics.pending.toString(),
      subtitle: 'Awaiting approval',
      change: '-5%',
      changeType: 'negative'
    },
    {
      icon: <CheckCircle size={24} color="#3b82f6" />,
      title: 'Approved',
      value: statistics.approved.toString(),
      subtitle: `Approval rate: ${statistics.approvalRate}%`,
      change: '+8%',
      changeType: 'positive'
    },
    {
      icon: <XCircle size={24} color="#ef4444" />,
      title: 'Rejected',
      value: statistics.rejected.toString(),
      subtitle: `Rejection rate: ${statistics.rejectionRate}%`,
      change: '+3%',
      changeType: 'positive'
    }
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Status');
    setTimeFilter('');
  };

  const handleRefresh = () => {
    fetchWithdrawalRequests();
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return { date: formattedDate, time: formattedTime };
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Approved':
        return 'status-approved';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid1">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className={`stat-change ${stat.changeType}`}>
                {stat.change}
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-subtitle">{stat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="dashboard-header">
        <div className="header-left">
          <h2 className="section-title">Filters</h2>
        </div>
        <div className="header-right">
          <button className="btn-advanced">
            <Filter size={20} color="#6b7280" /> Advanced
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Search</label>
          <div className="search-input1">
            <input
              type="text"
              placeholder="Name, email, request ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Time Range</label>
          <input
            type="date"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="table-actions">
        <div className="actions-left">
          <button className="btn-secondary" onClick={handleClearFilters}>
            <XCircle size={20} color="#6b7280" /> Clear Filters
          </button>
          <button className="btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={20} color="#6b7280" /> Refresh
          </button>
        </div>
        <div className="actions-right">
          <button className="btn-secondary">
            <FileSpreadsheet size={20} color="#6b7280" /> Export Excel
          </button>
          <button className="btn-primary">Apply Filters</button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="table-section">
        <div className="table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((request, index) => (
                <tr key={index}>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{request.userName}</div>
                      <div className="customer-email">{request.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="amount-info">
                      <div className="amount">{request.amount}</div>
                      <div className="currency">{request.bankName}</div>
                    </div>
                  </td>
                  <td>
                    <div className="time-info">
                      <div className="date">{formatDateTime(request.requestDate).date}</div>
                      <div className="time">{formatDateTime(request.requestDate).time}</div>
                    </div>
                  </td>
                  <td>
                    <div className="status-column">
                      <span className={`status-badge ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="actions-column">
                      <button 
                        className="action-btn view"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye size={18} color="#3b82f6" />
                      </button>
                      <button className="action-btn delete"><Trash2 size={18} color="#ef4444" /></button>
                      <button className="action-btn approve"><Check size={18} color="#22c55e" /></button>
                      <button className="action-btn more"><MoreHorizontal size={18} color="#6b7280" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank Details Modal */}
      {showModal && selectedRequest && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Bank Account Details</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Account Number:</span>
                <span className="detail-value">{selectedRequest.bankAccountNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Account Holder:</span>
                <span className="detail-value">{selectedRequest.bankAccountHolderName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;