// LoginForm.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { login, googleLogin } from "../../services/authService";
import { validateForm } from "../../utils/validate";
import useAuth from "../../hooks/useAuth";
import Image from "../../assets/images/Image";
import LoginFormFields from "./LoginFormField";
import "./LoginForm.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login: loginContext, user } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    apiError: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === "Unknown") {
        navigate("/select_role");
      } else {
        const redirectPath =
          user.role === "Customer"
            ? "/client/"
            : user.role === "Talent"
            ? "/translator/"
            : user.role === "Admin"
            ? "/admin/"
            : null;
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          setErrors((prev) => ({
            ...prev,
            apiError: "Invalid role. Please contact support.",
          }));
        }
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, apiError: "" }));
  };

  const handleGoogleLoginSuccess = async ({ credential }) => {
    try {
      setIsLoading(true);
      await googleLogin(credential, loginContext);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        apiError: error.message || "Google login failed.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData, [
      { name: "email" },
      { name: "password" },
    ]);
    if (!formErrors.email && !formErrors.password) {
      try {
        setIsLoading(true);
        await login(formData.email, formData.password, loginContext);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.message || "Invalid email or password.",
        }));
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        ...formErrors,
        apiError: "Please fix the errors.",
      }));
    }
  };

  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>

      <div className="logo-wrapper" onClick={() => navigate("/client/")}>
        <div className="logo">
          <Image src="logo" alt="Inter-Trans Connect Logo" />
        </div>
        <span className="logo-title">Inter-Trans Connect</span>
      </div>

      <Container className="login-container">
        <Row className="login-row">
          <Col md={6} className="form-section">
            <h3>Sign In</h3>
            <div className="google-login">
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              >
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() =>
                    setErrors((prev) => ({
                      ...prev,
                      apiError: "Google login failed.",
                    }))
                  }
                  text="signin_with"
                  disabled={isLoading}
                />
              </GoogleOAuthProvider>
            </div>

            {errors.apiError && (
              <div className="text-danger text-center mb-3">
                {errors.apiError}
              </div>
            )}

            <LoginFormFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <p className="register-link">
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
          </Col>

          <Col md={6} className="image-section">
            <Image
              src="loginIllustration"
              className="login-image"
              alt="Login Illustration"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
