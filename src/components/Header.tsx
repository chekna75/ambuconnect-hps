import React, { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { ChatPopover } from "./Chat/ChatPopover";
import { useAuth } from "./hooks/useAuth";

export interface Props {
  /** Optional classname to customize the header */
  className?: string;
  /** ID de l'établissement pour le chat */
  etablissementId?: string;
}

export const Header = ({ className = "", etablissementId }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    startTransition(() => {
      setIsMenuOpen(false);
      navigate(path);
    });
  };

  return (
    <header className={`w-full bg-white shadow-sm z-10 ${className}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and brand name */}
        <div className="flex items-center cursor-pointer" onClick={() => navigateTo("/")}>
          <div className="text-ambu-blue font-bold text-2xl mr-2">Ambu</div>
          <div className="text-ambu-dark font-bold text-2xl">Connect</div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigateTo("/")} 
            className={`text-ambu-dark hover:text-ambu-blue font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
            disabled={isPending}
          >
            Accueil
          </button>
          {isAuthenticated && (
            <>
              <button 
                onClick={() => navigateTo("/dashboard")} 
                className={`text-ambu-dark hover:text-ambu-blue font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
                disabled={isPending}
              >
                Tableau de bord
              </button>
              <button 
                onClick={() => navigateTo("/create-transport")} 
                className={`text-ambu-dark hover:text-ambu-blue font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
                disabled={isPending}
              >
                Nouveau Transport
              </button>
              <button 
                onClick={() => navigateTo("/calendar")} 
                className={`text-ambu-dark hover:text-ambu-blue font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
                disabled={isPending}
              >
                Calendrier
              </button>
            </>
          )}
          <button 
            onClick={() => navigateTo("/contact")} 
            className={`text-ambu-dark hover:text-ambu-blue font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
            disabled={isPending}
          >
            Contact
          </button>
          {!isAuthenticated && (
            <button 
              onClick={() => navigateTo("/login")} 
              className={`bg-ambu-blue text-white px-4 py-2 rounded-md hover:bg-ambu-blue/90 transition-colors ${isPending ? 'opacity-50' : ''}`}
              disabled={isPending}
            >
              Connexion
            </button>
          )}
          {etablissementId && (
            <ChatPopover etablissementId={etablissementId} />
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          {etablissementId && (
            <ChatPopover etablissementId={etablissementId} />
          )}
          <button 
            className={`text-ambu-dark hover:text-ambu-blue ${isPending ? 'opacity-50' : ''}`}
            onClick={toggleMenu}
            aria-label="Basculer le menu"
            disabled={isPending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
            <button 
              onClick={() => navigateTo("/")} 
              className={`text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
              disabled={isPending}
            >
              Accueil
            </button>
            {isAuthenticated && (
              <>
                <button 
                  onClick={() => navigateTo("/dashboard")} 
                  className={`text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
                  disabled={isPending}
                >
                  Tableau de bord
                </button>
                <button 
                  onClick={() => navigateTo("/create-transport")} 
                  className={`text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
                  disabled={isPending}
                >
                  Nouveau Transport
                </button>
                <button 
                  onClick={() => navigateTo("/calendar")} 
                  className={`text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
                  disabled={isPending}
                >
                  Calendrier
                </button>
              </>
            )}
            <button 
              onClick={() => navigateTo("/contact")} 
              className={`text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors ${isPending ? 'opacity-50' : ''}`}
              disabled={isPending}
            >
              Contact
            </button>
            {!isAuthenticated && (
              <button 
                onClick={() => navigateTo("/login")} 
                className={`bg-ambu-blue text-white py-2 px-4 rounded-md text-left font-medium hover:bg-ambu-blue/90 transition-colors ${isPending ? 'opacity-50' : ''}`}
                disabled={isPending}
              >
                Connexion
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
