import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ChatButton from '../components/ChatButton';
import ChatWindow from '../components/ChatWindow';
import '../styles.css';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

// Create a container for our React app
const container = document.createElement('div');
container.id = 'cogator-root';
document.body.appendChild(container);

// Inject our React app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 