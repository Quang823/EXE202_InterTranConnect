import { Routes, Route, Navigate } from "react-router-dom";
import StaffDashboards from "../../pages/Staff/StaffDashboards/StaffDashboards";
import WithdrawalRequests from "../../components/Staff/WithdrawalRequests/WithdrawalRequests";

const StaffRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="/dashboard" element={<StaffDashboards />} />
      <Route path="/withdrawal-requests" element={<WithdrawalRequests />} />
    </Routes>
  );
};

export default StaffRoute;
