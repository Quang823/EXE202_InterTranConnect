// SelectRole.jsx
import React, { useState } from "react";
import Image from "../../assets/images/Image";
import { useNavigate } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { assignRole } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import "./SelectRole.scss";

const SelectRole = () => {
  const navigate = useNavigate();
  const { user, login: loginContext } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.id === "client" ? "Customer" : "Talent");
    setError("");
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      setError("Please select a role to continue.");
      return;
    }

    if (!user?.email) {
      setError("User email not found. Please log in again.");
      return;
    }

    try {
      await assignRole(user.email, selectedRole, loginContext);
      const redirectPath =
        selectedRole === "Customer" ? "/client/" : "/translator/";
      navigate(redirectPath);
    } catch (error) {
      setError(error.message || "Failed to assign role. Please try again.");
    }
  };

  return (
    <div className={`upwork-role-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
      <div className="upwork-logo-wrapper">
        <div className="upwork-logo">
          <Image src="logo" alt="Inter-Trans Connect Logo" />
        </div>
        <span className="upwork-title">Inter-Trans Connect</span>
      </div>
      <h1 className="upwork-page-title">Welcome to Inter-Trans Connect</h1>
      <h1 className="upwork-role-title">Join as a client or freelancer</h1>
      <div className="upwork-role-options">
        <div className="upwork-role-card">
          <input
            type="radio"
            id="client"
            name="role"
            className="upwork-role-input"
            onChange={handleRoleChange}
          />
          <label htmlFor="client" className="upwork-role-label">
            I'm a client, hiring for a project
          </label>
        </div>
        <div className="upwork-role-card">
          <input
            type="radio"
            id="freelancer"
            name="role"
            className="upwork-role-input"
            onChange={handleRoleChange}
          />
          <label htmlFor="freelancer" className="upwork-role-label">
            I'm a freelancer, looking for work
          </label>
        </div>
      </div>
      {error && <div className="text-danger text-center mb-3">{error}</div>}
      <button className="upwork-role-continue-btn" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default SelectRole;
