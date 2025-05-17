import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AdminDashboard.scss';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // Default date range: Current month (May 2025)
  const today = new Date('2025-05-13'); // Using current date as per context
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // State for date range
  const [dateRange, setDateRange] = useState({
    startDate: firstDayOfMonth,
    endDate: lastDayOfMonth,
  });

  // Sample data generation (dynamic, not tied to specific dates)
  const generateSampleData = (startDate, endDate) => {
    const daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const weeklyData = [];
    const monthlyData = [];

    for (let i = 0; i <= daysBetween; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Weekly Comparison data
      weeklyData.push({
        date: currentDate.toISOString().split('T')[0],
        thisWeek: Math.floor(Math.random() * 30000) + 5000, // Random data between 5k and 35k
        lastWeek: Math.floor(Math.random() * 25000) + 3000, // Random data between 3k and 28k
      });

      // Monthly User Count data
      monthlyData.push({
        date: currentDate.toISOString().split('T')[0],
        today: 20 + i * 5, // Linear growth for simplicity
        yesterday: 15 + i * 5, // Slightly lower than today
      });
    }

    return { weeklyData, monthlyData };
  };

  // Generate data based on the selected date range
  const { weeklyData, monthlyData } = generateSampleData(dateRange.startDate, dateRange.endDate);

  // Filter data based on date range
  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  // Filter Weekly Comparison data
  const filteredWeeklyData = filterDataByDateRange(weeklyData, dateRange.startDate, dateRange.endDate);
  const barData = {
    labels: filteredWeeklyData.map((item) => {
      const date = new Date(item.date);
      return `${date.getDate()} ${date.toLocaleString('default', { weekday: 'short' })}`;
    }),
    datasets: [
      {
        label: 'This week',
        data: filteredWeeklyData.map((item) => item.thisWeek),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
      },
      {
        label: 'Last week',
        data: filteredWeeklyData.map((item) => item.lastWeek),
        backgroundColor: 'rgba(200, 200, 200, 0.6)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  };

  // Filter Monthly User Count data
  const filteredMonthlyData = filterDataByDateRange(monthlyData, dateRange.startDate, dateRange.endDate);
  const lineData = {
    labels: filteredMonthlyData.map((item) => new Date(item.date).getDate()),
    datasets: [
      {
        label: 'Today',
        data: filteredMonthlyData.map((item) => item.today),
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, 'rgba(52, 152, 219, 0.6)');
          gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
          return gradient;
        },
        borderColor: '#3498db',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3498db',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Yesterday',
        data: filteredMonthlyData.map((item) => item.yesterday),
        fill: false,
        borderColor: '#bdc3c7',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12 }, color: '#636e72' } },
      title: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { callback: (value) => `$${value / 1000}k`, color: '#636e72', font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#636e72', font: { size: 12 } },
        grid: { color: '#dfe6e9' },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const lineOptions = {
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12 }, color: '#636e72' } },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
        backgroundColor: '#fff',
        titleColor: '#2d3436',
        bodyColor: '#2d3436',
        borderColor: '#dfe6e9',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#636e72', font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 140,
        ticks: { color: '#636e72', font: { size: 12 } },
        grid: { color: '#dfe6e9', drawBorder: false },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return (
    <div className="admindash-container">
      <div className="admindash-header">
        <div className="admindash-title">
          Business <span>»</span>{' '}
          {dateRange.startDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <div className="admindash-search">
          <input type="text" placeholder="Search here" />
          <span className="admindash-bell">🔔</span>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="admindash-date-picker">
        <label>Select Date Range: </label>
        <DatePicker
          selected={dateRange.startDate}
          onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
          selectsStart
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Start Date"
        />
        <DatePicker
          selected={dateRange.endDate}
          onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
          selectsEnd
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          minDate={dateRange.startDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="End Date"
        />
      </div>

      <div className="admindash-main">
        <div className="admindash-section admindash-balance">
          <h3>Total Balance</h3>
          <div className="admindash-balance-content">
            <span>$240,399</span>
            <div className="admindash-account">
              <span className="admindash-account-type" style={{ backgroundColor: '#ff6b81' }}>
                Account Type<br />Debit Card
              </span>
              <span>**** **** 2598</span>
              <div className="admindash-nav">
                <span className="admindash-previous">« Previous</span>
                <span className="admindash-next">Next »</span>
              </div>
            </div>
          </div>
        </div>
        <div className="admindash-section admindash-goals">
          <h3>Goals</h3>
          <div className="admindash-goals-content">
            <span>$20,000 <span>ˇ</span></span>
            <div className="admindash-gauge">
              <span>Target Achieved<br />$12,500</span>
              <div className="admindash-gauge-progress" style={{ '--progress': '62.5%' }}></div>
              <span>This month Target<br />$20,000</span>
            </div>
          </div>
        </div>
        <div className="admindash-section admindash-stats">
          <h3>ITC User Statistics</h3>
          <div className="admindash-stats-content">
            <div className="admindash-stat-item">
              <span>Clients</span>
              <span>2,643 <span style={{ color: '#2ecc71' }}>↑ 1.10% Since yesterday</span></span>
              <Line
                data={{
                  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
                  datasets: [
                    {
                      label: 'Clients',
                      data: [2600, 2620, 2630, 2640, 2643],
                      borderColor: '#ff6b81',
                      fill: false,
                      tension: 0.4,
                      pointRadius: 0,
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true, max: 2650, ticks: { color: '#636e72', font: { size: 10 } } } },
                }}
              />
            </div>
            <div className="admindash-stat-item">
              <span>Translator</span>
              <span>2,643 <span style={{ color: '#2ecc71' }}>↑ 1.10% Since yesterday</span></span>
              <Line
                data={{
                  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
                  datasets: [
                    {
                      label: 'Translators',
                      data: [2600, 2620, 2630, 2640, 2643],
                      borderColor: '#f1c40f',
                      fill: false,
                      tension: 0.4,
                      pointRadius: 0,
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true, max: 2650, ticks: { color: '#636e72', font: { size: 10 } } } },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="admindash-sidebar">
        <h3>Top Find <span className="admindash-view-all">View All »</span></h3>
        <ul className="admindash-top-list">
          <li><span className="admindash-icon">🛒</span> Commerce <span>1745 views</span></li>
          <li><span className="admindash-icon">📋</span> General <span>2000 views</span></li>
          <li><span className="admindash-icon">🏨</span> Hotels & Tourism <span>4243 views</span></li>
          <li><span className="admindash-icon">💰</span> Financial Services <span>235 views</span></li>
          <li><span className="admindash-icon">⚙️</span> Technical <span>12 views</span></li>
        </ul>
      </div>
      <div className="admindash-charts">
        <div className="admindash-chart-section">
          <h3>Weekly Comparison <span>˅</span></h3>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="admindash-chart-section">
          <h3>Monthly User Count</h3>
          <div className="admindash-trends">
            <span>Current User Trends</span>
            <Line data={lineData} options={lineOptions} />
          </div>
          <div className="admindash-metrics">
            <div>Total Visitors <span>449</span></div>
            <div>New Sign-ups <span>426</span></div>
            <div>Avg. Session Duration <span>33m</span></div>
            <div>Avg. Time Spent Per User <span>3h 8m</span></div>
            <div>Returning Rate <span>94%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;