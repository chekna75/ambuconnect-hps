import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { HomePage } from './HomePage';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-ambu-blue"></div>
  </div>
);

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        {location.pathname === '/' ? (
          <HomePage />
        ) : (
          <main className="container mx-auto px-4">
            <Outlet />
          </main>
        )}
      </Suspense>
    </div>
  );
} 