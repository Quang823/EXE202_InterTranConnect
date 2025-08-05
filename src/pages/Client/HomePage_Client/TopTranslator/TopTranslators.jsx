import React, { useState, useEffect } from "react";
import { Star, CheckCircle } from "lucide-react";
import { getTopRatedTalents } from "../../../../apiHandler/adminAPIHandler";
import "./TopTranslators.scss";

const TopTranslators = () => {
  const [topTranslators, setTopTranslators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopRatedTalents(3);
        if (response) {
          const data = Array.isArray(response)
            ? response
            : response.data || [response];
          const formattedTranslators = data.map((user) => {
            const certificate = user.certificates[0] || {};
            return {
              id: user.id,
              name: user.fullName,
              languages: `${certificate.translationForm || "N/A"}-${
                certificate.translationLanguage || "N/A"
              }`,
              rating: user.averageRating,
              reviews: user.totalReviews,
              avatar: user.avatarURL || "https://via.placeholder.com/300", // Dùng placeholder nếu avatarURL null
              verified: true, // Giả định tất cả đều verified
            };
          });
          setTopTranslators(formattedTranslators);
        } else {
          console.warn("No data returned from getTopRatedTalents");
        }
      } catch (error) {
        console.error("Error fetching top rated talents:", error);
      }
    };
    fetchData();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`top-translators__star ${
          i < Math.floor(rating) ? "top-translators__star--filled" : ""
        }`}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <section className="top-translators">
      <div className="top-translators__bg">
        <div className="top-translators__bg-circle top-translators__bg-circle--1"></div>
        <div className="top-translators__bg-circle top-translators__bg-circle--2"></div>
        <div className="top-translators__bg-circle top-translators__bg-circle--3"></div>
      </div>

      <div className="top-translators__container">
        <div className="top-translators__header">
          <h2 className="top-translators__title">
            <span className="top-translators__title-main">TOP</span>
            <span className="top-translators__title-accent">TRANSLATORS</span>
          </h2>
          <div className="top-translators__title-decoration"></div>
          <p className="top-translators__subtitle">
            Connect with our most experienced and highly-rated professional
            translators
          </p>
        </div>

        <div className="top-translators__grid">
          {topTranslators.map((translator, index) => (
            <div
              key={translator.id}
              className="top-translators__card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="top-translators__card-glow"></div>

              <div className="top-translators__avatar-section">
                <div className="top-translators__avatar-wrapper">
                  <img
                    src={translator.avatar}
                    alt={translator.name}
                    className="top-translators__avatar"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300";
                    }} // Fallback nếu ảnh không load được
                  />
                  <div className="top-translators__avatar-ring"></div>
                </div>
                {translator.verified && (
                  <div className="top-translators__verified-badge">
                    <CheckCircle className="top-translators__verified-icon" />
                  </div>
                )}
              </div>

              <div className="top-translators__content">
                <h3 className="top-translators__name">{translator.name}</h3>
                <p className="top-translators__languages">
                  {translator.languages}
                </p>

                <div className="top-translators__rating">
                  <div className="top-translators__stars">
                    {renderStars(translator.rating)}
                  </div>
                  <span className="top-translators__rating-text">
                    {translator.rating} ({translator.reviews} reviews)
                  </span>
                </div>

                <button className="top-translators__connect-btn">
                  <span className="top-translators__btn-text">Connect Now</span>
                  <div className="top-translators__btn-shimmer"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTranslators;
