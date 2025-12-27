
import React from 'react';
import { ShieldAlert, AlertCircle, CheckCircle2, MoreVertical, MessageSquare, Clock, Filter, Trash2 } from 'lucide-react';
import { MOCK_CMO_QUERIES } from '../../constants';

const CMOQueries: React.FC = () => {
  return (
    <div className="p-8 animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Disputes & Queries</h2>
          <p className="text-slate-400 font-medium">Resolving copyright conflicts and verifying ownership metadata.</p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
          {['Open', 'Resolved', 'Archived'].map(t => (
            <button key={t} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${t === 'Open' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_CMO_QUERIES.map((query) => (
          <div key={query.id} className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              query.priority === 'High' ? 'bg-red-500' : query.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  query.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' : 
                  query.status === 'Under Review' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {query.status === 'Resolved' ? <CheckCircle2 size={24} /> : 
                   query.status === 'Under Review' ? <Clock size={24} /> : <AlertCircle size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl font-black text-white">{query.workTitle}</h4>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${
                      query.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {query.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-400">
                    <span className="text-violet-400">{query.type}</span> requested by {query.requestingParty}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <Clock size={12} /> Received 2h ago
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <MessageSquare size={12} /> 3 Comments
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end lg:self-center">
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black text-white border border-white/5 transition-all uppercase tracking-widest">
                  View Detail
                </button>
                <button className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest shadow-xl shadow-violet-600/20">
                  Quick Resolve
                </button>
                <button className="p-3 text-slate-500 hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMOQueries;
