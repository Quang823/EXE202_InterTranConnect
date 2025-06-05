import { ArrowDownLeft, ArrowUpRight, Plus, FileText, Eye, EyeOff, Copy, TrendingUp, WalletIcon, MoreHorizontal, Send, CreditCard, Edit3, Trash2, X, Check } from 'lucide-react'
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
  
  // Get interpreterId and accessToken from sessionStorage
  const sessionData = JSON.parse(sessionStorage.getItem("user"))
  const interpreterId = sessionData?.id
  const accessToken = sessionData?.accessToken

  console.log("check accessToken",accessToken);
  
  // Bank Cards State
  const [showAddCard, setShowAddCard] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(0)
  const [error, setError] = useState("")
  
  const [bankCards, setBankCards] = useState([
    {
      id: 1,
      bankAccountNumber: "4787874984034787",
      bankName: "MB Bank",
      bankAccountHolderName: "Nguyen Van Nam",
      balance: 12847650,
      isDefault: true
    }
  ])

  const [newCard, setNewCard] = useState({
    bankAccountNumber: "",
    bankName: "",
    bankAccountHolderName: ""
  })
  
  const transactions = [
    { id: "#7890328", description: "Salary Deposit", amount: "5,200,000", date: "Today, 09:15 AM", status: "completed", type: "incoming", category: "Salary" },
    { id: "#3948509", description: "Investment Return", amount: "850,000", date: "Today, 08:30 AM", status: "completed", type: "incoming", category: "Investment" },
    { id: "#2980298", description: "Grocery Shopping", amount: "127,450", date: "Yesterday, 6:20 PM", status: "completed", type: "outgoing", category: "Food" },
    { id: "#7890328", description: "Netflix Subscription", amount: "159,900", date: "Yesterday, 2:15 PM", status: "completed", type: "outgoing", category: "Entertainment" },
    { id: "#3948509", description: "Freelance Payment", amount: "1,200,000", date: "Dec 2, 2024", status: "pending", type: "incoming", category: "Freelance" },
    { id: "#2980298", description: "Uber Ride", amount: "127,500", date: "Dec 1, 2024", status: "completed", type: "outgoing", category: "Transport" },
  ]

  const totalIncome = 7250000
  const totalExpenses = 414850

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text || "4787874984034787")
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

  // Card Management Functions
  const handleAddCard = async () => {
    if (newCard.bankAccountNumber && newCard.bankName && newCard.bankAccountHolderName) {
      try {
        setLoading(true)
        setError("")
        
        const response = await axios.put(
          'http://localhost:5000/api/auth/bank-account',
          {
            bankAccountNumber: newCard.bankAccountNumber,
            bankName: newCard.bankName,
            bankAccountHolderName: newCard.bankAccountHolderName
          },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 200) {
          const card = {
            id: Date.now(),
            ...newCard,
            balance: 0,
            isDefault: bankCards.length === 0
          }
          setBankCards([...bankCards, card])
          setNewCard({ bankAccountNumber: "", bankName: "", bankAccountHolderName: "" })
          setShowAddCard(false)
        }
      } catch (error) {
        console.error("Error adding bank card:", error)
        setError(error.response?.data?.message || "Failed to add bank card")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditCard = async (cardId, updatedCard) => {
    try {
      setLoading(true)
      setError("")
      
      const response = await axios.put(
        'http://localhost:5000/api/auth/bank-account',
        {
          bankAccountNumber: updatedCard.bankAccountNumber,
          bankName: updatedCard.bankName,
          bankAccountHolderName: updatedCard.bankAccountHolderName
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        setBankCards(bankCards.map(card => 
          card.id === cardId ? { ...card, ...updatedCard } : card
        ))
        setEditingCard(null)
      }
    } catch (error) {
      console.error("Error updating bank card:", error)
      setError(error.response?.data?.message || "Failed to update bank card")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCard = (cardId) => {
    setBankCards(bankCards.filter(card => card.id !== cardId))
    if (selectedCard >= bankCards.length - 1) {
      setSelectedCard(Math.max(0, bankCards.length - 2))
    }
  }

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const maskCardNumber = (number) => {
    return number.slice(0, 4) + ' •••• •••• ' + number.slice(-4)
  }

  return (
    <div className="wt-app">
      <div className="wt-main">
        <main className="wt-content">
          {/* Bank Cards Section */}
          <div className="wt-cards-section">
            <div className="wt-cards-header">
              <h2>My Cards</h2>
              <button className="wt-add-card-btn" onClick={() => setShowAddCard(true)}>
                <Plus size={16} />
                Add Card
              </button>
            </div>

            {/* Card Carousel */}
            <div className="wt-cards-carousel">
              {bankCards.map((card, index) => (
                <div 
                  key={card.id} 
                  className={`wt-bank-card ${selectedCard === index ? 'active' : ''}`}
                  onClick={() => setSelectedCard(index)}
                >
                  <div className="wt-card-actions">
                    <button 
                      className="wt-card-action-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingCard(card)
                      }}
                    >
                      <Edit3 size={16} />
                    </button>
                    {bankCards.length > 1 && (
                      <button 
                        className="wt-card-action-btn wt-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteCard(card.id)
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="wt-card-content">
                    <div className="wt-card-balance">
                      <span className="wt-card-label">Balance</span>
                      <span className="wt-card-amount">
                        {isBalanceVisible ? `${card.balance.toLocaleString('vi-VN')} VND` : '••••••••'}
                      </span>
                    </div>

                    <div className="wt-card-info">
                      <div className="wt-card-number">
                        {maskCardNumber(card.bankAccountNumber)}
                      </div>
                      <div className="wt-card-details">
                        <div className="wt-card-holder">{card.bankAccountHolderName}</div>
                        <div className="wt-card-bank">{card.bankName}</div>
                      </div>
                    </div>
                  </div>

                  {card.isDefault && <div className="wt-default-badge">Default</div>}
                </div>
              ))}
            </div>

            {/* Card Navigation Dots */}
            {bankCards.length > 1 && (
              <div className="wt-card-dots">
                {bankCards.map((_, index) => (
                  <button
                    key={index}
                    className={`wt-dot ${selectedCard === index ? 'active' : ''}`}
                    onClick={() => setSelectedCard(index)}
                  />
                ))}
              </div>
            )}
          </div>

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
                  {isBalanceVisible ? 
                    `${bankCards.reduce((sum, card) => sum + card.balance, 0).toLocaleString('vi-VN')} VND` : 
                    '••••••••'
                  }
                </div>
                <div className="wt-balance-growth">
                  <TrendingUp size={16} />
                  <span>+12.5% from last month</span>
                </div>
              </div>

              <div className="wt-wallet-address">
                <span>{bankCards.length > 0 ? maskCardNumber(bankCards[selectedCard]?.bankAccountNumber || '') : 'No cards'}</span>
                <button className="wt-copy-btn" onClick={() => copyToClipboard(bankCards[selectedCard]?.bankAccountNumber)}>
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

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="wt-modal-overlay">
          <div className="wt-modal">
            <div className="wt-modal-header">
              <h3>Add New Card</h3>
              <button className="wt-modal-close" onClick={() => setShowAddCard(false)}>
                <X size={20} />
              </button>
            </div>
            {error && <div className="wt-error-message">{error}</div>}
            <div className="wt-modal-content">
              <div className="wt-form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  placeholder="Enter bank name"
                  value={newCard.bankName}
                  onChange={(e) => setNewCard({...newCard, bankName: e.target.value})}
                />
              </div>
              <div className="wt-form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  placeholder="Enter account number"
                  value={newCard.bankAccountNumber}
                  onChange={(e) => setNewCard({...newCard, bankAccountNumber: e.target.value})}
                />
              </div>
              <div className="wt-form-group">
                <label>Account Holder Name</label>
                <input
                  type="text"
                  placeholder="Enter account holder name"
                  value={newCard.bankAccountHolderName}
                  onChange={(e) => setNewCard({...newCard, bankAccountHolderName: e.target.value})}
                />
              </div>
            </div>
            <div className="wt-modal-footer">
              <button className="wt-btn wt-btn-secondary" onClick={() => setShowAddCard(false)}>
                Cancel
              </button>
              <button 
                className="wt-btn wt-btn-primary" 
                onClick={handleAddCard}
                disabled={loading}
              >
                <Check size={16} />
                {loading ? "Adding..." : "Add Card"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {editingCard && (
        <div className="wt-modal-overlay">
          <div className="wt-modal">
            <div className="wt-modal-header">
              <h3>Edit Card</h3>
              <button className="wt-modal-close" onClick={() => setEditingCard(null)}>
                <X size={20} />
              </button>
            </div>
            {error && <div className="wt-error-message">{error}</div>}
            <div className="wt-modal-content">
              <div className="wt-form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={editingCard.bankName}
                  onChange={(e) => setEditingCard({...editingCard, bankName: e.target.value})}
                />
              </div>
              <div className="wt-form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={editingCard.bankAccountNumber}
                  onChange={(e) => setEditingCard({...editingCard, bankAccountNumber: e.target.value})}
                />
              </div>
              <div className="wt-form-group">
                <label>Account Holder Name</label>
                <input
                  type="text"
                  value={editingCard.bankAccountHolderName}
                  onChange={(e) => setEditingCard({...editingCard, bankAccountHolderName: e.target.value})}
                />
              </div>
            </div>
            <div className="wt-modal-footer">
              <button className="wt-btn wt-btn-secondary" onClick={() => setEditingCard(null)}>
                Cancel
              </button>
              <button 
                className="wt-btn wt-btn-primary" 
                onClick={() => handleEditCard(editingCard.id, editingCard)}
                disabled={loading}
              >
                <Check size={16} />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletTrans