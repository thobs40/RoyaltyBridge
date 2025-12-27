
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <aside className="w-64 glass h-screen fixed left-0 top-0 border-r border-white/10 flex flex-col z-40">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
          MiRoy
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
