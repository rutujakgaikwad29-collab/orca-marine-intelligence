import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { useMarineSimulation } from '../../hooks/useMarineSimulation';
import { PersistentVoiceAgent } from '../agent/PersistentVoiceAgent';
import { Toaster } from 'sonner';
import { useState } from 'react';

export const AppLayout = () => {
  // Start the background simulation
  useMarineSimulation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F4F7FB] text-slate-900 relative overflow-hidden font-sans">
      {/* Light Oceanic Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/80 via-[#F4F7FB] to-sky-50/60"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-3xl"></div>
      </div>

      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col sm:ml-64 w-full relative z-10">
        <Topbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-4 sm:p-6 w-full">
          <Outlet />
        </main>
      </div>

      {/* Global Conversational Voice Agent */}
      <PersistentVoiceAgent />

      <Toaster theme="light" richColors position="bottom-right" />
    </div>
  );
};
