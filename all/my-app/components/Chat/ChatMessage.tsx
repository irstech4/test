"use client";
import React from "react";
interface Message {
    id: string;
    sender: string;
    text: string;
  }
export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="chat-message">
      <span className="chat-message-sender">{message.sender}:</span>
      <span className="chat-message-text">{message.text}</span>
    </div>
  );
}
