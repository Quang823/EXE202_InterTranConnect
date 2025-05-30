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
import AdminLayout from "./routes/AdminRoute/AdminLayout";
import AdminRoute from "./routes/AdminRoute/AdminRoute";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import LoginForm from "./pages/LoginForm/LoginForm";
import SelectRole from "./pages/RegisterForm/SelectRole";
import useAuth from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";

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
          <Route path="/selectRole" element={<SelectRole />} />
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
            path="/admin/*"
            element={
              <ProtectedLayout>
                <AdminRoute />
              </ProtectedLayout>
            }
          />
          <Route path="/" element={<Navigate to="/client/home" replace />} />
          <Route path="*" element={<Navigate to="/client/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
