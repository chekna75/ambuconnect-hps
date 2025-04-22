import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, LayoutDashboard, CalendarDays, PlusSquare, LogOut } from 'lucide-react'; // Using lucide-react icons
import { useWebSocketNotifications } from 'utils/notificationService'; // Import the hook

interface Props {
  children: React.ReactNode;
}

// Define navigation items
const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'New Transport', path: '/create-transport', icon: PlusSquare },
  { name: 'Calendar', path: '/calendar', icon: CalendarDays },
];

export const DashboardLayout = ({ children }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Activate the mock WebSocket notifications
  useWebSocketNotifications();

  // Helper to determine active link
  const isActive = (path: string) => location.pathname === path;

  // Common nav link styling
  const linkClasses = (path: string) =>
    `flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${ 
      isActive(path)
        ? 'bg-ambu-blue text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-ambu-dark'
    }`;

  const iconClasses = (path: string) =>
    `mr-3 h-5 w-5 ${isActive(path) ? 'text-white' : 'text-gray-400 group-hover:text-ambu-dark'}`;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-ambu-dark">
           <div className="text-ambu-blue font-bold text-xl mr-1">Ambu</div>
           <div className="text-white font-bold text-xl">Connect</div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path} className={linkClasses(item.path)}>
              <item.icon className={iconClasses(item.path)} aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        {/* Optional: Add footer or logout button to sidebar */}
         <div className="p-4 border-t border-gray-200 mt-auto">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-ambu-dark">
            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-ambu-dark" />
            Logout (Placeholder)
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Menu */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <div className="flex items-center">
            <div className="text-ambu-blue font-bold text-lg mr-1">Ambu</div>
            <div className="text-ambu-dark font-bold text-lg">Connect</div>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-ambu-dark" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              {/* Mobile Menu Content (Sidebar Replica) */}
              <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4 bg-ambu-dark">
                 <div className="flex items-center">
                    <div className="text-ambu-blue font-bold text-lg mr-1">Ambu</div>
                    <div className="text-white font-bold text-lg">Connect</div>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                   <X className="h-6 w-6 text-white" />
                   <span className="sr-only">Close menu</span>
                 </Button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink 
                    key={item.name} 
                    to={item.path} 
                    className={linkClasses(item.path)}
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on navigation
                  >
                    <item.icon className={iconClasses(item.path)} aria-hidden="true" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-200 mt-auto">
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-ambu-dark">
                  <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-ambu-dark" />
                  Logout (Placeholder)
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden flex items-center justify-around bg-white border-t border-gray-200 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-150 ease-in-out ${ 
                isActive(item.path)
                  ? 'text-ambu-blue'
                  : 'text-gray-500 hover:text-ambu-dark hover:bg-gray-100'
              }`}
            >
              <item.icon className={`h-6 w-6 mb-1 ${isActive(item.path) ? 'text-ambu-blue' : 'text-gray-400'}`} aria-hidden="true" />
              <span className="text-xs font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
