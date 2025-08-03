import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  User,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Accounts.scss";
import { getAllUsers } from "../../../apiHandler/adminAPIHandler";
import { adminRegisterUserService } from "../../../services/authService";
import Swal from "sweetalert2";

const statusConfig = {
  pending: { label: "Pending", className: "ap-status-pending" },
  approved: { label: "Approved", className: "ap-status-approved" },
  suspended: { label: "Suspended", className: "ap-status-suspended" },
};

const priorityConfig = {
  0: { label: "Free", className: "ap-priority-none" },
  1: { label: "PartnerShip", className: "ap-priority-partnership" },
  2: { label: "Advance", className: "ap-priority-advance" },
  3: { label: "Premium", className: "ap-priority-premium" },
};

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 5;

  // Form state
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    address: "",
    role: "Customer",
  });

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const users = await getAllUsers();

      const accountsData = users.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        address: user.address,
        priority: user.priority,
        avatarURL: user.avatarURL,
        approvalStatus: user.approvalStatus,
      }));
      setAccounts(accountsData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    filterAccounts();
  }, [accounts, searchTerm, priorityFilter]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priorityFilter]);

  const filterAccounts = () => {
    let filtered = [...accounts];

    if (searchTerm) {
      filtered = filtered.filter(
        (account) =>
          account.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (account) => Number(account.priority) === parseInt(priorityFilter)
      );
    }

    setFilteredAccounts(filtered);
  };

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAccount = () => {
    setShowAddModal(true);
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      address: "",
      role: "Customer",
    });
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      address: "",
      role: "Customer",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await adminRegisterUserService(formData);
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User account created successfully",
      });
      handleCloseModal();
      fetchAccounts(); // Refresh the list
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to create user account",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="ap-container">
      <div className="ap-header-actions">
        <div className="ap-search-section">
          <div className="ap-search-wrapper">
            <Search className="ap-search-icon" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ap-search-input"
            />
          </div>
          <select
            className="ap-filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="0">Free</option>
            <option value="1">PartnerShip</option>
            <option value="2">Advance</option>
            <option value="3">Premium</option>
          </select>
        </div>
        <div className="ap-action-buttons">
          <button className="ap-export-button">
            <Download className="ap-button-icon" />
            Export Excel
          </button>
          <button className="ap-add-button" onClick={handleAddAccount}>
            <Plus className="ap-button-icon" />
            Add Account
          </button>
        </div>
      </div>

      <div className="ap-table-card">
        <div className="ap-table-header">
          <div className="ap-table-title">
            Account List ({filteredAccounts.length})
          </div>
          <div className="ap-pagination-info">
            Showing {indexOfFirstAccount + 1}-
            {Math.min(indexOfLastAccount, filteredAccounts.length)} of{" "}
            {filteredAccounts.length} accounts
          </div>
        </div>
        <div className="ap-table-wrapper">
          <table className="ap-table">
            <thead>
              <tr className="ap-table-row-header">
                <th className="ap-table-header-cell">User</th>
                <th className="ap-table-header-cell">Email</th>
                <th className="ap-table-header-cell">Gender</th>
                <th className="ap-table-header-cell">Phone</th>
                <th className="ap-table-header-cell">Address</th>
                <th className="ap-table-header-cell">Priority</th>
                <th className="ap-table-header-cell"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i}>
                        <td colSpan={7} className="ap-table-loading">
                          <div className="ap-loading-pulse">
                            <div className="ap-loading-avatar"></div>
                            <div className="ap-loading-text">
                              <div className="ap-loading-line ap-loading-line-short"></div>
                              <div className="ap-loading-line ap-loading-line-medium"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                : currentAccounts.map((account) => (
                    <tr key={account.id} className="ap-table-row">
                      <td className="ap-table-cell">
                        <div className="ap-account-cell">
                          {account.avatarURL ? (
                            <img
                              src={account.avatarURL}
                              alt={account.fullName}
                              className="ap-avatar-image"
                            />
                          ) : (
                            <div className="ap-avatar-icon">
                              {getInitials(account.fullName)}
                            </div>
                          )}
                          <div>
                            <p className="ap-account-name">
                              {account.fullName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="ap-table-cell">
                        <div className="ap-contact-item">
                          <Mail className="ap-contact-icon" />
                          <span className="ap-contact-text">
                            {account.email}
                          </span>
                        </div>
                      </td>
                      <td className="ap-table-cell">
                        <span className="ap-gender-text">
                          {account.gender || "N/A"}
                        </span>
                      </td>
                      <td className="ap-table-cell">
                        <div className="ap-contact-item">
                          <Phone className="ap-contact-icon" />
                          <span className="ap-contact-text">
                            {account.phoneNumber}
                          </span>
                        </div>
                      </td>
                      <td className="ap-table-cell">
                        <span className="ap-address-text">
                          {account.address || "N/A"}
                        </span>
                      </td>
                      <td className="ap-table-cell">
                        <span
                          className={
                            priorityConfig[Number(account.priority)]?.className
                          }
                        >
                          {priorityConfig[Number(account.priority)]?.label ||
                            `Unknown (${account.priority})`}
                        </span>
                      </td>
                      <td className="ap-table-cell">
                        <div className="ap-actions-cell">
                          <button className="ap-action-button">
                            <MoreHorizontal className="ap-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="ap-pagination">
            <button
              className="ap-pagination-btn"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="ap-pagination-numbers">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`ap-pagination-number ${
                    page === currentPage ? "active" : ""
                  } ${page === "..." ? "disabled" : ""}`}
                  onClick={() => typeof page === "number" && goToPage(page)}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="ap-pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="ap-modal-overlay" onClick={handleCloseModal}>
          <div
            className="ap-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ap-modal-header">
              <h2>Add New Account</h2>
              <button className="ap-modal-close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="ap-modal-form">
              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div className="ap-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter password"
                  />
                </div>
                <div className="ap-form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="ap-form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="ap-form-row">
                <div className="ap-form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                </div>
                <div className="ap-form-group">
                  <label>Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Customer">Customer</option>
                    <option value="Talent">Talent</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="ap-modal-actions">
                <button
                  type="button"
                  className="ap-modal-cancel"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ap-modal-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
