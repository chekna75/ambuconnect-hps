import { WebSocketService } from '@/services/websocket/WebSocketService';
import { useEffect, useCallback, useState } from 'react';
import { Message } from '@/services/etablissement/types';

interface UseWebSocketOptions {
  onMessage?: (message: Message) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  autoConnect?: boolean;
}

export function useWebSocket(etablissementId: string, options: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const wsService = WebSocketService.getInstance();

  const handleMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
    options.onMessage?.(message);
  }, [options.onMessage]);

  const handleConnect = useCallback(() => {
    setIsConnected(true);
    options.onConnect?.();
  }, [options.onConnect]);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    options.onDisconnect?.();
  }, [options.onDisconnect]);

  const connect = useCallback(() => {
    wsService.connect(etablissementId);
  }, [etablissementId]);

  const disconnect = useCallback(() => {
    wsService.disconnect();
  }, []);

  useEffect(() => {
    const messageCleanup = wsService.onMessage(handleMessage);
    const connectCleanup = wsService.onConnect(handleConnect);
    const disconnectCleanup = wsService.onDisconnect(handleDisconnect);

    if (options.autoConnect !== false) {
      connect();
    }

    return () => {
      messageCleanup();
      connectCleanup();
      disconnectCleanup();
      disconnect();
    };
  }, [
    etablissementId,
    handleMessage,
    handleConnect,
    handleDisconnect,
    connect,
    disconnect,
    options.autoConnect
  ]);

  return {
    isConnected,
    messages,
    connect,
    disconnect
  };
} 