"use client";
import React, { useState } from "react";
interface Message {
  id: string;
  sender: string;
  text: string; // Adjust properties as needed
}

export default function ChatMessageInput({
  onSendMessage,
}: {
  onSendMessage: (message: Message) => void;
}) {
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      const newMessage: Message = {
      
        id: Date.now().toString(), 
        sender: "You",
        text: message,
      };
      onSendMessage(newMessage);
      setMessage(""); 
    }
  };

  return (
    <form className="chat-message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
