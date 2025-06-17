import { Routes, Route } from "react-router-dom";
import AdminDashboards from "../../pages/Admin/AdminDashboards/AdminDashboards";
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboards />} />
    </Routes>
  );
};

export default AdminRoute;
