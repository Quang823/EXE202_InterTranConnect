import React from "react";
import Form from "react-bootstrap/Form";
import "./OnlineToggle.scss";

const OnlineToggle = ({ isOnline, onToggle, className = "" }) => {
  const toggleClassName = isOnline ? `${className} is-online` : className;

  return (
    <div className={`online-toggle ${toggleClassName}`}>
      <div className="online-toggle-content">
        <div className="online-toggle-status">
          <div className="online-toggle-dot"></div>
          <div className="online-toggle-text">
            <h3 className="online-toggle-title">Online for messages</h3>
            <p className="online-toggle-subtitle">
              {isOnline
                ? "You appear online to receive messages"
                : "You appear offline"}
            </p>
          </div>
        </div>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label=""
            checked={isOnline}
            onChange={onToggle}
            className="online-toggle-switch"
          />
        </Form>
      </div>
    </div>
  );
};

export default OnlineToggle;
