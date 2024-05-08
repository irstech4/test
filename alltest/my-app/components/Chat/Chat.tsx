'use client'
import React, { useState } from 'react';

import ChatMessageInput from '@/components/Chat/ChatMessageInput';
import ChatList from '@/components/Chat/ChatList';
interface Message {
  id: string;
  sender: string;
  text: string; // Adjust properties as needed
}

export default function Chat() {

  const [messages, setMessages] = useState<Message[]>([]); 

  const addMessage = (message: Message): void => {
    setMessages([...messages, message]);  // Directly add the received Message object
};
  return (
    <div className="chat-app">
      <ChatList messages={messages} />
      <ChatMessageInput onSendMessage={addMessage} />
    </div>
  );
}
