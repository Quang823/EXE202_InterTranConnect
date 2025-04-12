import { Routes, Route } from "react-router-dom";
import HomePage_Client from "../../pages/Client/HomePage_Client/HomePage_Client";
import ViewPostHistory from "../../pages/Client/ViewPostHistory/ViewPostHistory";
const ClientRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage_Client />} />
      <Route path="/post-history" element={<ViewPostHistory />} />
    </Routes>
  );
};

export default ClientRoute;
