import React from "react";
import { Briefcase, Users, Building, Sparkles, ArrowRight } from "lucide-react";
import "./HeroSection.scss";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HeroSection = ({ onHireTranslator, isLoading }) => {
  const { t } = useTranslation();

  const stats = [
    { icon: Briefcase, number: "25,850", label: "Jobs Completed" },
    { icon: Users, number: "10,000", label: "Active Users" },
    { icon: Building, number: "100", label: "Partner Companies" },
  ];

  return (
    <div className="itc-hero">
      <div className="itc-hero__container">
        {/* Main Heading */}
        <div className="itc-hero__content">
          <h1 className="itc-hero__title2">
            <span className="itc-hero__title-line">
              {t("hero.title2.line")}
            </span>
            <span className="itc-hero__title-highlight">
              {t("hero.title2.highlight")}
              <div className="itc-hero__sparkle">
                <Sparkles className="itc-hero__sparkle-icon" />
              </div>
            </span>
          </h1>

          <p className="itc-hero__subtitle">{t("hero.subtitle")}</p>
        </div>

        {/* Search Filters */}
        <div className="itc-hero__search">
          <select
            className="itc-hero__search-select"
            defaultValue="Select Job Category"
          >
            <option value="Select Job Category" disabled>
              {t("hero.search.select.category")}
            </option>
            <option value="Translation">
              {t("hero.search.category.translation")}
            </option>
            <option value="Interpretation">
              {t("hero.search.category.interpretation")}
            </option>
            <option value="Localization">
              {t("hero.search.category.localization")}
            </option>
          </select>
          <select
            className="itc-hero__search-select"
            defaultValue="Select Source Language"
          >
            <option value="Select Source Language" disabled>
              {t("hero.search.select.source")}
            </option>
            <option value="English">{t("hero.search.language.english")}</option>
            <option value="Spanish">{t("hero.search.language.spanish")}</option>
            <option value="French">{t("hero.search.language.french")}</option>
          </select>
          <select
            className="itc-hero__search-select"
            defaultValue="Select Target Language"
          >
            <option value="Select Target Language" disabled>
              {t("hero.search.select.target")}
            </option>
            <option value="English">{t("hero.search.language.english")}</option>
            <option value="Spanish">{t("hero.search.language.spanish")}</option>
            <option value="French">{t("hero.search.language.french")}</option>
          </select>
          <select
            className="itc-hero__search-select"
            defaultValue="Select Expertise"
          >
            <option value="Select Expertise" disabled>
              {t("hero.search.select.expertise")}
            </option>
            <option value="Legal">{t("hero.search.expertise.legal")}</option>
            <option value="Medical">
              {t("hero.search.expertise.medical")}
            </option>
            <option value="Technical">
              {t("hero.search.expertise.technical")}
            </option>
          </select>
        </div>

        {/* Statistics */}
        <div className="itc-hero__stats">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="itc-hero__stat">
                <div className="itc-hero__stat-content">
                  <div className="itc-hero__stat-icon">
                    <Icon className="itc-hero__stat-icon-svg" />
                  </div>
                  <div className="itc-hero__stat-info">
                    <div className="itc-hero__stat-number">{stat.number}</div>
                    <div className="itc-hero__stat-label">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Elements */}
        <div className="itc-hero__floating">
          <div className="itc-hero__floating-dot itc-hero__floating-dot--1"></div>
          <div className="itc-hero__floating-dot itc-hero__floating-dot--2"></div>
          <div className="itc-hero__floating-dot itc-hero__floating-dot--3"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
