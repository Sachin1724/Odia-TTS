import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavbar: React.FC = () => {
  const location = useLocation();

  // Don't show on landing page
  if (location.pathname === '/') return null;

  const navItems = [
    { name: 'Analytics', path: '/workspace/analytics', icon: 'analytics' },
    { name: 'Speaker', path: '/workspace/profile', icon: 'person' },
    { name: 'Voice', path: '/collect', icon: 'mic' },
    { name: 'Library', path: '/workspace/library', icon: 'library_music' },
    { name: 'API', path: '/api', icon: 'settings' }, // Updated API path to /api
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-[#09090b] border-t border-white/10 flex justify-around items-center h-16 z-50 px-2 pb-safe backdrop-blur-md">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-white' : 'text-zinc-500'}`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavbar;
