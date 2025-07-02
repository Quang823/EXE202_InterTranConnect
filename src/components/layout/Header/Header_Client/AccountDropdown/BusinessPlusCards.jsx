import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./BusinessPlusCards.scss";
import { useTranslation } from "react-i18next";

const BusinessPlusCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleUpgrade = () => {
    navigate("/client/subscriptionPlan");
  };

  return (
    <div className="business-plus-card">
      <div className="business-plus-card-header">
        <div className="business-plus-card-title">
          <div className="business-plus-card-icon">
            <Star className="business-plus-card-star" />
          </div>
          <span className="business-plus-card-text">
            {t("businessCard.title")}
          </span>
          <ArrowRight className="business-plus-card-arrow" />
        </div>
      </div>
      <p className="business-plus-card-description">
        {t("businessCard.description")}
      </p>
      <Button onClick={handleUpgrade} className="business-plus-card-button">
        {t("businessCard.upgrade")}
      </Button>
    </div>
  );
};

export default BusinessPlusCard;
