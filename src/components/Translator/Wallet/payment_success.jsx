import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './payment_status.scss';
import { CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeDeposit = async () => {
      try {
        const sessionData = JSON.parse(sessionStorage.getItem("user"));
        const interpreterId = sessionData?.id;
        const orderCode = localStorage.getItem("pendingDepositOrderCode");
        const amount = localStorage.getItem("pendingDepositAmount");

        if (orderCode && amount && interpreterId) {
          await axios.post(
            `${API_URL}/api/wallets/${interpreterId}/deposit?amount=${amount}&orderCode=${orderCode}`,
            {}
          );
          // Clear pending deposit data
          localStorage.removeItem("pendingDepositOrderCode");
          localStorage.removeItem("pendingDepositAmount");
        }
      } catch (error) {
        console.error("Error completing deposit:", error);
      }
    };

    // Complete the deposit and redirect after 3 seconds
    completeDeposit().then(() => {
      const timer = setTimeout(() => {
        navigate('/translator/wallet');
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [navigate]);

  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <CheckCircle className="status-icon success" size={64} />
        <h1>Payment Successful!</h1>
        <p>Your deposit has been processed successfully.</p>
        <p className="redirect-text">Redirecting to wallet page...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess; 