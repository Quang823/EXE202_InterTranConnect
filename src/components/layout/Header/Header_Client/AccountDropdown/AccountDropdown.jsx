import React, { useState } from "react";
import { User, History, Wallet, LogOut, ChevronDown } from "lucide-react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AccountDropdown.scss";

const AccountDropdown = ({ user, onLogout, mobile = false }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  if (mobile) {
    return (
      <div className="itc-user-dropdown itc-user-dropdown--mobile">
        <div
          className="itc-user-dropdown__mobile-item"
          onClick={() => {
            navigate("/client/edit_profile");
            closeDropdown();
          }}
        >
          <User className="itc-user-dropdown__icon" />
          Profile Settings
        </div>
        <div
          className="itc-user-dropdown__mobile-item"
          onClick={() => {
            navigate("/client/post_history");
            closeDropdown();
          }}
        >
          <History className="itc-user-dropdown__icon" />
          Post History
        </div>
        <div
          className="itc-user-dropdown__mobile-item"
          onClick={() => {
            navigate("/client/wallet");
            closeDropdown();
          }}
        >
          <Wallet className="itc-user-dropdown__icon" />
          Wallet
        </div>
        <div
          className="itc-user-dropdown__mobile-item itc-user-dropdown__mobile-item--logout"
          onClick={() => {
            onLogout();
            closeDropdown();
          }}
        >
          <LogOut className="itc-user-dropdown__icon" />
          Logout
        </div>
      </div>
    );
  }

  return (
    <div className="itc-user-dropdown">
      <Button
        variant="ghost"
        className="itc-user-dropdown__trigger"
        onClick={toggleDropdown}
      >
        <div className="itc-user-dropdown__avatar">
          <User className="itc-user-dropdown__avatar-icon" />
        </div>
        <span className="itc-user-dropdown__name">
          {user?.fullName || "User"}
        </span>
        <ChevronDown className="itc-user-dropdown__chevron" />
      </Button>
      {isOpen && (
        <div className="itc-user-dropdown__content">
          <div
            className="itc-user-dropdown__item"
            onClick={() => {
              navigate("/client/customer_profile");
              closeDropdown();
            }}
          >
            <User className="itc-user-dropdown__icon" />
            Profile Settings
          </div>
          <div
            className="itc-user-dropdown__item"
            onClick={() => {
              navigate("/client/post_history");
              closeDropdown();
            }}
          >
            <History className="itc-user-dropdown__icon" />
            Post History
          </div>
          <div
            className="itc-user-dropdown__item"
            onClick={() => {
              navigate("/client/wallet");
              closeDropdown();
            }}
          >
            <Wallet className="itc-user-dropdown__icon" />
            Wallet
          </div>
          <div className="itc-user-dropdown__separator"></div>
          <div
            className="itc-user-dropdown__item itc-user-dropdown__item--logout"
            onClick={() => {
              onLogout();
              closeDropdown();
            }}
          >
            <LogOut className="itc-user-dropdown__icon" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
