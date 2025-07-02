import React, { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import "./MessageInput.scss";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit} className="message-input__form">
        <div className="message-input__wrapper">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your experience or ask a question..."
            className="message-input__textarea"
            rows="3"
          />
          <div className="message-input__actions">
            <button type="button" className="message-input__attach-btn">
              <Paperclip className="message-input__attach-icon" />
            </button>
            <button
              type="submit"
              className="message-input__send-btn"
              disabled={!message.trim()}
            >
              <Send className="message-input__send-icon" />
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
