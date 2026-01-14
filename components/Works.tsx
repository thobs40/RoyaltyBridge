import React, { useState } from 'react';
import { Music, Filter, Search, MoreHorizontal, Globe, Shield, ExternalLink, Play, Plus } from 'lucide-react';
import { MOCK_ROYALTIES } from '../constants';
import SubmissionModal from './SubmissionModal';

const Works: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredWorks = MOCK_ROYALTIES.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">My Catalog</h2>
          <p className="text-slate-400 font-medium">Manage and monitor all your registered intellectual property.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all w-full sm:w-64 text-sm font-medium"
            />
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button className="glass p-4 rounded-2xl border border-white/10 text-slate-400 hover:text-white transition-all flex-1 sm:flex-none flex items-center justify-center">
              <Filter size={20} />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Plus size={18} />
              Register New Work
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorks.map((work) => (
          <div key={work.id} className="group glass p-2 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-600/10 bg-white/[0.01]">
            <div className="relative h-56 rounded-[2rem] overflow-hidden mb-6">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Music size={56} className="text-white/10 group-hover:text-white/20 transition-colors" />
               </div>
               <div className="absolute top-5 right-5 flex gap-2">
                 <span className="bg-slate-900/90 backdrop-blur-md text-[10px] font-black text-white px-3 py-1.5 rounded-xl uppercase tracking-widest border border-white/10">
                   {work.cmo}
                 </span>
               </div>
               <button className="absolute bottom-5 right-5 w-14 h-14 bg-white text-slate-950 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                 <Play size={24} fill="currentColor" />
               </button>
            </div>
            
            <div className="px-6 pb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{work.title}</h3>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mt-2">Asset ID: US-3MY-24-00{work.id}2</p>
                </div>
                <button className="text-slate-600 hover:text-white transition-colors p-2">
                  <MoreHorizontal size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Stream Units</p>
                   <p className="text-white font-black text-lg">{work.plays.toLocaleString()}</p>
                </div>
                <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Net Equity</p>
                   <p className="text-blue-400 font-black text-lg">${work.earnings.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2].map(i => (
                        <div key={i} className="w-10 h-10 rounded-xl bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[11px] font-black text-slate-400">
                          {i === 1 ? 'AP' : '+1'}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">2 Participants</span>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-500 hover:text-blue-400 border border-white/5">
                       <Globe size={18} />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-500 hover:text-blue-400 border border-white/5">
                       <Shield size={18} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Works;