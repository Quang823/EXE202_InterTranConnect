import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { depositMoneyToWallet } from "../../../services/walletService";
import SuccessIcon from "../../../assets/icons/SuccessIcon.webm";
import "./DepositSuccessPage.scss";

const DepositSuccessPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const accountId = user?.id;
  const userRole = user?.role;

  useEffect(() => {
    const processSuccess = async () => {
      const depositInfo = JSON.parse(
        sessionStorage.getItem("walletDepositInfo") || "{}"
      );
      if (!depositInfo || !accountId) {
        setTimeout(() => {
          navigate(
            userRole === "Talent" ? "/translator/wallet" : "/client/wallet"
          );
        }, 3000);
        return;
      }

      try {
        const depositData = {
          accountId,
          amount: depositInfo.amount,
          orderCode: depositInfo.orderCode.toString(),
        };
        await depositMoneyToWallet(depositData);

        sessionStorage.removeItem("walletDepositInfo");
        setTimeout(() => {
          navigate(
            userRole === "Talent" ? "/translator/wallet" : "/client/wallet"
          );
        }, 3000);
      } catch (err) {
        console.error("Error processing payment success:", err.message);
        setTimeout(() => {
          navigate(
            userRole === "Talent" ? "/translator/wallet" : "/client/wallet"
          );
        }, 3000);
      }
    };

    processSuccess();
  }, [accountId, navigate, userRole]);

  return (
    <div className="ds-container">
      <div className="ds-content">
        <video autoPlay loop muted className="ds-success-icon">
          <source src={SuccessIcon} type="video/webm" />
        </video>
        <h2 className="ds-title">Payment Successful!</h2>
        <p className="ds-message">
          Congratulations! Your deposit has been processed successfully. You
          will be redirected shortly...
        </p>
      </div>
    </div>
  );
};

export default DepositSuccessPage;
