// AppRoutes.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

import ClientLayout from "../ClientRoute/ClientLayout";
import ClientRoute from "../ClientRoute/ClientRoute";
import TranslatorLayout from "../TranslatorRoute/TranslatorLayout";
import TranslatorRoute from "../TranslatorRoute/TranslatorRoute";
import StaffLayout from "../StaffRoute/StaffLayout";
import StaffRoute from "../StaffRoute/StaffRoute";
import AdminLayout from "../AdminRoute/AdminLayout";
import AdminRoute from "../AdminRoute/AdminRoute";

import RegisterForm from "../../pages/RegisterForm/RegisterForm";
import LoginForm from "../../pages/LoginForm/LoginForm";
import WelcomePage from "../../pages/RegisterForm/WelcomePage/WelcomePage";
import SelectRole from "../../pages/RegisterForm/SelectRole";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import DepositSuccessPage from "../../pages/Client/WalletClient/DepositSuccessPage";
import DepositFailPage from "../../pages/Client/WalletClient/DepositFailPage";
import VerifyEmail from "../../pages/RegisterForm/VerifyEmail/VerifyEmail";
import ComplaintChatWidget from "../../pages/ComplaintChat/ComplaintChatWidget";

const AppRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();
  const shouldShowBot = user?.role === "Customer" || user?.role === "Talent";

  // Danh sách các path KHÔNG muốn hiện AI/chat widget
  const hiddenPaths = [
    "/login",
    "/register",
    "/select_role",
    "/deposit_success",
    "/deposit_fail",
    "/welcome",
    "/verify_email",
    "/admin/complaint",
  ];

  const shouldShowWidgets = !hiddenPaths.includes(location.pathname);

  // Ẩn/hiện AI chatbot và widget khiếu nại bằng class trên body
  useEffect(() => {
    if (shouldShowWidgets) {
      document.body.classList.add("show-preny-bot");
      document.body.classList.remove("hide-preny-bot");
      document.body.classList.remove("hide-complaint-widget");
    } else {
      document.body.classList.remove("show-preny-bot");
      document.body.classList.add("hide-preny-bot");
      document.body.classList.add("hide-complaint-widget");
    }
  }, [shouldShowWidgets]);

  const ProtectedLayout = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === "Admin") {
      return <AdminLayout>{children}</AdminLayout>;
    }
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/select_role" element={<SelectRole />} />
        <Route path="/deposit_success" element={<DepositSuccessPage />} />
        <Route path="/deposit_fail" element={<DepositFailPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/verify_email" element={<VerifyEmail />} />

        <Route
          path="/client/*"
          element={
            <ClientLayout>
              <ClientRoute />
            </ClientLayout>
          }
        />
        <Route
          path="/translator/*"
          element={
            <TranslatorLayout>
              <TranslatorRoute />
            </TranslatorLayout>
          }
        />
        <Route
          path="/staff/*"
          element={
            <StaffLayout>
              <StaffRoute />
            </StaffLayout>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedLayout>
              <AdminRoute />
            </ProtectedLayout>
          }
        />
        <Route path="/" element={<Navigate to="/client/" replace />} />
        <Route path="*" element={<Navigate to="/client/" replace />} />
      </Routes>
      {shouldShowWidgets && shouldShowBot && <ComplaintChatWidget />}
    </>
  );
};

export default AppRoutes;
