import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Filter } from 'lucide-react';
import './Dashboard.scss'; 

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState('30days');
  const [showCount, setShowCount] = useState(5);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  // Sample data with dates for filtering
  const allTransactions = [
    { customer: 'TechCorp Vietnam', date: '2024-06-28', amount: 5000000, category: 'Gói SaaS', method: 'Online Payment' },
    { customer: 'StartupVN', date: '2024-06-27', amount: 15000000, category: 'Tư vấn', method: 'Bank Transfer' },
    { customer: 'Fintech Vietnam', date: '2024-06-26', amount: 2500000, category: 'Phí dịch vụ', method: 'Online Payment' },
    { customer: 'DataTech Solutions', date: '2024-06-25', amount: 8000000, category: 'Gói SaaS', method: 'Online Payment' },
    { customer: 'AI Startup Co', date: '2024-06-24', amount: 12000000, category: 'Tư vấn', method: 'Bank Transfer' },
    { customer: 'CloudVN', date: '2024-06-20', amount: 3000000, category: 'Mua một lần', method: 'Online Payment' },
    { customer: 'BlockchainVN', date: '2024-06-15', amount: 7500000, category: 'Gói SaaS', method: 'Bank Transfer' },
    { customer: 'IoT Vietnam', date: '2024-06-10', amount: 4200000, category: 'Phí dịch vụ', method: 'Online Payment' },
    { customer: 'MobileFirst', date: '2024-06-05', amount: 9800000, category: 'Tư vấn', method: 'Bank Transfer' },
    { customer: 'WebTech Pro', date: '2024-05-30', amount: 6300000, category: 'Mua một lần', method: 'Online Payment' },
    { customer: 'DevOps Vietnam', date: '2024-05-25', amount: 11000000, category: 'Gói SaaS', method: 'Bank Transfer' },
    { customer: 'CyberSec VN', date: '2024-05-20', amount: 8900000, category: 'Tư vấn', method: 'Online Payment' },
    { customer: 'GameDev Studio', date: '2024-05-15', amount: 5600000, category: 'Phí dịch vụ', method: 'Bank Transfer' },
    { customer: 'EcommerceTech', date: '2024-05-10', amount: 13200000, category: 'Gói SaaS', method: 'Online Payment' },
    { customer: 'EdTech Innovation', date: '2024-05-05', amount: 7800000, category: 'Mua một lần', method: 'Bank Transfer' }
  ];

  // Filter transactions based on selected date range
  const getFilteredTransactions = () => {
    const now = new Date();
    let startDate = new Date();
    
    switch (dateFilter) {
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'custom':
        if (customDateRange.startDate && customDateRange.endDate) {
          startDate = new Date(customDateRange.startDate);
          const endDate = new Date(customDateRange.endDate);
          return allTransactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate >= startDate && transactionDate <= endDate;
          });
        }
        return allTransactions;
      default:
        startDate.setDate(now.getDate() - 30);
    }
    
    return allTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate;
    });
  };

  // Calculate statistics based on filtered data
  const filteredTransactions = useMemo(() => getFilteredTransactions(), [dateFilter, customDateRange]);

  const statistics = useMemo(() => {
    const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalTransactions = filteredTransactions.length;
    const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // Group by category for pie chart
    const categoryGroups = filteredTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const totalForPercentage = Object.values(categoryGroups).reduce((sum, val) => sum + val, 0);
    const pieChartData = Object.entries(categoryGroups).map(([name, value]) => ({
      name,
      value: totalForPercentage > 0 ? ((value / totalForPercentage) * 100) : 0,
      color: name === 'Gói SaaS' ? '#8B5CF6' : 
             name === 'Tư vấn' ? '#06B6D4' : 
             name === 'Phí dịch vụ' ? '#EC4899' : '#F59E0B'
    }));

    // Generate line chart data
    const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lineChartData = [];
    const dailyRevenue = {};

    // Group transactions by day
    sortedTransactions.forEach(t => {
      const date = new Date(t.date);
      const dateKey = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      dailyRevenue[dateKey] = (dailyRevenue[dateKey] || 0) + t.amount;
    });

    // Convert to chart format
    Object.entries(dailyRevenue).forEach(([date, value]) => {
      lineChartData.push({ date, value: value / 1000000 }); // Convert to millions
    });

    return {
      totalRevenue,
      totalTransactions,
      avgTransactionValue,
      pieChartData,
      lineChartData
    };
  }, [filteredTransactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const StatCard = ({ title, value, trend, trendText, color, icon: Icon }) => (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-trend ${trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral'}`}>
        {trend === 'up' && <TrendingUp size={16} />}
        {trend === 'down' && <TrendingDown size={16} />}
        <span>{trendText}</span>
      </div>
    </div>
  );

  const CategoryBadge = ({ category }) => {
    const getColor = (cat) => {
      switch (cat) {
        case 'Gói SaaS': return 'badge-purple';
        case 'Tư vấn': return 'badge-blue';
        case 'Phí dịch vụ': return 'badge-pink';
        default: return 'badge-gray';
      }
    };

    return <span className={`category-badge ${getColor(category)}`}>{category}</span>;
  };

  // Handle load more button click
  const handleLoadMore = () => {
    setShowCount(prevCount => prevCount + 5); // Increase number of visible transactions by 5
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Doanh thu</h1>
          <p>Phân tích và theo dõi dòng tiền</p>
        </div>
        <div className="header-controls">
          <div className="date-filter-container">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${dateFilter === '7days' ? 'active' : ''}`}
                onClick={() => setDateFilter('7days')}
              >
                7 ngày
              </button>
              <button 
                className={`filter-btn ${dateFilter === '30days' ? 'active' : ''}`}
                onClick={() => setDateFilter('30days')}
              >
                30 ngày
              </button>
              <button 
                className={`filter-btn ${dateFilter === '90days' ? 'active' : ''}`}
                onClick={() => setDateFilter('90days')}
              >
                3 tháng
              </button>
              <button 
                className={`filter-btn ${dateFilter === '1year' ? 'active' : ''}`}
                onClick={() => setDateFilter('1year')}
              >
                1 năm
              </button>
              <button 
                className={`filter-btn ${dateFilter === 'custom' ? 'active' : ''}`}
                onClick={() => setDateFilter('custom')}
              >
                <Calendar size={16} />
                Tùy chỉnh
              </button>
            </div>
            
            {dateFilter === 'custom' && (
              <div className="custom-date-range">
                <div className="date-input-group">
                  <label>Từ ngày:</label>
                  <input
                    type="date"
                    value={customDateRange.startDate}
                    onChange={(e) => setCustomDateRange(prev => ({
                      ...prev,
                      startDate: e.target.value
                    }))}
                    className="date-input"
                  />
                </div>
                <div className="date-input-group">
                  <label>Đến ngày:</label>
                  <input
                    type="date"
                    value={customDateRange.endDate}
                    onChange={(e) => setCustomDateRange(prev => ({
                      ...prev,
                      endDate: e.target.value
                    }))}
                    className="date-input"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Tổng doanh thu"
          value="96.500.000 đ"
          trend="up"
          trendText="Tăng trưởng mọi thời điểm"
          color="green"
          icon={DollarSign}
        />
        <StatCard
          title="Doanh thu tháng này"
          value="0 đ"
          trend="neutral"
          trendText="0.0% so với tháng trước"
          color="blue"
          icon={TrendingUp}
        />
        <StatCard
          title="Tổng giao dích"
          value="12"
          trend="up"
          trendText="Số lượng giao dịch"
          color="purple"
          icon={Users}
        />
        <StatCard
          title="Giá giao dịch trung bình"
          value="8.041.667 đ"
          trend="up"
          trendText="Giá trị mỗi giao dịch"
          color="orange"
          icon={DollarSign}
        />
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Doanh thu theo thời gian (Triệu VNĐ)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statistics.lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Doanh thu theo danh mục</h3>
          <div className="pie-chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statistics.pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statistics.pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {statistics.pieChartData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="transactions-section">
        <h3>Giao dịch gần đây</h3>
        <div className="transactions-table">
          <div className="table-header">
            <div>Khách hàng</div>
            <div>Ngày</div>
            <div>Số tiền</div>
            <div>Danh mục</div>
            <div>Nguồn</div>
          </div>
          {filteredTransactions.slice(0, showCount).map((transaction, index) => (
            <div key={index} className="table-row">
              <div className="customer-name">{transaction.customer}</div>
              <div className="transaction-date">{formatDate(transaction.date)}</div>
              <div className="transaction-amount">{formatCurrency(transaction.amount)}</div>
              <div className="transaction-category"><CategoryBadge category={transaction.category} /></div>
              <div className="payment-method">{transaction.method}</div>
            </div>
          ))}
        </div>
        {showCount < filteredTransactions.length && (
          <div className="transactions-footer">
            <button onClick={handleLoadMore}>Xem thêm</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;