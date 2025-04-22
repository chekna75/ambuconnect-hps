import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden bg-ambu-blue">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-ambu-blue via-ambu-blue/90 to-ambu-dark opacity-90" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Ambu Connect
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto">
            Votre solution de transport médical intuitive et sécurisée
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-ambu-blue text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-ambu-dark mb-2">Gestion Simplifiée</h3>
              <p className="text-gray-600">
                Gérez facilement vos transports médicaux avec une interface intuitive et des outils puissants.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-ambu-blue text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-ambu-dark mb-2">Planification Optimisée</h3>
              <p className="text-gray-600">
                Optimisez vos plannings et réduisez les temps d'attente grâce à notre système intelligent.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-ambu-blue text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-ambu-dark mb-2">Sécurité Maximale</h3>
              <p className="text-gray-600">
                Protégez les données sensibles de vos patients avec notre système sécurisé et conforme.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-ambu-dark sm:text-4xl">
            <span className="block">Prêt à commencer ?</span>
            <span className="block text-ambu-blue">Créez votre premier transport dès maintenant.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => navigate('/create-transport')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ambu-blue hover:bg-ambu-dark"
              >
                Créer un transport
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-ambu-blue bg-white hover:bg-gray-50"
              >
                Voir le tableau de bord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 