
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { LogOut, Music } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <aside className="w-20 lg:w-64 glass h-screen fixed left-0 top-0 border-r border-white/10 flex flex-col z-40 transition-all duration-500">
      <div className="p-6 lg:p-8 flex justify-center lg:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Music className="text-white" size={20} />
          </div>
          <h1 className="hidden lg:block text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            MiRoy
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-3 lg:px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 px-3 py-4 lg:px-4 lg:py-3 rounded-2xl transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-inner'
                : 'text-slate-500 hover:text-blue-300 hover:bg-white/5'
            }`}
          >
            <span className={activeTab === item.id ? 'scale-110 transition-transform' : ''}>
              {item.icon}
            </span>
            <span className="hidden lg:block font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 px-3 py-4 lg:px-4 lg:py-3 text-slate-500 hover:text-red-400 transition-colors rounded-2xl hover:bg-red-500/10"
        >
          <LogOut size={20} />
          <span className="hidden lg:block font-bold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
