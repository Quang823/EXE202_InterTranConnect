import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  fetchJobApplications,
  selectTranslator,
} from "../../../services/jobApplicationService";
import { payInterpreterDetail } from "../../../services/paymentService";
import { Modal } from "react-bootstrap";
import ToastManager from "../../../components/common/Toast/ToastManager";
import "react-toastify/dist/ReactToastify.css";

const Applications = ({ job }) => {
  const navigate = useNavigate();
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectingId, setSelectingId] = useState(null);
  const [selectError, setSelectError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    hourlyRate: "",
    platformServiceFee: "",
    totalFee: "",
  });
  const [insufficientFundsMessage, setInsufficientFundsMessage] =
    useState(null);

  const jobId = job?.id;

  useEffect(() => {
    const loadApplications = async () => {
      if (!jobId) {
        setError("Job ID is missing.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const applications = await fetchJobApplications(jobId);
        const mappedTranslators = applications.map((app) => ({
          interpreterId: app.interpreter?.id,
          name: app.interpreter?.fullName || "Unknown Translator",
          avatar:
            app.interpreter?.avatarUrl || "https://i.pravatar.cc/150?img=32",
          experience: "Experience not provided",
          status:
            app.status === "0"
              ? "Pending"
              : app.status === "1"
              ? "Accepted"
              : "Unknown Status",
          online: false,
        }));
        console.log("Fetched translators:", mappedTranslators);
        setTranslators(mappedTranslators);
      } catch (err) {
        setError(err.message || "Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [jobId]);

  const handleViewProfile = (interpreterId) => {
    navigate(`/client/translator_profile/${interpreterId}`);
  };

  const handleSelectTranslator = async (interpreterId) => {
    console.log("Selecting translator with parameters:", {
      jobId,
      interpreterId,
    });
    setSelectingId(interpreterId);
    setSelectError(null);
    setInsufficientFundsMessage(null);

    try {
      await selectTranslator(jobId, interpreterId);
      const applications = await fetchJobApplications(jobId);
      const mappedTranslators = applications.map((app) => ({
        interpreterId: app.interpreter?.id,
        name: app.interpreter?.fullName || "Unknown Translator",
        avatar:
          app.interpreter?.avatarUrl || "https://i.pravatar.cc/150?img=32",
        experience: "Experience not provided",
        status:
          app.status === "0"
            ? "Pending"
            : app.status === "1"
            ? "Accepted"
            : "Unknown Status",
        online: false,
      }));
      setTranslators(mappedTranslators);
      ToastManager.showSuccess("Translator selected successfully!");

      setPaymentDetails({
        hourlyRate: job.hourlyRate || "0",
        platformServiceFee: job.platformServiceFee || "0",
        totalFee: job.totalFee || "0",
      });
      setShowPaymentModal(true);
    } catch (err) {
      setSelectError(
        err.response?.status === 404
          ? "Translator selection endpoint not found. Please contact support."
          : err.message || "Failed to select translator."
      );
      ToastManager.showError("Failed to select translator. Please try again.");
    } finally {
      setSelectingId(null);
    }
  };

  const handlePaymentConfirm = async () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const customerId = user.id;
    const paymentData = {
      jobId,
      customerId,
      amount: Number(paymentDetails.totalFee),
    };
    const result = await payInterpreterDetail(paymentData);
    if (result.success) {
      ToastManager.showSuccess(
        `Payment successful! Transaction date: ${result.data.createdDateFormatted}`
      );
      setShowPaymentModal(false);
      setInsufficientFundsMessage(null);
    } else {
      ToastManager.showInfo("Your wallet does not have enough funds.");
      navigate("/client/wallet");
      setShowPaymentModal(false);
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  const handleDepositRedirect = () => {
    navigate("/client/wallet");
  };

  return (
    <div className="post-history-detail-applications">
      <h2 className="post-history-detail-section-title">
        <Users size={20} /> Applications
      </h2>
      {loading ? (
        <p className="post-history-detail-no-data">Loading applications...</p>
      ) : error ? (
        <p className="post-history-detail-no-data">Error: {error}</p>
      ) : translators.length === 0 ? (
        <p className="post-history-detail-no-data">
          No translators have applied yet. Be the first!
        </p>
      ) : (
        <div className="post-history-detail-translators">
          {translators.map((translator, index) => (
            <div key={index} className="post-history-detail-translator-card">
              <img
                src={translator.avatar}
                alt={translator.name}
                className="post-history-detail-translator-avatar"
              />
              <div className="post-history-detail-translator-info">
                <div className="post-history-detail-translator-name">
                  {translator.name}
                  {translator.online && (
                    <span className="post-history-detail-online-dot" />
                  )}
                </div>
                <div className="post-history-detail-translator-experience">
                  {translator.experience}
                </div>
                <div className="post-history-detail-translator-status">
                  Status: <span>{translator.status}</span>
                </div>
              </div>
              <div className="post-history-detail-actions">
                <button
                  className="post-history-detail-view-profile-btn"
                  onClick={() => handleViewProfile(translator.interpreterId)}
                >
                  View Profile
                </button>
                <button
                  className="post-history-detail-view-profile-btn"
                  onClick={() =>
                    handleSelectTranslator(translator.interpreterId)
                  }
                  disabled={
                    selectingId === translator.interpreterId ||
                    translator.status === "Accepted"
                  }
                >
                  {selectingId === translator.interpreterId
                    ? "Selecting..."
                    : "Select"}
                </button>
              </div>
            </div>
          ))}
          {selectError && (
            <p className="post-history-detail-error text-danger">
              {selectError}
            </p>
          )}
          {insufficientFundsMessage && (
            <div className="post-history-detail-error text-danger mt-3">
              <p>{insufficientFundsMessage}</p>
              <button
                className="btn btn-primary"
                onClick={handleDepositRedirect}
              >
                Go to Wallet to Deposit
              </button>
            </div>
          )}
        </div>
      )}
      <Modal
        show={showPaymentModal}
        onHide={handlePaymentCancel}
        className="custom-payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ marginBottom: "15px" }}>
            You have selected an interpreter. Please confirm the payment details
            below:
          </p>
          <ul>
            <li>
              <strong>Hourly Rate:</strong>{" "}
              {paymentDetails.hourlyRate.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              VND
            </li>
            <li>
              <strong>Platform Service Fee:</strong>
              {paymentDetails.platformServiceFee.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              VND
            </li>
            <li>
              <strong>Total Amount:</strong>{" "}
              {paymentDetails.totalFee.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              VND
            </li>
          </ul>
          <div className="notes-section">
            <h5>Notes:</h5>
            <ul>
              <li>
                The <strong>Hourly Rate</strong> is the base cost for the
                interpreter's services.
              </li>
              <li>
                The <strong>Platform Service Fee</strong> covers operational
                costs and support.
              </li>
              <li>
                <strong>Total Amount</strong> is the final amount to be paid,
                including all fees.
              </li>
            </ul>
            <p>
              Payment will be deducted from your wallet. If your balance is
              insufficient, please{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDepositRedirect();
                }}
              >
                deposit funds here
              </a>{" "}
              and retry the payment.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handlePaymentCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handlePaymentConfirm}>
            Confirm Payment
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Applications;
