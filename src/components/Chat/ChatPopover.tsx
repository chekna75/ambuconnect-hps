import { useState } from 'react';
import { Chat } from './Chat';
import './ChatPopover.css';

interface ChatPopoverProps {
  etablissementId: string;
  unreadCount?: number;
}

export function ChatPopover({ etablissementId, unreadCount = 0 }: ChatPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-popover">
      <button 
        className="chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="chat-icon"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="chat-popover-content">
          <div className="chat-popover-header">
            <h3>Messages</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              title="Fermer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <Chat 
            etablissementId={etablissementId}
            className="chat-popover-chat"
          />
        </div>
      )}
    </div>
  );
} 