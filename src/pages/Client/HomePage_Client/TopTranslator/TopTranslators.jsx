import React from "react";
import { Star, CheckCircle } from "lucide-react";
import "./TopTranslators.scss";
import Image from "../../../../assets/images/Image";

const TopTranslators = () => {
  const topTranslators = [
    {
      id: 1,
      name: "Sarah Johnson",
      languages: "English ↔ Spanish",
      rating: 4.9,
      reviews: 245,
      price: "$25/hour",
      avatar:
        "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744269752/Ban-sao-cua-Anh-Profile.04-scaled_vuvqel_Circle_rdve2p.jpg",
      verified: true,
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      languages: "Spanish ↔ French",
      rating: 4.8,
      reviews: 189,
      price: "$30/hour",
      avatar:
        "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270074/Anh-CV-chuyen-nghiep-min-1.jpg_exzc9m_Circle_miymix.webp",
      verified: true,
    },
    {
      id: 3,
      name: "Anna Chen",
      languages: "English ↔ Mandarin",
      rating: 5.0,
      reviews: 312,
      price: "$35/hour",
      avatar:
        "https://res.cloudinary.com/dk3yac2ie/image/upload/v1744270066/portrait-photography_1661_umiqms_Circle_f7orkt.jpg",
      verified: true,
    },
  ];

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
      {/* Background Elements */}
      <div className="top-translators__bg">
        <div className="top-translators__bg-circle top-translators__bg-circle--1"></div>
        <div className="top-translators__bg-circle top-translators__bg-circle--2"></div>
        <div className="top-translators__bg-circle top-translators__bg-circle--3"></div>
      </div>

      <div className="top-translators__container">
        {/* Title Section */}
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

        {/* Translators Grid */}
        <div className="top-translators__grid">
          {topTranslators.map((translator, index) => (
            <div
              key={translator.id}
              className="top-translators__card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="top-translators__card-glow"></div>

              {/* Avatar Section */}
              <div className="top-translators__avatar-section">
                <div className="top-translators__avatar-wrapper">
                  <img
                    src={translator.avatar}
                    alt={translator.name}
                    className="top-translators__avatar"
                  />
                  <div className="top-translators__avatar-ring"></div>
                </div>
                {translator.verified && (
                  <div className="top-translators__verified-badge">
                    <CheckCircle className="top-translators__verified-icon" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="top-translators__content">
                <h3 className="top-translators__name">{translator.name}</h3>
                <p className="top-translators__languages">
                  {translator.languages}
                </p>

                {/* Rating */}
                <div className="top-translators__rating">
                  <div className="top-translators__stars">
                    {renderStars(translator.rating)}
                  </div>
                  <span className="top-translators__rating-text">
                    {translator.rating} ({translator.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="top-translators__price">{translator.price}</div>

                {/* Connect Button */}
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
