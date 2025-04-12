// src/components/RoleSelection.jsx
import React from "react";
import Image from "../../assets/images/Image";

const RoleSelection = ({ role, handleChange }) => {
  return (
    <div className="role-selection">
      <div className={`role-option ${role === "client" ? "selected" : ""}`}>
        <div className="avatar-group">
          <Image src="clientAvatar1" alt="Client Avatar 1" className="avatar" />
          <Image src="clientAvatar2" alt="Client Avatar 2" className="avatar" />
        </div>
        <label htmlFor="client">
          <span>I'm a Client</span>
          <p>I want to hire a translator/interpreter</p>
        </label>
        <input
          type="radio"
          name="role"
          value="client"
          checked={role === "client"}
          onChange={handleChange}
          id="client"
        />
      </div>
      <div className={`role-option ${role === "talent" ? "selected" : ""}`}>
        <div className="avatar-group">
          <Image src="talentAvatar1" alt="Talent Avatar 1" className="avatar" />
          <Image src="talentAvatar2" alt="Talent Avatar 2" className="avatar" />
        </div>
        <label htmlFor="talent">
          <span>I'm a Talent</span>
          <p>I want to find a job as a translator/interpreter</p>
        </label>
        <input
          type="radio"
          name="role"
          value="talent"
          checked={role === "talent"}
          onChange={handleChange}
          id="talent"
        />
      </div>
    </div>
  );
};

export default RoleSelection;
