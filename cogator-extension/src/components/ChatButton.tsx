import React from 'react';
import '../styles.css';

declare const chrome: any;

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  // Check if we're in a Chrome extension environment
  const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL;
  
  const imageSrc = isExtension 
    ? chrome.runtime.getURL('icons/Co-Gator-Cropped-and-cleared.png')
    : '../icons/Co-Gator-Cropped-and-cleared.png';

  return (
    <button
      className={`chat-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Open chat"
    >
      <img
        src={imageSrc}
        alt="CoGator"
        style={{
          width: '30px',
          height: '30px',
          objectFit: 'contain'
        }}
      />
    </button>
  );
};

export default ChatButton; 