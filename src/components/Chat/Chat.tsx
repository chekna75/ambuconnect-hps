import { useState, useRef, useEffect } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { EtablissementService } from '../../services/etablissement/EtablissementService';
import { Message, MessageType } from '../../services/etablissement/types';
import './Chat.css';

interface ChatProps {
  etablissementId: string;
  demandeId?: string;
  className?: string;
}

export function Chat({ etablissementId, demandeId, className = '' }: ChatProps) {
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const etablissementService = EtablissementService.getInstance();

  const { isConnected, messages } = useWebSocket(etablissementId, {
    onConnect: () => {
      console.log('Chat connecté');
    },
    onDisconnect: () => {
      console.log('Chat déconnecté');
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await etablissementService.createMessage(etablissementId, {
        demandeId,
        type: 'DISCUSSION',
        contenu: messageInput.trim()
      });
      setMessageInput('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getMessageTypeClass = (type: MessageType) => {
    switch (type) {
      case 'URGENT':
        return 'message-urgent';
      case 'NOTIFICATION':
        return 'message-notification';
      case 'INFORMATION':
        return 'message-info';
      default:
        return '';
    }
  };

  return (
    <div className={`chat-container ${className}`}>
      <div className="chat-header">
        <h2>Messages {demandeId ? 'de la demande' : ''}</h2>
        <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? 'Connecté' : 'Déconnecté'}
        </span>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${getMessageTypeClass(message.type)}`}
          >
            <div className="message-header">
              <span className="sender">{message.expediteurNom}</span>
              <span className="time">{formatDate(message.dateCreation)}</span>
            </div>
            <div className="message-content">{message.contenu}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Écrivez votre message..."
          disabled={!isConnected || isLoading}
          className="message-input"
        />
        <button
          type="submit"
          disabled={!isConnected || isLoading || !messageInput.trim()}
          className="send-button"
        >
          {isLoading ? (
            <span className="loading-spinner" />
          ) : (
            'Envoyer'
          )}
        </button>
      </form>
    </div>
  );
} 