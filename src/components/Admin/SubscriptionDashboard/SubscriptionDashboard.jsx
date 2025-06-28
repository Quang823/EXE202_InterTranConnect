import React, { useState, useEffect, useRef } from 'react';
import * as Chart from 'chart.js';
import { TrendingUp, TrendingDown, Users, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getSubscriptionDashboard } from '../../../apiHandler/adminAPIHandler';
import './SubscriptionDashboard.scss';

// Register Chart.js components
Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.PointElement,
  Chart.LineElement,
  Chart.BarElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.ArcElement,
  Chart.RadialLinearScale
);

const SubscriptionDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    endDate: new Date() // Today
  });
  const [dashboardData, setDashboardData] = useState({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    subscriptionRevenue: 0,
    distributionByPlan: [],
    trendOverTime: [],
    activeSubscriptionList: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [appliedDates, setAppliedDates] = useState([]);
  const subscriptionsPerPage = 10; // Number of subscriptions per page
  const lineChartRef = useRef(null);
  const trendChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const trendChartInstance = useRef(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Only fetch if both start and end dates are selected
      if (dateRange.startDate && dateRange.endDate) {
        const data = await getSubscriptionDashboard(dateRange.startDate, dateRange.endDate);
        setDashboardData(data);
      } else {
        // Set empty data when no date range is selected
        setDashboardData({
          totalSubscriptions: 0,
          activeSubscriptions: 0,
          subscriptionRevenue: 0,
          distributionByPlan: [],
          trendOverTime: [],
          activeSubscriptionList: []
        });
      }
      
    } catch (err) {
      setError('Không thể tải dữ liệu dashboard');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when date range changes
  useEffect(() => {
    fetchDashboardData();
    setCurrentPage(1); // Reset to first page when date range changes
  }, [dateRange]);

  // Pagination logic for subscriptions
  const totalPages = Math.ceil((dashboardData.activeSubscriptionList?.length || 0) / subscriptionsPerPage);
  const indexOfLastSubscription = currentPage * subscriptionsPerPage;
  const indexOfFirstSubscription = indexOfLastSubscription - subscriptionsPerPage;
  const currentSubscriptions = dashboardData.activeSubscriptionList?.slice(indexOfFirstSubscription, indexOfLastSubscription) || [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format date for chart labels
  const formatDateForChart = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Format date for table display
  const formatDateForTable = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Calculate average per subscription
  const averagePerSubscription = dashboardData.totalSubscriptions > 0 
    ? dashboardData.subscriptionRevenue / dashboardData.totalSubscriptions 
    : 0;

  // Calculate cancellation rate (mock calculation - you might want to get this from API)
  const cancellationRate = 0; // This should come from API

  useEffect(() => {
    if (loading) return;

    // Initialize revenue chart (Doughnut chart)
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
      
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      // Calculate revenue by plan
      const revenueByPlan = dashboardData.distributionByPlan.map(plan => {
        const planSubscriptions = dashboardData.activeSubscriptionList.filter(sub => sub.plan === plan.plan);
        const totalRevenue = planSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
        return {
          plan: plan.plan,
          revenue: totalRevenue,
          count: plan.count
        };
      });

      lineChartInstance.current = new Chart.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: revenueByPlan.map(item => item.plan),
          datasets: [{
            data: revenueByPlan.map(item => item.revenue),
            backgroundColor: [
              '#3b82f6',
              '#8b5cf6', 
              '#10b981',
              '#f59e0b',
              '#ef4444',
              '#06b6d4',
              '#84cc16',
              '#f97316'
            ],
            borderColor: '#ffffff',
            borderWidth: 3,
            cutout: '60%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((context.parsed / total) * 100).toFixed(1);
                  const revenue = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(context.parsed);
                  return `${context.label}: ${revenue} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }

    // Initialize trend chart (Polar Area chart)
    if (trendChartRef.current) {
      const ctx = trendChartRef.current.getContext('2d');
      
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
      }

      const trendChartData = dashboardData.trendOverTime.length > 0 
        ? dashboardData.trendOverTime.map(item => ({
            time: formatDateForChart(item.date),
            registrations: item.count
          }))
        : [];

      // Use selected dates or default to first 5 dates
      const displayData = appliedDates.length > 0 
        ? appliedDates 
        : trendChartData.slice(0, 5);
      
      const hasMoreDates = trendChartData.length > 5;

      trendChartInstance.current = new Chart.Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: displayData.map(item => item.time),
          datasets: [{
            label: 'Số đăng ký mới',
            data: displayData.map(item => item.registrations),
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(34, 197, 94, 0.7)',
              'rgba(249, 115, 22, 0.7)',
              'rgba(239, 68, 68, 0.7)',
              'rgba(6, 182, 212, 0.7)',
              'rgba(132, 204, 22, 0.7)',
              'rgba(249, 115, 22, 0.7)'
            ],
            borderColor: [
              'rgba(59, 130, 246, 1)',
              'rgba(139, 92, 246, 1)',
              'rgba(34, 197, 94, 1)',
              'rgba(249, 115, 22, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(6, 182, 212, 1)',
              'rgba(132, 204, 22, 1)',
              'rgba(249, 115, 22, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Đăng ký: ${context.parsed.r}`;
                }
              }
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              pointLabels: {
                font: {
                  size: 11
                }
              },
              ticks: {
                stepSize: 1,
                callback: function(value) {
                  return Math.floor(value);
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
      }
    };
  }, [dashboardData, loading, appliedDates]);

  // New StatCard like RevenueDashboard
  const StatCard = ({ title, value, trend, trendText, color, icon: Icon }) => (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      {trendText && (
        <div className={`stat-trend ${trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral'}`}>
          {trend === 'up' && <TrendingUp size={16} />}
          {trend === 'down' && <TrendingDown size={16} />}
          <span>{trendText}</span>
        </div>
      )}
    </div>
  );

  // Date Modal Component
  const DateModal = ({ isOpen, onClose, dates, selectedDates, onDateSelect, onApply }) => {
    if (!isOpen) return null;

    const handleDateToggle = (date) => {
      const dateString = date.time; // Use date string as unique identifier
      const isSelected = selectedDates.some(d => d.time === dateString);
      
      if (isSelected) {
        onDateSelect(selectedDates.filter(d => d.time !== dateString));
      } else {
        onDateSelect([...selectedDates, date]);
      }
    };

    const handleSelectAll = () => {
      if (selectedDates.length === dates.length) {
        onDateSelect([]);
      } else {
        onDateSelect(dates);
      }
    };

    const handleApply = () => {
      onApply(selectedDates);
      onClose();
    };

    const isDateSelected = (date) => {
      return selectedDates.some(d => d.time === date.time);
    };

    return (
      <div className="date-modal-overlay" onClick={onClose}>
        <div className="date-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Chọn ngày hiển thị</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="modal-content">
            <div className="modal-actions">
              <button 
                className="select-all-btn"
                onClick={handleSelectAll}
              >
                {selectedDates.length === dates.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </button>
              <span className="selected-count">
                Đã chọn: {selectedDates.length}/{dates.length}
              </span>
            </div>
            <div className="date-grid">
              {dates.map((date, index) => {
                const isSelected = isDateSelected(date);
                return (
                  <div 
                    key={index} 
                    className={`date-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateToggle(date)}
                  >
                    <div className="checkbox">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleDateToggle(date)}
                      />
                    </div>
                    <div className="date-label">{date.time}</div>
                    {isSelected && (
                      <div className="selected-indicator">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="modal-footer">
              <button className="apply-btn" onClick={handleApply}>
                Áp dụng ({selectedDates.length} ngày)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Initialize selectedDates when modal opens
  const handleOpenModal = () => {
    setSelectedDates(appliedDates);
    setShowDateModal(true);
  };

  // Handle apply dates
  const handleApplyDates = (dates) => {
    setAppliedDates(dates);
  };

  return (
    <div className="subscription-dashboard">
      <main className="dashboard-main">
        <div className="dashboard-title">
          <h2>Tổng quan Gói đăng ký</h2>
          <p>Theo dõi và phân tích các gói subscription</p>
          <div className="date-range-picker">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <DatePicker
              selected={dateRange.startDate}
              onChange={date => setDateRange({ ...dateRange, startDate: date })}
              selectsStart
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Từ ngày"
              className="date-input"
            />
            <span style={{ margin: '0 4px' }}>-</span>
            <DatePicker
              selected={dateRange.endDate}
              onChange={date => setDateRange({ ...dateRange, endDate: date })}
              selectsEnd
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              minDate={dateRange.startDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Đến ngày"
              className="date-input"
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <StatCard
                title="Tổng đăng ký"
                value={dashboardData.totalSubscriptions}
                trend="up"
                trendText="Tăng trưởng mọi thời điểm"
                color="purple"
                icon={Users}
              />
              <StatCard
                title="Đang hoạt động"
                value={dashboardData.activeSubscriptions}
                trend="up"
                trendText={`${dashboardData.totalSubscriptions > 0 ? (dashboardData.activeSubscriptions / dashboardData.totalSubscriptions * 100).toFixed(1) : 0}% tổng số`}
                color="green"
                icon={TrendingUp}
              />
              <StatCard
                title="Doanh thu"
                value={formatCurrency(dashboardData.subscriptionRevenue)}
                trend="neutral"
                trendText="Tổng doanh thu từ gói đăng ký"
                color="blue"
                icon={DollarSign}
              />
              <StatCard
                title="Trung bình/gói"
                value={formatCurrency(averagePerSubscription)}
                trend="neutral"
                trendText="Giá trị trung bình/gói"
                color="orange"
                icon={DollarSign}
              />
              <StatCard
                title="Tỷ lệ hủy"
                value={`${cancellationRate.toFixed(1)}%`}
                trend="down"
                trendText="Churn rate"
                color="red"
                icon={TrendingDown}
              />
            </div>

            <div className="charts-section">
              <div className="chart-container">
                <div className="chart-header">
                  <h3>Doanh thu theo gói đăng ký</h3>
                  <p>Biểu đồ bánh rán thể hiện doanh thu từ mỗi gói</p>
                </div>
                <div className="chart-content">
                  {dashboardData.distributionByPlan.length === 0 ? (
                    <div className="empty-state">
                      <p>Không có dữ liệu trong khoảng thời gian đã chọn</p>
                    </div>
                  ) : (
                    <canvas ref={lineChartRef} width="400" height="300"></canvas>
                  )}
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-header">
                  <h3>Xu hướng đăng ký theo thời gian</h3>
                  <p>Biểu đồ vùng cực thể hiện số lượng đăng ký mới theo ngày</p>
                </div>
                <div className="chart-content">
                  {dashboardData.trendOverTime.length === 0 ? (
                    <div className="empty-state">
                      <p>Không có dữ liệu trong khoảng thời gian đã chọn</p>
                    </div>
                  ) : (
                    <>
                      <canvas ref={trendChartRef} width="400" height="300"></canvas>
                      {dashboardData.trendOverTime.length > 5 && (
                        <div className="view-more-dates">
                          <button 
                            className="view-more-btn"
                            onClick={handleOpenModal}
                          >
                            {appliedDates.length > 0 
                              ? `Đã chọn ${appliedDates.length} ngày`
                              : `Xem tất cả ${dashboardData.trendOverTime.length} ngày`
                            }
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="subscriptions-table">
              <div className="table-header">
                <h3>Đăng ký đang hoạt động ({dashboardData.activeSubscriptionList.length})</h3>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Khách hàng</th>
                      <th>Gói đăng ký</th>
                      <th>Ngày bắt đầu</th>
                      <th>Hết hạn</th>
                      <th>Số tiền</th>
                      <th>Trạng thái</th>
                      <th>Thanh toán</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubscriptions.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-row">
                          Không có đăng ký nào trong khoảng thời gian đã chọn
                        </td>
                      </tr>
                    ) : (
                      currentSubscriptions.map((subscription, index) => (
                        <tr key={index}>
                          <td>{subscription.customer}</td>
                          <td>{subscription.plan}</td>
                          <td>{formatDateForTable(subscription.startDate)}</td>
                          <td>{formatDateForTable(subscription.endDate)}</td>
                          <td>{formatCurrency(subscription.amount)}</td>
                          <td>{subscription.status}</td>
                          <td>{subscription.payment}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {dashboardData.activeSubscriptionList && dashboardData.activeSubscriptionList.length > subscriptionsPerPage && (
                <div className="pagination-container">
                  <div className="pagination-info">
                    <span>
                      Hiển thị {indexOfFirstSubscription + 1}-
                      {Math.min(indexOfLastSubscription, dashboardData.activeSubscriptionList.length)} của{" "}
                      {dashboardData.activeSubscriptionList.length} đăng ký
                    </span>
                  </div>
                  <div className="pagination-controls">
                    <button
                      className="pagination-button prev"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                      <span>Trước</span>
                    </button>

                    <div className="pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            className={`page-number ${
                              currentPage === page ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      className="pagination-button next"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <span>Sau</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <DateModal 
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        dates={dashboardData.trendOverTime.map(item => ({
          time: formatDateForChart(item.date),
          registrations: item.count
        }))}
        selectedDates={selectedDates}
        onDateSelect={setSelectedDates}
        onApply={handleApplyDates}
      />
    </div>
  );
};

export default SubscriptionDashboard;