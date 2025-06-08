import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { validateForm } from "../../utils/validate";
import { login, googleLogin } from "../../services/authService";
import Image from "../../assets/images/Image";
import RegisterFormFields from "./RegisterFormFields";
import RoleSelection from "./RoleSelection";
import ToastManager from "../../components/common/Toast/ToastManager";
import { ToastContainer } from "react-toastify";
import "./RegisterForm.scss";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    role: "talent",
    agree: false,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    agree: "",
    apiError: "",
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      apiError: "",
    });
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

  const handleGoogleLoginFailure = () => {
    setErrors({
      ...errors,
      apiError: "Google login failed. Please try again.",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData, [
      { name: "firstName" },
      { name: "lastName" },
      { name: "email" },
      { name: "phoneNumber" },
      { name: "userName" },
      { name: "password" },
      { name: "confirmPassword" },
      { name: "gender" },
      { name: "address" },
      { name: "agree" },
    ]);

    const hasErrors = Object.values(formErrors).some((error) => error);
    if (!hasErrors) {
      try {
        setIsLoading(true);
        const userName = `${formData.firstName}${formData.lastName}`
          .trim()
          .replace(/\s+/g, "");
        const role = formData.role === "client" ? "Customer" : "Talent";
        const userData = {
          userName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          address: formData.address,
          role,
        };

        await register(userData);
        ToastManager.showSuccess(
          "Registration successful! Please verify your email to continue."
        );
        navigate("/verify_email", { state: { email: formData.email } });
      } catch (error) {
        console.error("Error during registration:", error);
        setErrors({
          ...errors,
          apiError: error.message || "Registration failed",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors({
        ...errors,
        ...formErrors,
        apiError:
          "Please fix the errors and agree to the terms before registering.",
      });
    }
  };

  return (
    <div className={`register-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
      <div className="home-logo-wrapper" onClick={() => navigate("/client/")}>
        <div className="home-logo">
          <Image src="logo" alt="Inter-Trans Connect Logo" />
        </div>
        <span className="home-title">Inter-Trans Connect</span>
      </div>
      <Container className="register-container">
        <Row className="register-row">
          {/* Left Section */}
          <Col md={6} className="left-section">
            <div className="register-title">
              <h1>Sign up to</h1>
              <h2>Inter-Trans Connect</h2>
            </div>
            <RoleSelection role={formData.role} handleChange={handleChange} />
            <p className="sign-in-link">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </Col>

          {/* Right Section */}
          <Col md={6} className="right-section">
            <h3>Create New Account</h3>
            <div className="google-signin">
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
            {errors.userName && (
              <div className="text-danger text-center mb-3">
                {errors.userName}
              </div>
            )}
            <RegisterFormFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterForm;
