import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "./WithdrawalRequests.scss";
import RequestDetails from "./ModalPopup/RequestDetails";
import ApprovalModal from "./ModalPopup/ApprovalModal";
import {
  getWithdrawalRequests,
  updateWithdrawalRequestStatus,
} from "../../../apiHandler/adminAPIHandler";

const getDateRange = (filter) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startDate = null;
  let endDate = null;

  switch (filter) {
    case "today":
      startDate = today;
      endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 1);
      break;
    case "week":
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 7);
      endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 1);
      break;
    case "month":
      startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() - 1);
      endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 1);
      break;
    default:
      break;
  }
  return { startDate, endDate };
};

const getAmountRange = (filter) => {
  let minAmount = null;
  let maxAmount = null;
  switch (filter) {
    case "small":
      maxAmount = 1000000;
      break;
    case "medium":
      minAmount = 1000000;
      maxAmount = 10000000;
      break;
    case "large":
      minAmount = 10000000;
      break;
    default:
      break;
  }
  return { minAmount, maxAmount };
};

const WithdrawalRequests = () => {
  const [allWithdrawalRequests, setAllWithdrawalRequests] = useState([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchWithdrawalRequests = async () => {
      try {
        setLoading(true);
        const result = await getWithdrawalRequests(1, 999);

        if (result && Array.isArray(result.items)) {
          const mappedData = result.items.map((req) => ({
            id: req.withdrawalRequestId,
            customer_name: req.bankAccountHolderName,
            customer_email: req.email,
            customer_phone: req.phoneNumber,
            amount: req.amount,
            bank_name: req.bankName,
            bank_account_number: req.bankAccountNumber,
            status: req.status,
            created_date: req.requestDate,
          }));
          setAllWithdrawalRequests(mappedData);
          setWithdrawalRequests(mappedData);
        } else {
          setAllWithdrawalRequests([]);
          setWithdrawalRequests([]);
        }
      } catch (error) {
        console.error("Failed to fetch withdrawal requests:", error);
        setAllWithdrawalRequests([]);
        setWithdrawalRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawalRequests();
  }, [refreshTrigger]);

  useEffect(() => {
    let filtered = [...allWithdrawalRequests];

    // Search term filter
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.customer_name.toLowerCase().includes(lowercasedFilter) ||
          item.customer_email.toLowerCase().includes(lowercasedFilter) ||
          item.bank_account_number.includes(lowercasedFilter)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.status === parseInt(statusFilter)
      );
    }

    // Date filter
    const { startDate, endDate } = getDateRange(dateFilter);
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.created_date);
        return itemDate >= startDate && itemDate < endDate;
      });
    }

    // Amount filter
    const { minAmount, maxAmount } = getAmountRange(amountFilter);
    if (minAmount !== null) {
      filtered = filtered.filter((item) => item.amount >= minAmount);
    }
    if (maxAmount !== null) {
      filtered = filtered.filter((item) => item.amount < maxAmount);
    }

    setWithdrawalRequests(filtered);
  }, [
    searchTerm,
    dateFilter,
    amountFilter,
    statusFilter,
    allWithdrawalRequests,
  ]);

  const handleOpenDetailsModal = (request) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const handleOpenApprovalModal = (request) => {
    setSelectedRequest(request);
    setIsApprovalModalOpen(true);
  };

  const handleCloseModals = () => {
    setSelectedRequest(null);
    setIsDetailsModalOpen(false);
    setIsApprovalModalOpen(false);
  };

  const handleUpdateRequestStatus = async (status, note) => {
    if (!selectedRequest) return;

    try {
      await updateWithdrawalRequestStatus(selectedRequest.id, status, note);

      setWithdrawalRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status } : req
        )
      );

      handleCloseModals();
    } catch (error) {
      console.error("Failed to update status", error);
      // Here you could show an error toast to the user
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      0: "wp-status-blue",
      1: "wp-status-purple",
      2: "wp-status-completed",
      3: "wp-status-red",
    };
    return colors[status] || "wp-status-default";
  };

  const getStatusText = (status) => {
    const texts = {
      0: "Pending",
      1: "Waiting Confirm",
      2: "Completed",
      3: "Canceled",
    };
    return texts[status] || "Unknown";
  };

  return (
    <div className="wp-requests-container">
      {/* Header */}
      <div className="wp-header">
        <div className="wp-header-text">
          <h1 className="wp-title">Withdrawal Requests</h1>
          <p className="wp-subtitle">
            Manage and process withdrawal requests from customers
          </p>
        </div>
        <div className="wp-header-buttons">
          <button
            className="wp-refresh-button"
            onClick={() => setRefreshTrigger((c) => c + 1)}
          >
            <ArrowPathIcon className="wp-icon" />
            Refresh
          </button>
          <button className="wp-export-button">
            <ArrowDownTrayIcon className="wp-icon" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="wp-filter-card">
        <div className="wp-filter-header">
          <h3 className="wp-filter-title">
            <FunnelIcon className="wp-filter-icon" />
            Search Filters
          </h3>
        </div>
        <div className="wp-filter-content">
          <div className="wp-filter-grid">
            <div className="wp-search-container">
              <MagnifyingGlassIcon className="wp-search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, bank account..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="wp-search-input"
              />
            </div>
            <div>
              <select
                className="wp-filter-select"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
              </select>
            </div>
            <div>
              <select
                className="wp-filter-select"
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
              >
                <option value="all">All amounts</option>
                <option value="small">&lt; 1 million</option>
                <option value="medium">1 - 10 million</option>
                <option value="large">&gt; 10 million</option>
              </select>
            </div>
            <div>
              <select
                className="wp-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Rejected</option>
                <option value="3">Processing</option>
                <option value="4">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="wp-results-card">
        <div className="wp-results-header">
          <h2 className="wp-results-title">
            Request List ({withdrawalRequests.length})
          </h2>
        </div>
        <div className="wp-table-container">
          <table className="wp-requests-table">
            <thead className="wp-table-head">
              <tr>
                <th className="wp-table-header">Customer</th>
                <th className="wp-table-header">Amount</th>
                <th className="wp-table-header">Bank Info</th>
                <th className="wp-table-header">Status</th>
                <th className="wp-table-header">Created Date</th>
                <th className="wp-table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="wp-no-results">
                    Loading...
                  </td>
                </tr>
              ) : withdrawalRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="wp-no-results">
                    No requests found matching the filter
                  </td>
                </tr>
              ) : (
                withdrawalRequests.map((request) => (
                  <tr key={request.id} className="wp-table-row">
                    <td className="wp-table-cell">
                      <div>
                        <p className="wp-customer-name">
                          {request.customer_name}
                        </p>
                        <p className="wp-customer-email">
                          {request.customer_email}
                        </p>
                      </div>
                    </td>
                    <td className="wp-table-cell">
                      <span className="wp-amount">
                        {formatCurrency(request.amount)}
                      </span>
                    </td>
                    <td className="wp-table-cell">
                      <div className="wp-bank-info">
                        <p className="wp-bank-name">{request.bank_name}</p>
                        <p className="wp-bank-account-number">
                          {request.bank_account_number}
                        </p>
                      </div>
                    </td>
                    <td className="wp-table-cell">
                      <span
                        className={`wp-status-badge ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {getStatusText(request.status)}
                      </span>
                    </td>
                    <td className="wp-table-cell">
                      {formatDate(request.created_date)}
                    </td>
                    <td className="wp-table-cell">
                      <div className="wp-actions">
                        <button
                          className="wp-action-button wp-view-button"
                          onClick={() => handleOpenDetailsModal(request)}
                        >
                          <EyeIcon className="wp-icon" />
                        </button>
                        {request.status === 0 && (
                          <button
                            className="wp-action-button wp-approve-button"
                            onClick={() => handleOpenApprovalModal(request)}
                          >
                            <CheckCircleIcon className="wp-icon" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDetailsModalOpen && selectedRequest && (
        <div className="wp-modal-backdrop" onClick={handleCloseModals}>
          <div
            className="wp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wp-modal-header">
              <h2 className="wp-modal-title">Request Details</h2>
              <button
                className="wp-modal-close-button"
                onClick={handleCloseModals}
              >
                <XMarkIcon className="wp-icon" />
              </button>
            </div>
            <div className="wp-modal-body">
              <RequestDetails
                request={selectedRequest}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            </div>
          </div>
        </div>
      )}

      {isApprovalModalOpen && selectedRequest && (
        <div className="wp-modal-backdrop" onClick={handleCloseModals}>
          <div
            className="wp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wp-modal-header">
              <h2 className="wp-modal-title">Approve Request</h2>
              <button
                className="wp-modal-close-button"
                onClick={handleCloseModals}
              >
                <XMarkIcon className="wp-icon" />
              </button>
            </div>
            <div className="wp-modal-body">
              <ApprovalModal
                request={selectedRequest}
                onApprove={(note) => handleUpdateRequestStatus(1, note)}
                onReject={(note) => handleUpdateRequestStatus(2, note)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalRequests;
