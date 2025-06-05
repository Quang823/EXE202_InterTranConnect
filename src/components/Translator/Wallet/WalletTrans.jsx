import { ArrowDownLeft, ArrowUpRight, Plus, FileText, Eye, EyeOff, Copy, TrendingUp, WalletIcon, MoreHorizontal, Send, CreditCard } from 'lucide-react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./WalletTrans.scss"

const API_URL = import.meta.env.VITE_API_URL

const WalletTrans = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  // Get interpreterId from sessionStorage
  const sessionData = JSON.parse(sessionStorage.getItem("user"))
  const interpreterId = sessionData?.id
  
  const transactions = [
    { id: "#7890328", description: "Salary Deposit", amount: "5,200,000", date: "Today, 09:15 AM", status: "completed", type: "incoming", category: "Salary" },
    { id: "#3948509", description: "Investment Return", amount: "850,000", date: "Today, 08:30 AM", status: "completed", type: "incoming", category: "Investment" },
    { id: "#2980298", description: "Grocery Shopping", amount: "127,450", date: "Yesterday, 6:20 PM", status: "completed", type: "outgoing", category: "Food" },
    { id: "#7890328", description: "Netflix Subscription", amount: "159,900", date: "Yesterday, 2:15 PM", status: "completed", type: "outgoing", category: "Entertainment" },
    { id: "#3948509", description: "Freelance Payment", amount: "1,200,000", date: "Dec 2, 2024", status: "pending", type: "incoming", category: "Freelance" },
    { id: "#2980298", description: "Uber Ride", amount: "127,500", date: "Dec 1, 2024", status: "completed", type: "outgoing", category: "Transport" },
  ]

  const balance = 12847650
  const totalIncome = 7250000
  const totalExpenses = 414850

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText("4787 8749 8403 4787")
  }

  // Check for pending deposit when component mounts
  useEffect(() => {
    const checkPendingDeposit = async () => {
      const orderCode = localStorage.getItem("pendingDepositOrderCode")
      const amount = localStorage.getItem("pendingDepositAmount")

      if (orderCode && amount && interpreterId) {
        try {
          await axios.post(
            `${API_URL}/api/wallets/${interpreterId}/deposit?amount=${amount}&orderCode=${orderCode}`,
            {}
          )
          // Clear pending deposit data after successful API call
          localStorage.removeItem("pendingDepositOrderCode")
          localStorage.removeItem("pendingDepositAmount")
          // Refresh page to show updated balance
          window.location.reload()
        } catch (error) {
          console.error("Error completing deposit:", error)
        }
      }
    }

    checkPendingDeposit()
  }, [interpreterId])

  const handleDeposit = async () => {
    try {
      setLoading(true)
      
      // First API call to create deposit
      const createDepositResponse = await axios.post(`${API_URL}/api/payments/createDeposit`, {
        accountId: interpreterId,
        price: Number(depositAmount)
      })

      const { checkoutUrl, orderCode, amount } = createDepositResponse.data.data

      // Store orderCode and amount in localStorage for after payment
      localStorage.setItem("pendingDepositOrderCode", orderCode)
      localStorage.setItem("pendingDepositAmount", amount)

      // Redirect to payment page
      window.location.href = checkoutUrl

    } catch (error) {
      alert("Failed to create deposit. Please try again.")
    } finally {
      setLoading(false)
      setIsDepositModalOpen(false)
      setDepositAmount("")
    }
  }

  return (
    <div className="wt-app">
      <div className="wt-main">
        <main className="wt-content">
          {/* Premium Balance Card */}
          <div className="wt-balance-card">
            <div className="wt-balance-header">
              <div className="wt-balance-title">
                <WalletIcon size={24} />
                <h2>Premium Wallet</h2>
              </div>
              <button className="wt-menu-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="wt-balance-content">
              <div className="wt-balance-info">
                <div className="wt-balance-label">
                  <span>Total Balance</span>
                  <button className="wt-visibility-btn" onClick={toggleBalanceVisibility}>
                    {isBalanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                <div className="wt-balance-amount">
                  {isBalanceVisible ? `${balance.toLocaleString('vi-VN')} VND` : '••••••••'}
                </div>
                <div className="wt-balance-growth">
                  <TrendingUp size={16} />
                  <span>+12.5% from last month</span>
                </div>
              </div>

              <div className="wt-wallet-address">
                <span>4787 •••• •••• 4787</span>
                <button className="wt-copy-btn" onClick={copyToClipboard}>
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="wt-actions-section">
            <div className="wt-actions-grid">
              <button className="wt-action-btn wt-action-send">
                <Send size={24} />
                <span>Withdrawal</span>
              </button>
              <button 
                className="wt-action-btn wt-action-receive"
                onClick={() => setIsDepositModalOpen(true)}
              >
                <ArrowDownLeft size={24} />
                <span>Deposit</span>
              </button>
            </div>
          </div>

          {/* Deposit Modal */}
          {isDepositModalOpen && (
            <div className="wt-modal-overlay">
              <div className="wt-modal">
                <div className="wt-modal-content">
                  <input
                    type="number"
                    placeholder="Enter amount (VND)"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="wt-amount-input"
                  />
                  <div className="wt-modal-actions">
                    <button 
                      className="wt-modal-cancel"
                      onClick={() => {
                        setIsDepositModalOpen(false)
                        setDepositAmount("")
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="wt-modal-confirm"
                      onClick={handleDeposit}
                      disabled={!depositAmount || loading}
                    >
                      {loading ? "Processing..." : "Deposit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="wt-stats-section">
            <div className="wt-stat-card wt-stat-income">
              <div className="wt-stat-content">
                <div className="wt-stat-info">
                  <span className="wt-stat-label">Income</span>
                  <span className="wt-stat-amount">{totalIncome.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="wt-stat-icon">
                  <ArrowDownLeft size={24} />
                </div>
              </div>
            </div>
            <div className="wt-stat-card wt-stat-expense">
              <div className="wt-stat-content">
                <div className="wt-stat-info">
                  <span className="wt-stat-label">Expenses</span>
                  <span className="wt-stat-amount">{totalExpenses.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="wt-stat-icon">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Section */}
          <div className="wt-transaction-section">
            <div className="wt-transaction-header">
              <div>
                <h3 className="wt-transaction-title">Recent Activity</h3>
                <p className="wt-transaction-subtitle">Your latest transactions and payments</p>
              </div>
              <button className="wt-view-report">
                <FileText size={16} /> View Report
              </button>
            </div>

            <div className="wt-transaction-tabs">
              <button className="wt-tab wt-tab-active">All</button>
              <button className="wt-tab">Income</button>
              <button className="wt-tab">Expenses</button>
            </div>

            <div className="wt-transaction-list">
              {transactions.map((transaction, index) => (
                <div key={index} className={`wt-transaction-item wt-transaction-${transaction.type}`}>
                  <div className="wt-transaction-icon">
                    {transaction.type === 'incoming' ? 
                      <ArrowDownLeft size={20} /> : 
                      <ArrowUpRight size={20} />
                    }
                  </div>
                  <div className="wt-transaction-details">
                    <div className="wt-transaction-main">
                      <span className="wt-transaction-description">{transaction.description}</span>
                      <span className="wt-transaction-amount">
                        {transaction.type === 'incoming' ? '+' : '-'}{transaction.amount} VND
                      </span>
                    </div>
                    <div className="wt-transaction-meta">
                      <span className="wt-transaction-date">{transaction.date}</span>
                      <span className={`wt-transaction-status wt-status-${transaction.status}`}>
                        {transaction.status}
                      </span>
                      <span className="wt-transaction-category">{transaction.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="wt-view-all-btn">
              <FileText size={16} />
              View All Transactions
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WalletTrans