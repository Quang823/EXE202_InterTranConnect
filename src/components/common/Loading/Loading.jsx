import React from "react";
import "./Loading.scss";

const Loading = ({
  isLoading,
  size = "medium",
  color = "#3b82f6",
  fullScreen = false,
}) => {
  if (!isLoading) return null;

  return (
    <div className={`loading ${fullScreen ? "loading-fullscreen" : ""}`}>
      <div
        className={`loading-spinner ${size}`}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default Loading;
