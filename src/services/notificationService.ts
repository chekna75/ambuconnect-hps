import { useEffect } from 'react';
import { toast } from "sonner";

// Define possible notification types we might receive
interface WebSocketMessage {
  type: 'TRANSPORT_ACCEPTED' | 'TRANSPORT_CANCELLED' | 'TRANSPORT_MODIFIED';
  payload: {
    transportId: string;
    message: string;
    details?: string; // Optional extra info
  };
}

// Mock data simulating incoming messages
const mockMessages: WebSocketMessage[] = [
  {
    type: 'TRANSPORT_ACCEPTED',
    payload: { transportId: 'T-101', message: 'Accepted by Beta Medics' },
  },
  {
    type: 'TRANSPORT_MODIFIED',
    payload: { transportId: 'T-098', message: 'Pickup time changed to 14:30', details: 'Reason: Delay' },
  },
  {
    type: 'TRANSPORT_CANCELLED',
    payload: { transportId: 'T-055', message: 'Cancelled by facility' },
  },
  {
    type: 'TRANSPORT_ACCEPTED',
    payload: { transportId: 'T-102', message: 'Accepted by Gamma Transport' },
  },
];

let messageIndex = 0;

/**
 * Custom hook to simulate receiving WebSocket notifications
 * and display them as toasts using Sonner.
 */
export const useWebSocketNotifications = () => {
  useEffect(() => {
    // Function to simulate receiving one message
    const simulateMessage = () => {
      if (messageIndex >= mockMessages.length) {
        // Optional: Stop simulating after all messages shown, or loop
         console.log("Mock notifications finished.");
         // messageIndex = 0; // Uncomment to loop
         return;
      }

      const message = mockMessages[messageIndex];
      messageIndex++;

      console.log("Simulating WebSocket message:", message);

      switch (message.type) {
        case 'TRANSPORT_ACCEPTED':
          toast.success(`Transport ${message.payload.transportId} Accepted`, {
            description: message.payload.message,
            duration: 5000, // Keep visible longer
          });
          break;
        case 'TRANSPORT_CANCELLED':
          toast.error(`Transport ${message.payload.transportId} Cancelled`, {
            description: message.payload.message,
            duration: 5000,
          });
          break;
        case 'TRANSPORT_MODIFIED':
          toast.warning(`Transport ${message.payload.transportId} Modified`, {
            description: `${message.payload.message}${message.payload.details ? ` (${message.payload.details})` : ''}`,
            duration: 5000,
          });
          break;
        default:
          console.warn('Unknown notification type received');
      }

      // Schedule the next message simulation
      const nextDelay = Math.random() * 5000 + 5000; // 5-10 seconds delay
      setTimeout(simulateMessage, nextDelay);
    };

    // Start the simulation after an initial delay
    const startTimeoutId = setTimeout(simulateMessage, 3000); // Start after 3 seconds

    // Cleanup function to clear timeout if the component unmounts
    return () => {
      clearTimeout(startTimeoutId);
      // Potentially need to clear the recursive setTimeout as well if we implement that
       console.log("Stopping notification simulation.");
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // This hook doesn't need to return anything for now
};
