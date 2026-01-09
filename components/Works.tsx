
import React, { useState } from 'react';
import { Music, Filter, Search, MoreHorizontal, Globe, Shield, ExternalLink, Play } from 'lucide-react';
import { MOCK_ROYALTIES } from '../constants';

const Works: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredWorks = MOCK_ROYALTIES.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">My Catalog</h2>
          <p className="text-slate-400 font-medium">Manage and monitor all your registered intellectual property.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all w-64"
            />
          </div>
          <button className="glass p-3 rounded-2xl border border-white/10 text-slate-400 hover:text-white transition-all">
            <Filter size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorks.map((work) => (
          <div key={work.id} className="group glass p-2 rounded-[2.5rem] border border-white/5 hover:border-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-600/10">
            <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
               <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Music size={48} className="text-white/10 group-hover:text-white/20 transition-colors" />
               </div>
               <div className="absolute top-4 right-4 flex gap-2">
                 <span className="bg-slate-900/80 backdrop-blur-md text-[9px] font-black text-white px-2 py-1 rounded-md uppercase tracking-wider border border-white/10">
                   {work.cmo}
                 </span>
               </div>
               <button className="absolute bottom-4 right-4 w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                 <Play size={20} fill="currentColor" />
               </button>
            </div>
            
            <div className="px-6 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-violet-400 transition-colors">{work.title}</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">ISRC: US-3MY-24-00{work.id}2</p>
                </div>
                <button className="text-slate-600 hover:text-white transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                   <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Total Plays</p>
                   <p className="text-white font-bold">{work.plays.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                   <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Collected</p>
                   <p className="text-emerald-400 font-black">${work.earnings.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {i === 1 ? 'AP' : '+1'}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2 Holders</span>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                       <Globe size={16} />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                       <Shield size={16} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
