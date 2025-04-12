import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { validateForm } from "../../utils/validate";
import useAuth from "../../hooks/useAuth";
import Image from "../../assets/images/Image";
import LoginFormFields from "./LoginFormField";
import "./LoginForm.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login: loginContext, user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (user) {
      if (user.role === "Customer") {
        navigate("/client/home");
      } else if (user.role === "Talent") {
        navigate("/translator/home");
      } else {
        setErrors({
          ...errors,
          apiError: "Invalid role. Please contact support.",
        });
      }
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    apiError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      apiError: "",
    });
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    // try {
    //   setIsLoading(true);
    //   const result = await loginWithGoogle(credentialResponse.credential, loginContext);
    // } catch (error) {
    //   console.error("Google login error:", error);
    //   setErrors({
    //     ...errors,
    //     apiError: "Google login failed. Please try again.",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleGoogleLoginFailure = () => {
    setErrors({
      ...errors,
      apiError: "Google login failed. Please try again.",
    });
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
        console.error("Error during login:", error);
        setErrors({
          ...errors,
          apiError: "Please check your email or password!" || "Login failed",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors({
        ...errors,
        ...formErrors,
        apiError: "Please fix the errors and fill in all fields.",
      });
    }
  };

  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
      <div className="logo-wrapper" onClick={() => navigate("/client/home")}>
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
                  onError={handleGoogleLoginFailure}
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
              alt="Login Illustration"
              className="login-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
