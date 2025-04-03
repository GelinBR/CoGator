import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(() => {
    // Load window state from localStorage on initial render
    const savedState = localStorage.getItem('chatWindowOpen');
    return savedState ? JSON.parse(savedState) : true;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on initial render
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Convert string timestamps back to Date objects
      return parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [];
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = message.timestamp.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  // Save window state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatWindowOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        text: "I'm your CoGator assistant. I'm still in development, but I'll be able to help you manage your Canvas coursework soon!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleRestart = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className={`chat-window ${isOpen ? 'open' : ''}`}>
      <div className="chat-header">
        <h3>CoGator Assistant</h3>
        <div className="header-buttons">
          <button className="restart-button" onClick={handleRestart} aria-label="Restart chat">
            Restart
          </button>
          <button className="close-button" onClick={handleClose} aria-label="Close chat">
            ×
          </button>
        </div>
      </div>
      <div className="chat-messages" ref={messagesContainerRef}>
        {Object.entries(messageGroups).map(([date, groupMessages]) => (
          <div key={date} className="message-group">
            <div className="date-divider">
              {new Date(date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {groupMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {msg.text}
                </div>
                <div className="message-timestamp">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow; 