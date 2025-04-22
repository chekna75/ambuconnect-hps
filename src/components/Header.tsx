import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Props {
  /** Optional classname to customize the header */
  className?: string;
}

export const Header = ({ className = "" }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`w-full bg-white shadow-sm z-10 ${className}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and brand name */}
        <div className="flex items-center">
          <div className="text-ambu-blue font-bold text-2xl mr-2">Ambu</div>
          <div className="text-ambu-dark font-bold text-2xl">Connect</div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => navigateTo("/")} 
            className="text-ambu-dark hover:text-ambu-blue font-medium transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo("/dashboard")} 
            className="text-ambu-dark hover:text-ambu-blue font-medium transition-colors"
          >
            Dashboard
          </button>
          <button 
            onClick={() => navigateTo("/create-transport")} 
            className="text-ambu-dark hover:text-ambu-blue font-medium transition-colors"
          >
            New Transport
          </button>
          <button 
            onClick={() => navigateTo("/calendar")} 
            className="text-ambu-dark hover:text-ambu-blue font-medium transition-colors"
          >
            Calendar
          </button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-ambu-dark hover:text-ambu-blue" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
            <button 
              onClick={() => navigateTo("/")} 
              className="text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo("/dashboard")} 
              className="text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigateTo("/create-transport")} 
              className="text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors"
            >
              New Transport
            </button>
            <button 
              onClick={() => navigateTo("/calendar")} 
              className="text-ambu-dark hover:text-ambu-blue py-2 px-4 rounded-md text-left font-medium transition-colors"
            >
              Calendar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
