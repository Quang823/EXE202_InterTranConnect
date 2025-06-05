import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payment_status.scss';
import { XCircle } from 'lucide-react';

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any pending deposit data
    localStorage.removeItem("pendingDepositOrderCode");
    localStorage.removeItem("pendingDepositAmount");

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/translator/wallet');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <XCircle className="status-icon failure" size={64} />
        <h1>Payment Failed</h1>
        <p>Sorry, your payment could not be processed.</p>
        <p>Please try again later.</p>
        <p className="redirect-text">Redirecting to wallet page...</p>
      </div>
    </div>
  );
};

export default PaymentFailure; 