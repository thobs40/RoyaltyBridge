import React from 'react';
import { NAV_ITEMS } from '../constants';
import { LogOut, Music, Hexagon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <aside className="w-20 lg:w-72 glass-ultra h-[calc(100vh-48px)] fixed left-6 top-6 bottom-6 rounded-[3.5rem] border border-white/10 flex flex-col z-50 transition-all duration-500 shadow-2xl">
      {/* Brand Node */}
      <div className="p-8 flex justify-center lg:justify-start">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:rotate-12 transition-transform duration-500">
              <Hexagon className="text-white fill-current" size={24} />
            </div>
            <div className="absolute -inset-2 bg-blue-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-3xl font-black text-white tracking-tighter leading-none">MiRoy</h1>
            <p className="text-[8px] font-black text-blue-500 uppercase tracking-[0.5em] mt-1">Core Registry</p>
          </div>
        </div>
      </div>

      {/* Navigation Nodes */}
      <nav className="flex-1 px-4 lg:px-6 space-y-4 mt-8">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-5 px-4 py-5 lg:px-6 lg:py-4 rounded-[2rem] transition-all duration-500 group relative ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 border border-blue-400/30'
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute left-3 w-1.5 h-6 bg-white rounded-full lg:hidden" />
            )}
            <span className={`transition-all duration-500 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 group-hover:text-blue-400'}`}>
              {item.icon}
            </span>
            <span className={`hidden lg:block font-black text-[11px] uppercase tracking-[0.2em] transition-all ${
              activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* System Footer */}
      <div className="p-6 border-t border-white/5">
        <div className="mb-6 p-4 bg-white/5 rounded-2xl hidden lg:block border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Network Health</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
            All nodes synchronized at 14ms latency.
          </p>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 px-4 py-5 lg:px-6 lg:py-4 text-slate-600 hover:text-red-400 transition-all rounded-[2rem] hover:bg-red-500/10 group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden lg:block font-black text-[11px] uppercase tracking-[0.2em]">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;