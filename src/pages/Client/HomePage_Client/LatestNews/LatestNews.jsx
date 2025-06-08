import React from "react";
import "./LatestNews.scss";

const LatestNews = () => {
  const recentPosts = [
    {
      id: 1,
      translator: "Sarah Johnson",
      title: "Professional Legal Document Translation",
      description:
        "Specialized in legal document translation with 5+ years experience in international law...",
      tags: ["Legal", "Business", "Certified"],
      timeAgo: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80", // Sarah
    },
    {
      id: 2,
      translator: "Miguel Rodriguez",
      title: "Medical Translation Services",
      description:
        "Expert medical translator for healthcare documents, pharmaceutical research...",
      tags: ["Medical", "Healthcare", "Research"],
      timeAgo: "4 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80", // Miguel
    },
    {
      id: 3,
      translator: "Anna Chen",
      title: "Technical Manual Translation",
      description:
        "Specializing in technical documentation for software and engineering companies...",
      tags: ["Technical", "Software", "Engineering"],
      timeAgo: "6 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1589571894960-20bbe2828a27?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80", // Anna
    },
    {
      id: 4,
      translator: "James Patel",
      title: "Business Negotiation Interpretation",
      description:
        "Experienced interpreter for business negotiations with expertise in multilingual contracts...",
      tags: ["Business", "Negotiation", "Contracts"],
      timeAgo: "8 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80", // James
    },
  ];

  return (
    <section className="latest-news-section">
      <div className="latest-news-container">
        <h2 className="latest-news-section-title">Latest News</h2>
        <div className="latest-news-grid">
          {recentPosts.map((post) => (
            <div key={post.id} className="latest-news-card">
              <div className="latest-news-header">
                <img
                  src={post.avatar}
                  alt={post.translator}
                  className="latest-news-avatar"
                />
                <div className="latest-news-meta">
                  <h4 className="latest-news-author">{post.translator}</h4>
                  <span className="latest-news-time">{post.timeAgo}</span>
                </div>
              </div>
              <div className="latest-news-content">
                <h3 className="latest-news-title">{post.title}</h3>
                <p className="latest-news-description">{post.description}</p>
                <div className="latest-news-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="latest-news-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
