import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Props {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode; // Optional icon component
  className?: string;
}

export const StatCard = ({ title, value, description, icon, className = "" }: Props) => {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {icon && <div className="text-ambu-blue">{icon}</div>} 
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-ambu-dark">{value}</div>
        {description && (
          <p className="text-xs text-gray-500 pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
