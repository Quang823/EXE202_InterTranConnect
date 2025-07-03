import React, { useEffect, useState } from 'react';
import './AccountDashboard.scss';
import { Search, Bell, Settings, Clock, AlertTriangle, Calendar, CheckCircle, Users, Plus, X, Eye, GraduationCap, Briefcase, Globe2, FileText, Image as ImageIcon, Languages, FileUp, Check } from 'lucide-react';
import Swal from 'sweetalert2';
import { getPendingCertificates, approveCertificate, rejectCertificate } from '../../../apiHandler/adminAPIHandler';

const AccountDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const token = sessionStorage.getItem('accessToken');

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await getPendingCertificates();
      // response là mảng [{ certificate, talent }]
      const accountsData = response.map(item => {
        const { certificate, talent } = item;
        return {
          id: certificate.id,
          applicationUserId: certificate.applicationUserId,
          full_name: talent.fullName,
          email: talent.email,
          phone: talent.phoneNumber,
          status: talent.approvalStatus,
          createdAt: talent.createAt,
          // Thêm các trường cần thiết cho modal
          ...certificate,
        };
      });
      setAccounts(accountsData);
    } catch (e) {
      console.error('Failed to fetch pending certificates:', e);
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
  const handleOpenModal = (account) => {
    setModalOpen(true);
    setModalData(account); // account đã có đủ thông tin certificate
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  // Approve certificate
  const handleApprove = async (account) => {
    const result = await Swal.fire({
      title: 'Confirm certificate approval?',
      text: `Are you sure you want to approve this certificate?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    if (!result.isConfirmed) return;
    setActionLoadingId(account.id);
    try {
      await approveCertificate(account.id);
      await Swal.fire({ icon: 'success', title: 'Approved successfully!' });
      fetchAccounts();
      const current = Number(localStorage.getItem('approvedCount')) || 0;
      localStorage.setItem('approvedCount', current + 1);
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Approval failed!' });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Reject certificate
  const handleReject = async (account) => {
    const result = await Swal.fire({
      title: 'Confirm certificate rejection?',
      text: `Are you sure you want to reject this certificate?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (!result.isConfirmed) return;
    // Thêm prompt nhập lý do
    const { value: reason } = await Swal.fire({
      title: 'Reason for rejection',
      input: 'text',
      inputPlaceholder: 'Enter rejection reason...',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You must enter a rejection reason!';
        }
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusConfirm: false,
    });
    if (!reason) return;
    setActionLoadingId(account.id);
    try {
      await rejectCertificate(account.id, reason);
      await Swal.fire({ icon: 'success', title: 'Rejected successfully!' });
      fetchAccounts();
      const current = Number(localStorage.getItem('rejectedCount')) || 0;
      localStorage.setItem('rejectedCount', current + 1);
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Rejection failed!' });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Duyệt tất cả
  const handleApproveAll = async () => {
    const result = await Swal.fire({
      title: 'Confirm approve all?',
      text: `Are you sure you want to approve all these certificates?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve all',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    if (!result.isConfirmed) return;
    setActionLoadingId('all');
    try {
      await Promise.all(accounts.map(acc => approveCertificate(acc.id)));
      await Swal.fire({ icon: 'success', title: 'All approved successfully!' });
      fetchAccounts();
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Approve all failed!' });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Từ chối tất cả
  const handleRejectAll = async () => {
    const result = await Swal.fire({
      title: 'Confirm reject all?',
      text: `Are you sure you want to reject all these certificates?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject all',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (!result.isConfirmed) return;
    setActionLoadingId('all');
    try {
      await Promise.all(accounts.map(acc => rejectCertificate(acc.id)));
      await Swal.fire({ icon: 'success', title: 'All rejected successfully!' });
      fetchAccounts();
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Reject all failed!' });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Status mapping
  const statusMap = {
    0: 'Pending',
    1: 'Waiting For Confirmation',
    2: 'Completed',
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">Account Approval</h1>
          <p className="dashboard-subtitle">Approve pending accounts</p>
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
              <h3>Pending Approval</h3>
              <div className="stat-number">{pendingCount}</div>
              <p>Accounts need processing</p>
            </div>
            <div className="stat-icon orange">
              <Clock size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card urgent">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Urgent</h3>
              <div className="stat-number">{urgentCount}</div>
              <p>Pending for more than 3 days</p>
            </div>
            <div className="stat-icon pink">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>
        <div className="stat-card today">
          <div className="stat-content">
            <div className="stat-info">
              <h3>Today</h3>
              <div className="stat-number">{todayCount}</div>
              <p>New registrations</p>
            </div>
            <div className="stat-icon blue">
              <Calendar size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card approved">
            <div className="action-icon green">
              <CheckCircle size={24} />
            </div>
            <div className="action-content">
              <h3>Approve all</h3>
              <p>Approve all accounts</p>
              <div className="action-footer">
                <span className="account-count">{pendingCount} accounts</span>
                <button className="action-btn1 green" onClick={handleApproveAll} disabled={actionLoadingId === 'all'}>
                  {actionLoadingId === 'all' ? <span className="acd-btn-spinner"></span> : <CheckCircle size={16} />}
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
              <h3>Reject</h3>
              <p>Reject all accounts</p>
              <div className="action-footer">
                <span className="account-count danger">Dangerous action</span>
                <button className="action-btn1 red" onClick={handleRejectAll} disabled={actionLoadingId === 'all'}>
                  {actionLoadingId === 'all' ? <span className="acd-btn-spinner"></span> : <X size={16} />}
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      <div className="accounts-section">
        <h2>Accounts awaiting approval ({filteredAccounts.length})</h2>
        {isLoading ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Clock size={48} />
            </div>
            <h3>Loading data...</h3>
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <CheckCircle size={48} />
            </div>
            <h3>Great! No accounts awaiting approval</h3>
            <p>All accounts have been processed</p>
          </div>
        ) : (
          <table className="accounts-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map(account => (
                <tr key={account.id}>
                  <td>{account.full_name}</td>
                  <td>{account.email}</td>
                  <td>{account.phone}</td>
                  <td>{statusMap[account.status] || account.status}</td>
                  <td>
                    <div className="acd-action-buttons-dashboard">
                      <button className="view-btn" title="View details" onClick={() => handleOpenModal(account)}>
                        <Eye size={20} />
                      </button>
                      <button className="acd-accept-btn" title="Approve" onClick={() => handleApprove(account)} disabled={actionLoadingId === account.id}>
                        {actionLoadingId === account.id ? <span className="acd-btn-spinner"></span> : <Check size={18} />}
                      </button>
                      <button className="acd-cancel-btn" title="Reject" onClick={() => handleReject(account)} disabled={actionLoadingId === account.id}>
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
              <div className="acd-modal-loading">Loading...</div>
            ) : modalData.error ? (
              <div className="acd-modal-error">{modalData.error}</div>
            ) : (
              <div className="acd-modal-details redesigned-modal">
                <h2 className="acd-modal-title">Certificate Information</h2>
                {modalData.photoUrl && (
                  <div className="acd-modal-avatar-row">
                    <img src={modalData.photoUrl} alt="Image" className="acd-modal-avatar" />
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
                        <a href={modalData.cvFileUrl} target="_blank" rel="noopener noreferrer" className="acd-modal-link">View CV</a>
                      ) : <span className="acd-modal-file-empty">No file</span>}
                    </div>
                    <div className="acd-modal-file-card">
                      <ImageIcon size={22}/>
                      <div>Upload Photo</div>
                      {modalData.photoUrl ? (
                        <img src={modalData.photoUrl} alt="Image" className="acd-modal-file-img" />
                      ) : <span className="acd-modal-file-empty">No file</span>}
                    </div>
                    <div className="acd-modal-file-card">
                      <FileText size={22}/>
                      <div>Upload Certificate</div>
                      {modalData.certificateFileUrl ? (
                        <a href={modalData.certificateFileUrl} target="_blank" rel="noopener noreferrer" className="acd-modal-link">View file</a>
                      ) : <span className="acd-modal-file-empty">No file</span>}
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