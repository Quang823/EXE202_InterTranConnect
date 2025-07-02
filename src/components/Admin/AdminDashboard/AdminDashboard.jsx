import React from "react";
import "./AdminDashboard.scss";
import {
  Users,
  Clock,
  CheckCircle2,
  UserX,
  TrendingUp,
  Activity,
} from "lucide-react";

const statsData = {
  total: 150,
  pending: 10,
  approved: 130,
  rejected: 10,
  approvalRate: 87,
};

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-overlay"></div>
        <div className="welcome-content">
          <h2 className="welcome-title">Chào mừng trở lại!</h2>
          <p className="welcome-text">
            Hôm nay có {statsData.pending} tài khoản đang chờ phê duyệt
          </p>
          <div className="welcome-stats">
            <div className="welcome-stat">
              <Activity className="welcome-icon" />
              <span>Hoạt động tốt</span>
            </div>
            <div className="welcome-stat">
              <TrendingUp className="welcome-icon" />
              <span>Tăng trưởng 12% tuần này</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="card-header">
            <h3 className="card-title">Tổng tài khoản</h3>
          </div>
          <div className="card-body">
            <div className="stats-value">{statsData.total}</div>
            <div className="stats-trend">+12% so với tuần trước</div>
            <Users className="stats-icon" />
          </div>
        </div>

        <div className="stats-card">
          <div className="card-header">
            <h3 className="card-title">Chờ phê duyệt</h3>
          </div>
          <div className="card-body">
            <div className="stats-value">{statsData.pending}</div>
            <div className="stats-trend">{statsData.pending} tài khoản mới</div>
            <Clock className="stats-icon" />
          </div>
        </div>

        <div className="stats-card">
          <div className="card-header">
            <h3 className="card-title">Đã phê duyệt</h3>
          </div>
          <div className="card-body">
            <div className="stats-value">{statsData.approved}</div>
            <div className="stats-trend">
              {statsData.approvalRate}% tỷ lệ duyệt
            </div>
            <CheckCircle2 className="stats-icon" />
          </div>
        </div>

        <div className="stats-card">
          <div className="card-header">
            <h3 className="card-title">Từ chối</h3>
          </div>
          <div className="card-body">
            <div className="stats-value">{statsData.rejected}</div>
            <div className="stats-trend">Cần xem xét lại</div>
            <UserX className="stats-icon" />
          </div>
        </div>
      </div>

      {/* Right Column - Pending Approvals */}
      <div className="approvals-section">
        <div className="approval-card">
          <div className="card-header">
            <h3 className="card-title">Hoạt động ngày</h3>
          </div>
          <div className="card-body">
            <div className="approval-list">
              <div className="approval-item">
                <div className="user-info">
                  <div className="user-avatar">N</div>
                  <div className="user-details">
                    <h4 className="user-name">Nguyễn Văn An</h4>
                    <p className="user-status">Đang ký tài khoản mới</p>
                    <span className="user-time">06:18 23/06</span>
                  </div>
                </div>
              </div>
              <div className="approval-item">
                <div className="user-info">
                  <div className="user-avatar">T</div>
                  <div className="user-details">
                    <h4 className="user-name">Trần Thị Binh</h4>
                    <p className="user-status">Tài khoản đã được phê duyệt</p>
                    <span className="user-time">06:18 23/06</span>
                  </div>
                </div>
              </div>
              <div className="approval-item">
                <div className="user-info">
                  <div className="user-avatar">L</div>
                  <div className="user-details">
                    <h4 className="user-name">Lê Minh Cường</h4>
                    <p className="user-status">Đang ký tài khoản mới</p>
                    <span className="user-time">06:18 23/06</span>
                  </div>
                </div>
              </div>
              <div className="approval-item">
                <div className="user-info">
                  <div className="user-avatar">P</div>
                  <div className="user-details">
                    <h4 className="user-name">Phạm Thu Dung</h4>
                    <p className="user-status">Tài khoản đã được phê duyệt</p>
                    <span className="user-time">06:18 23/06</span>
                  </div>
                </div>
              </div>
              <div className="approval-item">
                <div className="user-info">
                  <div className="user-avatar">H</div>
                  <div className="user-details">
                    <h4 className="user-name">Hoàng Văn Em</h4>
                    <p className="user-status">Tài khoản bị từ chối</p>
                    <span className="user-time">06:18 23/06</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
