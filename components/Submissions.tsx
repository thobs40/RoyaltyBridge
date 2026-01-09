
import React from 'react';
import { Send, CheckCircle, Clock, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { MOCK_SUBMISSIONS } from '../constants';

const Submissions: React.FC = () => {
  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      <header className="mb-10">
        <h2 className="text-4xl font-black text-white tracking-tighter">Registration History</h2>
        <p className="text-slate-400 font-medium">Track the status of your works and split sheet submissions.</p>
      </header>

      <div className="glass rounded-[3rem] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
           {[
             { label: 'Total Submitted', val: '42', icon: <FileText size={20} className="text-slate-400" /> },
             { label: 'Approved', val: '38', icon: <CheckCircle size={20} className="text-emerald-400" /> },
             { label: 'In Review', val: '3', icon: <Clock size={20} className="text-amber-400" /> },
             { label: 'Action Required', val: '1', icon: <AlertCircle size={20} className="text-red-400" /> },
           ].map((stat, i) => (
             <div key={i} className="p-8 flex flex-col items-center text-center group">
                <div className="mb-4 p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-3xl font-black text-white tracking-tighter">{stat.val}</h4>
             </div>
           ))}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {MOCK_SUBMISSIONS.map((sub) => (
          <div key={sub.id} className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-violet-400 transition-colors">
                   <FileText size={32} />
                </div>
                <div>
                   <h4 className="text-xl font-black text-white">{sub.title}</h4>
                   <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">CMO: {sub.cmo}</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Submitted: {sub.date}</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-10">
                <div className="hidden md:block">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Collaborators</p>
                   <div className="flex -space-x-2">
                      {sub.splits.map((split, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-lg" title={split.name}>
                          {split.name.charAt(0)}
                        </div>
                      ))}
                   </div>
                </div>

                <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                  sub.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' : 
                  'bg-amber-500/10 text-amber-400 border-amber-500/10'
                }`}>
                   {sub.status}
                </div>

                <button className="p-3 text-slate-500 hover:text-white transition-colors">
                   <ChevronRight size={24} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
