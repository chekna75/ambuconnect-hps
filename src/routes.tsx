import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RouteErrorBoundary } from './components/ErrorBoundary';

// Chargement paresseux des composants
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Calendar = lazy(() => import('./pages/Calendar'));
const CreateRequest = lazy(() => import('./pages/CreateRequest'));
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const CreateEtablissement = lazy(() => import('./pages/CreateEtablissement'));
const CreateUser = lazy(() => import('./pages/CreateUser'));
const Login = lazy(() => import('./pages/Login'));

// Configuration des routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/calendar',
        element: (
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        ),
      },
      {
        path: '/create-transport',
        element: (
          <ProtectedRoute>
            <CreateRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/create-etablissement',
        element: (
            <CreateEtablissement />
        ),
      },
      {
        path: '/create-user',
        element: (
            <CreateUser />
        ),
      },
      {
        path: '*',
        element: <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl text-gray-600">Page non trouvée</div>
        </div>,
      },
    ],
  },
]); 