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
          <h1 className="itc-hero__title">
            <span className="itc-hero__title-line">{t("hero.title.line")}</span>
            <span className="itc-hero__title-highlight">
              {t("hero.title.highlight")}
              <div className="itc-hero__sparkle">
                <Sparkles className="itc-hero__sparkle-icon" />
              </div>
            </span>
          </h1>

          <p className="itc-hero__subtitle">{t("hero.subtitle")}</p>
        </div>

        {/* CTA Button */}
        <div className="itc-hero__cta">
          <Button
            onClick={onHireTranslator}
            disabled={isLoading}
            className={`itc-hero__button ${
              isLoading ? "itc-hero__button--loading" : ""
            }`}
          >
            <span className="itc-hero__button-content">
              <span>{isLoading ? "Processing..." : t("hero.cta")}</span>
              {!isLoading && <ArrowRight className="itc-hero__button-arrow" />}
            </span>

            {/* Button Glow Effect */}
            <div className="itc-hero__button-glow"></div>

            {/* Loading Animation */}
            {isLoading && (
              <div className="itc-hero__button-loading">
                <div className="itc-hero__button-loading-animation"></div>
              </div>
            )}
          </Button>
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
