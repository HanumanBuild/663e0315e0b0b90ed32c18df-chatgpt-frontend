import React, { useState } from 'react';
import axios from 'axios';
import './ChatInterface.css';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;  // Prevent sending empty messages
    const userMessage = { message: input };
    try {
      const response = await axios.post(`${process.env.REACT_APP_CHATGPT_BACKEND_URL}/api/message`, userMessage);
      const botResponse = response.data.message;
      setMessages([...messages, { text: input, from: 'user' }, { text: botResponse, from: 'bot' }]);
      setInput('');  // Clear input after sending
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, { text: 'Failed to get response from the server.', from: 'bot' }]);
    }
  };

  return (
    <div className='chat-container'>
      <ul className='messages-list'>
        {messages.map((msg, index) => (
          <li key={index} className={`message ${msg.from}`}>{msg.text}</li>
        ))}
      </ul>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type your message here...' />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}