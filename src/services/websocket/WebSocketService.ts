import { BaseService } from '../base/BaseService';
import { Message } from '../etablissement/types';

type MessageCallback = (message: Message) => void;
type ConnectionCallback = () => void;

export class WebSocketService extends BaseService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private messageCallbacks: Set<MessageCallback> = new Set();
  private connectCallbacks: Set<ConnectionCallback> = new Set();
  private disconnectCallbacks: Set<ConnectionCallback> = new Set();
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 1000;
  private etablissementId: string | null = null;

  private constructor() {
    super();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(etablissementId: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return;
    }

    this.etablissementId = etablissementId;
    const wsUrl = this.api.defaults.baseURL?.replace('http', 'ws') || '';
    this.socket = new WebSocket(wsUrl);
    this.setupSocketListeners();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.etablissementId = null;
      this.reconnectAttempts = 0;
    }
  }

  public onMessage(callback: MessageCallback): () => void {
    this.messageCallbacks.add(callback);
    return () => this.messageCallbacks.delete(callback);
  }

  public onConnect(callback: ConnectionCallback): () => void {
    this.connectCallbacks.add(callback);
    return () => this.connectCallbacks.delete(callback);
  }

  public onDisconnect(callback: ConnectionCallback): () => void {
    this.disconnectCallbacks.add(callback);
    return () => this.disconnectCallbacks.delete(callback);
  }

  private setupSocketListeners(): void {
    if (!this.socket) return;

    this.socket.onopen = () => {
      console.log('WebSocket connexion établie');
      this.reconnectAttempts = 0;
      this.connectCallbacks.forEach(callback => callback());
    };

    this.socket.onmessage = (event) => {
      try {
        const message: Message = JSON.parse(event.data);
        this.messageCallbacks.forEach(callback => callback(message));
      } catch (error) {
        console.error('Erreur lors du parsing du message:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connexion fermée');
      this.disconnectCallbacks.forEach(callback => callback());
      this.attemptReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket erreur:', error);
    };
  }

  private attemptReconnect(): void {
    if (
      this.reconnectAttempts < this.maxReconnectAttempts && 
      this.etablissementId
    ) {
      this.reconnectAttempts++;
      console.log(`Tentative de reconnexion ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
      
      setTimeout(() => {
        this.connect(this.etablissementId!);
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  public sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
} 