import React, { useState } from 'react';
import '../styles.css';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement message sending
    setMessage('');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>CoGator Assistant</h3>
        <button className="close-button" onClick={onClose} aria-label="Close chat">
          ×
        </button>
      </div>
      <div className="chat-messages">
        {/* Messages will be displayed here */}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={1}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow; 