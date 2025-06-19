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
import {
  getUserInfoByUserIdService,
  updateBankAccountService,
} from "../../../services/authService";
import ReactPaginate from "react-paginate";
import "./WalletClient.scss";
import Loading from "../../../components/common/Loading/Loading";

const WalletClient = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [depositError, setDepositError] = useState(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bankAccountNumber: "",
    bankName: "",
    bankAccountHolderName: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isBankUpdateModalOpen, setIsBankUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 5;

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

        await fetchTransactions(walletData.walletId, 1, pageSize);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]);

  const fetchTransactions = async (walletId, pageNumber, pageSize) => {
    try {
      const response = await fetchWalletTransactions(
        walletId,
        pageNumber,
        pageSize
      );
      setTransactions(response.items || []);
      setTotalItems(response.totalCount || response.items.length || 0);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePageChange = (selectedPage) => {
    const pageNumber = selectedPage.selected + 1;
    setCurrentPage(pageNumber);
    if (wallet?.walletId) {
      fetchTransactions(wallet.walletId, pageNumber, pageSize);
    }
  };

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

  const handleUpdateBankAccount = async () => {
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const bankAccountData = {
        bankAccountNumber: bankInfo.bankAccountNumber,
        bankName: bankInfo.bankName,
        bankAccountHolderName: bankInfo.bankAccountHolderName,
      };
      const response = await updateBankAccountService(bankAccountData);
      setUpdateError(null);
      alert(response.message || "Bank account updated successfully!");
      setIsBankUpdateModalOpen(false);
    } catch (err) {
      setUpdateError(err.message || "Failed to update bank account");
    } finally {
      setUpdateLoading(false);
    }
  };

  const openDepositModal = () => setIsDepositModalOpen(true);
  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
    setDepositAmount("");
    setDepositError(null);
  };

  const openBankUpdateModal = () => setIsBankUpdateModalOpen(true);
  const closeBankUpdateModal = () => {
    setIsBankUpdateModalOpen(false);
    setUpdateError(null);
  };

  const handleBankInfoChange = (e) => {
    const { name, value } = e.target;
    setBankInfo((prev) => ({ ...prev, [name]: value }));
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
        <Loading isLoading={loading} fullScreen size="medium" color="#3b82f6" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

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
                  onClick={openDepositModal}
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
                <span className="wallet-stat__value">{totalItems}</span>
              </div>
              <div className="wallet-stat">
                <span className="wallet-stat__label">Card Number</span>
                <span className="wallet-stat__value">
                  {wallet?.cardNumber || "4787 8749 8403 4787"}
                </span>
              </div>
              <div className="wallet-stat">
                <span className="wallet-stat__label">Bank Name</span>
                <span className="wallet-stat__value">{bankInfo.bankName}</span>
              </div>
              <div className="wallet-stat">
                <span className="wallet-stat__label">Account Holder</span>
                <span className="wallet-stat__value">
                  {bankInfo.bankAccountHolderName}
                </span>
              </div>
              <div className="wallet-stat">
                <span className="wallet-stat__label">Account Number</span>
                <span className="wallet-stat__value">
                  {bankInfo.bankAccountNumber}
                </span>
              </div>
              <button
                className="wallet-update-btn"
                onClick={openBankUpdateModal}
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Update"}
              </button>
              {updateError && (
                <div className="wallet-update-error">{updateError}</div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Deposit */}
        {isDepositModalOpen && (
          <div className="wallet-modal-overlay" onClick={closeDepositModal}>
            <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
              <div className="wallet-modal__header">
                <h3 className="wallet-modal__title">
                  <Plus className="w-5 h-5" />
                  Deposit Money
                </h3>
                <button
                  className="wallet-modal__close"
                  onClick={closeDepositModal}
                >
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
                      onClick={closeDepositModal}
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

        {/* Modal Update Bank Account */}
        {isBankUpdateModalOpen && (
          <div className="wallet-modal-overlay" onClick={closeBankUpdateModal}>
            <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
              <div className="wallet-modal__header">
                <h3 className="wallet-modal__title">
                  <Plus className="w-5 h-5" />
                  Update Bank Account
                </h3>
                <button
                  className="wallet-modal__close"
                  onClick={closeBankUpdateModal}
                >
                  ×
                </button>
              </div>
              <div className="wallet-modal__content">
                {updateError && (
                  <div className="wallet-modal__error">{updateError}</div>
                )}
                <form className="wallet-form">
                  <div className="wallet-form__group">
                    <label
                      htmlFor="bank-account-number"
                      className="wallet-form__label"
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="bank-account-number"
                      name="bankAccountNumber"
                      value={bankInfo.bankAccountNumber}
                      onChange={handleBankInfoChange}
                      placeholder="Enter account number"
                      className="wallet-form__input"
                      required
                    />
                  </div>
                  <div className="wallet-form__group">
                    <label htmlFor="bank-name" className="wallet-form__label">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bank-name"
                      name="bankName"
                      value={bankInfo.bankName}
                      onChange={handleBankInfoChange}
                      placeholder="Enter bank name"
                      className="wallet-form__input"
                      required
                    />
                  </div>
                  <div className="wallet-form__group">
                    <label
                      htmlFor="bank-account-holder-name"
                      className="wallet-form__label"
                    >
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      id="bank-account-holder-name"
                      name="bankAccountHolderName"
                      value={bankInfo.bankAccountHolderName}
                      onChange={handleBankInfoChange}
                      placeholder="Enter account holder name"
                      className="wallet-form__input"
                      required
                    />
                  </div>
                  <div className="wallet-form__actions">
                    <button
                      type="button"
                      className="wallet-btn wallet-btn--secondary"
                      onClick={closeBankUpdateModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="wallet-btn wallet-btn--primary"
                      onClick={handleUpdateBankAccount}
                      disabled={updateLoading}
                    >
                      {updateLoading ? "Updating..." : "Submit Update"}
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
                        }) || "0 VND"}
                      </td>
                      <td className="wallet-transaction__balance">
                        {transaction.transactionBalance?.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        ) || "0 VND"}
                      </td>
                      <td className="wallet-transaction__date">
                        {transaction.transactionDate || "N/A"}
                      </td>
                      <td className="wallet-transaction__status">
                        <span
                          className={`wallet-status-badge wallet-status-badge--${transaction.transactionStatus?.toLowerCase()}`}
                        >
                          <span className="wallet-status-indicator"></span>
                          {toTitleCase(transaction.transactionStatus) || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={null}
                pageCount={pageCount}
                marginPagesDisplayed={0}
                pageRangeDisplayed={0}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                disabledClassName={"disabled"}
                forcePage={currentPage > pageCount ? 0 : currentPage - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletClient;
