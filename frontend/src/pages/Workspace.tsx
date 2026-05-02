import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import BackgroundOverlay from '../components/BackgroundOverlay';

const Workspace: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Analytics', path: '/workspace/analytics', icon: 'analytics' },
    { name: 'Speaker Profile', path: '/workspace/profile', icon: 'person' },
    { name: 'Voice Recorder', path: '/collect', icon: 'mic' },
    { name: 'Library', path: '/workspace/library', icon: 'library_music' },
    { name: 'API Settings', path: '/workspace/settings', icon: 'settings' },
  ];

  return (
    <div className="bg-[#141313] text-[#e5e2e1] min-h-screen flex flex-col md:flex-row font-sans selection:bg-white/20 relative">
      <BackgroundOverlay opacity={0.01} />
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-[#09090b] border-r border-white/10 flex-col fixed h-full z-40">
        <div className="h-14 flex items-center px-6 border-b border-white/10">
          <Link to="/" className="text-lg font-bold tracking-widest text-white">BHASA.ODIA</Link>
          <span className="text-zinc-500 text-sm ml-2">/ Workspace</span>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Exit Workspace
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-[#0e0e0e] min-h-screen pb-20 md:pb-0">
        <div className="h-14 border-b border-white/10 flex items-center px-4 md:px-8 bg-[#09090b] sticky top-0 z-30 justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              <span className="text-xs uppercase tracking-widest font-medium hidden sm:inline">Home</span>
            </Link>
            <span className="text-zinc-800 hidden sm:inline">|</span>
            <div className="md:hidden flex items-center gap-2">
               <span className="text-xs font-bold tracking-widest text-white">BHASA.ODIA</span>
               <span className="text-zinc-500 text-[10px]">/ Workspace</span>
            </div>
            <h1 className="text-white font-medium text-sm hidden md:block">
              {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
        </div>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Workspace;
