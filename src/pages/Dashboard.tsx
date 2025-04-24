import React from "react";
import { RecentTransportsList } from "@/components/RecentTransportsList";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { DashboardStats, TransportListItem } from "@/utils/types";
import { Clock, CalendarCheck, CalendarClock, Percent, BarChartHorizontal, PlusCircle, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Pour le développement, on utilise un ID d'établissement de test
const MOCK_ETABLISSEMENT_ID = "123e4567-e89b-12d3-a456-426614174000";

// Données de test - À remplacer par des données réelles plus tard
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
    pickupTime: "10:30",
    status: "Confirmed",
    assignedCompany: "Alpha MedTransport",
    pickupAddress: "123 Rue de l'Hôpital",
    dropoffAddress: "456 Rue de la Rééducation",
    transportType: "Seated",
  },
  {
    id: "T124",
    patientName: "Patient B",
    pickupTime: "11:15",
    status: "Pending",
    assignedCompany: "-",
    pickupAddress: "123 Rue de l'Hôpital",
    dropoffAddress: "789 Centre de Dialyse",
    transportType: "Stretcher",
  },
  {
    id: "T125",
    pickupTime: "13:00", // Anonymisé
    status: "Pending",
    assignedCompany: "-",
    pickupAddress: "123 Rue de l'Hôpital",
    dropoffAddress: "321 Clinique Spécialisée",
    transportType: "Seated",
  },
];

export default function DashboardPage() {
  // Dans une vraie application, récupérer l'ID de l'établissement depuis le contexte d'authentification
  const etablissementId = MOCK_ETABLISSEMENT_ID;
  const stats = mockStats;
  const recentTransports = mockRecentTransports;

  return (
    <DashboardLayout etablissementId={etablissementId}>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-ambu-dark mb-6">Vue d'Ensemble du Tableau de Bord</h1>

        {/* Bouton Ajouter une Demande */}
        <div className="mb-6 text-right">
          <Link to="/createrequest">
            <Button className="bg-ambu-blue hover:bg-ambu-dark">
              <PlusCircle className="mr-2 h-4 w-4" /> Créer une Nouvelle Demande
            </Button>
          </Link>
        </div>

        {/* Grille des Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
          <StatCard 
            title="Transports Aujourd'hui"
            value={stats.transportsToday}
            icon={<CalendarClock size={20} />}
          />
          <StatCard 
            title="Transports Cette Semaine"
            value={stats.transportsThisWeek}
            icon={<CalendarCheck size={20} />}
          />
          <StatCard 
            title="Transports Ce Mois"
            value={stats.transportsThisMonth}
            icon={<CalendarDays size={20} />}
          />
          <StatCard 
            title="Temps Moyen de Prise en Charge"
            value={`${stats.avgPickupTimeMinutes} min`}
            icon={<Clock size={20} />}
            description="Temps moyen jusqu'à la confirmation"
          />
          <StatCard 
            title="Taux de Confirmation"
            value={`${stats.confirmationRatePercent}%`}
            icon={<Percent size={20} />}
            description="Taux de demandes confirmées"
          />
        </div>

        {/* Liste des Transports Récents */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-ambu-dark mb-4">Demandes de Transport Récentes</h2>
          <RecentTransportsList transports={recentTransports} />
           <div className="mt-4 text-right">
             <a href="/calendar" className="text-sm font-medium text-ambu-blue hover:underline">
               Voir Tous les Transports
             </a>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
