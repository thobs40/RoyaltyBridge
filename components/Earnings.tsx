
import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Download, Calendar, ExternalLink, PieChart as PieIcon } from 'lucide-react';

const Earnings: React.FC = () => {
  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Earnings Hub</h2>
          <p className="text-slate-400 font-medium">Detailed financial analytics and royalty payout history.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black text-white transition-all flex items-center gap-2">
            <Calendar size={18} />
            Oct 2024 - Dec 2024
          </button>
          <button className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-xs font-black shadow-xl shadow-violet-600/20 transition-all flex items-center gap-2">
            <Download size={18} />
            Statements
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-3 glass p-10 rounded-[3rem] border border-white/5">
           <div className="flex justify-between items-start mb-10">
              <div>
                 <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Current Balance</p>
                 <h3 className="text-5xl font-black text-white tracking-tighter">$14,204.30</h3>
              </div>
              <div className="text-right">
                 <p className="text-emerald-400 font-black flex items-center justify-end gap-1">
                   <ArrowUpRight size={16} /> +24%
                 </p>
                 <p className="text-xs text-slate-500 font-medium">from last quarter</p>
              </div>
           </div>
           
           <div className="space-y-8">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Platform Breakdown</h4>
              <div className="space-y-6">
                 {[
                   { name: 'Spotify', color: '#1DB954', amount: 8240, percent: 58 },
                   { name: 'Apple Music', color: '#FA243C', amount: 3410, percent: 24 },
                   { name: 'YouTube Music', color: '#FF0000', amount: 1550, percent: 11 },
                   { name: 'Sync & Radio', color: '#8B5CF6', amount: 1004, percent: 7 },
                 ].map(platform => (
                   <div key={platform.name} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                         <span className="text-white">{platform.name}</span>
                         <span className="text-slate-400">${platform.amount.toLocaleString()} ({platform.percent}%)</span>
                      </div>
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                         <div 
                           className="h-full transition-all duration-1000" 
                           style={{ width: `${platform.percent}%`, backgroundColor: platform.color }}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
                 <DollarSign size={24} />
              </div>
              <h4 className="text-xl font-black text-white mb-2">Next Payout</h4>
              <p className="text-3xl font-black text-blue-400 tracking-tight">Jan 15, 2025</p>
              <p className="text-xs text-slate-500 font-bold mt-4 uppercase tracking-widest">Est. Amount: $4,200.00</p>
           </div>
           
           <div className="glass p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">CMO Connectivity</h4>
              <div className="space-y-4">
                 {['ASCAP', 'BMI', 'GEMA'].map(cmo => (
                   <div key={cmo} className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-sm">{cmo}</span>
                      <span className="text-[10px] font-black text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded-lg">SYNCED</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
