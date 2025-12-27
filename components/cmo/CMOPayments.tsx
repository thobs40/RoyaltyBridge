
import React, { useState } from 'react';
import { Search, Download, Filter, ChevronRight, Globe, CheckCircle2, Clock, RotateCw } from 'lucide-react';
import { MOCK_CMO_PAYMENTS } from '../../constants';

const CMOPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_CMO_PAYMENTS.filter(p => 
    p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Intl Royalty Payments</h2>
          <p className="text-slate-400 font-medium">Monitoring cross-border distributions and taxation compliance.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black text-white transition-all flex items-center gap-2">
            <Download size={18} /> Export Full Report
          </button>
        </div>
      </header>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by member name or territory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
          />
        </div>
        <button className="px-6 py-4 glass border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-2">
          <Filter size={18} /> Filter Status
        </button>
      </div>

      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="px-10 py-6">Member Details</th>
                <th className="px-10 py-6">Territory</th>
                <th className="px-10 py-6 text-center">Works</th>
                <th className="px-10 py-6 text-right">Amount Paid</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6">Date</th>
                <th className="px-10 py-6 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="group hover:bg-white/[0.03] transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-600/10 flex items-center justify-center font-black text-violet-400">
                        {p.memberName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-black text-lg">{p.memberName}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">#{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-blue-400" />
                      <span className="text-slate-300 font-bold text-sm">{p.country}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center text-slate-400 font-bold">{p.worksCount}</td>
                  <td className="px-10 py-6 text-right font-black text-white text-lg tabular-nums">
                    ${p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-10 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      p.status === 'Processed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      p.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {p.status === 'Processed' ? <CheckCircle2 size={12} /> : p.status === 'Processing' ? <RotateCw size={12} className="animate-spin" /> : <Clock size={12} />}
                      {p.status}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-slate-400 text-sm font-bold">{p.date}</td>
                  <td className="px-10 py-6 text-slate-600">
                    <ChevronRight size={20} className="group-hover:text-white transition-colors cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CMOPayments;
