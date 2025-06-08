import React from "react";
import { Briefcase, Users, Building, Sparkles, ArrowRight } from "lucide-react";
import "./HeroSection.scss";
import { Button } from "react-bootstrap";

const HeroSection = ({ onHireTranslator, isLoading }) => {
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
            <span className="itc-hero__title-line">Smarts Connections</span>
            <span className="itc-hero__title-highlight">
              Smooth Conversation!
              <div className="itc-hero__sparkle">
                <Sparkles className="itc-hero__sparkle-icon" />
              </div>
            </span>
          </h1>

          <p className="itc-hero__subtitle">
            Skilled Translators – Delivering precise translations with
            <span className="itc-hero__highlight itc-hero__highlight--blue">
              {" "}
              unmatched accuracy
            </span>{" "}
            and
            <span className="itc-hero__highlight itc-hero__highlight--purple">
              {" "}
              rapid turnaround
            </span>
            !
          </p>
        </div>

        {/* Search Filters */}
        <div className="itc-hero__search">
          <select
            className="itc-hero__search-select"
            defaultValue="Select Job Category"
          >
            <option value="Select Job Category" disabled>
              Select Job Category
            </option>
            <option value="Translation">Translation</option>
            <option value="Interpretation">Interpretation</option>
            <option value="Localization">Localization</option>
          </select>
          <select
            className="itc-hero__search-select"
            defaultValue="Select Source Language"
          >
            <option value="Select Source Language" disabled>
              Select Source Language
            </option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <select
            className="itc-hero__search-select"
            defaultValue="Select Target Language"
          >
            <option value="Select Target Language" disabled>
              Select Target Language
            </option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <select
            className="itc-hero__search-select"
            defaultValue="Select Expertise"
          >
            <option value="Select Expertise" disabled>
              Select Expertise
            </option>
            <option value="Legal">Legal</option>
            <option value="Medical">Medical</option>
            <option value="Technical">Technical</option>
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
