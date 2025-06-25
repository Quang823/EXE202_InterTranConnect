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
  User
} from "lucide-react";
import './Accounts.scss';
import BulkActions from './BulkActions/BulkActions';

// Mock data based on the provided UI
const mockAccounts = [
  { id: 1, full_name: "Nguyen Van An", email: "nguyenvan.an@techcorp.com", phone: "0901234567", company: "TechCorp Vietnam", department: "Phòng Phát triển", status: "pending", access_level: "Standard", created_date: "23/06/2025", position:"Chuyên viên" },
  { id: 2, full_name: "Tran Thi Binh", email: "tran.thi.binh@startup.vn", phone: "0912345678", company: "StartupVN", department: "Phòng Marketing", status: "approved", access_level: "Premium", created_date: "23/06/2025", position:"Giám đốc" },
  { id: 3, full_name: "Le Minh Cuong", email: "le.minh.cuong@bigdata.com", phone: "0923456789", company: "BigData Solutions", department: "Phòng Nghiên cứu", status: "approved", access_level: "Enterprise", created_date: "23/06/2025", position:"Giám đốc" },
  { id: 4, full_name: "Pham Thu Dung", email: "pham.thu.dung@fintech.vn", phone: "0934567890", company: "Fintech Vietnam", department: "Phòng Sản phẩm", status: "approved", access_level: "Premium", created_date: "23/06/2025", position:"Giám đốc" },
  { id: 5, full_name: "Hoang Van Em", email: "hoang.van.em@ecommerce.com", phone: "0945678901", company: "E-Commerce Plus", department: "Phòng Vận hành", status: "suspended", access_level: "Standard", created_date: "23/06/2025", position:"Giám đốc" },
  { id: 6, full_name: "Vu Thi Giang", email: "vu.thi.giang@healthtech.vn", phone: "0956789012", company: "HealthTech Vietnam", department: "Phòng Thiết kế", status: "approved", access_level: "Standard", created_date: "23/06/2025", position:"Giám đốc" },
];

const statusConfig = {
  pending: { label: "Chờ duyệt", className: "ap-status-pending" },
  approved: { label: "Đã duyệt", className: "ap-status-approved" },
  suspended: { label: "Tạm khóa", className: "ap-status-suspended" }
};

export default function Accounts() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [accessLevelFilter, setAccessLevelFilter] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      setAccounts(mockAccounts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAccounts();
  }, [accounts, searchTerm, statusFilter, accessLevelFilter]);

  const filterAccounts = () => {
    let filtered = [...accounts];

    if (searchTerm) {
      filtered = filtered.filter(account => 
        account.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(account => account.status === statusFilter);
    }

    if (accessLevelFilter !== "all") {
      filtered = filtered.filter(account => account.access_level === accessLevelFilter);
    }

    setFilteredAccounts(filtered);
  };

  const handleAccountSelect = (accountId) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAccounts(
      selectedAccounts.length === filteredAccounts.length 
        ? [] 
        : filteredAccounts.map(acc => acc.id)
    );
  };

  return (
    <div className="ap-container">
      <div className="ap-header-actions">
        <div className="ap-search-section">
          <div className="ap-search-wrapper">
            <Search className="ap-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, công ty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ap-search-input"
            />
          </div>
          <select className="ap-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="suspended">Tạm khóa</option>
          </select>
          <select className="ap-filter-select" value={accessLevelFilter} onChange={(e) => setAccessLevelFilter(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <div className="ap-action-buttons">
          <button className="ap-export-button">
            <Download className="ap-button-icon" />
            Xuất Excel
          </button>
          <button className="ap-add-button">
            <Plus className="ap-button-icon" />
            Thêm tài khoản
          </button>
        </div>
      </div>

      {selectedAccounts.length > 0 && (
        <BulkActions
          selectedCount={selectedAccounts.length}
          onClearSelection={() => setSelectedAccounts([])}
          accounts={filteredAccounts}
          selectedAccounts={selectedAccounts}
          onAccountsUpdate={() => {
            // Sau khi cập nhật, làm mới danh sách account (ở đây chỉ mock lại, thực tế sẽ gọi API)
            setAccounts([...accounts]);
            filterAccounts();
          }}
        />
      )}

      <div className="ap-table-card">
        <div className="ap-table-header">
          <div className="ap-table-title">
            Danh sách tài khoản ({filteredAccounts.length})
          </div>
          <div className="ap-table-selection">
            {selectedAccounts.length > 0 && `${selectedAccounts.length} đã chọn`}
          </div>
        </div>
        <div className="ap-table-wrapper">
          <table className="ap-table">
            <thead>
              <tr className="ap-table-row-header">
                <th className="ap-table-header-cell">
                  <input
                    type="checkbox"
                    checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                    onChange={handleSelectAll}
                    className="ap-checkbox"
                  />
                </th>
                <th className="ap-table-header-cell">Tài khoản</th>
                <th className="ap-table-header-cell">Liên hệ</th>
                <th className="ap-table-header-cell">Công ty</th>
                <th className="ap-table-header-cell">Trạng thái</th>
                <th className="ap-table-header-cell">Cấp độ</th>
                <th className="ap-table-header-cell">Ngày tạo</th>
                <th className="ap-table-header-cell"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(8).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8} className="ap-table-loading">
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
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="ap-table-row">
                    <td className="ap-table-cell" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleAccountSelect(account.id)}
                        className="ap-checkbox"
                      />
                    </td>
                    <td className="ap-table-cell">
                      <div className="ap-account-cell">
                        <div className="ap-avatar-icon" style={{ backgroundColor: account.full_name[0] === 'N' ? '#6B46C1' : '#9F7AEA' }}>
                          {account.full_name[0]}
                        </div>
                        <div>
                          <p className="ap-account-name">{account.full_name}</p>
                          <p className="ap-account-position">{account.position || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="ap-table-cell">
                      <div className="ap-contact-cell">
                        <div className="ap-contact-item">
                          <Mail className="ap-contact-icon" />
                          <span className="ap-contact-text">{account.email}</span>
                        </div>
                        <div className="ap-contact-item">
                          <Phone className="ap-contact-icon" />
                          <span className="ap-contact-text">{account.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="ap-table-cell">
                      <div>
                        <p className="ap-company-name">{account.company}</p>
                        <p className="ap-company-department">{account.department}</p>
                      </div>
                    </td>
                    <td className="ap-table-cell">
                      <span className={statusConfig[account.status]?.className}>
                        {statusConfig[account.status]?.label}
                      </span>
                    </td>
                    <td className="ap-table-cell">
                      <span className="ap-access-level">
                        {account.access_level}
                      </span>
                    </td>
                    <td className="ap-table-cell">
                      <span className="ap-created-date">
                        {account.created_date}
                      </span>
                    </td>
                    <td className="ap-table-cell" onClick={(e) => e.stopPropagation()}>
                      <div className="ap-actions-cell">
                        <button className="ap-action-button">
                          <MoreHorizontal className="ap-action-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}