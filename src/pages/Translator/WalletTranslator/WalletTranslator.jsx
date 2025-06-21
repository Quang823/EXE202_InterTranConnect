import { ArrowDownLeft, ArrowUpRight, Plus, FileText, Eye, EyeOff, Copy, TrendingUp, WalletIcon, MoreHorizontal, Send, CreditCard, Edit3, Trash2, X, Check } from 'lucide-react'
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2'
import "./WalletTranslator.scss"
import { createDepositDetail } from "../../../services/paymentService";

const API_URL = import.meta.env.VITE_API_URL

const WalletTranslator = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [withdrawalNote, setWithdrawalNote] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  // Get interpreterId and accessToken from sessionStorage
  const sessionData = JSON.parse(sessionStorage.getItem("user"))
  const interpreterId = sessionData?.id
  const accessToken = sessionStorage.getItem("accessToken")

  console.log("check accessToken",accessToken);
  
  // Bank Cards State
  const [showAddCard, setShowAddCard] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(0)
  const [error, setError] = useState("")
  
  const [bankCards, setBankCards] = useState([])
  const [transactions, setTransactions] = useState([])

  const [newCard, setNewCard] = useState({
    bankAccountNumber: "",
    bankName: "",
    bankAccountHolderName: ""
  })
  
  const totalIncome = 7250000
  const totalExpenses = 414850

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text || "4787874984034787")
  }

  const getStatusColor = (status) => {
    const colors = {
      0: "wt-status-blue",
      1: "wt-status-purple",
      2: "wt-status-red",
    };
    return colors[status] || "wt-status-default";
  };

  const getStatusText = (status) => {
    const texts = {
      0: "Pending",
      1: "Waiting Confirm",
      2: "Completed",
      3: "Canceled",
    };
    return texts[status] || "Unknown";
  };

  const fetchTransactions = useCallback(async () => {
    if (!accessToken) {
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/api/withdrawal-requests/my-requests`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      
      let withdrawalRequests = response.data?.data || response.data || [];
      if (!Array.isArray(withdrawalRequests)) {
        withdrawalRequests = [withdrawalRequests];
      }

      const formattedTransactions = withdrawalRequests.map(req => ({
        id: req.withdrawalRequestId,
        description: req.userName,
        amount: req.amount.toString(),
        date: new Date(req.requestDate).toLocaleString('en-GB', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: req.status,
        type: 'outgoing',
        category: req.note || 'Withdrawal'
      }));
      setTransactions(formattedTransactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  }, [accessToken]);

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

  useEffect(() => {
    const fetchWalletAndBankData = async () => {
      if (!interpreterId || !accessToken) {
        return;
      }
      setLoading(true);
      setError("");
      try {
        const userApiUrl = `${API_URL}/api/auth/user/${interpreterId}`;
        const walletApiUrl = `${API_URL}/api/wallets/${interpreterId}`;

        const [userResponse, walletResponse] = await Promise.all([
          axios.get(userApiUrl, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          }),
          axios.get(walletApiUrl, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          })
        ]);
        
        const userData = userResponse.data?.data || userResponse.data;
        const walletData = walletResponse.data?.data || walletResponse.data;

        if (userData && userData.bankAccountNumber) {
          const card = {
            id: 1,
            bankAccountNumber: userData.bankAccountNumber,
            bankName: userData.bankName,
            bankAccountHolderName: userData.bankAccountHolderName,
            balance: walletData?.balance || 0,
            isDefault: true,
          };
          setBankCards([card]);
        }
      } catch (err) {
        console.error("Error fetching wallet data:", err);
        setError("Failed to load wallet information.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletAndBankData();
  }, [interpreterId, accessToken]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!depositAmount || isNaN(amount) || amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Amount must be a valid positive number!',
      });
      return;
    }

    try {
      setLoading(true);
      const paymentData = { accountId: interpreterId, price: amount };
      const paymentResponse = await createDepositDetail(paymentData);

      if (paymentResponse.success && paymentResponse.data?.data.checkoutUrl) {
        sessionStorage.setItem(
          "walletDepositInfo",
          JSON.stringify(paymentResponse.data.data)
        );
        window.location.href = paymentResponse.data.data.checkoutUrl;
      } else {
        throw new Error(
          "Failed to initiate payment. No checkout URL provided."
        );
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: err.message || "Failed to initiate payment",
      });
    } finally {
      setLoading(false);
      setIsDepositModalOpen(false);
      setDepositAmount("");
    }
  };

  const handleWithdrawal = async () => {
    const amount = parseFloat(withdrawalAmount);
    if (!withdrawalAmount || isNaN(amount) || amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Amount must be a valid positive number!',
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/withdrawal-requests`,
        {
          amount: amount,
          note: withdrawalNote
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      await Swal.fire({
        icon: 'success',
        title: 'Withdrawal Request Sent',
        text: 'Your withdrawal request has been sent successfully.',
      });
      window.location.reload();

    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Withdrawal Failed',
        text: err.response?.data?.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
      setIsWithdrawalModalOpen(false);
      setWithdrawalAmount("");
      setWithdrawalNote("");
    }
  };

  const handleConfirmReceived = (withdrawalRequestId) => {
    Swal.fire({
      title: 'Confirm Receipt',
      text: "Please confirm that you have received the funds.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I have received it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.post(
            `${API_URL}/api/withdrawal-requests/${withdrawalRequestId}/confirm-received`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
            }
          );

          Swal.fire(
            'Confirmed!',
            'You have successfully confirmed receipt of the funds.',
            'success'
          );

          fetchTransactions();

        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Confirmation Failed',
            text: err.response?.data?.message || "An unexpected error occurred.",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleCancelRequest = (withdrawalRequestId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this withdrawal request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.put(
            `${API_URL}/api/withdrawal-requests/${withdrawalRequestId}/cancel`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
            }
          );

          Swal.fire(
            'Cancelled!',
            'Your withdrawal request has been cancelled.',
            'success'
          );

          fetchTransactions();

        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Cancellation Failed',
            text: err.response?.data?.message || "An unexpected error occurred.",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Card Management Functions
  const handleAddCard = async () => {
    if (newCard.bankAccountNumber && newCard.bankName && newCard.bankAccountHolderName) {
      try {
        setLoading(true)
        setError("")
        
        const response = await axios.put(
          `${API_URL}/api/auth/bank-account`,
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
        `${API_URL}/api/auth/bank-account`,
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

          {/* Quick Actions */}
          <div className="wt-actions-section">
            <div className="wt-actions-grid">
              <button 
                className="wt-action-btn wt-action-send"
                onClick={() => setIsWithdrawalModalOpen(true)}
              >
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
                    </div>
                    <div className="wt-transaction-meta">
                      <span className="wt-transaction-date">{transaction.date}</span>
                      <span className={`wt-transaction-status ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                  </div>
                  <div className="wt-transaction-right">
                    <span className="wt-transaction-amount">
                      {transaction.type === 'incoming' ? '+' : '-'}{transaction.amount} VND
                    </span>
                    <div className="wt-transaction-actions">
                      {transaction.status === 1 && (
                          <button
                              className="wt-action-btn-confirm"
                              title="Confirm Received"
                              onClick={() => handleConfirmReceived(transaction.id)}
                          >
                              <Check size={20} />
                          </button>
                      )}
                      {transaction.status === 0 && (
                          <button
                              className="wt-action-btn-cancel"
                              title="Cancel Request"
                              onClick={() => handleCancelRequest(transaction.id)}
                          >
                              <X size={20} />
                          </button>
                      )}
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

      {/* Withdrawal Modal */}
      {isWithdrawalModalOpen && (
        <div className="wt-modal-overlay">
          <div className="wt-modal">
            <div className="wt-modal-header">
                <h3>Request Withdrawal</h3>
                <button className="wt-modal-close" onClick={() => setIsWithdrawalModalOpen(false)}>
                  <X size={20} />
                </button>
            </div>
            <div className="wt-modal-content">
              <input
                type="number"
                placeholder="Enter amount (VND)"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                className="wt-amount-input"
              />
              <div className="wt-modal-actions">
                <button 
                  className="wt-modal-cancel"
                  onClick={() => {
                    setIsWithdrawalModalOpen(false)
                    setWithdrawalAmount("")
                    setWithdrawalNote("")
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="wt-modal-confirm"
                  onClick={handleWithdrawal}
                  disabled={!withdrawalAmount || loading}
                >
                  {loading ? "Processing..." : "Withdraw"}
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

export default WalletTranslator
