import React, { useState } from 'react';
import { 
  DollarSign, ArrowUpRight, Download, Calendar, 
  Bell, CheckCircle2, AlertCircle, Clock, ArrowRight, Wallet, TrendingUp, Info
} from 'lucide-react';

interface PayoutNotification {
  id: string;
  type: 'SCHEDULED' | 'SETTLED' | 'PROCESSING' | 'ACTION_REQUIRED';
  amount: string;
  date: string;
  description: string;
}

const Earnings: React.FC = () => {
  const [notifications] = useState<PayoutNotification[]>([
    { 
      id: 'p1', 
      type: 'SETTLED', 
      amount: '$4,235.50', 
      date: 'Today, 10:24 AM', 
      description: 'Q3 ASCAP Mechanicals successfully settled to vault.' 
    },
    { 
      id: 'p2', 
      type: 'PROCESSING', 
      amount: '$1,240.20', 
      date: 'In Progress', 
      description: 'BMI Performance royalties are being audited.' 
    },
    { 
      id: 'p3', 
      type: 'SCHEDULED', 
      amount: '$2,840.00', 
      date: 'Jan 15, 2025', 
      description: 'Estimated payout for international streaming nodes.' 
    },
    { 
      id: 'p4', 
      type: 'ACTION_REQUIRED', 
      amount: '---', 
      date: 'Pending Review', 
      description: 'Unclaimed mechanicals detected in GEMA territory.' 
    },
  ]);

  return (
    <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto overflow-hidden">
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center text-violet-400">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">Earnings Hub</h2>
          </div>
          <p className="text-slate-400 font-medium text-lg">Detailed financial analytics and real-time payout tracking.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center gap-3">
            <Calendar size={18} />
            Oct 2024 - Dec 2024
          </button>
          <button className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-violet-600/20 transition-all flex items-center gap-3 group">
            <Download size={18} />
            Export Statement
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
        {/* Main Analytics View */}
        <div className="lg:col-span-8 space-y-10">
          <div className="glass p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 text-violet-500/5 rotate-12">
                <Wallet size={180} />
             </div>
             
             <div className="flex justify-between items-start mb-12 relative z-10">
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Total Node Equity</p>
                   <h3 className="text-6xl font-black text-white tracking-tighter">$14,204.30</h3>
                </div>
                <div className="text-right">
                   <div className="flex items-center justify-end gap-2 text-emerald-400 font-black text-lg bg-emerald-500/10 px-4 py-1 rounded-xl border border-emerald-500/20">
                     <ArrowUpRight size={20} /> +24%
                   </div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-3">From Previous Cycle</p>
                </div>
             </div>
             
             <div className="space-y-8 relative z-10">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Protocol Breakdown</h4>
                <div className="space-y-7">
                   {[
                     { name: 'Spotify Registry', color: '#1DB954', amount: 8240, percent: 58 },
                     { name: 'Apple Digital', color: '#FA243C', amount: 3410, percent: 24 },
                     { name: 'YouTube ContentID', color: '#FF0000', amount: 1550, percent: 11 },
                     { name: 'Sync & Mechanicals', color: '#8B5CF6', amount: 1004, percent: 7 },
                   ].map(platform => (
                     <div key={platform.name} className="space-y-3">
                        <div className="flex justify-between items-end">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }} />
                              <span className="text-sm font-black text-white tracking-tight uppercase">{platform.name}</span>
                           </div>
                           <span className="text-[11px] font-black text-slate-400 tracking-widest uppercase">${platform.amount.toLocaleString()} <span className="text-slate-600">({platform.percent}%)</span></span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                           <div 
                             className="h-full transition-all duration-1000 ease-out" 
                             style={{ width: `${platform.percent}%`, backgroundColor: platform.color, boxShadow: `0 0 15px ${platform.color}40` }}
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-blue-600/5 to-transparent flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shadow-inner">
                   <Clock size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Upcoming Settlement</p>
                   <p className="text-2xl font-black text-white">Jan 15, 2025</p>
                </div>
             </div>
             <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-emerald-600/5 to-transparent flex items-center gap-6">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 shadow-inner">
                   <DollarSign size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Average CPM</p>
                   <p className="text-2xl font-black text-white">$0.0034</p>
                </div>
             </div>
          </div>
        </div>

        {/* Payout Notifications Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass p-8 rounded-[3.5rem] border border-violet-500/20 bg-violet-950/5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <Bell size={20} className="text-violet-400 animate-bounce" />
                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Payout Alerts</h4>
                 </div>
                 <span className="bg-violet-500/20 text-violet-400 text-[9px] font-black px-2 py-0.5 rounded-md border border-violet-500/30">
                    {notifications.length} NEW
                 </span>
              </div>

              <div className="space-y-4">
                 {notifications.map((note) => (
                   <div 
                    key={note.id} 
                    className={`p-6 rounded-[2rem] border transition-all duration-300 group hover:scale-[1.02] cursor-pointer ${
                      note.type === 'SETTLED' ? 'bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10' :
                      note.type === 'PROCESSING' ? 'bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/10' :
                      note.type === 'ACTION_REQUIRED' ? 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10' :
                      'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                   >
                      <div className="flex justify-between items-start mb-3">
                         <div className={`p-2 rounded-xl border ${
                           note.type === 'SETTLED' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' :
                           note.type === 'PROCESSING' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                           note.type === 'ACTION_REQUIRED' ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' :
                           'bg-white/10 border-white/10 text-slate-400'
                         }`}>
                            {note.type === 'SETTLED' && <CheckCircle2 size={16} />}
                            {note.type === 'PROCESSING' && <Loader2 className="animate-spin" size={16} />}
                            {note.type === 'SCHEDULED' && <Calendar size={16} />}
                            {note.type === 'ACTION_REQUIRED' && <AlertCircle size={16} />}
                         </div>
                         <span className="text-sm font-black text-white tabular-nums group-hover:text-violet-400 transition-colors">{note.amount}</span>
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{note.date}</p>
                      <p className={`text-xs font-medium leading-relaxed ${
                        note.type === 'ACTION_REQUIRED' ? 'text-amber-200' : 'text-slate-300'
                      }`}>
                        {note.description}
                      </p>
                      
                      {note.type === 'ACTION_REQUIRED' && (
                        <button className="mt-4 w-full py-2 bg-amber-500/20 hover:bg-amber-500/40 text-amber-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-amber-500/30 transition-all flex items-center justify-center gap-2">
                           Fix Metadata Conflicts <ArrowRight size={12} />
                        </button>
                      )}
                   </div>
                 ))}
              </div>

              <button className="w-full mt-8 py-4 border border-dashed border-white/10 rounded-2xl text-slate-500 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                 View Historical Ledger <ArrowRight size={14} />
              </button>
           </div>

           <div className="glass p-8 rounded-[3rem] border border-white/5 bg-gradient-to-br from-indigo-600/5 to-transparent">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                 <Info size={14} className="text-indigo-400" /> Registry Verification
              </h4>
              <div className="space-y-4">
                 {['ASCAP Nodes', 'BMI Ledger', 'GEMA Protocol'].map(node => (
                   <div key={node} className="flex items-center justify-between group cursor-help">
                      <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider group-hover:text-indigo-300 transition-colors">{node}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-md border border-emerald-500/20">ACTIVE</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ className, size }: { className: string, size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default Earnings;