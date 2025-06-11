import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ClientLayout from "./routes/ClientRoute/ClientLayout";
import ClientRoute from "./routes/ClientRoute/ClientRoute";
import TranslatorLayout from "./routes/TranslatorRoute/TranslatorLayout";
import TranslatorRoute from "./routes/TranslatorRoute/TranslatorRoute";
import StaffLayout from "./routes/StaffRoute/StaffLayout";
import StaffRoute from "./routes/StaffRoute/StaffRoute";
import AdminLayout from "./routes/AdminRoute/AdminLayout";
import AdminRoute from "./routes/AdminRoute/AdminRoute";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import LoginForm from "./pages/LoginForm/LoginForm";
import WelcomePage from "./pages/RegisterForm/WelcomePage/WelcomePage";
import SelectRole from "./pages/RegisterForm/SelectRole";
import useAuth from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import DepositSuccessPage from "./pages/Client/WalletClient/DepositSuccessPage";
import DepositFailPage from "./pages/Client/WalletClient/DepositFailPage";
import VerifyEmail from "./pages/RegisterForm/VerifyEmail/VerifyEmail";
const ProtectedLayout = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      let mappedRole;
      if (user.role === "Talent") {
        mappedRole = "translator";
      } else if (user.role === "Customer") {
        mappedRole = "client";
      } else if (user.role === "Staff") {
        mappedRole = "staff";
      } else if (user.role === "Admin") {
        mappedRole = "admin";
      } else {
        mappedRole = "unknown";
      }
      setRole(mappedRole);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !role || role === "unknown") {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
