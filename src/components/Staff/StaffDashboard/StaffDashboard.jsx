import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import "./StaffDashboard.scss";
import Loading from "../../common/Loading/Loading";
import { getWithdrawalRequests } from "../../../apiHandler/adminAPIHandler";

const StaffDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    totalAmount: 0,
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("user"));
    if (sessionData) {
      setUser(sessionData);
    }

    const fetchData = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch a large number of requests to perform client-side stats
        const response = await getWithdrawalRequests(1, 999);

        if (response && Array.isArray(response.items)) {
          const allRequests = response.items;

          // Calculate stats
          const total = allRequests.length;
          const pending = allRequests.filter((req) => req.status === 0).length;
          const approved = allRequests.filter(
            (req) => req.status === 1
          ).length;
          const totalAmount = allRequests.reduce(
            (sum, req) => sum + req.amount,
            0
          );

          setStats({ total, pending, approved, totalAmount });

          // Get the 5 most recent requests for display
          const formattedRecentRequests = allRequests
            .slice(0, 5)
            .map((item) => ({
              id: item.withdrawalRequestId,
              customer_name: item.bankAccountHolderName,
              customer_email: item.email,
              amount: item.amount,
              bank_name: item.bankName,
              status: item.status,
              created_date: item.requestDate,
            }));
          setRequests(formattedRecentRequests);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    return `${day}/${month}/${year}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      0: "wp-status-blue",
      1: "wp-status-purple",
      2: "wp-status-red",
      3: "wp-status-gray",
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
    <div className="wp-dashboard-container">
      {loading ? (
        <div className="wp-loading-container">
          <Loading />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="wp-header">
            <div className="wp-header-text">
              <h1 className="wp-title">Dashboard</h1>
                <p className="wp-subtitle">
                  Overview of customer withdrawal requests
                </p>
            </div>
            <Link to="/staff/withdrawal-requests" className="wp-view-all-button">
              View all requests
              <ArrowTopRightOnSquareIcon className="wp-button-icon" />
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="wp-stats-grid">
            <div className="wp-stat-card wp-stat-total">
              <div className="wp-card-header">
                <span className="wp-card-title">Total Requests</span>
                <CreditCardIcon className="wp-card-icon" />
              </div>
              <div className="wp-card-content">
                <div className="wp-stat-value">{stats.total}</div>
                <div className="wp-stat-trend">
                  <ArrowTrendingUpIcon className="wp-trend-icon" />
                  +12% from last month
                </div>
              </div>
            </div>

            <div className="wp-stat-card wp-stat-pending">
              <div className="wp-card-header">
                <span className="wp-card-title">Pending</span>
                <ClockIcon className="wp-card-icon" />
              </div>
              <div className="wp-card-content">
                <div className="wp-stat-value">{stats.pending}</div>
                <div className="wp-stat-text">Needs immediate action</div>
              </div>
            </div>

            <div className="wp-stat-card wp-stat-approved">
              <div className="wp-card-header">
                <span className="wp-card-title">Approved</span>
                <CheckCircleIcon className="wp-card-icon" />
              </div>
              <div className="wp-card-content">
                <div className="wp-stat-value">{stats.approved}</div>
                <div className="wp-stat-text">Successful</div>
              </div>
            </div>

            <div className="wp-stat-card wp-stat-amount">
              <div className="wp-card-header">
                <span className="wp-card-title">Total Amount</span>
                <ArrowTrendingUpIcon className="wp-card-icon" />
              </div>
              <div className="wp-card-content">
                <div className="wp-stat-value">{formatCurrency(stats.totalAmount)}</div>
                <div className="wp-stat-text">Total requested amount</div>
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="wp-requests-card">
            <div className="wp-requests-header">
              <h2 className="wp-requests-title">Recent Requests</h2>
              <Link
                to="/staff/withdrawal-requests"
                className="wp-requests-view-all"
              >
                View all
              </Link>
            </div>
            <div className="wp-table-container">
              <table className="wp-requests-table">
                <thead className="wp-table-head">
                  <tr>
                    <th className="wp-table-header">Customer</th>
                    <th className="wp-table-header">Amount</th>
                    <th className="wp-table-header">Bank</th>
                    <th className="wp-table-header">Status</th>
                    <th className="wp-table-header">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((request) => (
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
                          <span className="wp-bank">{request.bank_name}</span>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="wp-no-requests">
                        No requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StaffDashboard;