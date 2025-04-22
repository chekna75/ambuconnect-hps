import React from "react";
import { Header } from "components/Header";
import { CTAButton } from "components/CTAButton";
import { AmbulanceIcon } from "components/AmbulanceIcon";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 px-4 md:py-24">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ambu-dark">
                <span className="text-ambu-blue">Simplified</span> Medical Transport Management
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                AmbuConnect provides healthcare facilities with an efficient solution to manage patient transport requests. Streamline your workflow and improve coordination with ambulance services.
              </p>
              <div className="flex gap-4 pt-4">
                <CTAButton to="/create-transport" size="lg">
                  Create Transport Request
                </CTAButton>
                <CTAButton to="/dashboard" variant="secondary" size="lg">
                  View Dashboard
                </CTAButton>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md">
                <div className="flex justify-center text-ambu-blue mb-6">
                  <AmbulanceIcon size={80} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-6 text-ambu-dark">
                  Why Choose AmbuConnect?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Simple transport requests in just 3 clicks",
                    "Real-time notifications for status updates",
                    "Comprehensive calendar view of all transports",
                    "Optimized for healthcare professionals"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="rounded-full p-1 bg-ambu-blue-light text-ambu-blue-dark mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-ambu-dark">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Simplified Request Form",
                description: "Create transport requests in seconds with our streamlined form that captures all essential information.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                )
              },
              {
                title: "Real-time Notifications",
                description: "Stay informed with instant updates when transport status changes or when ambulances confirm pickup.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                )
              },
              {
                title: "Comprehensive Calendar",
                description: "View all upcoming and past transports in an intuitive calendar with daily, weekly, and monthly views.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="text-ambu-blue mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-ambu-dark">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-ambu-blue-light py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-ambu-dark">Ready to simplify patient transport management?</h2>
          <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
            Start managing your patient transports more efficiently today.
          </p>
          <CTAButton to="/create-transport" size="lg">
            Create Your First Transport Request
          </CTAButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ambu-dark text-white py-8 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-ambu-blue font-bold text-2xl mr-1">Ambu</div>
              <div className="text-white font-bold text-2xl">Connect</div>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} AmbuConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
