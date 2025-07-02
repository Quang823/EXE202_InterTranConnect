import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "react-bootstrap";
import "./LanguageDropdown.scss";
import { useTranslation } from "react-i18next";

const LanguageDropdown = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const languages = [
    { code: "en", label: "English", short: "EN" },
    { code: "vi", label: "Tiếng Việt", short: "VI" },
    { code: "zh", label: "中文", short: "中文" },
    { code: "ja", label: "日本語", short: "日本語" },
  ];
  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

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
        <span className="itc-header__lang-icon">
          <span>{currentLang.short}</span>
        </span>
        <Globe className="itc-language-globe" />
        <ChevronDown
          className="itc-language-chevron"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </Button>
      {isOpen && (
        <div className="itc-language-content">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`language-option${
                i18n.language === lang.code ? " selected" : ""
              }`}
              onClick={() => i18n.changeLanguage(lang.code)}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
