"use client";

import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AdminDashboard.scss";

// Import icons from a library like react-icons or use your own SVG components
// For this example, I'll create simple icon components
const IconBell = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const IconSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const IconChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const IconChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const IconChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const IconTrendingUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

// Category icons
const IconShoppingCart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const IconFileText = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IconHotel = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 14h18v7H3z"></path>
    <path d="M21 7v7m-9-7V4h7v3"></path>
    <path d="M3 7h9v7H3z"></path>
  </svg>
);

const IconDollarSign = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const IconSettings = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // Default date range: Current month (May 2025)
  const today = new Date("2025-05-13"); // Using current date as per context
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // State for date range
  const [dateRange, setDateRange] = useState({
    startDate: firstDayOfMonth,
    endDate: lastDayOfMonth,
  });

  // Sample data generation (dynamic, not tied to specific dates)
  const generateSampleData = (startDate, endDate) => {
    const daysBetween = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const weeklyData = [];
    const monthlyData = [];

    for (let i = 0; i <= daysBetween; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Weekly Comparison data
      weeklyData.push({
        date: currentDate.toISOString().split("T")[0],
        thisWeek: Math.floor(Math.random() * 30000) + 5000, // Random data between 5k and 35k
        lastWeek: Math.floor(Math.random() * 25000) + 3000, // Random data between 3k and 28k
      });

      // Monthly User Count data
      monthlyData.push({
        date: currentDate.toISOString().split("T")[0],
        today: 20 + i * 5, // Linear growth for simplicity
        yesterday: 15 + i * 5, // Slightly lower than today
      });
    }

    return { weeklyData, monthlyData };
  };

  // Generate data based on the selected date range
  const { weeklyData, monthlyData } = generateSampleData(
    dateRange.startDate,
    dateRange.endDate
  );

  // Filter data based on date range
  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  // Filter Weekly Comparison data
  const filteredWeeklyData = filterDataByDateRange(
    weeklyData,
    dateRange.startDate,
    dateRange.endDate
  );
  const barData = {
    labels: filteredWeeklyData.map((item) => {
      const date = new Date(item.date);
      return `${date.getDate()} ${date.toLocaleString("default", {
        weekday: "short",
      })}`;
    }),
    datasets: [
      {
        label: "This week",
        data: filteredWeeklyData.map((item) => item.thisWeek),
        backgroundColor: "rgba(124, 58, 237, 0.8)",
        borderColor: "rgba(124, 58, 237, 1)",
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
      },
      {
        label: "Last week",
        data: filteredWeeklyData.map((item) => item.lastWeek),
        backgroundColor: "rgba(200, 200, 200, 0.6)",
        borderColor: "rgba(200, 200, 200, 1)",
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  };

  // Filter Monthly User Count data
  const filteredMonthlyData = filterDataByDateRange(
    monthlyData,
    dateRange.startDate,
    dateRange.endDate
  );
  const lineData = {
    labels: filteredMonthlyData.map((item) => new Date(item.date).getDate()),
    datasets: [
      {
        label: "Today",
        data: filteredMonthlyData.map((item) => item.today),
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          );
          gradient.addColorStop(0, "rgba(124, 58, 237, 0.6)");
          gradient.addColorStop(1, "rgba(124, 58, 237, 0.1)");
          return gradient;
        },
        borderColor: "rgb(124, 58, 237)",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(124, 58, 237)",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Yesterday",
        data: filteredMonthlyData.map((item) => item.yesterday),
        fill: false,
        borderColor: "#bdc3c7",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 12 }, color: "#64748b" },
      },
      title: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value / 1000}k`,
          color: "#64748b",
          font: { size: 12 },
        },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#64748b", font: { size: 12 } },
        grid: { color: "#e2e8f0" },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const lineOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 12 }, color: "#64748b" },
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
        backgroundColor: "#fff",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        borderColor: "#e2e8f0",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 140,
        ticks: { color: "#64748b", font: { size: 12 } },
        grid: { color: "#e2e8f0", drawBorder: false },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  // Mini chart data for user statistics
  const clientMiniChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Clients",
        data: [2600, 2620, 2630, 2640, 2643],
        borderColor: "rgb(124, 58, 237)",
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const translatorMiniChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Translators",
        data: [2600, 2620, 2630, 2640, 2643],
        borderColor: "#f59e0b",
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const miniChartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: {
        display: false,
        beginAtZero: true,
        max: 2650,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-title">
          Business <span className="separator">»</span>{" "}
          {dateRange.startDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="dashboard-actions">
          <div className="search-container">
            <IconSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <button className="icon-button notification-button">
            <IconBell />
            <span className="notification-indicator"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Dashboard Overview and Top Find in the same row */}
        <div className="overview-topfind-row">
          {/* Top Find */}
          <div className="topfind-container">
            <div className="card sidebar-card">
              <div className="card-header">
                <div className="card-header-content">
                  <h3 className="card-title">Top Find</h3>
                  <button className="view-all-button">
                    View All
                    <IconChevronRight className="icon-small" />
                  </button>
                </div>
              </div>
              <div className="card-content">
                <ul className="category-list">
                  <li className="category-item">
                    <div className="category-icon">
                      <IconShoppingCart />
                    </div>
                    <span className="category-name">Commerce</span>
                    <span className="category-views">1745 views</span>
                  </li>
                  <li className="category-item">
                    <div className="category-icon">
                      <IconFileText />
                    </div>
                    <span className="category-name">General</span>
                    <span className="category-views">2000 views</span>
                  </li>
                  <li className="category-item">
                    <div className="category-icon">
                      <IconHotel />
                    </div>
                    <span className="category-name">Hotels & Tourism</span>
                    <span className="category-views">4243 views</span>
                  </li>
                  <li className="category-item">
                    <div className="category-icon">
                      <IconDollarSign />
                    </div>
                    <span className="category-name">Financial Services</span>
                    <span className="category-views">235 views</span>
                  </li>
                  <li className="category-item">
                    <div className="category-icon">
                      <IconSettings />
                    </div>
                    <span className="category-name">Technical</span>
                    <span className="category-views">12 views</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Dashboard Overview */}
          <div className="overview-container">
            <div className="card">
              <div className="card-content">
                <div className="date-picker-header">
                  <h2 className="section-title">Dashboard Overview</h2>
                  <div className="date-picker-wrapper">
                    <label>Date: </label>
                    <div className="date-pickers">
                      <DatePicker
                        selected={dateRange.startDate}
                        onChange={(date) =>
                          setDateRange({ ...dateRange, startDate: date })
                        }
                        selectsStart
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Start Date"
                        className="date-input"
                      />
                      <DatePicker
                        selected={dateRange.endDate}
                        onChange={(date) =>
                          setDateRange({ ...dateRange, endDate: date })
                        }
                        selectsEnd
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        minDate={dateRange.startDate}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="End Date"
                        className="date-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Row Cards */}
        <div className="dashboard-cards">
          {/* Total Balance Card */}
          <div className="card balance-card">
            <div className="card-header">
              <h3 className="card-title">Total Balance</h3>
            </div>
            <div className="card-content">
              <div className="balance-amount">$240,399</div>
              <div className="account-info">
                <div className="account-badge">Debit Card</div>
                <div className="account-number">**** **** 2598</div>
                <div className="account-navigation">
                  <button className="nav-button prev-button">
                    <IconChevronLeft className="icon-small" />
                    Previous
                  </button>
                  <button className="nav-button next-button">
                    Next
                    <IconChevronRight className="icon-small" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Goals Card */}
          <div className="card goals-card">
            <div className="card-header">
              <h3 className="card-title">Goals</h3>
            </div>
            <div className="card-content">
              <div className="goals-header">
                <div className="goals-amount">$20,000</div>
                <IconChevronDown className="icon-small" />
              </div>
              <div className="goals-progress">
                <div className="progress-info">
                  <span className="progress-label">Target Achieved</span>
                  <span className="progress-value">$12,500</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: "62.5%" }}
                  ></div>
                </div>
                <div className="progress-info">
                  <span className="progress-label">This month Target</span>
                  <span className="progress-value">$20,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* ITC User Statistics Card */}
          <div className="card stats-card">
            <div className="card-header">
              <h3 className="card-title">ITC User Statistics</h3>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-header">
                    <span className="stat-label">Clients</span>
                    <div className="stat-value-container">
                      <div className="stat-value">2,643</div>
                      <div className="stat-change positive">
                        <IconTrendingUp className="icon-tiny" />
                        1.10% Since yesterday
                      </div>
                    </div>
                  </div>
                  <div className="mini-chart">
                    <Line
                      data={clientMiniChartData}
                      options={miniChartOptions}
                    />
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-header">
                    <span className="stat-label">Translator</span>
                    <div className="stat-value-container">
                      <div className="stat-value">2,643</div>
                      <div className="stat-change positive">
                        <IconTrendingUp className="icon-tiny" />
                        1.10% Since yesterday
                      </div>
                    </div>
                  </div>
                  <div className="mini-chart">
                    <Line
                      data={translatorMiniChartData}
                      options={miniChartOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section (now full width) */}
        <div className="charts-section">
          {/* Weekly Comparison Chart */}
          <div className="card chart-card">
            <div className="card-header">
              <div className="card-header-content">
                <h3 className="card-title">Weekly Comparison</h3>
                <button className="icon-button">
                  <IconChevronDown className="icon-small" />
                </button>
              </div>
            </div>
            <div className="card-content">
              <div className="chart-container">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>

          {/* Monthly User Count Chart */}
          <div className="card chart-card">
            <div className="card-header">
              <h3 className="card-title">Monthly User Count</h3>
              <div className="card-subtitle">Current User Trends</div>
            </div>
            <div className="card-content">
              <div className="chart-container">
                <Line data={lineData} options={lineOptions} />
              </div>
              <div className="metrics-grid">
                <div className="metric-item">
                  <div className="metric-label">Total Visitors</div>
                  <div className="metric-value">449</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">New Sign-ups</div>
                  <div className="metric-value">426</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Avg. Session</div>
                  <div className="metric-value">33m</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Time Per User</div>
                  <div className="metric-value">3h 8m</div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">Returning Rate</div>
                  <div className="metric-value">94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
