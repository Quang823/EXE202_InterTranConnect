import React from 'react';
import './AccountDashboard.scss';
import { Search, Bell, Settings, Clock, AlertTriangle, Calendar, CheckCircle, Users, Plus, X } from 'lucide-react';

const AccountDashboard = () => {
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
            <input type="text" placeholder="Tìm kiếm..." className="search-input" />
          </div>
          <div className="notification-badge">
            <Bell size={20} />
            <span className="badge">3</span>
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
              <div className="stat-number">0</div>
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
              <div className="stat-number">0</div>
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
              <div className="stat-number">0</div>
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
                <span className="account-count">0 tài khoản</span>
                <button className="action-btn green">
                  <CheckCircle size={16} />
                  Duyệt ngay
                </button>
              </div>
            </div>
          </div>

          <div className="action-card new">
            <div className="action-icon blue">
              <Users size={24} />
            </div>
            <div className="action-content">
              <h3>Duyệt mới</h3>
              <p>Chỉ tài khoản hôm nay</p>
              <div className="action-footer">
                <span className="account-count">0 tài khoản</span>
                <button className="action-btn blue">
                  <Plus size={16} />
                  Duyệt mới
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
                <button className="action-btn red">
                  <X size={16} />
                  Từ chối tất cả
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      <div className="accounts-section">
        <h2>Tài khoản chờ phê duyệt (0)</h2>
        <div className="empty-state">
          <div className="empty-icon">
            <CheckCircle size={48} />
          </div>
          <h3>Tuyệt vời! Không có tài khoản nào chờ phê duyệt</h3>
          <p>Tất cả tài khoản đã được xử lý xong</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;