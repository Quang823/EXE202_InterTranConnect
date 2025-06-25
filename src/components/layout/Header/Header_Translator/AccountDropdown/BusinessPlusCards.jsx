import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./BusinessPlusCards.scss";

const BusinessPlusCard = () => {
  const navigate = useNavigate();
  const handleUpgrade = () => {
    navigate("/translator/subscriptionPlans");
  };

  return (
    <div className="business-plus-card">
      <div className="business-plus-card-header">
        <div className="business-plus-card-title">
          <div className="business-plus-card-icon">
            <Star className="business-plus-card-star" />
          </div>
          <span className="business-plus-card-text">Try Business Plus</span>
          <ArrowRight className="business-plus-card-arrow" />
        </div>
      </div>
      <p className="business-plus-card-description">
        Upgrade for quicker access to the top 1% of freelancers. No upfront
        costs.
      </p>
      <Button onClick={handleUpgrade} className="business-plus-card-button">
        Learn More
      </Button>
    </div>
  );
};

export default BusinessPlusCard;
