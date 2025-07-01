import { Routes, Route, Navigate } from "react-router-dom";
import Accounts from "../../components/Admin/Account/Accounts";
import AdminDashboards from "../../pages/Admin/AdminDashboards/AdminDashboards";
import AccountDashboard from "../../components/Admin/AccountDashboard/AccountDashboard";
import Revenue from "../../components/Admin/Revenue/Dashboard";
import SubscriptionDashboard from "../../components/Admin/SubscriptionDashboard/SubscriptionDashboard";
import ComplaintDashboard from "../../components/Admin/ComplaintDashboard/ComplaintDashboard";
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="/dashboard" element={<AdminDashboards />} />
      <Route path="/accountAdmin" element={<Accounts />} />
      <Route path="/accountAccept" element={<AccountDashboard />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/subscription" element={<SubscriptionDashboard />} />
      <Route path="/complaint" element={<ComplaintDashboard />} />
    </Routes>
  );
};

export default AdminRoute;
