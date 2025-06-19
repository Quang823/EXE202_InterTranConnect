import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  fetchJobApplications,
  selectTranslator,
} from "../../../services/jobApplicationService";
import { getJobDetailByJobIdService } from "../../../services/jobService";
import { payInterpreterDetail } from "../../../services/paymentService";
import { Modal } from "react-bootstrap";
import ToastManager from "../../../components/common/Toast/ToastManager";
import { confirmJobCompletionService } from "../../../services/jobWorkService"; // Import hàm mới
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
  const [jobDetails, setJobDetails] = useState({
    id: null,
    customerId: null,
    jobTitle: "",
    translationType: "",
    sourceLanguage: "",
    targetLanguage: "",
    description: "",
    uploadFileUrl: "",
    workingTime: null,
    workAddressLine: "",
    workCity: "",
    workPostalCode: "",
    workCountry: "",
    deadline: null,
    resultFileUrl: null,
    completedAt: null,
    completionOffsetMinutes: null,
    hourlyRate: 0,
    platformServiceFee: 0,
    totalFee: 0,
    companyName: "",
    companyDescription: "",
    companyLogoUrl: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    status: null,
    requiredHires: 0,
    currentHires: 0,
    createdAt: null,
    customerName: "",
    customerEmail: "",
    totalHiredInterpreters: 0,
    totalInProgressInterpreters: 0,
    totalCompletedInterpreters: 0,
    isFullyRecruited: false,
    hasAnyInProgress: false,
    isAllCompleted: false,
  });
  const [selectedInterpreterId, setSelectedInterpreterId] = useState(null); // Lưu interpreterId được chọn

  const jobId = job?.id;

  // Load danh sách ứng viên và chi tiết job khi jobId thay đổi
  useEffect(() => {
    const loadData = async () => {
      if (!jobId) {
        setError("Job ID is missing.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Lấy chi tiết job
        const jobData = await getJobDetailByJobIdService(jobId);
        console.log(jobData);
        setJobDetails({
          id: jobData.id,
          customerId: jobData.customerId,
          jobTitle: jobData.jobTitle,
          translationType: jobData.translationType,
          sourceLanguage: jobData.sourceLanguage,
          targetLanguage: jobData.targetLanguage,
          description: jobData.description,
          uploadFileUrl: jobData.uploadFileUrl,
          workingTime: jobData.workingTime,
          workAddressLine: jobData.workAddressLine,
          workCity: jobData.workCity,
          workPostalCode: jobData.workPostalCode,
          workCountry: jobData.workCountry,
          deadline: jobData.deadline,
          resultFileUrl: jobData.resultFileUrl,
          completedAt: jobData.completedAt,
          completionOffsetMinutes: jobData.completionOffsetMinutes,
          hourlyRate: jobData.hourlyRate,
          platformServiceFee: jobData.platformServiceFee,
          totalFee: jobData.totalFee,
          companyName: jobData.companyName,
          companyDescription: jobData.companyDescription,
          companyLogoUrl: jobData.companyLogoUrl,
          contactEmail: jobData.contactEmail,
          contactPhone: jobData.contactPhone,
          contactAddress: jobData.contactAddress,
          status: jobData.status,
          requiredHires: jobData.requiredHires || 0,
          currentHires: jobData.currentHires || 0,
          createdAt: jobData.createdAt,
          customerName: jobData.customerName,
          customerEmail: jobData.customerEmail,
          totalHiredInterpreters: jobData.totalHiredInterpreters,
          totalInProgressInterpreters: jobData.totalInProgressInterpreters,
          totalCompletedInterpreters: jobData.totalCompletedInterpreters,
          isFullyRecruited: jobData.isFullyRecruited,
          hasAnyInProgress: jobData.hasAnyInProgress,
          isAllCompleted: jobData.isAllCompleted,
        });

        // Map translators từ jobData.applications thay vì fetchJobApplications
        const mappedTranslators = jobData.applications.map((app) => ({
          interpreterId: app.interpreterId,
          name: app.interpreterName || "Unknown Translator",
          avatar:
            app.interpreter?.avatarUrl || "https://i.pravatar.cc/150?img=32",
          email: app.interpreterEmail,
          status:
            app.workStatus === 0
              ? "Not Started"
              : app.workStatus === 1
              ? "Awaiting Payment"
              : app.workStatus === 2
              ? "Paid"
              : app.workStatus === 3
              ? "In Progress"
              : app.workStatus === 4
              ? "Submitted"
              : app.workStatus === 5
              ? "Completed"
              : "Unknown Status",
          online: false,
          workStatus: app.workStatus,
          isPaid: app.isPaid,
        }));
        setTranslators(mappedTranslators);
      } catch (err) {
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [jobId]);

  // Chuyển đến trang profile của translator
  const handleViewProfile = (interpreterId) => {
    navigate(`/client/translator_profile/${interpreterId}`);
  };

  // Xử lý chọn translator
  const handleSelectTranslator = async (interpreterId) => {
    if (!jobId || !interpreterId) {
      setSelectError("Missing job ID or interpreter ID.");
      return;
    }

    setSelectingId(interpreterId);
    setSelectError(null);

    try {
      const result = await selectTranslator(jobId, interpreterId);

      // Cập nhật dữ liệu sau khi chọn
      const jobData = await getJobDetailByJobIdService(jobId);
      setJobDetails({
        id: jobData.id,
        customerId: jobData.customerId,
        jobTitle: jobData.jobTitle,
        translationType: jobData.translationType,
        sourceLanguage: jobData.sourceLanguage,
        targetLanguage: jobData.targetLanguage,
        description: jobData.description,
        uploadFileUrl: jobData.uploadFileUrl,
        workingTime: jobData.workingTime,
        workAddressLine: jobData.workAddressLine,
        workCity: jobData.workCity,
        workPostalCode: jobData.workPostalCode,
        workCountry: jobData.workCountry,
        deadline: jobData.deadline,
        resultFileUrl: jobData.resultFileUrl,
        completedAt: jobData.completedAt,
        completionOffsetMinutes: jobData.completionOffsetMinutes,
        hourlyRate: jobData.hourlyRate,
        platformServiceFee: jobData.platformServiceFee,
        totalFee: jobData.totalFee,
        companyName: jobData.companyName,
        companyDescription: jobData.companyDescription,
        companyLogoUrl: jobData.companyLogoUrl,
        contactEmail: jobData.contactEmail,
        contactPhone: jobData.contactPhone,
        contactAddress: jobData.contactAddress,
        status: jobData.status,
        requiredHires: jobData.requiredHires || 0,
        currentHires: jobData.currentHires || 0,
        createdAt: jobData.createdAt,
        customerName: jobData.customerName,
        customerEmail: jobData.customerEmail,
        totalHiredInterpreters: jobData.totalHiredInterpreters,
        totalInProgressInterpreters: jobData.totalInProgressInterpreters,
        totalCompletedInterpreters: jobData.totalCompletedInterpreters,
        isFullyRecruited: jobData.isFullyRecruited,
        hasAnyInProgress: jobData.hasAnyInProgress,
        isAllCompleted: jobData.isAllCompleted,
      });

      const mappedTranslators = jobData.applications.map((app) => ({
        interpreterId: app.interpreterId,
        name: app.interpreterName || "Unknown Translator",
        avatar:
          app.interpreter?.avatarUrl || "https://i.pravatar.cc/150?img=32",
        email: app.interpreterEmail,
        status:
          app.workStatus === 0
            ? "Not Started"
            : app.workStatus === 1
            ? "Awaiting Payment"
            : app.workStatus === 2
            ? "Paid"
            : app.workStatus === 3
            ? "In Progress"
            : app.workStatus === 4
            ? "Submitted"
            : app.workStatus === 5
            ? "Completed"
            : "Unknown Status",
        online: false,
        workStatus: app.workStatus,
        isPaid: app.isPaid,
      }));
      setTranslators(mappedTranslators);

      // Nếu status là "Pending" sau khi chọn, cập nhật để hiển thị nút Payment
      const selectedTranslator = mappedTranslators.find(
        (t) => t.interpreterId === interpreterId
      );
      if (selectedTranslator && selectedTranslator.status === "Pending") {
        setSelectedInterpreterId(interpreterId);
      }

      if (jobData.currentHires >= jobData.requiredHires) {
        ToastManager.showInfo("There are enough people for this job!");
      }
    } catch (err) {
      setSelectError(err.message || "Failed to select translator. Try again.");
      console.error("Select error:", err);
    } finally {
      setSelectingId(null);
    }
  };

  // Xử lý xác nhận thanh toán cho interpreter cụ thể
  const handlePaymentConfirm = async () => {
    if (!selectedInterpreterId) {
      ToastManager.showError("No interpreter selected for payment.");
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const customerId = user.id;
    const paymentData = {
      jobId,
      customerId,
      amount: Number(paymentDetails.totalFee),
      interpreterId: selectedInterpreterId,
    };
    try {
      const result = await payInterpreterDetail(paymentData);
      if (result.success) {
        const currentDate = new Date().toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        ToastManager.showSuccess(
          `Payment successful! Transaction completed on ${currentDate}. Thank you!`
        );
        setShowPaymentModal(false);
        const jobData = await getJobDetailByJobIdService(jobId);

        setJobDetails({
          id: jobData.id,
          customerId: jobData.customerId,
          jobTitle: jobData.jobTitle,
          translationType: jobData.translationType,
          sourceLanguage: jobData.sourceLanguage,
          targetLanguage: jobData.targetLanguage,
          description: jobData.description,
          uploadFileUrl: jobData.uploadFileUrl,
          workingTime: jobData.workingTime,
          workAddressLine: jobData.workAddressLine,
          workCity: jobData.workCity,
          workPostalCode: jobData.workPostalCode,
          workCountry: jobData.workCountry,
          deadline: jobData.deadline,
          resultFileUrl: jobData.resultFileUrl,
          completedAt: jobData.completedAt,
          completionOffsetMinutes: jobData.completionOffsetMinutes,
          hourlyRate: jobData.hourlyRate,
          platformServiceFee: jobData.platformServiceFee,
          totalFee: jobData.totalFee,
          companyName: jobData.companyName,
          companyDescription: jobData.companyDescription,
          companyLogoUrl: jobData.companyLogoUrl,
          contactEmail: jobData.contactEmail,
          contactPhone: jobData.contactPhone,
          contactAddress: jobData.contactAddress,
          status: jobData.status,
          requiredHires: jobData.requiredHires || 0,
          currentHires: jobData.currentHires || 0,
          createdAt: jobData.createdAt,
          customerName: jobData.customerName,
          customerEmail: jobData.customerEmail,
          totalHiredInterpreters: jobData.totalHiredInterpreters,
          totalInProgressInterpreters: jobData.totalInProgressInterpreters,
          totalCompletedInterpreters: jobData.totalCompletedInterpreters,
          isFullyRecruited: jobData.isFullyRecruited,
          hasAnyInProgress: jobData.hasAnyInProgress,
          isAllCompleted: jobData.isAllCompleted,
        });

        const mappedTranslators = jobData.applications.map((app) => ({
          interpreterId: app.interpreterId,
          name: app.interpreterName || "Unknown Translator",
          avatar:
            app.interpreter?.avatarUrl || "https://i.pravatar.cc/150?img=32",
          email: app.interpreterEmail,
          status:
            app.workStatus === 0
              ? "Not Started"
              : app.workStatus === 1
              ? "Awaiting Payment"
              : app.workStatus === 2
              ? "Paid"
              : app.workStatus === 3
              ? "In Progress"
              : app.workStatus === 4
              ? "Submitted"
              : app.workStatus === 5
              ? "Completed"
              : "Unknown Status",
          online: false,
          workStatus: app.workStatus,
          isPaid: app.isPaid,
        }));
        setTranslators(mappedTranslators);
      } else {
        ToastManager.showInfo("Insufficient wallet funds.");
        navigate("/client/wallet");
        setShowPaymentModal(false);
      }
    } catch (err) {
      ToastManager.showError("Payment failed. Try again.");
      navigate("/client/wallet");
      setShowPaymentModal(false);
    }
  };

  const handlePaymentCancel = () => setShowPaymentModal(false);
  const handleDepositRedirect = () => {
    navigate("/client/wallet");
    setShowPaymentModal(false);
  };

  const handleShowPaymentModal = (interpreterId) => {
    setSelectedInterpreterId(interpreterId);
    setPaymentDetails({
      hourlyRate: job.hourlyRate || "0",
      platformServiceFee: job.platformServiceFee || "0",
      totalFee: job.totalFee || "0",
    });
    setShowPaymentModal(true);
  };

  // Xử lý xác nhận hoàn thành công việc
  // Trong Applications.js, cập nhật handleConfirmCompletion
  const handleConfirmCompletion = async (interpreterId) => {
    if (!jobId) {
      ToastManager.showError("Missing job ID.");
      return;
    }

    const customerId = JSON.parse(sessionStorage.getItem("user") || "{}")?.id;
    if (!customerId) {
      ToastManager.showError("Customer ID not found in session.");
      return;
    }

    try {
      const result = await confirmJobCompletionService(jobId, customerId);
      ToastManager.showSuccess("Job completion confirmed successfully!");
      // Làm mới dữ liệu sau khi xác nhận
      const jobData = await getJobDetailByJobIdService(jobId);
      setJobDetails({
        id: jobData.id,
        customerId: jobData.customerId,
        jobTitle: jobData.jobTitle,
        translationType: jobData.translationType,
        sourceLanguage: jobData.sourceLanguage,
        targetLanguage: jobData.targetLanguage,
        description: jobData.description,
        uploadFileUrl: jobData.uploadFileUrl,
        workingTime: jobData.workingTime,
        workAddressLine: jobData.workAddressLine,
        workCity: jobData.workCity,
        workPostalCode: jobData.workPostalCode,
        workCountry: jobData.workCountry,
        deadline: jobData.deadline,
        resultFileUrl: jobData.resultFileUrl,
        completedAt: jobData.completedAt,
        completionOffsetMinutes: jobData.completionOffsetMinutes,
        hourlyRate: jobData.hourlyRate,
        platformServiceFee: jobData.platformServiceFee,
        totalFee: jobData.totalFee,
        companyName: jobData.companyName,
        companyDescription: jobData.companyDescription,
        companyLogoUrl: jobData.companyLogoUrl,
        contactEmail: jobData.contactEmail,
        contactPhone: jobData.contactPhone,
        contactAddress: jobData.contactAddress,
        status: jobData.status,
        requiredHires: jobData.requiredHires || 0,
        currentHires: jobData.currentHires || 0,
        createdAt: jobData.createdAt,
        customerName: jobData.customerName,
        customerEmail: jobData.customerEmail,
        totalHiredInterpreters: jobData.totalHiredInterpreters,
        totalInProgressInterpreters: jobData.totalInProgressInterpreters,
        totalCompletedInterpreters: jobData.totalCompletedInterpreters,
        isFullyRecruited: jobData.isFullyRecruited,
        hasAnyInProgress: jobData.hasAnyInProgress,
        isAllCompleted: jobData.isAllCompleted,
      });

      const mappedTranslators = jobData.applications.map((app) => ({
        interpreterId: app.interpreterId,
        name: app.interpreterName || "Unknown Translator",
        avatar:
          app.interpreter?.avatarUrl || "https://i.pravatar.cc/150?img=32",
        email: app.interpreterEmail,
        status:
          app.workStatus === 0
            ? "Not Started"
            : app.workStatus === 1
            ? "Awaiting Payment"
            : app.workStatus === 2
            ? "Paid"
            : app.workStatus === 3
            ? "In Progress"
            : app.workStatus === 4
            ? "Submitted"
            : app.workStatus === 5
            ? "Completed"
            : "Unknown Status",
        online: false,
        workStatus: app.workStatus,
        isPaid: app.isPaid,
      }));
      setTranslators(mappedTranslators);
    } catch (err) {
      ToastManager.showError("Failed to confirm job completion.");
      console.error("Confirm completion error:", err);
    }
  };

  return (
    <div className="post-history-detail-applications">
      <h2 className="post-history-detail-section-title">
        <Users size={20} /> Applications
      </h2>
      <div className="post-history-detail-hires">
        <span className="post-history-detail-hire-item">
          Required Hires: <strong>{jobDetails.requiredHires || 0}</strong>
        </span>
        <span className="post-history-detail-hire-item">
          Current Hires: <strong>{jobDetails.currentHires || 0}</strong>
        </span>
      </div>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : translators.length === 0 ? (
        <p>No translators applied yet. Be the first!</p>
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
                  {translator.email}
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
                {translator.status === "Not Started" &&
                  jobDetails.currentHires < jobDetails.requiredHires && (
                    <button
                      className="post-history-detail-view-profile-btn"
                      onClick={() =>
                        handleSelectTranslator(translator.interpreterId)
                      }
                      disabled={selectingId === translator.interpreterId}
                    >
                      {selectingId === translator.interpreterId
                        ? "Selecting..."
                        : "Select"}
                    </button>
                  )}
                {translator.status === "Awaiting Payment" &&
                  !(translator.workStatus === 2 && translator.isPaid) && (
                    <button
                      className="post-history-detail-view-profile-btn"
                      onClick={() =>
                        handleShowPaymentModal(translator.interpreterId)
                      }
                    >
                      Payment
                    </button>
                  )}
                {translator.status === "Submitted" && (
                  <button
                    className="post-history-detail-view-profile-btn"
                    onClick={() =>
                      handleConfirmCompletion(translator.interpreterId)
                    }
                  >
                    Confirm
                  </button>
                )}
                {translator.status === "Accepted" && (
                  <span className="post-history-detail-selected">Selected</span>
                )}
              </div>
            </div>
          ))}
          {selectError && (
            <p className="post-history-detail-error text-danger">
              {selectError}
            </p>
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
          <p style={{ marginBottom: "15px" }}>Confirm payment details below:</p>
          <ul>
            <li>
              <strong>Hourly Rate:</strong>{" "}
              {paymentDetails.hourlyRate.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
              VND
            </li>
            <li>
              <strong>Platform Service Fee:</strong>{" "}
              {paymentDetails.platformServiceFee.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
              VND
            </li>
            <li>
              <strong>Total Amount:</strong>{" "}
              {paymentDetails.totalFee.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
              VND
            </li>
          </ul>
          <div className="notes-section">
            <h5>Notes:</h5>
            <ul>
              <li>
                The <strong>Hourly Rate</strong> is the base cost.
              </li>
              <li>
                The <strong>Platform Service Fee</strong> covers support costs.
              </li>
              <li>
                <strong>Total Amount</strong> is the final payment.
              </li>
            </ul>
            <p>
              Payment deducts from your wallet. Insufficient funds redirect to
              deposit.
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
