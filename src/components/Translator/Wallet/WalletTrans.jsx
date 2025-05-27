import { ArrowDown, ArrowUp, Plus, FileText } from "lucide-react"
import "./WalletTrans.scss"

const WalletTrans = () => {
  const transactions = [
    { id: "#7890328", amount: "10,000", date: "16 Jan 2:30pm", status: "completed" },
    { id: "#3948509", amount: "10,000", date: "15 Jan 3:30pm", status: "completed" },
    { id: "#2980298", amount: "10,000", date: "14 Jan 2:30pm", status: "pending" },
    { id: "#7890328", amount: "10,000", date: "16 Jan 2:30pm", status: "completed" },
    { id: "#3948509", amount: "10,000", date: "15 Jan 3:30pm", status: "pending" },
    { id: "#2980298", amount: "10,000", date: "14 Jan 2:30pm", status: "failed" },
  ]

  return (
    <div className="wt-app">
      <div className="wt-main">
        <main className="wt-content">
          <div className="wt-card-section">
            <div className="wt-card-header">
              <h2 className="wt-card-title">
                My <span className="wt-highlight">Card</span>
              </h2>
              <button className="wt-add-card">
                <Plus size={16} /> Add Card
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
                    <ArrowDown size={16} /> Deposit
                  </button>
                  <button className="wt-card-button wt-card-button--withdraw">
                    <ArrowUp size={16} /> Withdraw
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
                <FileText size={16} /> View Report
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
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index} className={`status-${transaction.status}`}>
                      <td>ITC</td>
                      <td>{transaction.id}</td>
                      <td className="wt-amount">{transaction.amount} VND</td>
                      <td>{transaction.date}</td>
                      <td className="wt-status">
                        <span className="wt-status-indicator"></span>
                        {transaction.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WalletTrans
