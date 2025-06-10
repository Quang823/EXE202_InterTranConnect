import { Routes, Route } from "react-router-dom";
import Admin from "../../pages/Admin/Admin";
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
    </Routes>
  );
};

export default AdminRoute;
