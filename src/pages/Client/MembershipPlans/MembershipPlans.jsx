import React, { useState, useEffect } from "react";
import { ArrowLeft, Award, Plus } from "lucide-react";
import { Button } from "react-bootstrap";
import {
  getSubPlans,
  subscribeToPlan,
  getCurrentSubPlans,
} from "../../../services/subPlanService";
import "./MembershipPlans.scss";
import PlanCard from "./PlanCard"; // Adjust the import path as needed
import ToastManager from "../../../components/common/Toast/ToastManager";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRefreshUserInfo from "../../../hooks/useRefreshUserInfo";

// Main component
const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("business");
  const [currentPlanName, setCurrentPlanName] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingPlanId, setPendingPlanId] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [currentSub, setCurrentSub] = useState(null);
  const navigate = useNavigate();
  const { user, login, token, refreshToken } = useAuth();
  const refreshUserInfo = useRefreshUserInfo();

  // Function to fetch plans and current subscription
  const fetchPlansAndCurrent = async () => {
    try {
      setLoading(true);
      const [plansResponse, currentSub] = await Promise.all([
        getSubPlans(),
        getCurrentSubPlans(),
      ]);
      const mappedPlans = Array.isArray(plansResponse)
        ? plansResponse.map((plan) => ({
            id: plan.id || plan._id || `plan-${Math.random()}`,
            name: plan.name || "Unnamed Plan",
            subtitle: plan.subtitle || "No subtitle",
            price: plan.price
              ? `${plan.price.toLocaleString("vi-VN")} VNĐ`
              : "Contact Sales",
            priceSubtext: plan.priceSubtext || "Pricing details",
            popular: plan.popular || false,
            current: false, // sẽ set lại bên dưới
            features: plan.description
              ? plan.description.split(". ").filter(Boolean)
              : ["No features available"],
          }))
        : [];
      let currentName = null;
      if (currentSub && currentSub.planName) {
        currentName = currentSub.planName;
      }
      setCurrentPlanName(currentName);
      setCurrentSub(currentSub);
      setPlans(mappedPlans);
    } catch (error) {
      setError("Failed to load subscription plans. Please try again later.");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch plans from API when component mounts
  useEffect(() => {
    fetchPlansAndCurrent();
  }, []);

  // Handle plan selection
  const handlePlanSelect = (planId) => {
    setPendingPlanId(planId);
    setShowConfirmModal(true);
  };

  const handleConfirmYes = async () => {
    if (!pendingPlanId) return;
    setIsSubscribing(true);
    setSelectedPlan(pendingPlanId);
    setShowConfirmModal(false);
    if (pendingPlanId === "enterprise") {
      setIsSubscribing(false);
      return;
    }
    try {
      const response = await subscribeToPlan(pendingPlanId);
      if (response?.statusCode === 400) {
        ToastManager.showInfo(
          "Insufficient balance to subscribe to this package. Please top up your wallet!"
        );
        navigate("/client/wallet");
      } else {
        ToastManager.showSuccess("Package purchase successful!");
        await refreshUserInfo();
        // Reload the component to get updated subscription data
        await fetchPlansAndCurrent();
      }
    } catch (e) {
      // Có thể log hoặc toast lỗi nếu cần
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleConfirmNo = () => {
    setShowConfirmModal(false);
    setPendingPlanId(null);
  };

  // Handle back button click
  const handleBack = () => {
    console.log("Go back to previous page");
  };

  // Chuẩn hóa tên gói để so sánh
  const normalize = (str) =>
    (str || "").toLowerCase().replace(/\s+/g, "").trim();

  // Render loading state
  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="post-history-detail-container">
              <div className="post-history-detail-loading">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading job details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="membership-plans">
        <div className="membership-plans__container">
          <p style={{ color: "red" }}>{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Render main content
  return (
    <div className="membership-plans">
      {/* Main Content Section */}
      <div className="membership-plans__container">
        {/* Title Section */}
        <div className="membership-plans__title-section">
          <div className="membership-plans__badge">
            <Award className="membership-plans__badge-icon" />
            <span>Choose Your Plan</span>
          </div>
          <h1 className="membership-plans__title">Membership Plans</h1>
          <p className="membership-plans__subtitle">
            Select a plan that suits your needs and unlock your business
            potential
          </p>
        </div>

        {/* Plans Grid */}
        <div className="membership-plans__grid">
          {Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={handlePlanSelect}
                index={index}
                currentPlanName={currentPlanName}
                isCurrent={
                  currentSub?.isActive === true &&
                  normalize(plan.name) === normalize(currentSub.planName)
                }
                hasActivePlan={!!currentSub?.isActive}
              />
            ))
          ) : (
            <div className="membership-plans__container">
              <p>No plans available at the moment.</p>
            </div>
          )}
        </div>

        {/* Confirm Modal */}
        {showConfirmModal && (
          <div className="wallet-modal-overlay" onClick={handleConfirmNo}>
            <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
              <div className="wallet-modal__header">
                <h3 className="wallet-modal__title">
                  <Plus className="w-5 h-5" />
                  Confirm Purchase
                </h3>
                <button
                  className="wallet-modal__close"
                  onClick={handleConfirmNo}
                >
                  ×
                </button>
              </div>
              <div className="wallet-modal__content">
                <p>Are you sure you want to purchase this plan?</p>
                <div className="wallet-form__actions" style={{ marginTop: 24 }}>
                  <button
                    type="button"
                    className="wallet-btn wallet-btn--secondary"
                    onClick={handleConfirmNo}
                    disabled={isSubscribing}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="wallet-btn wallet-btn--primary"
                    onClick={handleConfirmYes}
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? "Processing..." : "Yes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipPlans;
