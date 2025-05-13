import React from "react";
import SubscriptionPlans from "../../../components/Translator/SubscriptionPlans/SubscriptionPlans";

const SubscriptionPlan = () => {
  return (
    <div className="sub-container">
      <div
        className="content-container container mx-auto"
        style={{
          "--bs-gutter-x": "0",
          paddingRight: "0",
          paddingLeft: "0",
        }}
      >
        <SubscriptionPlans />
      </div>
    </div>
  );
};

export default SubscriptionPlan;