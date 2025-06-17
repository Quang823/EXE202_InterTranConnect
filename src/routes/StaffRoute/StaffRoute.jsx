import { Routes, Route } from "react-router-dom";
import StaffDashboards from "../../pages/Staff/StaffDashboards/StaffDashboards";

const StaffRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<StaffDashboards />} />
    </Routes>
  );
};

export default StaffRoute;
