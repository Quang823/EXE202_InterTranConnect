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
  createWithdrawalRequestService,
  getMyWithdrawalRequestsService,
} from "../../../services/walletService";
import { createDepositDetail } from "../../../services/paymentService";
import {
  getUserInfoByUserIdService,
  updateBankAccountService,
} from "../../../services/authService";
import ReactPaginate from "react-paginate";
import "./WalletClient.scss";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawNote, setWithdrawNote] = useState("");
  const [withdrawError, setWithdrawError] = useState(null);
  const [activeTab, setActiveTab] = useState("transaction");
  const [withdrawHistory, setWithdrawHistory] = useState([]);

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

  // Fetch bank info from backend when accountId changes
  useEffect(() => {
    const fetchBankInfo = async () => {
      try {
        const userInfo = await getUserInfoByUserIdService(accountId);
        setBankInfo({
          bankAccountNumber: userInfo.bankAccountNumber || "",
          bankName: userInfo.bankName || "",
          bankAccountHolderName: userInfo.bankAccountHolderName || "",
        });
      } catch (err) {
        // Có thể show lỗi nếu muốn
      }
    };
    if (accountId) fetchBankInfo();
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
      ToastManager.showSuccess(
        response.message || "Bank account updated successfully!"
      );
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

  const fetchWithdrawHistory = async () => {
    try {
      const data = await getMyWithdrawalRequestsService();
      setWithdrawHistory(data || []);
    } catch (err) {
      setWithdrawHistory([]);
    }
  };

  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
    setWithdrawAmount("");
    setWithdrawNote("");
    setWithdrawError(null);
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setWithdrawError(null);
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      setWithdrawError("Amount must be a valid positive number!");
      return;
    }
    try {
      await createWithdrawalRequestService({ amount, note: withdrawNote });
      ToastManager.showSuccess(
        "Withdrawal request submitted! Please wait for approval. You will receive an notification when your request is approved."
      );
      closeWithdrawModal();
      if (activeTab === "withdraw") fetchWithdrawHistory();
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.message === "Insufficient balance"
      ) {
        ToastManager.showInfo("Insufficient balance");
      } else if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.message
          ?.toLowerCase()
          .includes("update your bank account")
      ) {
        ToastManager.showInfo(
          "Please update your bank account before withdrawing!"
        );
      } else {
        setWithdrawError(err.message || "Failed to submit withdrawal request");
      }
    }
  };

  if (loading) {
    return (
      <div className="notifications-loading">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring spinner-ring-reverse"></div>
          </div>
          <div className="loading-text">
            <h3>Loading wallet...</h3>
            <p>Please wait while we fetch your wallet details</p>
          </div>
        </div>
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
                    {bankInfo?.bankAccountNumber ? (
                      <>
                        <span>{bankInfo.bankAccountNumber.slice(0, 4)}</span>
                        <span className="wallet-card__dots">•••• ••••</span>
                        <span>{bankInfo.bankAccountNumber.slice(-4)}</span>
                      </>
                    ) : (
                      <span className="wallet-stat__value wallet-stat__value--empty">
                        Not provided
                      </span>
                    )}
                  </div>
                  <div className="wallet-card__details">
                    <div className="wallet-card__holder">
                      <span className="wallet-card__label">Card Holder</span>
                      <span
                        className={`wallet-card__value${
                          !bankInfo?.bankAccountHolderName
                            ? " wallet-stat__value--empty"
                            : ""
                        }`}
                      >
                        {bankInfo?.bankAccountHolderName
                          ? bankInfo.bankAccountHolderName
                          : "Not provided"}
                      </span>
                    </div>
                    <div className="wallet-card__issuer">
                      <span className="wallet-card__label">Bank</span>
                      <span
                        className={`wallet-card__value${
                          !bankInfo?.bankName
                            ? " wallet-stat__value--empty"
                            : ""
                        }`}
                      >
                        {bankInfo?.bankName
                          ? bankInfo.bankName
                          : "Not provided"}
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
                <button
                  className="wallet-action-btn wallet-action-btn--withdraw"
                  onClick={openWithdrawModal}
                >
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
                <span className="wallet-stat__label">Bank Name</span>
                <span
                  className={`wallet-stat__value${
                    !bankInfo.bankName ? " wallet-stat__value--empty" : ""
                  }`}
                >
                  {bankInfo.bankName ? bankInfo.bankName : "Not provided"}
                </span>
              </div>
              <div className="wallet-stat">
                <span className="wallet-stat__label">Account Holder</span>
                <span
                  className={`wallet-stat__value${
                    !bankInfo.bankAccountHolderName
                      ? " wallet-stat__value--empty"
                      : ""
                  }`}
                >
                  {bankInfo.bankAccountHolderName
                    ? bankInfo.bankAccountHolderName
                    : "Not provided"}
                </span>
              </div>
              <div className="wallet-stat">
                <span className="wallet-stat__label">Account Number</span>
                <span
                  className={`wallet-stat__value${
                    !bankInfo.bankAccountNumber
                      ? " wallet-stat__value--empty"
                      : ""
                  }`}
                >
                  {bankInfo.bankAccountNumber
                    ? bankInfo.bankAccountNumber
                    : "Not provided"}
                </span>
              </div>
              <button
                className="wallet-action-btn wallet-action-btn--update"
                onClick={openBankUpdateModal}
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Update Bank Account"}
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

        {/* Modal Withdraw */}
        {isWithdrawModalOpen && (
          <div className="wallet-modal-overlay" onClick={closeWithdrawModal}>
            <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
              <div className="wallet-modal__header">
                <h3 className="wallet-modal__title">
                  <ArrowUp className="w-5 h-5" />
                  Withdraw Money
                </h3>
                <button
                  className="wallet-modal__close"
                  onClick={closeWithdrawModal}
                >
                  ×
                </button>
              </div>
              <div className="wallet-modal__content">
                {withdrawError && (
                  <div className="wallet-modal__error">{withdrawError}</div>
                )}
                <form onSubmit={handleWithdraw} className="wallet-form">
                  <div className="wallet-form__group">
                    <label
                      htmlFor="withdraw-amount"
                      className="wallet-form__label"
                    >
                      Amount (VND)
                    </label>
                    <input
                      type="number"
                      id="withdraw-amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="wallet-form__input"
                      required
                      min="1"
                      step="1"
                    />
                  </div>
                  <div className="wallet-form__group">
                    <label
                      htmlFor="withdraw-note"
                      className="wallet-form__label"
                    >
                      Note (optional)
                    </label>
                    <input
                      type="text"
                      id="withdraw-note"
                      value={withdrawNote}
                      onChange={(e) => setWithdrawNote(e.target.value)}
                      placeholder="Enter note"
                      className="wallet-form__input"
                    />
                  </div>
                  <div className="wallet-form__actions">
                    <button
                      type="button"
                      className="wallet-btn wallet-btn--secondary"
                      onClick={closeWithdrawModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="wallet-btn wallet-btn--primary"
                    >
                      Submit Withdraw
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tabs for Transaction/Withdraw History */}
        <div className="wallet-tabs">
          <button
            className={`wallet-tab${
              activeTab === "transaction" ? " active" : ""
            }`}
            onClick={() => setActiveTab("transaction")}
          >
            Transaction History
          </button>
          <button
            className={`wallet-tab${activeTab === "withdraw" ? " active" : ""}`}
            onClick={() => {
              setActiveTab("withdraw");
              fetchWithdrawHistory();
            }}
          >
            Withdraw History
          </button>
        </div>

        {/* Transaction Table */}
        {activeTab === "transaction" && (
          <div className="wallet-transactions">
            <div className="wallet-transactions__header">
              <h3 className="wallet-transactions__title">
                Transaction History
              </h3>
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
                            {toTitleCase(transaction.transactionStatus) ||
                              "N/A"}
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
        )}

        {/* Withdraw History Table */}
        {activeTab === "withdraw" && (
          <div className="wallet-transactions">
            <div className="wallet-transactions__header">
              <h3 className="wallet-transactions__title">Withdraw History</h3>
            </div>
            <div className="wallet-transactions__content">
              <div className="wallet-table-container">
                <table className="wallet-table">
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Note</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawHistory.length === 0 ? (
                      <tr>
                        <td colSpan="4">No withdraw history</td>
                      </tr>
                    ) : (
                      withdrawHistory.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            {item.amount?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td>{item.note || "-"}</td>
                          <td>{item.status || "-"}</td>
                          <td>
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletClient;
