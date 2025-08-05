import React, { useState, useEffect } from "react";
import { Heart, Star, CheckCircle, Clock, Filter } from "lucide-react";
import { getAllTalent } from "../../../../apiHandler/adminAPIHandler"; // Import hàm getAllTalent
import "./TranslatorDirectory.scss";

const TranslatorDirectory = () => {
  const [translators, setTranslators] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    lookingFor: "Interpreter",
    expertise: [],
    sourceLanguage: "Vietnamese",
    targetLanguage: "English",
    experienceLevel: "All levels",
  });
  const [likedTranslators, setLikedTranslators] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTalent();
        const filteredTranslators = response.map((user) => {
          const certificate = user.certificates[0] || {};
          const priorityLabel = user.priority > 0 ? "Push" : "";
          return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            avatarUrl: user.avatarURL,
            phoneNumber: user.phoneNumber,
            address: user.address,
            averageRating: user.averageRating,
            totalReviews: user.totalReviews,
            priorityLabel: priorityLabel,
            specializations: certificate.title ? [certificate.title] : [],
            languages: `${certificate.translationForm || "N/A"}-${
              certificate.translationLanguage || "N/A"
            }`,
            description:
              certificate.experience &&
              certificate.education &&
              certificate.workType &&
              certificate.website
                ? `With ${certificate.experience} years of experience, I graduated from ${certificate.education} and specialize as a ${certificate.workType}. Visit my website at ${certificate.website}.`
                : "No detailed description available.",
          };
        });
        // .filter((translator) => translator.specializations.length > 0);
        setTranslators(filteredTranslators);
      } catch (error) {
        console.error("Error fetching all talent users:", error);
      }
    };
    fetchData();
  }, []);

  const toggleLike = (id) => {
    const newLiked = new Set(likedTranslators);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedTranslators(newLiked);
  };

  return (
    <section className="translator-directory-section">
      <div className="translator-directory-container">
        <div className="translator-directory-header">
          <p className="translator-directory-subtitle">
            Connect with professional translators and interpreters for all your
            language needs
          </p>
        </div>

        <div className="translator-directory-content">
          <div className="translator-directory-filters">
            <div className="translator-directory-filter-card">
              <div className="translator-directory-filter-header">
                <div className="translator-directory-filter-icon">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h2 className="translator-directory-filter-title">Filters</h2>
              </div>

              <div className="translator-directory-filter-group">
                <h3>Looking for</h3>
                <div className="translator-directory-radio-group">
                  <label className="translator-directory-radio-item">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="Interpreter"
                      defaultChecked
                    />
                    <span>Interpreter</span>
                  </label>
                  <label className="translator-directory-radio-item">
                    <input type="radio" name="lookingFor" value="Translator" />
                    <span>Translator</span>
                  </label>
                </div>
              </div>

              <div className="translator-directory-filter-group">
                <h3>Expertise</h3>
                <div className="translator-directory-checkbox-group">
                  {[
                    "Legal services",
                    "Medical services",
                    "Business services",
                    "Academic services",
                  ].map((expertise) => (
                    <label
                      key={expertise}
                      className="translator-directory-checkbox-item"
                    >
                      <input type="checkbox" />
                      <span>{expertise}</span>
                    </label>
                  ))}
                </div>
              </div>

              {[
                {
                  label: "Source Language",
                  options: ["Vietnamese", "English", "Chinese", "Japanese"],
                },
                {
                  label: "Target Language",
                  options: ["English", "Vietnamese", "Chinese", "Japanese"],
                },
                {
                  label: "Experience Level",
                  options: [
                    "All levels",
                    "Entry level",
                    "Intermediate",
                    "Expert",
                  ],
                },
              ].map((field) => (
                <div
                  key={field.label}
                  className="translator-directory-filter-group"
                >
                  <h3>{field.label}</h3>
                  <select className="translator-directory-select">
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button className="translator-directory-apply-btn">
                Apply Filters
              </button>
            </div>
          </div>

          <div className="translator-directory-list">
            {translators.map((translator, index) => (
              <div
                key={translator.id}
                className="translator-directory-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="translator-directory-card-header">
                  <div className="translator-directory-profile">
                    <div className="translator-directory-avatar-container">
                      <img
                        src={
                          translator.avatarUrl ||
                          "https://via.placeholder.com/300"
                        }
                        alt={translator.fullName}
                        className="translator-directory-avatar"
                      />
                    </div>

                    <div className="translator-directory-info">
                      <div className="translator-directory-name-row">
                        <h3 className="translator-directory-name">
                          {translator.fullName}
                        </h3>
                        <span className="translator-directory-title-text">
                          Interpreter
                        </span>
                        {translator.priorityLabel && (
                          <span className="translator-directory-top-rated">
                            {translator.priorityLabel}
                          </span>
                        )}
                      </div>

                      <div className="translator-directory-rating">
                        <div className="translator-directory-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`translator-directory-star ${
                                i < Math.floor(translator.averageRating)
                                  ? "filled"
                                  : "empty"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="translator-directory-rating-text">
                          {translator.averageRating}
                        </span>
                        <span className="translator-directory-reviews">
                          ({translator.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="translator-directory-actions">
                    <button
                      onClick={() => toggleLike(translator.id)}
                      className={`translator-directory-heart-btn ${
                        likedTranslators.has(translator.id) ? "liked" : ""
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedTranslators.has(translator.id)
                            ? "fill-current"
                            : ""
                        }`}
                      />
                    </button>

                    <button className="translator-directory-contact-btn">
                      Contact
                    </button>
                  </div>
                </div>

                <div className="translator-directory-specializations">
                  {translator.specializations.map((spec) => (
                    <span key={spec} className="translator-directory-spec-tag">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="translator-directory-languages">
                  {translator.languages}
                </div>

                <p className="translator-directory-description">
                  {translator.description}
                </p>

                <div className="translator-directory-card-footer">
                  <div className="translator-directory-response">
                    <Clock className="translator-directory-clock-icon" />
                    <span>Response time: N/A</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslatorDirectory;
