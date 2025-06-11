import { Routes, Route } from "react-router-dom";
import Staff from "../../pages/Staff/Staff";
const StaffRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Staff />} />
    </Routes>
  );
};

export default StaffRoute;
