
import React, { useState } from 'react';
import { Database, Search, Filter, Plus, ChevronRight, Hash, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import { MOCK_CMO_WORKS } from '../../constants';

const CMOWorksDB: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CMO_WORKS.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    w.creator.toLowerCase().includes(search.toLowerCase()) ||
    w.iswc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Works Database</h2>
          <p className="text-slate-400 font-medium">Master registry of global musical works and ISRC/ISWC mapping.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-violet-600/30 flex items-center gap-3 transition-all active:scale-95">
          <Plus size={20} /> Add Master Work
        </button>
      </header>

      <div className="mb-10 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by ISWC, Work Title, or Creator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-14 pr-6 py-5 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-bold text-lg"
          />
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-5 glass border border-white/10 rounded-[2rem] text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((work) => (
          <div key={work.id} className="glass p-8 rounded-[3rem] border border-white/5 hover:border-violet-500/30 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-violet-400 transition-colors">
                <Database size={28} />
              </div>
              <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${
                work.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                work.status === 'Under Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {work.status === 'Active' ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                {work.status}
              </div>
            </div>

            <h4 className="text-2xl font-black text-white mb-1 group-hover:text-violet-400 transition-colors">{work.title}</h4>
            <p className="text-sm font-bold text-slate-400 mb-6">{work.creator}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-slate-500">
                  <Hash size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">ISWC</span>
                </div>
                <span className="text-xs font-black text-white font-mono">{work.iswc}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-slate-500">
                  <Globe size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Regions</span>
                </div>
                <div className="flex gap-1">
                  {work.territories.map(t => (
                    <span key={t} className="text-[10px] font-black text-white bg-slate-800 px-2 py-0.5 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-white/5 hover:bg-violet-600 text-slate-400 hover:text-white rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest flex items-center justify-center gap-2 group/btn">
              Explore Lineage <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMOWorksDB;
