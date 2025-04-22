// Frontend-specific types for AmbuConnect

// Dashboard statistics
export interface DashboardStats {
  transportsToday: number;
  transportsThisWeek: number;
  transportsThisMonth: number;
  avgPickupTimeMinutes: number; // Average time in minutes
  confirmationRatePercent: number; // Percentage (e.g., 95 for 95%)
}

// Individual transport item for lists/tables
export interface TransportListItem {
  id: string;
  patientName?: string; // Optional or anonymized
  pickupAddress: string;
  dropoffAddress: string;
  pickupTime: string; // ISO string or formatted string
  // Consider using specific string literals for status for better type safety
  status: "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";
  assignedCompany?: string;
  // Consider using specific string literals for transport type
  transportType: "Seated" | "Stretcher" | "Urgent";
  additionalInfo?: string;
}
