import React from "react";

const AnimatedImageSection: React.FC = () => {
  return (
    <div className="image-section">
      {/* Animated Background */}
      <div className="image-background">
        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="geometric-shapes">
          <div className="shape-circle" />
          <div className="shape-square" />
          <div className="shape-triangle" />
        </div>

        {/* Main Illustration */}
        <div className="main-illustration">
          <div className="illustration-circle">
            <div className="illustration-inner">
              <div className="illustration-center">
                <div className="center-core" />

                {/* Connection lines */}
                <div className="connection-lines">
                  <div className="connection-line line-1" />
                  <div className="connection-line line-2" />
                  <div className="connection-line line-3" />
                  <div className="connection-line line-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="orbiting-elements">
            <div className="orbit-dot orbit-1" />
            <div className="orbit-dot orbit-2" />
            <div className="orbit-dot orbit-3" />
            <div className="orbit-dot orbit-4" />
          </div>
        </div>

        {/* Text Overlay */}
        <div className="text-overlay">
          <h2 className="text-title">Connect. Translate. Communicate.</h2>
          <p className="text-subtitle">Breaking language barriers worldwide</p>
        </div>

        {/* Wave Animation */}
        <div className="wave-animation">
          <svg
            className="wave-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 320"
          >
            <path
              className="wave-path"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedImageSection;
