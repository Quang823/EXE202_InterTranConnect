import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Swal from 'sweetalert2';
import './SubscriptionPlans.scss';
import { getSubPlans, subscribeToPlan } from '../../../services/subPlanService';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getSubPlans();
        const desiredOrder = ["PartnerShip", "Premium", "Advance"];
        const sortedData = [...data].sort((a, b) => {
          const indexA = desiredOrder.indexOf(a.name);
          const indexB = desiredOrder.indexOf(b.name);
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });
        const mappedPlans = sortedData.map(plan => ({
          id: plan.id,
          title: plan.name,
          price: `${plan.price.toLocaleString('vi-VN')} VNĐ`,
          badgeClass: `${plan.name.toLowerCase()}-badge`,
          benefits: plan.description.split('. '),
          isElevated: plan.name === 'Premium',
        }));
        setPlans(mappedPlans);
      } catch (error) {
        console.error("Failed to fetch subscription plans", error);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (plan) => {
    try {
      await subscribeToPlan(plan.id);
      Swal.fire({
        title: 'Success!',
        text: `You have successfully subscribed to the ${plan.title} plan.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(`Failed to subscribe to ${plan.title} plan`, error);
      Swal.fire({
        title: 'Error!',
        text: `Failed to subscribe to the ${plan.title} plan. Please try again.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="sub-plans-container">
      <div className="sub-plans-wrapper">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`sub-plan-card ${plan.isElevated ? 'sub-plan-elevated' : ''}`}
          >
            <div className={`sub-plan-badge ${plan.badgeClass}`}></div>
            <h2 className="sub-plan-title">{plan.title}</h2>
            <p className="sub-plan-price">{plan.price}</p>
            <ul className="sub-plan-benefits">
              {plan.benefits.map((benefit, i) => (
                <li key={i} className="sub-plan-benefit">
                  <Check className="sub-plan-checkmark" size={16} />
                  {benefit}
                </li>
              ))}
            </ul>
            <button className="sub-plan-subscribe" onClick={() => handleSubscribe(plan)}>
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;