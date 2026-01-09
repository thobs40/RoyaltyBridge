
import React from 'react';
import { 
  Send, CheckCircle, Clock, AlertCircle, FileText, 
  ChevronRight, ShieldCheck, Fingerprint, Globe, 
  Activity, Database, Lock, ArrowUpRight
} from 'lucide-react';
import { MOCK_SUBMISSIONS } from '../constants';

const Submissions: React.FC = () => {
  return (
    <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto overflow-hidden">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                <Lock size={24} />
             </div>
             <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">Registry Vault</h2>
          </div>
          <p className="text-slate-400 font-medium text-lg">Immutable ledger of smart contract split agreements and society filings.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800" />
              ))}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">3 Nodes Syncing</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="glass rounded-[4rem] border border-white/5 overflow-hidden mb-12 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
           {[
             { label: 'Active Contracts', val: '42', icon: <FileText size={20} className="text-blue-400" />, trend: '+2' },
             { label: 'Verified Splits', val: '38', icon: <CheckCircle size={20} className="text-emerald-400" />, trend: '92%' },
             { label: 'In Broadcast', val: '3', icon: <Clock size={20} className="text-amber-400" />, trend: 'Live' },
             { label: 'Audit Required', val: '1', icon: <AlertCircle size={20} className="text-red-400" />, trend: 'High' },
           ].map((stat, i) => (
             <div key={i} className="p-10 flex flex-col items-center text-center group hover:bg-white/[0.02] transition-colors cursor-default">
                <div className="mb-6 p-4 bg-white/5 rounded-[1.5rem] group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner">
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-4xl font-black text-white tracking-tighter">{stat.val}</h4>
                  <span className="text-[10px] font-black text-blue-500/60 uppercase">{stat.trend}</span>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-6 mb-2">
           <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">Historical Ledger Entries</h3>
           <div className="flex gap-4">
              <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">Export CSV</button>
              <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">Audit All</button>
           </div>
        </div>

        {MOCK_SUBMISSIONS.map((sub) => (
          <div 
            key={sub.id} 
            className="group glass p-8 rounded-[3rem] border border-white/5 hover:border-blue-500/40 hover:bg-blue-600/[0.02] transition-all duration-500 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden"
          >
             {/* Background ID Watermark */}
             <div className="absolute top-1/2 right-1/4 -translate-y-1/2 text-[120px] font-black text-white/[0.01] pointer-events-none select-none italic group-hover:text-blue-500/[0.02] transition-colors">
               {sub.cmo}
             </div>

             <div className="flex items-center gap-8 relative z-10">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-all duration-700 shadow-2xl border border-white/5">
                     <ShieldCheck size={36} strokeWidth={1.5} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-xl border-4 border-[#020617] flex items-center justify-center text-white">
                    <Fingerprint size={16} />
                  </div>
                </div>

                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{sub.title}</h4>
                      <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-md text-[8px] font-black text-blue-400 uppercase tracking-widest">v1.2.0</div>
                   </div>
                   <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <Globe size={14} className="text-slate-700" />
                         CMO Network: <span className="text-slate-300">{sub.cmo}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <Database size={14} className="text-slate-700" />
                         Block ID: <span className="text-slate-300 font-mono">0x{Math.random().toString(16).slice(2, 8)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                         <Activity size={14} className="text-slate-700" />
                         Timestamp: <span className="text-slate-300">{sub.date}</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 relative z-10">
                <div className="min-w-[140px]">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Equity Nodes</p>
                   <div className="flex -space-x-2">
                      {sub.splits.map((split, i) => (
                        <div key={i} className="w-10 h-10 rounded-2xl bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] font-black text-white shadow-xl hover:-translate-y-1 transition-transform cursor-pointer relative group/avatar" title={split.name}>
                          {split.name.charAt(0)}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-lg text-[9px] font-black border border-white/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap z-50">
                            {split.name} ({split.percentage}%)
                          </div>
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border-2 border-dashed border-blue-500/20 flex items-center justify-center text-blue-400">
                         <Plus size={14} />
                      </div>
                   </div>
                </div>

                <div className="flex flex-col items-end">
                   <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border shadow-lg ${
                     sub.status === 'Approved' 
                      ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5' 
                      : 'bg-amber-500/5 text-amber-400 border-amber-500/20 shadow-amber-500/5'
                   }`}>
                      <div className={`w-2 h-2 rounded-full ${sub.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      {sub.status === 'Approved' ? 'Validated' : 'Pending Audit'}
                   </div>
                   <button className="mt-3 flex items-center gap-2 text-[9px] font-black text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors group/link">
                      Examine Contract <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="mt-16 flex flex-col items-center gap-6 opacity-30">
        <div className="w-12 h-1 bg-white/10 rounded-full" />
        <div className="flex items-center gap-4">
           <ShieldCheck size={20} className="text-slate-500" />
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">MiRoy Secure Protocol v2.4.1</p>
        </div>
      </div>
    </div>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default Submissions;
