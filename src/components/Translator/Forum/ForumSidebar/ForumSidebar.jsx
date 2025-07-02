import React from "react";
import {
  TrendingUp,
  Users,
  Star,
  Globe,
  FileText,
  Calendar,
} from "lucide-react";
import "./ForumSidebar.scss";

const ForumSidebar = () => {
  const categories = [
    { name: "Translation Jobs", count: 245, icon: FileText },
    { name: "Interpretation", count: 189, icon: Globe },
    { name: "Freelance", count: 156, icon: Users },
    { name: "Full-time", count: 98, icon: Calendar },
  ];

  const trendingTopics = [
    { title: "How to increase translation rates", replies: 45, views: 1200 },
    { title: "Conference interpretation tips", replies: 32, views: 890 },
    { title: "Translation tools and software", replies: 67, views: 2100 },
    { title: "Finding potential clients", replies: 28, views: 756 },
  ];

  return (
    <aside className="forum-sidebar">
      <div className="forum-sidebar__section">
        <h3 className="forum-sidebar__title">
          <Star className="forum-sidebar__title-icon" />
          Categories
        </h3>
        <div className="forum-sidebar__list">
          {categories.map((category, index) => (
            <div key={index} className="forum-sidebar__category">
              <div className="forum-sidebar__category-content">
                <div className="forum-sidebar__category-info">
                  <category.icon className="forum-sidebar__category-icon" />
                  <span className="forum-sidebar__category-name">
                    {category.name}
                  </span>
                </div>
                <span className="forum-sidebar__category-count">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="forum-sidebar__section">
        <h3 className="forum-sidebar__title">
          <TrendingUp className="forum-sidebar__title-icon" />
          Trending
        </h3>
        <div className="forum-sidebar__list">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="forum-sidebar__topic">
              <div className="forum-sidebar__topic-content">
                <h4 className="forum-sidebar__topic-title">{topic.title}</h4>
                <div className="forum-sidebar__topic-stats">
                  <span>{topic.replies} replies</span>
                  <span>{topic.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ForumSidebar;
