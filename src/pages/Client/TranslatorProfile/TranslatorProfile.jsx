import React from "react";
import "./TranslatorProfile.scss";

const TranslatorProfile = () => {
  return (
    <div className="translator-profile-container">
      <div className="profile-card">
        {/* Banner */}
        <div className="profile-banner" />

        <div className="profile-content">
          {/* Left Column */}
          <div className="profile-left">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Translator"
              className="profile-avatar"
            />
            <h2 className="profile-name">Sophia Nguyen</h2>
            <p className="profile-role">English–Vietnamese Translator</p>
            <span className="profile-verified">✔ Verified</span>

            <div className="profile-contact">
              <p>📧 sophia.translator@example.com</p>
              <p>📞 +84 912 345 678</p>
              <p>🌐 Languages: English, Vietnamese</p>
              <p>
                <strong>Experience:</strong> 5+ years
              </p>
              <p>📍 Location: Ho Chi Minh City, Vietnam</p>
            </div>

            <div className="profile-links">
              <a
                href="https://www.linkedin.com/in/sophia-nguyen"
                target="_blank"
                rel="noreferrer"
              >
                🔗 LinkedIn
              </a>
              <a
                href="https://portfolio.example.com"
                target="_blank"
                rel="noreferrer"
              >
                🌐 Portfolio
              </a>
              <a
                href="https://www.facebook.com/sophia.translator"
                target="_blank"
                rel="noreferrer"
              >
                📘 Facebook
              </a>
              <a
                href="https://www.instagram.com/sophia.translate"
                target="_blank"
                rel="noreferrer"
              >
                📸 Instagram
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="profile-right">
            <section>
              <h3>About</h3>
              <p>
                I’m a certified translator with over 5 years of experience in
                legal, medical, and technical document translation. My mission
                is to deliver culturally accurate, clear, and fast translations
                for businesses and organizations around the world.
              </p>
            </section>

            <section>
              <h3>Skills</h3>
              <div className="profile-skills">
                <span>Legal Translation</span>
                <span>Technical Writing</span>
                <span>Proofreading</span>
                <span>Localization</span>
                <span>Medical Terminology</span>
                <span>CAT Tools (Trados, MemoQ)</span>
              </div>
            </section>

            <section>
              <h3>Certifications</h3>
              <ul>
                <li>ATA Certified Translator (English ↔ Vietnamese)</li>
                <li>
                  Court Certified Interpreter – Vietnam Ministry of Justice
                </li>
                <li>Advanced Localization Certification – ProZ Academy</li>
              </ul>
            </section>

            <section>
              <h3>Experience</h3>
              <ul>
                <li>
                  Freelance Interpreter for EU Conferences (Remote + Onsite)
                </li>
                <li>Legal Translator at XYZ Law Firm (2019–2022)</li>
                <li>Interpreter for Fortune 500 Multinationals in Vietnam</li>
              </ul>
            </section>

            <section>
              <h3>Education</h3>
              <p>MA in Translation & Interpretation – University of London</p>
              <p>BA in English Linguistics – Vietnam National University</p>
            </section>

            <section>
              <h3>Publications & Projects</h3>
              <ul>
                <li>“Legal Terminology Handbook” – Co-author, 2023</li>
                <li>Lead translator for WHO Vietnam reports (2022)</li>
              </ul>
            </section>

            <section>
              <h3>Superpower</h3>
              <p>Clear and precise interpretation with cultural nuance.</p>
            </section>

            <section>
              <h3>Looking For</h3>
              <p>
                I'm currently looking for long-term collaborations with law
                firms, NGOs, and localization agencies. Interested in
                AI-assisted tools and remote interpretation projects.
              </p>
            </section>

            <button className="profile-hire-btn">Hire This Translator</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorProfile;
