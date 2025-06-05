import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserInfoByUserIdService } from "../../../services/authService";
import "./TranslatorProfile.scss";

const TranslatorProfile = () => {
  const { interpreterId } = useParams();
  const [translator, setTranslator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranslatorProfile = async () => {
      if (!interpreterId) {
        setError("Interpreter ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getUserInfoByUserIdService(interpreterId);
        console.log(data);
        setTranslator({
          name: data.fullName || "Unknown Translator",
          avatar: data.avatarUrl || "https://i.pravatar.cc/150?img=32",
          role: "English–Vietnamese Translator",
          email: data.email || "N/A",
          phone: data.phoneNumber || "N/A",
          languages: ["English", "Vietnamese"],
          experience: data.experience || "N/A",
          location: data.address || "Location not provided",
          about: data.about || "No about information available",
          skills: data.skills || ["Legal Translation", "Technical Writing"],
          certifications: data.certifications || [],
          experienceDetails: data.experienceDetails || [],
          education: data.education || [],
          publications: data.publications || [],
          superpower: data.superpower || "Clear and precise interpretation",
          lookingFor: data.lookingFor || "Open to collaborations",
        });
      } catch (err) {
        setError(err.message || "Failed to load translator profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchTranslatorProfile();
  }, [interpreterId]);

  if (loading)
    return <div className="translator-profile-container">Loading...</div>;
  if (error)
    return <div className="translator-profile-container">Error: {error}</div>;
  if (!translator)
    return (
      <div className="translator-profile-container">No data available.</div>
    );

  return (
    <div className="translator-profile-container">
      <div className="profile-card">
        <div className="profile-banner" />

        <div className="profile-content">
          <div className="profile-left">
            <img
              src={translator.avatar}
              alt={translator.name}
              className="profile-avatar"
            />
            <h2 className="profile-name">{translator.name}</h2>
            <p className="profile-role">{translator.role}</p>
            <span className="profile-verified">✔ Verified</span>

            <div className="profile-contact">
              <p>📧 {translator.email}</p>
              <p>📞 {translator.phone}</p>
              <p>🌐 Languages: {translator.languages.join(", ")}</p>
              <p>💼 Experience: {translator.experience} </p>
              <p>📍 Location: {translator.location}</p>
            </div>

            <div className="profile-links">
              <a
                href="https://www.linkedin.com/in/sample-translator"
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
                href="https://www.facebook.com/sample.translator"
                target="_blank"
                rel="noreferrer"
              >
                📘 Facebook
              </a>
              <a
                href="https://www.instagram.com/sample.translate"
                target="_blank"
                rel="noreferrer"
              >
                📸 Instagram
              </a>
            </div>
          </div>

          <div className="profile-right">
            <section>
              <h3>About</h3>
              <p>{translator.about}</p>
            </section>

            <section>
              <h3>Skills</h3>
              <div className="profile-skills">
                {translator.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </section>

            <section>
              <h3>Certifications</h3>
              <ul>
                {translator.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Experience</h3>
              <ul>
                {translator.experienceDetails.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Education</h3>
              <ul>
                {translator.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Publications & Projects</h3>
              <ul>
                {translator.publications.map((pub, index) => (
                  <li key={index}>{pub}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Superpower</h3>
              <p>{translator.superpower}</p>
            </section>

            <section>
              <h3>Looking For</h3>
              <p>{translator.lookingFor}</p>
            </section>

            <button className="profile-hire-btn">Hire This Translator</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorProfile;
