import React, { useState, useMemo, useCallback } from 'react'; // Import useCallback
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parseISO from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';
import { useTransportData } from 'utils/transportService'; // Import the shared data hook
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles
import { DashboardLayout } from 'components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading

// Setup the localizer by providing the required functions
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define a type for our calendar events (can be refined later)
interface CalendarEvent {
  id: string;
  title: string; // e.g., "Patient Name / ID - Destination"
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any; // To store original transport data
}

// Mock events for now - TODO: Replace with dynamic data processing
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'John Doe - Radiology Dept.',
    start: new Date(2025, 3, 22, 10, 0, 0), // Year, Month (0-indexed), Day, Hour, Minute, Second
    end: new Date(2025, 3, 22, 11, 0, 0),
    resource: { status: 'Confirmed', assignedCompany: 'Alpha Ambulance' }
  },
  {
    id: '2',
    title: 'ID: abc123 - Cardiology Clinic', // Example with ID
    start: new Date(2025, 3, 23, 14, 30, 0),
    end: new Date(2025, 3, 23, 15, 30, 0),
    resource: { status: 'Pending', assignedCompany: null }
  }
];

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState<keyof typeof Views>(Views.WEEK);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  // Fetch transport data from the shared service
  const { transports, isLoading } = useTransportData();

  // Map transport data to calendar events
  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return transports.map(transport => {
      const startTime = parseISO(transport.pickupTime); // Parse ISO string date
      const endTime = addHours(startTime, 1); // Assume 1 hour duration for now
      return {
        id: transport.id,
        title: `${transport.patientInfo} - ${transport.destination}`,
        start: startTime,
        end: endTime,
        resource: { // Store original data for filtering/styling
          status: transport.status,
          assignedCompany: transport.assignedCompany,
        }
      };
    });
  }, [transports]);

  // Get unique statuses and companies from fetched data for filters
  const uniqueStatuses = useMemo(() =>
    ['all', ...new Set(transports.map(t => t.status).filter(Boolean))]
  , [transports]);

  const uniqueCompanies = useMemo(() =>
    ['all', ...new Set(transports.map(t => t.assignedCompany).filter(Boolean))]
  , [transports]);

  // Filter events based on selections
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(event => { // Use calendarEvents now
      const statusMatch = selectedStatus === 'all' || event.resource?.status === selectedStatus;
      const companyMatch = selectedCompany === 'all' || event.resource?.assignedCompany === selectedCompany;
      return statusMatch && companyMatch;
    });
  }, [calendarEvents, selectedStatus, selectedCompany]);

  // Function to style events based on status
  const eventPropGetter = useCallback(
    (event: CalendarEvent) => {
      let className = 'rounded p-0.5 text-xs text-gray-800 border border-transparent'; // Base style
      const status = event.resource?.status;

      if (status === 'Confirmed') {
        className += ' bg-green-200 border-green-400';
      } else if (status === 'Pending') {
        className += ' bg-yellow-200 border-yellow-400';
      } else {
        className += ' bg-blue-200 border-blue-400'; // Default for other statuses
      }
      return { className };
    },
    []
  );

  // TODO: Add filtering logic based on selectedStatus and selectedCompany
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-ambu-dark mb-6">Transport Calendar</h1>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-xl whitespace-nowrap">Schedule Overview</CardTitle>
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* View Switcher */}
                <div className="flex items-center gap-1 border rounded-md p-0.5">
                  <Button variant={currentView === Views.DAY ? "secondary" : "ghost"} size="sm" onClick={() => setCurrentView(Views.DAY)} className="h-7 px-2 text-xs">Day</Button>
                  <Button variant={currentView === Views.WEEK ? "secondary" : "ghost"} size="sm" onClick={() => setCurrentView(Views.WEEK)} className="h-7 px-2 text-xs">Week</Button>
                  <Button variant={currentView === Views.MONTH ? "secondary" : "ghost"} size="sm" onClick={() => setCurrentView(Views.MONTH)} className="h-7 px-2 text-xs">Month</Button>
                </div>
                 {/* Filters */}
                 <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <Label htmlFor="status-filter" className="text-xs font-medium whitespace-nowrap">Status:</Label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger id="status-filter" className="h-7 w-[120px] text-xs">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueStatuses.map(status => (
                            <SelectItem key={status} value={status} className="text-xs">
                              {status === 'all' ? 'All Statuses' : status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                     <div className="flex items-center gap-1.5">
                       <Label htmlFor="company-filter" className="text-xs font-medium whitespace-nowrap">Company:</Label>
                        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                          <SelectTrigger id="company-filter" className="h-7 w-[140px] text-xs">
                            <SelectValue placeholder="Filter by company" />
                          </SelectTrigger>
                          <SelectContent>
                            {uniqueCompanies.map(company => (
                              <SelectItem key={company} value={company} className="text-xs">
                                {company === 'all' ? 'All Companies' : company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                     </div>
                 </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
               <div className="space-y-4 p-4">
                 <Skeleton className="h-8 w-1/4" />
                 <Skeleton className="h-[60vh] w-full" />
               </div>
             ) : (
              <>
                {/* Set a fixed height for the calendar container */}
                <div style={{ height: '70vh' }}>
                  <Calendar
                    view={currentView} // Control the current view
                    onView={setCurrentView} // Update state when view changes via calendar UI
                    localizer={localizer}
                    events={filteredEvents} // Use filtered events
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }} // Make calendar fill the container
                    views={[Views.MONTH, Views.WEEK, Views.DAY]} // Enable views
                    defaultView={Views.WEEK} // Default view
                    date={new Date(2025, 3, 22)} // Set an initial date for predictability with mock data
                    eventPropGetter={eventPropGetter} // Apply custom styling
                    // TODO: Add onClick handler for events
                  />
                </div>
              </>
             )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}