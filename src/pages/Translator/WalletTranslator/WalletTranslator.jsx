import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  Plus,
  FileText,
  CreditCard,
  Wallet,
  TrendingUp,
} from "lucide-react";
import {
  fetchUserWallet,
  fetchWalletTransactions,
} from "../../../services/walletService";
import { createDepositDetail } from "../../../services/paymentService";
import "./WalletTranslator.scss";
import Loading from "../../../components/common/Loading/Loading";

const WalletTranslator = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [depositError, setDepositError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const accountId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!accountId) {
        setError("No account ID found in session storage");
        setLoading(false);
        return;
      }

      try {
        const walletData = await fetchUserWallet(accountId);
        setWallet(walletData);

        const transactionData = await fetchWalletTransactions(
          walletData.walletId,
          1,
          10
        );
        setTransactions(transactionData.items || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setDepositError(null);

    const amount = parseFloat(depositAmount);
    if (!depositAmount || isNaN(amount) || amount <= 0) {
      setDepositError("Amount must be a valid positive number!");
      return;
    }

    try {
      const paymentData = { accountId, price: amount };
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
      setDepositError(err.message || "Failed to initiate payment");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setDepositAmount("");
    setDepositError(null);
  };

  const toTitleCase = (str) => {
    if (!str) return str;
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <div className="wc-app">
        <Loading isLoading={loading} fullScreen size="medium" color="#3b82f6" />{" "}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wallet-app">
      <div className="wallet-background">
        <div className="wallet-background__orb wallet-background__orb--1"></div>
        <div className="wallet-background__orb wallet-background__orb--2"></div>
        <div className="wallet-background__orb wallet-background__orb--3"></div>
      </div>

      <div className="wallet-container">
        <header className="wallet-header">
          <div className="wallet-header__content">
            <div className="wallet-header__icon">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <h1 className="wallet-header__title">My Wallet</h1>
              <p className="wallet-header__subtitle">
                Manage your finances with ease
              </p>
            </div>
          </div>
        </header>

        <div className="wallet-cards">
          <div className="wallet-card">
            <div className="wallet-card__header">
              <h3 className="wallet-card__title">
                <CreditCard className="w-6 h-6" />
                Digital Wallet Card
              </h3>
            </div>
            <div className="wallet-card__content">
              <div className="wallet-card__main">
                <div className="wallet-card__balance">
                  <span className="wallet-card__balance-label">
                    Current Balance
                  </span>
                  <span className="wallet-card__balance-amount">
                    {wallet?.balance?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>

                <div className="wallet-card__visual">
                  <div className="wallet-card__chip"></div>
                  <div className="wallet-card__number">
                    <span>{wallet?.cardNumber?.slice(0, 4) || "4787"}</span>
                    <span className="wallet-card__dots">•••• ••••</span>
                    <span>{wallet?.cardNumber?.slice(-4) || "4787"}</span>
                  </div>
                  <div className="wallet-card__details">
                    <div className="wallet-card__holder">
                      <span className="wallet-card__label">Card Holder</span>
                      <span className="wallet-card__value">
                        {user?.fullName || "Nam"}
                      </span>
                    </div>
                    <div className="wallet-card__issuer">
                      <span className="wallet-card__label">Bank</span>
                      <span className="wallet-card__value">
                        {wallet?.issuer || "MB Bank"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wallet-card__actions">
                <button
                  className="wallet-action-btn wallet-action-btn--deposit"
                  onClick={openModal}
                >
                  <ArrowDown className="w-4 h-4" />
                  Deposit
                </button>

                <button className="wallet-action-btn wallet-action-btn--withdraw">
                  <ArrowUp className="w-4 h-4" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="wallet-stats">
            <div className="wallet-stats__header">
              <h3 className="wallet-stats__title">
                <TrendingUp className="w-5 h-5" />
                Quick Stats
              </h3>
            </div>
            <div className="wallet-stats__content">
              <div className="wallet-stat">
                <span className="wallet-stat__label">Total Transactions</span>
                <span className="wallet-stat__value">
                  {transactions.length}
                </span>
              </div>
              <div className="wallet-stat">
                <span className="wallet-stat__label">Card Number</span>
                <span className="wallet-stat__value">
                  {wallet?.cardNumber || "4787 8749 8403 4787"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Modal */}
        {isModalOpen && (
          <div className="wallet-modal-overlay" onClick={closeModal}>
            <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
              <div className="wallet-modal__header">
                <h3 className="wallet-modal__title">
                  <Plus className="w-5 h-5" />
                  Deposit Money
                </h3>
                <button className="wallet-modal__close" onClick={closeModal}>
                  ×
                </button>
              </div>
              <div className="wallet-modal__content">
                {depositError && (
                  <div className="wallet-modal__error">{depositError}</div>
                )}
                <form onSubmit={handleDeposit} className="wallet-form">
                  <div className="wallet-form__group">
                    <label
                      htmlFor="deposit-amount"
                      className="wallet-form__label"
                    >
                      Amount (VND)
                    </label>
                    <input
                      type="number"
                      id="deposit-amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="wallet-form__input"
                      required
                      autoFocus
                      min="1"
                      step="1"
                    />
                  </div>
                  <div className="wallet-form__actions">
                    <button
                      type="button"
                      className="wallet-btn wallet-btn--secondary"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="wallet-btn wallet-btn--primary"
                    >
                      Submit Deposit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="wallet-transactions">
          <div className="wallet-transactions__header">
            <h3 className="wallet-transactions__title">Transaction History</h3>
            <button className="wallet-report-btn">
              <FileText className="w-4 h-4" />
              View Report
            </button>
          </div>
          <div className="wallet-transactions__content">
            <div className="wallet-table-container">
              <table className="wallet-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className={`wallet-transaction-row wallet-transaction-row--${transaction.transactionStatus?.toLowerCase()}`}
                    >
                      <td
                        className={`wallet-transaction__type wallet-transaction__type--${transaction.transactionType?.toLowerCase()}`}
                      >
                        {toTitleCase(transaction.transactionType)}
                      </td>
                      <td className="wallet-transaction__amount">
                        {transaction.amount?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td className="wallet-transaction__balance">
                        {transaction.transactionBalance?.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </td>
                      <td className="wallet-transaction__date">
                        {transaction.transactionDate}
                      </td>
                      <td className="wallet-transaction__status">
                        <span
                          className={`wallet-status-badge wallet-status-badge--${transaction.transactionStatus?.toLowerCase()}`}
                        >
                          <span className="wallet-status-indicator"></span>
                          {toTitleCase(transaction.transactionStatus)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTranslator;
