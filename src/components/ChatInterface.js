import React, { useState } from 'react';
import axios from 'axios';
import './ChatInterface.css';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await axios.post('/api/message', { message: input });
    setMessages([...messages, { text: input, from: 'user' }, { text: response.data.message, from: 'bot' }]);
    setInput('');
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