import React from "react";
import { MessageCircle, Clock } from "lucide-react";
import "./DiscussionThread.scss";

const DiscussionThread = ({ author, role, avatar, time, content, replies }) => {
  return (
    <div className="discussion-thread">
      <div className="discussion-thread__header">
        <div className="discussion-thread__author-info">
          <div className="discussion-thread__avatar">{avatar}</div>
          <div className="discussion-thread__details">
            <h4 className="discussion-thread__author">{author}</h4>
            <p className="discussion-thread__role">{role}</p>
          </div>
        </div>
        <div className="discussion-thread__time">
          <Clock className="discussion-thread__time-icon" />
          {time}
        </div>
      </div>

      <div className="discussion-thread__content">
        <p>{content}</p>
      </div>

      <div className="discussion-thread__footer">
        <button className="discussion-thread__reply-btn">
          <MessageCircle className="discussion-thread__reply-icon" />
          <span>{replies} replies</span>
        </button>
        <button className="discussion-thread__like-btn">👍 Like</button>
      </div>
    </div>
  );
};

export default DiscussionThread;
