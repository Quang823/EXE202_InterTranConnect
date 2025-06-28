import React, { useEffect, useState } from 'react';
import './AccountDashboard.scss';
import { Search, Bell, Settings, Clock, AlertTriangle, Calendar, CheckCircle, Users, Plus, X, Eye, GraduationCap, Briefcase, Globe2, FileText, Image as ImageIcon, Languages, FileUp, Check } from 'lucide-react';
import Swal from 'sweetalert2';
import { getPendingCertificates, getUserById, approveUser, rejectUser } from '../../../apiHandler/adminAPIHandler';

const AccountDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const certificates = await getPendingCertificates();
      const accountsData = await Promise.all(
        certificates.map(async (cert) => {
          try {
            const user = await getUserById(cert.applicationUserId);
            return {
              id: cert.id,
              applicationUserId: cert.applicationUserId,
              full_name: user.fullName,
              email: user.email,
              phone: user.phoneNumber,
              status: user.approvalStatus,
              createdAt: user.createdAt,
            };
          } catch (e) {
            console.error(`Error fetching user details for cert ${cert.id}:`, e);
            return null;
          }
        })
      );
      setAccounts(accountsData.filter(Boolean));
    } catch (error) {
      console.error("Failed to fetch pending certificates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Filtered accounts for search
  const filteredAccounts = accounts.filter(account =>
    account.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const pendingCount = accounts.length;
  const urgentCount = accounts.filter(acc => {
    if (!acc.createdAt) return false;
    const created = new Date(acc.createdAt);
    const now = new Date();
    const diff = (now - created) / (1000 * 60 * 60 * 24);
    return diff > 3;
  }).length;
  const todayCount = accounts.filter(acc => {
    if (!acc.createdAt) return false;
    const created = new Date(acc.createdAt);
    const now = new Date();
    return created.toDateString() === now.toDateString();
  }).length;

  // Modal open handler
  const handleOpenModal = async (account) => {
    setModalOpen(true);
    setModalData(null);
    try {
      const certificates = await getPendingCertificates();
      // Find the certificate for this account
      const cert = certificates.find(c => c.id === account.id);
      setModalData(cert);
    } catch (e) {
      setModalData({ error: 'Không thể tải thông tin chứng chỉ.' });
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  // Approve certificate
  const handleApprove = async (account) => {
    const result = await Swal.fire({
      title: 'Xác nhận duyệt tài khoản?',
      text: `Bạn chắc chắn muốn duyệt tài khoản này?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Duyệt',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    if (!result.isConfirmed) return;
    setActionLoadingId(account.id);
    try {
      await approveUser(account.applicationUserId);
      await Swal.fire({ icon: 'success', title: 'Duyệt thành công!' });
      fetchAccounts();
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Duyệt thất bại!' });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Reject certificate
  const handleReject = async (account) => {
    const result = await Swal.fire({
      title: 'Xác nhận từ chối tài khoản?',
      text: `Bạn chắc chắn muốn từ chối tài khoản này?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Từ chối',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (!result.isConfirmed) return;
    setActionLoadingId(account.id);
    try {
      await rejectUser(account.applicationUserId);
      await Swal.fire({ icon: 'success', title: 'Từ chối thành công!' });
      fetchAccounts();
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Từ chối thất bại!' });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">Phê duyệt Tài khoản</h1>
          <p className="dashboard-subtitle">Phê duyệt tài khoản chờ xử lý</p>
        </div>
        <div className="header-right">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="notification-badge">
            <Bell size={20} />
            <span className="badge">{pendingCount}</span>
          </div>
          <Settings size={20} className="settings-icon" />
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card pending">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Chờ phê duyệt</h3>
              <div className="stat-number">{pendingCount}</div>
              <p>Tài khoản cần xử lý</p>
            </div>
            <div className="stat-icon orange">
              <Clock size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card urgent">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Cần xử lý gấp</h3>
              <div className="stat-number">{urgentCount}</div>
              <p>Quá 3 ngày chờ</p>
            </div>
            <div className="stat-icon pink">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card today">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Hôm nay</h3>
              <div className="stat-number">{todayCount}</div>
              <p>Đăng ký mới</p>
            </div>
            <div className="stat-icon blue">
              <Calendar size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Thao tác nhanh</h2>
        <div className="actions-grid">
          <div className="action-card approved">
            <div className="action-icon green">
              <CheckCircle size={24} />
            </div>
            <div className="action-content">
              <h3>Duyệt tất cả</h3>
              <p>Phê duyệt toàn bộ tài khoản</p>
              <div className="action-footer">
                <span className="account-count">{pendingCount} tài khoản</span>
                <button className="action-btn1 green">
                  <CheckCircle size={16} />
                  Accept
                </button>
              </div>
            </div>
          </div>
          <div className="action-card reject">
            <div className="action-icon red">
              <X size={24} />
            </div>
            <div className="action-content">
              <h3>Từ chối</h3>
              <p>Từ chối hàng loạt</p>
              <div className="action-footer">
                <span className="account-count danger">Thao tác nguy hiểm</span>
                <button className="action-btn1 red">
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      <div className="accounts-section">
        <h2>Tài khoản chờ phê duyệt ({filteredAccounts.length})</h2>
        {isLoading ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Clock size={48} />
            </div>
            <h3>Đang tải dữ liệu...</h3>
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <CheckCircle size={48} />
            </div>
            <h3>Tuyệt vời! Không có tài khoản nào chờ phê duyệt</h3>
            <p>Tất cả tài khoản đã được xử lý xong</p>
          </div>
        ) : (
          <table className="accounts-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map(account => (
                <tr key={account.id}>
                  <td>{account.full_name}</td>
                  <td>{account.email}</td>
                  <td>{account.phone}</td>
                  <td>{account.status}</td>
                  <td>
                    <div className="acd-action-buttons-dashboard">
                      <button className="view-btn" title="Xem chi tiết" onClick={() => handleOpenModal(account)}>
                        <Eye size={20} />
                      </button>
                      <button className="acd-accept-btn" title="Duyệt" onClick={() => handleApprove(account)} disabled={actionLoadingId === account.id}>
                        {actionLoadingId === account.id ? <span className="acd-btn-spinner"></span> : <Check size={18} />}
                      </button>
                      <button className="acd-cancel-btn" title="Từ chối" onClick={() => handleReject(account)} disabled={actionLoadingId === account.id}>
                        {actionLoadingId === account.id ? <span className="acd-btn-spinner"></span> : <X size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Popup */}
      {modalOpen && (
        <div className="acd-modal-overlay" onClick={handleCloseModal}>
          <div className="acd-modal-content" onClick={e => e.stopPropagation()}>
            <button className="acd-modal-close" onClick={handleCloseModal}><X size={22} /></button>
            {modalData === null ? (
              <div className="acd-modal-loading">Đang tải...</div>
            ) : modalData.error ? (
              <div className="acd-modal-error">{modalData.error}</div>
            ) : (
              <div className="acd-modal-details redesigned-modal">
                <h2 className="acd-modal-title">Thông tin chứng chỉ</h2>
                {modalData.photoUrl && (
                  <div className="acd-modal-avatar-row">
                    <img src={modalData.photoUrl} alt="Ảnh" className="acd-modal-avatar" />
                  </div>
                )}
                {/* Basic Information */}
                <div className="acd-modal-section">
                  <div className="acd-modal-section-title">Basic Information</div>
                  <div className="acd-modal-fields-grid">
                    <div className="acd-modal-label"><FileText size={16}/> Certificate Title</div>
                    <div className="acd-modal-value">{modalData.title}</div>
                    <div className="acd-modal-label"><Briefcase size={16}/> Years of Experience</div>
                    <div className="acd-modal-value">{modalData.experience}</div>
                    <div className="acd-modal-label"><GraduationCap size={16}/> Education Background</div>
                    <div className="acd-modal-value">{modalData.education}</div>
                    <div className="acd-modal-label"><Globe2 size={16}/> Website URL</div>
                    <div className="acd-modal-value">{modalData.website}</div>
                  </div>
                </div>
                {/* Professional Details */}
                <div className="acd-modal-section">
                  <div className="acd-modal-section-title">Professional Details</div>
                  <div className="acd-modal-fields-grid">
                    <div className="acd-modal-label"><Briefcase size={16}/> Work Type</div>
                    <div className="acd-modal-value">{modalData.workType}</div>
                    <div className="acd-modal-label"><FileText size={16}/> Translation Form</div>
                    <div className="acd-modal-value">{modalData.translationForm}</div>
                    <div className="acd-modal-label"><Languages size={16}/> Translation Languages</div>
                    <div className="acd-modal-value">{modalData.translationLanguage}</div>
                    <div className="acd-modal-label"><FileText size={16}/> Certificate Names</div>
                    <div className="acd-modal-value">{modalData.certificateNames}</div>
                  </div>
                </div>
                {/* File Uploads */}
                <div className="acd-modal-section">
                  <div className="acd-modal-section-title">File Uploads</div>
                  <div className="acd-modal-files-grid">
                    <div className="acd-modal-file-card">
                      <FileUp size={22}/>
                      <div>Upload CV</div>
                      {modalData.cvFileUrl ? (
                        <a href={modalData.cvFileUrl} target="_blank" rel="noopener noreferrer" className="acd-modal-link">Xem CV</a>
                      ) : <span className="acd-modal-file-empty">Chưa có</span>}
                    </div>
                    <div className="acd-modal-file-card">
                      <ImageIcon size={22}/>
                      <div>Upload Photo</div>
                      {modalData.photoUrl ? (
                        <img src={modalData.photoUrl} alt="Ảnh" className="acd-modal-file-img" />
                      ) : <span className="acd-modal-file-empty">Chưa có</span>}
                    </div>
                    <div className="acd-modal-file-card">
                      <FileText size={22}/>
                      <div>Upload Certificate</div>
                      {modalData.certificateFileUrl ? (
                        <a href={modalData.certificateFileUrl} target="_blank" rel="noopener noreferrer" className="acd-modal-link">Xem file</a>
                      ) : <span className="acd-modal-file-empty">Chưa có</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDashboard;