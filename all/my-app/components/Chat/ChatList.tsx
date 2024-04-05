'use client'
import React from 'react';
import ChatMessage from './ChatMessage';
interface Message {
    id: string;
    sender: string;
    text: string;
  }
const ChatList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="chat-list">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatList;