import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ChatButton from './components/ChatButton';
import ChatWindow from './components/ChatWindow';
import './styles.css';

// Mock Canvas-like page for testing
const MockPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>CoGator Development Page</h1>
      <p>This page simulates the Canvas environment for testing the extension UI.</p>
      <div style={{ height: '1000px' }}>
        {/* Add some scrollable content */}
        <p>Scroll down to see the chat button...</p>
      </div>
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <MockPage />
  </React.StrictMode>
); 