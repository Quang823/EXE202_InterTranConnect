import React from "react";
import { Button } from "react-bootstrap";

const PlanCard = ({
  plan,
  isSelected,
  onSelect,
  index,
  currentPlanName,
  isCurrent,
  hasActivePlan,
}) => {
  const normalize = (str) =>
    (str || "").toLowerCase().replace(/\s+/g, "").trim();
  const isDisabled = (hasActivePlan && !isCurrent) || isCurrent;

  return (
    <div
      key={plan.id}
      className={`membership-plans-translator__card ${plan.id} ${
        isSelected ? "selected" : ""
      } ${plan.popular ? "popular" : ""} ${isCurrent ? "current" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      style={{
        animationDelay: `${index * 0.1}s`,
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      {plan.popular && (
        <div className="membership-plans-translator__popular-badge">
          <span>Most Popular</span>
        </div>
      )}
      {isCurrent && (
        <div className="membership-plans-translator__current-badge">
          Current Plan
        </div>
      )}
      <div className="membership-plans-translator__card-header">
        <h3 className="membership-plans-translator__plan-name">{plan.name}</h3>
        <p className="membership-plans-translator__plan-subtitle">
          {plan.subtitle}
        </p>
        <div className="membership-plans-translator__price-section">
          <div className="membership-plans-translator__price">{plan.price}</div>
          <div className="membership-plans-translator__price-subtext">
            {plan.priceSubtext}
          </div>
        </div>
      </div>
      <div className="membership-plans-translator__features">
        <h4 className="membership-plans-translator__features-title">
          {plan.id === "marketplace"
            ? "Marketplace plan includes:"
            : plan.id === "business"
            ? "Everything in Marketplace, plus:"
            : "Everything in Business Plus, plus:"}
        </h4>
        <ul className="membership-plans-translator__features-list">
          {plan.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="membership-plans-translator__feature-item"
            >
              <div className="membership-plans-translator__check-icon">✓</div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => onSelect(plan.id)}
        className={`membership-plans-translator__cta-button ${plan.id} ${
          isCurrent ? "current" : ""
        }`}
        disabled={isDisabled}
      >
        {isCurrent
          ? "BUYED"
          : plan.id === "enterprise"
          ? "Contact Sales"
          : "SELECT PLAN"}
      </Button>
    </div>
  );
};

export default PlanCard;
