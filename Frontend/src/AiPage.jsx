import React, { useState, useEffect } from 'react';
import './AiPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AiPage() {
  // Load messages from localStorage or use default
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('aiChatMessages');
    return saved
      ? JSON.parse(saved)
      : [{ role: 'bot', content: 'Hi, what can I help you with?' }];
  });
  const [input, setInput] = useState('');

  const handleClearChat = () => {
    setMessages([{ role: 'bot', content: 'Hi, what can I help you with?' }]);
    localStorage.removeItem('aiChatMessages');
  };

  // Persist messages to localStorage on change
  useEffect(() => {
    localStorage.setItem('aiChatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message to chat
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post(
        'http://localhost:8080/ai/chat',
        {
          messages: newMessages.map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        }
      );

      const botReply = response.data.reply;
      setMessages([...newMessages, { role: 'bot', content: botReply }]);
    } catch (error) {
      console.error('Error calling AI:', error);
    }
  };

  return (
    <div className="ai-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thryve</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/diy">DIY</Link></li>
          <li className="active">AI</li>
          <li><Link to="/study">Study</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Chat Interface */}
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
          >
            {msg.content}
          </div>
        ))}
        <div className="input-area">
          <span role="img" aria-label="image">🖼️</span>
          <input
            type="text"
            placeholder="Hello, how can I help?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <span role="img" aria-label="send" onClick={handleSend} style={{ cursor: 'pointer' }}>⤴️</span>
          <button className="clear-chat-btn" onClick={handleClearChat}>Clear Chat</button>
        </div>
      </div>
    </div>
  );
}

export default AiPage;