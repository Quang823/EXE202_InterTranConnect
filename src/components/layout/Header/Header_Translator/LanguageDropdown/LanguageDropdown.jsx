import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "react-bootstrap";
import "./LanguageDropdown.scss";

const LanguageDropdown = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (mobile) {
    return (
      <div className="itc-language-dropdown itc-language-dropdown--mobile">
        <div className="itc-language-mobile-title">Language</div>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            className="itc-language-mobile-item"
          >
            <span className="itc-language-flag">{lang.flag}</span>
            <Globe className="itc-language-icon" />
            {lang.name}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="itc-language-dropdown">
      <Button
        variant="ghost"
        className="itc-language-trigger"
        onClick={handleToggle}
      >
        <Globe className="itc-language-globe" />
        <span className="itc-language-current">EN</span>
        <ChevronDown
          className="itc-language-chevron"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </Button>
      {isOpen && (
        <div className="itc-language-content">
          {languages.map((lang) => (
            <div key={lang.code} className="itc-language-item">
              <span className="itc-language-flag">{lang.flag}</span>
              <span className="itc-language-name">{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
