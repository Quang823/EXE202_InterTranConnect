import React, { useState } from "react";
import { Heart, Star, CheckCircle, Clock, Filter } from "lucide-react";
import "./TranslatorDirectory.scss";

const TranslatorDirectory = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    lookingFor: "Interpreter",
    expertise: [],
    sourceLanguage: "Vietnamese",
    targetLanguage: "English",
    experienceLevel: "All levels",
  });

  const [likedTranslators, setLikedTranslators] = useState(new Set());

  const toggleLike = (id) => {
    const newLiked = new Set(likedTranslators);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedTranslators(newLiked);
  };

  const translators = [
    {
      id: 1,
      name: "Alex Nguyen",
      title: "Interpreter",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      rating: 4.9,
      reviews: 245,
      hourlyRate: 25,
      responseTime: "1 hour",
      specializations: [
        "Available now",
        "Legal translation",
        "Certified translator",
        "Simultaneous interpretation",
      ],
      languages:
        "Legal Translation • Certified Translation • Business Negotiation • Document Translation • Medical Interpretation",
      description:
        "With over 8 years of experience in legal translation, I specialize in translating civil and administrative documents. I am flexible, have time for urgent work and efficient in delivery.",
      verified: true,
      topRated: true,
    },
    {
      id: 2,
      name: "Gia Thinh",
      title: "Interpreter",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      rating: 4.8,
      reviews: 189,
      hourlyRate: 30,
      responseTime: "2 hours",
      specializations: [
        "Available now",
        "Medical interpretation",
        "Tourism & hospitality",
        "Online consultation",
      ],
      languages:
        "Legal Translation • Certified Translation • Business Negotiation • Document & Legal Consultant • Medical Interpretation",
      description:
        "Experienced legal translator with 6+ years. Served 200+ jobs and 50000+ hourly translated. I am flexible, have time for urgent work and efficient in delivery.",
      verified: true,
      topRated: false,
    },
    {
      id: 3,
      name: "Jade Allen",
      title: "Interpreter",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      rating: 5.0,
      reviews: 312,
      hourlyRate: 35,
      responseTime: "30 min",
      specializations: [
        "Simultaneous interpretation",
        "Localization expert",
        "Certified translator",
      ],
      languages:
        "Legal Translation • Certified Translation • Business Negotiation • Document & Legal Consultant • Medical Interpretation",
      description:
        "Professional translator with expertise in legal documents. Quick turnaround. Quality Assurance. Long-Haul at an affordable price.",
      verified: true,
      topRated: true,
    },
    {
      id: 4,
      name: "Anthony T.",
      title: "Interpreter",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f8fbd9a8ecb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      rating: 4.7,
      reviews: 156,
      hourlyRate: 28,
      responseTime: "1 hour",
      specializations: [
        "Business & commerce",
        "Technical translation",
        "Patent translation",
      ],
      languages:
        "Legal Translation • Certified Translation • Business Negotiation • Document & Legal Consultant • Medical Interpretation",
      description:
        "With over 5 years of experience working as a freelance Legal Translator. Online Professional Services. Expert in all law fields.",
      verified: true,
      topRated: false,
    },
    {
      id: 5,
      name: "Claudiani T.",
      title: "Interpreter",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      rating: 4.9,
      reviews: 203,
      hourlyRate: 32,
      responseTime: "45 min",
      specializations: [
        "Available now",
        "Subtitling & dubbing",
        "Literary translation",
      ],
      languages:
        "Legal Translation • Certified Translation • Business Negotiation • Document & Legal Consultant • Medical Interpretation",
      description:
        "Experienced translator with expertise in various fields. Fast delivery, accurate translations, and competitive rates.",
      verified: true,
      topRated: true,
    },
    {
      id: 6,
      name: "Ryan T.",
      title: "Interpreter",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      rating: 4.6,
      reviews: 128,
      hourlyRate: 26,
      responseTime: "2 hours",
      specializations: [
        "Available now",
        "Conference interpretation",
        "Medical interpretation",
        "Legal translation",
      ],
      languages:
        "Legal Translation • Certified Translation • Business Negotiation • Document & Legal Consultant • Medical Interpretation",
      description:
        "With over 4+ years of experience as a freelance interpreter specializing law-related. I handle all business, academic, informative, and creative content.",
      verified: true,
      topRated: false,
    },
  ];

  return (
    <section className="translator-directory-section">
      <div className="translator-directory-container">
        {/* Header */}
        <div className="translator-directory-header">
          {/* <h1 className="translator-directory-title">
            Choose Your Translators
          </h1> */}
          <p className="translator-directory-subtitle">
            Connect with professional translators and interpreters for all your
            language needs
          </p>
        </div>

        <div className="translator-directory-content">
          {/* Filter Sidebar */}
          <div className="translator-directory-filters">
            <div className="translator-directory-filter-card">
              <div className="translator-directory-filter-header">
                <div className="translator-directory-filter-icon">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h2 className="translator-directory-filter-title">Filters</h2>
              </div>

              {/* Looking for */}
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

              {/* Expertise */}
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

              {/* Language selects */}
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

          {/* Translator List */}
          <div className="translator-directory-list">
            {translators.map((translator, index) => (
              <div
                key={translator.id}
                className="translator-directory-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="translator-directory-card-header">
                  <div className="translator-directory-profile">
                    <div className="translator-directory-avatar-container">
                      <img
                        src={translator.avatar}
                        alt={translator.name}
                        className="translator-directory-avatar"
                      />
                      {translator.verified && (
                        <div className="translator-directory-verified-badge">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="translator-directory-info">
                      <div className="translator-directory-name-row">
                        <h3 className="translator-directory-name">
                          {translator.name}
                        </h3>
                        <span className="translator-directory-title-text">
                          {translator.title}
                        </span>
                        {translator.topRated && (
                          <span className="translator-directory-top-rated">
                            Top Rated
                          </span>
                        )}
                      </div>

                      <div className="translator-directory-rating">
                        <div className="translator-directory-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`translator-directory-star ${
                                i < Math.floor(translator.rating)
                                  ? "filled"
                                  : "empty"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="translator-directory-rating-text">
                          {translator.rating}
                        </span>
                        <span className="translator-directory-reviews">
                          ({translator.reviews} reviews)
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

                {/* Specializations */}
                <div className="translator-directory-specializations">
                  {translator.specializations.map((spec) => (
                    <span key={spec} className="translator-directory-spec-tag">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Languages */}
                <div className="translator-directory-languages">
                  {translator.languages}
                </div>

                {/* Description */}
                <p className="translator-directory-description">
                  {translator.description}
                </p>

                {/* Footer */}
                <div className="translator-directory-card-footer">
                  <div className="translator-directory-rate">
                    <span className="translator-directory-rate-text">
                      From{" "}
                    </span>
                    <span className="translator-directory-rate-amount">
                      ${translator.hourlyRate}/hour
                    </span>
                  </div>

                  <div className="translator-directory-response">
                    <Clock className="translator-directory-clock-icon" />
                    <span>Response time: {translator.responseTime}</span>
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
