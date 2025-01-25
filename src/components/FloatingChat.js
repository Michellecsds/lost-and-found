// src/components/FloatingChat.js
import React from "react";
import "./FloatingChat.css";

const FloatingChat = ({ onClick }) => {
  return (
    <div className="floating-chat" onClick={onClick}>
      💬
    </div>
  );
};

export default FloatingChat;
