import React, { useState, useMemo, useCallback } from 'react'; // Import useCallback
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parseISO from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';
import fr from 'date-fns/locale/fr'; // Ajout de la locale française
import { useTransportData } from '../utils/transportService'; // Correction du chemin d'importation
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles
import { DashboardLayout } from '../components/DashboardLayout'; // Correction du chemin d'importation
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading
import { Label } from "@/components/ui/label";

// Setup the localizer by providing the required functions
const locales = {
  'fr-FR': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { locale: fr }),
  getDay,
  locales,
});

// Define a type for our calendar events (can be refined later)
interface CalendarEvent {
  id: string;
  title: string; // Ex: "Nom du Patient / ID - Destination"
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any; // To store original transport data
}

// Mock events for now - TODO: Replace with dynamic data processing
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Jean Dupont - Service de Radiologie',
    start: new Date(2025, 3, 22, 10, 0, 0), // Year, Month (0-indexed), Day, Hour, Minute, Second
    end: new Date(2025, 3, 22, 11, 0, 0),
    resource: { status: 'Confirmé', assignedCompany: 'Alpha Ambulance' }
  },
  {
    id: '2',
    title: 'ID: abc123 - Clinique de Cardiologie', // Example with ID
    start: new Date(2025, 3, 23, 14, 30, 0),
    end: new Date(2025, 3, 23, 15, 30, 0),
    resource: { status: 'En attente', assignedCompany: null }
  }
];

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState<keyof typeof Views>(Views.WEEK);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  // Fetch transport data from the shared service
  const { transports, isLoading, error } = useTransportData();

  // Map transport data to calendar events
  const calendarEvents: CalendarEvent[] = useMemo(() => {
    if (!transports) return [];
    
    return transports.map(transport => {
      const startTime = parseISO(transport.pickupTime);
      const endTime = addHours(startTime, 1);
      return {
        id: transport.id,
        title: `${transport.patientInfo} - ${transport.destination}`,
        start: startTime,
        end: endTime,
        resource: {
          status: transport.status,
          assignedCompany: transport.assignedCompany,
        }
      };
    });
  }, [transports]);

  // Get unique statuses and companies from fetched data for filters
  const uniqueStatuses = useMemo(() =>
    ['all', ...new Set(transports?.map(t => t.status).filter(Boolean) || [])]
  , [transports]);

  const uniqueCompanies = useMemo(() =>
    ['all', ...new Set(transports?.map(t => t.assignedCompany).filter(Boolean) || [])]
  , [transports]);

  // Filter events based on selections
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(event => {
      const statusMatch = selectedStatus === 'all' || event.resource?.status === selectedStatus;
      const companyMatch = selectedCompany === 'all' || event.resource?.assignedCompany === selectedCompany;
      return statusMatch && companyMatch;
    });
  }, [calendarEvents, selectedStatus, selectedCompany]);

  // Function to style events based on status
  const eventPropGetter = useCallback(
    (event: CalendarEvent) => {
      let className = 'rounded p-0.5 text-xs text-gray-800 border border-transparent';
      const status = event.resource?.status;

      switch (status) {
        case 'Confirmé':
          className += ' bg-green-200 border-green-400';
          break;
        case 'En attente':
          className += ' bg-yellow-200 border-yellow-400';
          break;
        case 'Annulé':
          className += ' bg-red-200 border-red-400';
          break;
        default:
          className += ' bg-blue-200 border-blue-400';
      }
      return { className };
    },
    []
  );

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 text-red-600">
          Erreur: {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-ambu-dark mb-6">Calendrier des Transports</h1>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-xl whitespace-nowrap">Vue d'Ensemble du Planning</CardTitle>
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* View Switcher */}
                <div className="flex items-center gap-1 border rounded-md p-0.5">
                  <Button 
                    variant={currentView === Views.DAY ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => setCurrentView(Views.DAY)} 
                    className="h-7 px-2 text-xs"
                  >
                    Jour
                  </Button>
                  <Button 
                    variant={currentView === Views.WEEK ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => setCurrentView(Views.WEEK)} 
                    className="h-7 px-2 text-xs"
                  >
                    Semaine
                  </Button>
                  <Button 
                    variant={currentView === Views.MONTH ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => setCurrentView(Views.MONTH)} 
                    className="h-7 px-2 text-xs"
                  >
                    Mois
                  </Button>
                </div>
                 {/* Filters */}
                 <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <Label htmlFor="status-filter" className="text-xs font-medium whitespace-nowrap">Statut :</Label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger id="status-filter" className="h-7 w-[120px] text-xs">
                          <SelectValue placeholder="Filtrer par statut" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueStatuses.map(status => (
                            <SelectItem key={status} value={status} className="text-xs">
                              {status === 'all' ? 'Tous les Statuts' : status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                     <div className="flex items-center gap-1.5">
                       <Label htmlFor="company-filter" className="text-xs font-medium whitespace-nowrap">Entreprise :</Label>
                        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                          <SelectTrigger id="company-filter" className="h-7 w-[140px] text-xs">
                            <SelectValue placeholder="Filtrer par entreprise" />
                          </SelectTrigger>
                          <SelectContent>
                            {uniqueCompanies.map(company => (
                              <SelectItem key={company} value={company} className="text-xs">
                                {company === 'all' ? 'Toutes les Entreprises' : company}
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
                    messages={{
                      today: "Aujourd'hui",
                      previous: "Précédent",
                      next: "Suivant",
                      month: "Mois",
                      week: "Semaine",
                      day: "Jour",
                      agenda: "Agenda",
                      date: "Date",
                      time: "Heure",
                      event: "Événement",
                      noEventsInRange: "Aucun transport prévu dans cette période"
                    }}
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