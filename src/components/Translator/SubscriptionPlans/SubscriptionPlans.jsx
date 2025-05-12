import React from 'react';
import { Check } from 'lucide-react';
import './SubscriptionPlans.scss';

const SubscriptionPlans = () => {
  const plans = [
    {
      title: 'PARTNERCHIP',
      price: '99.000 VNĐ',
      badgeClass: 'partnership-badge',
      benefits: [
        'Agpooer in the pfoththy liot',
        'Inperooed vilibilithy in soorch resalts',
        'Inperoooed vilibilithy'
      ]
    },
    {
      title: 'PREMIUM',
      price: '299.000 VNĐ',
      badgeClass: 'premium-badge',
      benefits: [
        'Alt benofitly of the athvanoed Poctboge',
        'Igpooer or the YOB of soomb resalts',
        'Eoro o sooerial bedgp for inperooed twoththilooes'
      ],
      isElevated: true
    },
    {
      title: 'ADVANCE',
      price: '199.000 VNĐ',
      badgeClass: 'advance-badge',
      benefits: [
        'Alt benofitly of the Boosis ',
        'Footbred in a otominent potion ',
        'Sor the IRecommended Inesloncer'
      ]
    }
  ];

  const handleSubscribe = (plan) => {
    console.log(`Subscribed to ${plan.title} plan for ${plan.price}`);
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
              Subcribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;