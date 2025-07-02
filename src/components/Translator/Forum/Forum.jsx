import React from "react";
import ForumSidebar from "./ForumSidebar/ForumSidebar";
import DiscussionThread from "./DiscussionThread/DiscussionThread";
import MessageInput from "./MessageInput/MessageInput";
import { Search } from "lucide-react";
import "./Forum.scss";

const Forum = () => {
  const discussions = [
    {
      id: 1,
      author: "Mai",
      role: "Senior Project Manager",
      avatar: "M",
      time: "2 hours ago",
      content:
        "Good morning. In the administrator menu -> payment history, when the account is transferred, the billing history is not displayed. I understand that only the payment method is completed. Therefore, only customers paying for a card can view it, and if you are a bank transfer customer, please check.",
      replies: 4,
    },
    {
      id: 2,
      author: "paulman",
      role: "Translator",
      avatar: "P",
      time: "3 hours ago",
      content:
        "Are there any limits where we manage transfers manually? I will take some time as a customer.",
      replies: 0,
    },
    {
      id: 3,
      author: "Austin",
      role: "Interpreter",
      avatar: "A",
      time: "4 hours ago",
      content:
        "These are four different values. The app is being modified due to another issue. Let's apply it together.",
      replies: 2,
    },
    {
      id: 4,
      author: "David",
      role: "Lead Developer",
      avatar: "D",
      time: "5 hours ago",
      content:
        "Thank you! Payment Method It would be nice to show the details of the issuance of the payment request invoice when transferring the account. Please do not hesitate to let us know if there's anything you need to check. Android",
      replies: 1,
    },
  ];

  return (
    <div className="forum-page">
      <div className="forum-page__container">
        <div className="forum-page__layout">
          <div className="forum-page__main">
            <div className="forum-page__search">
              <div className="forum-page__search-wrapper">
                <Search className="forum-page__search-icon" />
                <input
                  type="text"
                  placeholder="Search discussions, tips, experiences..."
                  className="forum-page__search-input"
                />
              </div>
            </div>

            <div className="forum-page__content">
              <div className="forum-page__thread-header">
                <h2 className="forum-page__thread-title">Experience Sharing</h2>
                <p className="forum-page__thread-subtitle">
                  Share your translation and interpretation experiences
                </p>
              </div>

              <div className="forum-page__discussions">
                {discussions.map((discussion) => (
                  <DiscussionThread key={discussion.id} {...discussion} />
                ))}
              </div>

              <MessageInput />
            </div>
          </div>

          <ForumSidebar />
        </div>
      </div>
    </div>
  );
};

export default Forum;
