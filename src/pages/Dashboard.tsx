import React from "react";
import { RecentTransportsList } from "components/RecentTransportsList"; // Import the new component
import { DashboardLayout } from "components/DashboardLayout";
import { StatCard } from "components/StatCard";
import { DashboardStats, TransportListItem } from "utils/types"; // Correct import path
import { Clock, CalendarCheck, CalendarClock, Percent, BarChartHorizontal, PlusCircle, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link for navigation

// Mock Data - Replace with actual data fetching later
const mockStats: DashboardStats = {
  transportsToday: 8,
  transportsThisWeek: 45,
  transportsThisMonth: 172,
  avgPickupTimeMinutes: 18,
  confirmationRatePercent: 92,
};

const mockRecentTransports: TransportListItem[] = [
  {
    id: "T123",
    patientName: "Patient A",
    pickupTime: "10:30 AM",
    status: "Confirmed",
    assignedCompany: "Alpha MedTransport",
    pickupAddress: "123 Hospital Way",
    dropoffAddress: "456 Rehab Rd",
    transportType: "Seated",
  },
  {
    id: "T124",
    patientName: "Patient B",
    pickupTime: "11:15 AM",
    status: "Pending",
    assignedCompany: "-",
    pickupAddress: "123 Hospital Way",
    dropoffAddress: "789 Dialysis Center",
    transportType: "Stretcher",
  },
  {
    id: "T125",
    pickupTime: "01:00 PM", // Anonymized
    status: "Pending",
    assignedCompany: "-",
    pickupAddress: "123 Hospital Way",
    dropoffAddress: "321 Specialist Clinic",
    transportType: "Seated",
  },
];

export default function DashboardPage() {
  // In a real app, use useState and useEffect to fetch data
  const stats = mockStats;
  const recentTransports = mockRecentTransports;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-ambu-dark mb-6">Dashboard Overview</h1>

        {/* Add Request Button */}
        <div className="mb-6 text-right">
          <Link to="/createrequest"> {/* Use PascalCase for page links */}
            <Button className="bg-ambu-blue hover:bg-ambu-dark">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Request
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
          <StatCard 
            title="Transports Today"
            value={stats.transportsToday}
            icon={<CalendarClock size={20} />}
          />
          <StatCard 
            title="Transports This Week"
            value={stats.transportsThisWeek}
            icon={<CalendarCheck size={20} />}
          />
          <StatCard 
            title="Transports This Month"
            value={stats.transportsThisMonth}
            icon={<CalendarDays size={20} />}
          />
          <StatCard 
            title="Avg. Pickup Time"
            value={`${stats.avgPickupTimeMinutes} min`}
            icon={<Clock size={20} />}
            description="Average time to confirmation"
          />
          <StatCard 
            title="Confirmation Rate"
            value={`${stats.confirmationRatePercent}%`}
            icon={<Percent size={20} />}
            description="Rate of confirmed requests"
          />
        </div>

        {/* Recent Transports List/Table (Placeholder for now) */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-ambu-dark mb-4">Recent Transport Requests</h2>
          {/* Display the Recent Transports Table */}
          <RecentTransportsList transports={recentTransports} />
           <div className="mt-4 text-right">
             <a href="/calendar" className="text-sm font-medium text-ambu-blue hover:underline">
               View All Transports
             </a>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
