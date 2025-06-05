import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, Plus, FileText } from "lucide-react";
import {
  fetchUserWallet,
  fetchWalletTransactions,
} from "../../../services/walletService";
import { createDepositDetail } from "../../../services/paymentService";
import { Modal, Button, Form } from "react-bootstrap";
import "./WalletClient.scss";

const WalletClient = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [depositError, setDepositError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get accountId from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const accountId = user?.id;

  // Fetch wallet and transactions on mount
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
        console.log(transactionData);
        setTransactions(transactionData.items || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]);

  // Handle payment initiation
  const handleDeposit = async (e) => {
    e.preventDefault();
    setDepositError(null);

    const amount = parseFloat(depositAmount);
    if (!depositAmount || isNaN(amount) || amount <= 0) {
      setDepositError("Amount must be a valid positive number!");
      return;
    }

    try {
      // Step 1: Create deposit detail to get checkoutUrl
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

  // Open and close modal
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wc-app">
      <div className="wc-main">
        <main className="wc-content">
          <div className="wc-card-section">
            <div className="wc-card-header">
              <h2 className="wc-card-title">
                My <span className="wc-highlight">Card</span>
              </h2>
            </div>
            <div className="wc-card-container">
              <div className="wc-card">
                <div className="wc-card-balance">
                  <span className="wc-card-label">Current Balance : </span>
                  <span className="wc-card-amount">
                    {wallet?.balance?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="wc-card-actions">
                  <button
                    className="wc-card-button wc-card-button--deposit"
                    onClick={openModal}
                  >
                    <ArrowDown size={16} /> Deposit
                  </button>
                  <button className="wc-card-button wc-card-button--withdraw">
                    <ArrowUp size={16} /> Withdraw
                  </button>
                  <div className="wc-partner-logo"></div>
                </div>
                <div className="wc-card-details">
                  <span className="wc-card-issuer">
                    {wallet?.issuer || "MB Bank"}
                  </span>
                  <span className="wc-card-number">
                    {wallet?.cardNumber?.slice(0, 4) || "4787"}{" "}
                    <span className="wc-hidden-digits">•••• ••••</span>{" "}
                    {wallet?.cardNumber?.slice(-4) || "4787"}
                  </span>
                  <div className="wc-card-network"></div>
                </div>
              </div>
              <div className="wc-card-meta">
                <div className="wc-meta-item">
                  <span className="wc-meta-label">Card Holder : </span>
                  <span className="wc-meta-value wc-highlight">
                    {user?.fullName || "Nam"}
                  </span>
                </div>
                <div className="wc-meta-item">
                  <span className="wc-meta-label">Card Number : </span>
                  <span className="wc-meta-value wc-highlight">
                    {wallet?.cardNumber || "4787 8749 8403 4787"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Deposit Form using react-bootstrap */}
          <Modal
            show={isModalOpen}
            onHide={closeModal}
            centered
            animation={true}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Deposit Money</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {depositError && (
                <div className="text-danger mb-3">{depositError}</div>
              )}
              <Form onSubmit={handleDeposit}>
                <Form.Group className="mb-3" controlId="deposit-amount">
                  <Form.Label>Amount (VND)</Form.Label>
                  <Form.Control
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    autoFocus
                    min="1"
                    step="1"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleDeposit}>
                Submit Deposit
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="wc-transaction-section">
            <div className="wc-transaction-header">
              <h3 className="wc-transaction-title">Transaction History</h3>
              <button className="wc-view-report">
                <FileText size={16} /> View Report
              </button>
            </div>
            <div className="wc-transaction-table">
              <table>
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
                      className={`status-${transaction.transactionStatus?.toLowerCase()}`}
                    >
                      <td
                        className={`wc-type type-${transaction.transactionType?.toLowerCase()}`}
                      >
                        {toTitleCase(transaction.transactionType)}
                      </td>
                      <td className="wc-amount">
                        {transaction.amount?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td className="wc-balance">
                        {transaction.transactionBalance?.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </td>
                      <td>
                        {
                          new Date(transaction.transactionDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>
                      <td className="wc-status">
                        <span className="wc-status-indicator"></span>
                        {toTitleCase(transaction.transactionStatus)}
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
  );
};

export default WalletClient;
