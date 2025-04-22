import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';

// Chargement paresseux des composants
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Calendar = lazy(() => import('./pages/Calendar'));
const CreateRequest = lazy(() => import('./pages/CreateRequest'));
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const CreateEtablissement = lazy(() => import('./pages/CreateEtablissement'));
const CreateUser = lazy(() => import('./pages/CreateUser'));

// Configuration des routes
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/create-transport',
        element: <CreateRequest />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/create-etablissement',
        element: <CreateEtablissement />,
      },
      {
        path: '/create-user',
        element: <CreateUser />,
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

export default appRouter; 