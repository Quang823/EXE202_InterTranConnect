import { Routes, Route } from "react-router-dom";
import HomePage_Client from "../../pages/Client/HomePage_Client/HomePage_Client";
const ClientRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage_Client />} />
    </Routes>
  );
};

export default ClientRoute;
