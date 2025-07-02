import React from "react";
import Form from "react-bootstrap/Form";
import "./OnlineToggle.scss";
import { useTranslation } from "react-i18next";

const OnlineToggle = ({ isOnline, onToggle, className = "" }) => {
  const { t } = useTranslation();
  const toggleClassName = isOnline ? `${className} is-online` : className;

  return (
    <div className={`online-toggle ${toggleClassName}`}>
      <div className="online-toggle-content">
        <div className="online-toggle-status">
          <div className="online-toggle-dot"></div>
          <div className="online-toggle-text">
            <h3 className="online-toggle-title">{t("onlineToggle.title")}</h3>
            <p className="online-toggle-subtitle">
              {isOnline ? t("onlineToggle.online") : t("onlineToggle.offline")}
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
