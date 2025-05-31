import React from "react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Applications = ({ job }) => {
  const navigate = useNavigate();
  const translators = [
    {
      name: "Sophia Nguyen",
      avatar: "https://i.pravatar.cc/150?img=32",
      experience:
        "5 years of experience in legal, medical, and technical document translation",
      status: "Working on your request",
      online: true,
    },
  ];
  const handleViewProfile = () => {
    navigate("/client/translator_profile");
  };
  return (
    <div className="post-history-detail-applications">
      <h2 className="post-history-detail-section-title">
        <Users size={20} /> Applications
      </h2>
      {job.applications.length === 0 && translators.length === 0 ? (
        <p className="post-history-detail-no-data">
          No translators have applied yet. Be the first!
        </p>
      ) : (
        <div className="post-history-detail-translators">
          {translators.map((translator, index) => (
            <div key={index} className="post-history-detail-translator-card">
              <img
                src={translator.avatar}
                alt={translator.name}
                className="post-history-detail-translator-avatar"
              />
              <div className="post-history-detail-translator-info">
                <div className="post-history-detail-translator-name">
                  {translator.name}
                  {translator.online && (
                    <span className="post-history-detail-online-dot" />
                  )}
                </div>
                <div className="post-history-detail-translator-experience">
                  {translator.experience}
                </div>
                <div className="post-history-detail-translator-status">
                  Status: <span>{translator.status}</span>
                </div>
              </div>
              <button
                className="post-history-detail-view-profile-btn"
                onClick={handleViewProfile}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
