import React, { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react"; // Icon for sorting
import { Button } from "@/components/ui/button"; // For clickable headers
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TransportListItem } from "@/utils/types";

// Define status colors (Tailwind classes)
const statusColors: Record<TransportListItem['status'], string> = {
  Pending: "bg-blue-100 text-blue-800 border-blue-300",
  Confirmed: "bg-green-100 text-green-800 border-green-300",
  "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-300", // Adjusted color
  Completed: "bg-gray-100 text-gray-800 border-gray-300",
  Cancelled: "bg-red-100 text-red-800 border-red-300",
};

export interface Props {
  transports: TransportListItem[];
}

export const RecentTransportsList = ({ transports }: Props) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof TransportListItem | null; direction: 'ascending' | 'descending' | null }>({ key: 'pickupTime', direction: 'ascending' }); // Default sort by time

  const sortedTransports = useMemo(() => {
    let sortableItems = [...transports];
    if (sortConfig.key !== null && sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [transports, sortConfig]);

  const requestSort = (key: keyof TransportListItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Helper to get sorting icon
  const getSortIcon = (key: keyof TransportListItem) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-3 w-3 text-gray-400" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <ArrowUpDown className="ml-2 h-3 w-3 text-ambu-blue" /> : 
      <ArrowUpDown className="ml-2 h-3 w-3 text-ambu-blue" />; // Simplified icon for now
  };


  if (!transports || transports.length === 0) {
    return <p className="text-center text-gray-500 py-4">No recent transport requests found.</p>;
  }

  return (
    <Table>
      <TableCaption>A list of recent transport requests.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]"> {/* Adjusted width */}
            <Button variant="ghost" onClick={() => requestSort('pickupTime')} className="px-1 py-1 h-auto text-xs font-semibold">
              Time
              {getSortIcon('pickupTime')}
            </Button>
          </TableHead>
          <TableHead>
             Patient/ID {/* Not sortable for now */}
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort('status')} className="px-1 py-1 h-auto text-xs font-semibold">
              Status
               {getSortIcon('status')}
            </Button>
          </TableHead>
          <TableHead>
            Assigned Company {/* Not sortable for now */}
          </TableHead>
          <TableHead className="text-right">
             <Button variant="ghost" onClick={() => requestSort('transportType')} className="px-1 py-1 h-auto text-xs font-semibold">
               Type
               {getSortIcon('transportType')}
             </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTransports.map((transport) => { // Use sortedTransports
          // Find the correct color class based on status
          const statusClass = statusColors[transport.status] || "bg-gray-100 text-gray-800 border-gray-300"; // Default fallback
          
          return (
          <TableRow key={transport.id}>
            <TableCell className="font-medium">{transport.pickupTime}</TableCell>
            <TableCell>{transport.patientName || `ID: ${transport.id.substring(0, 6)}...`}</TableCell>
            <TableCell>
              <Badge 
                variant="outline"
                className={`text-xs font-semibold ${statusClass}`}
              >
                {transport.status}
              </Badge>
            </TableCell>
            <TableCell>{transport.assignedCompany || "-"}</TableCell>
            <TableCell className="text-right">{transport.transportType}</TableCell>
          </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
