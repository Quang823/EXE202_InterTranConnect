import React, { useState } from "react";
import Image from "../../assets/images/Image";
import { useNavigate } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import "./SelectRole.scss";

const SelectRole = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <div className={`upwork-role-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
      <div
        className="upwork-logo-wrapper"
        onClick={() => navigate("/client/home")}
      >
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
          />
          <label htmlFor="freelancer" className="upwork-role-label">
            I'm a freelancer, looking for work
          </label>
        </div>
      </div>
      <button className="upwork-role-continue-btn">Continue</button>
    </div>
  );
};

export default SelectRole;
