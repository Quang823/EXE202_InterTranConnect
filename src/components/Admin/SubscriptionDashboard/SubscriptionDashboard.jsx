import React, { useState, useEffect, useRef } from 'react';
import * as Chart from 'chart.js';
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
  Chart.ArcElement
);

const SubscriptionDashboard = () => {
  const [dateRange, setDateRange] = useState('01/06/2025 - 23/06/2025');
  const [activeSubscriptions] = useState([]);
  const lineChartRef = useRef(null);
  const trendChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const trendChartInstance = useRef(null);

  // Mock data for charts
  const packageData = [
    { date: '01/06', subscriptions: 0 },
    { date: '05/06', subscriptions: 0 },
    { date: '10/06', subscriptions: 0 },
    { date: '15/06', subscriptions: 0 },
    { date: '20/06', subscriptions: 0 },
    { date: '23/06', subscriptions: 0 }
  ];

  const trendData = [
    { time: '00:00', registrations: 0 },
    { time: '04:00', registrations: 0 },
    { time: '08:00', registrations: 0 },
    { time: '12:00', registrations: 0 },
    { time: '16:00', registrations: 0 },
    { time: '20:00', registrations: 0 },
    { time: '24:00', registrations: 0 }
  ];

  useEffect(() => {
    // Initialize package chart
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
      
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      lineChartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: packageData.map(item => item.date),
          datasets: [{
            label: 'Gói đăng ký',
            data: packageData.map(item => item.subscriptions),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#f1f5f9'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }

    // Initialize trend chart
    if (trendChartRef.current) {
      const ctx = trendChartRef.current.getContext('2d');
      
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
      }

      trendChartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: trendData.map(item => item.time),
          datasets: [{
            label: 'Đăng ký theo thời gian',
            data: trendData.map(item => item.registrations),
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#f1f5f9'
              }
            },
            x: {
              grid: {
                display: false
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
  }, []);

  const StatCard = ({ title, value, subtitle, bgColor, icon }) => (
    <div className="stat-card">
      <div className="stat-content">
        <div className="stat-text">
          <h3>{title}</h3>
          <div className="stat-value">{value}</div>
          <p>{subtitle}</p>
        </div>
        <div className={`stat-icon ${bgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );

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
            <input type="text" value={dateRange} readOnly />
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Tổng đăng ký"
            value="0"
            subtitle="Trong khoảng thời gian đã chọn"
            bgColor="bg-blue"
            icon={<div className="icon-shape"></div>}
          />
          <StatCard
            title="Đang hoạt động"
            value="0"
            subtitle="0.0% tổng số"
            bgColor="bg-green"
            icon={<div className="icon-shape"></div>}
          />
          <StatCard
            title="Doanh thu"
            value="0 ₫"
            subtitle="Từ các gói đăng ký"
            bgColor="bg-purple"
            icon={<div className="icon-shape"></div>}
          />
          <StatCard
            title="Trung bình/gói"
            value="0 ₫"
            subtitle="Giá trị trung bình"
            bgColor="bg-orange"
            icon={<div className="icon-shape"></div>}
          />
          <StatCard
            title="Tỷ lệ hủy"
            value="0.0%"
            subtitle="Churn rate"
            bgColor="bg-red"
            icon={<div className="icon-shape"></div>}
          />
        </div>

        <div className="charts-section">
          <div className="chart-container">
            <div className="chart-header">
              <h3>Phân bố theo gói đăng ký</h3>
            </div>
            <div className="chart-content">
              <div className="empty-state">
                <p>Không có dữ liệu trong khoảng thời gian đã chọn</p>
              </div>
              <canvas ref={lineChartRef} width="400" height="200"></canvas>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3>Xu hướng đăng ký theo thời gian</h3>
            </div>
            <div className="chart-content">
              <div className="empty-state">
                <p>Không có dữ liệu trong khoảng thời gian đã chọn</p>
              </div>
              <canvas ref={trendChartRef} width="400" height="200"></canvas>
            </div>
          </div>
        </div>

        <div className="subscriptions-table">
          <div className="table-header">
            <h3>Đăng ký đang hoạt động (0)</h3>
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
                <tr>
                  <td colSpan="7" className="empty-row">
                    Không có đăng ký nào trong khoảng thời gian đã chọn
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionDashboard;