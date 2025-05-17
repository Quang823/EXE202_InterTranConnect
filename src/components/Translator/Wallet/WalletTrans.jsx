import React from 'react';
import './WalletTrans.scss';

const WalletTrans = () => {
  const transactions = [
    { id: '#7890328', amount: '10,000', date: '16 Jan 2:30pm' },
    { id: '#3948509', amount: '10,000', date: '15 Jan 3:30pm' },
    { id: '#2980298', amount: '10,000', date: '14 Jan 2:30pm' },
    { id: '#7890328', amount: '10,000', date: '16 Jan 2:30pm' },
    { id: '#3948509', amount: '10,000', date: '15 Jan 3:30pm' },
    { id: '#2980298', amount: '10,000', date: '14 Jan 2:30pm' },
  ];

  return (
    <div className="wt-app">
      <div className="wt-main">
        <aside className="wt-sidebar">
          <nav className="wt-nav">
            <div className="wt-nav-item wt-nav-item--active">
              <i className="fas fa-wallet wt-nav-icon"></i>
              <span className="wt-nav-text">My Wallet</span>
              <i className="fas fa-chevron-down wt-nav-dropdown"></i>
            </div>
            <div className="wt-nav-sub">
              <div className="wt-sub-item">Card List</div>
              <div className="wt-sub-item">History</div>
            </div>
            <div className="wt-nav-item">
              <i className="fas fa-cog wt-nav-icon"></i>
              <span className="wt-nav-text">Settings</span>
              <i className="fas fa-chevron-right wt-nav-arrow"></i>
            </div>
          </nav>
        </aside>

        <main className="wt-content">
          <div className="wt-card-section">
            <div className="wt-card-header">
              <h2 className="wt-card-title">My <span className="wt-highlight">Card</span></h2>
              <button className="wt-add-card">
                <i className="fas fa-plus"></i> Add Card
              </button>
            </div>
            <div className="wt-card-container">
              <div className="wt-card">
                <div className="wt-card-balance">
                  <span className="wt-card-label">Current Balance : </span>
                  <span className="wt-card-amount">2,85,856.20 VND</span>
                </div>
                <div className="wt-card-actions">
                  <button className="wt-card-button wt-card-button--deposit">
                    <i className="fas fa-arrow-down"></i> Deposit
                  </button>
                  <button className="wt-card-button wt-card-button--withdraw">
                    <i className="fas fa-arrow-up"></i> Withdraw
                  </button>
                  <div className="wt-partner-logo"></div>
                </div>
                <div className="wt-card-details">
                  <span className="wt-card-issuer">MB Bank</span>
                  <span className="wt-card-number">
                    4787 <span className="wt-hidden-digits">•••• ••••</span> 4787
                  </span>
                  <div className="wt-card-network"></div>
                </div>
              </div>
              <div className="wt-card-meta">
                <div className="wt-meta-item">
                  <span className="wt-meta-label">Card Holder : </span>
                  <span className="wt-meta-value wt-highlight">Nam</span>
                </div>
                <div className="wt-meta-item">
                  <span className="wt-meta-label">Card Number : </span>
                  <span className="wt-meta-value wt-highlight">4787 8749 8403 4787</span>
                </div>
              </div>
            </div>
          </div>

          <div className="wt-transaction-section">
            <div className="wt-transaction-header">
              <h3 className="wt-transaction-title">Transaction History</h3>
              <button className="wt-view-report">
                <i className="fas fa-file-alt"></i> View Report
              </button>
            </div>
            <div className="wt-transaction-table">
              <table>
                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>ITC</td>
                      <td>{transaction.id}</td>
                      <td className="wt-amount">{transaction.amount}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WalletTrans;