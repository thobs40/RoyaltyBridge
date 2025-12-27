
import React from 'react';
import { Users, FileText, Activity, CreditCard, ArrowUpRight, Globe, AlertCircle } from 'lucide-react';
import { MOCK_CMO_PAYMENTS, MOCK_CMO_QUERIES } from '../../constants';

const CMOOverview: React.FC = () => {
  const stats = [
    { label: 'Total Distributed', val: '$2.4M', change: '+12%', icon: <CreditCard className="text-violet-400" />, color: 'violet' },
    { label: 'Active Members', val: '5,241', change: '+8%', icon: <Users className="text-blue-400" />, color: 'blue' },
    { label: 'Registered Works', val: '42.1K', change: '+15%', icon: <FileText className="text-emerald-400" />, color: 'emerald' },
    { label: 'Pending Queries', val: '124', change: '-5%', icon: <Activity className="text-amber-400" />, color: 'amber' },
  ];

  return (
    <div className="p-8 animate-in fade-in duration-700">
      <header className="mb-10">
        <h2 className="text-4xl font-black text-white tracking-tighter">Society Overview</h2>
        <p className="text-slate-400 font-medium">Real-time surveillance of membership, royalties, and compliance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-[2rem] border border-white/5 group hover:border-white/10 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-3xl font-black text-white mt-1">{stat.val}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="glass p-8 rounded-[2.5rem] border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-black text-white flex items-center gap-2">
              <Globe size={20} className="text-blue-400" />
              Intl Payment Activity
            </h4>
            <button className="text-[10px] font-black text-violet-400 uppercase tracking-widest hover:text-white transition-colors">View All</button>
          </div>
          <div className="space-y-4">
            {MOCK_CMO_PAYMENTS.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                    {p.memberName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{p.memberName}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{p.country} • {p.worksCount} Works</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">${p.amount.toLocaleString()}</p>
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">SUCCESS</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Queries */}
        <div className="glass p-8 rounded-[2.5rem] border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-black text-white flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-400" />
              High Priority Queries
            </h4>
            <button className="text-[10px] font-black text-amber-400 uppercase tracking-widest hover:text-white transition-colors">Review Queries</button>
          </div>
          <div className="space-y-4">
            {MOCK_CMO_QUERIES.filter(q => q.priority === 'High').map((q) => (
              <div key={q.id} className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 hover:bg-amber-500/10 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-black px-2 py-1 bg-amber-500/20 text-amber-400 rounded-lg uppercase tracking-widest">
                    {q.type}
                  </span>
                  <span className="text-[9px] font-black text-slate-500">#{q.id}</span>
                </div>
                <h5 className="text-sm font-black text-white">Conflict: {q.workTitle}</h5>
                <p className="text-[10px] font-bold text-slate-400 mt-1">Requested by {q.requestingParty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMOOverview;
