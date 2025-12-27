
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DollarSign, Play, Music, Sparkles, Plus, 
  ChevronDown, ChevronUp, Clock, Info, 
  CheckCircle, History, TrendingUp 
} from 'lucide-react';
import { getRoyaltyInsights, explainCmoTerm } from '../services/geminiService';
import SubmissionModal from './SubmissionModal';
import { Submission, RoyaltyRecord } from '../types';

const chartData = [
  { name: 'Jul', earnings: 1200 },
  { name: 'Aug', earnings: 2100 },
  { name: 'Sep', earnings: 1800 },
  { name: 'Oct', earnings: 4235 },
  { name: 'Nov', earnings: 3800 },
  { name: 'Dec', earnings: 5100 },
];

interface DashboardProps {
  submissions: Submission[];
  works: RoyaltyRecord[];
  onAddSubmission: (s: Submission) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ submissions, works, onAddSubmission }) => {
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [termExplanation, setTermExplanation] = useState<{ term: string, explanation: string } | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const totalEarned = works.reduce((sum, w) => sum + w.earnings, 0);
      const totalPlays = works.reduce((sum, w) => sum + w.plays, 0);
      const res = await getRoyaltyInsights(totalEarned, totalPlays);
      setInsights(res || '');
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [works]);

  const handleTermExplain = async (term: string) => {
    setTermExplanation(null);
    const explanation = await explainCmoTerm(term);
    setTermExplanation({ term, explanation });
  };

  const totalRevenue = works.reduce((sum, w) => sum + w.earnings, 0);
  const totalPlays = works.reduce((sum, w) => sum + w.plays, 0);

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto min-w-0">
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl font-black text-white tracking-tighter">Artist Console</h2>
            <div className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-[10px] font-black text-violet-400 uppercase tracking-widest animate-pulse">
              Live Data
            </div>
          </div>
          <p className="text-slate-400 font-medium">Monitoring your global catalog across 42 active territories.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-[1.5rem] font-black shadow-2xl shadow-violet-600/30 flex items-center justify-center gap-3 transition-all active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Plus size={20} />
          Register Work
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Revenue', val: `$${totalRevenue.toLocaleString()}`, change: '↑ 12.5%', color: 'violet', icon: <DollarSign size={24} /> },
          { label: 'Verified Plays', val: `${(totalPlays / 1000000).toFixed(2)}M`, change: '↑ 8.2%', color: 'blue', icon: <Play size={24} /> },
          { label: 'Catalog Size', val: `${works.length} Works`, change: `${submissions.filter(s => s.status === 'Reviewing').length} Pending`, color: 'pink', icon: <Music size={24} /> }
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-${stat.color}-400`}>
              {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 100 })}
            </div>
            <p className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-4xl font-black text-white mb-3 tracking-tighter">{stat.val}</h3>
            <span className={`text-${stat.color === 'pink' ? 'blue' : 'emerald'}-400 text-xs font-black bg-${stat.color === 'pink' ? 'blue' : 'emerald'}-400/10 px-3 py-1 rounded-lg border border-${stat.color === 'pink' ? 'blue' : 'emerald'}-500/10`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 min-w-0">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] border border-white/5 min-w-0">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-xl font-black text-white flex items-center gap-3">
                <TrendingUp size={24} className="text-violet-400" />
                Revenue Analytics
              </h4>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Net Performance (Last 6 Months)</p>
            </div>
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
              {['3M', '6M', '1Y'].map(t => (
                <button key={t} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${t === '6M' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[350px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis stroke="#475569" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} tickMargin={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#a78bfa', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Column */}
        <div className="flex flex-col gap-6">
          {/* Recent Submissions */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex-1 bg-white/[0.01]">
            <h4 className="text-lg font-black text-white flex items-center gap-3 mb-6">
              <History size={20} className="text-blue-400" />
              Recent Tracker
            </h4>
            <div className="space-y-4">
              {submissions.slice(0, 4).map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{sub.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{sub.cmo} • {sub.date}</p>
                  </div>
                  <div className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${
                    sub.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 
                    'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                  }`}>
                    {sub.status}
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">View All Submissions</button>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-violet-600/10 to-blue-600/10 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 text-violet-400">
              <Sparkles size={24} className="animate-pulse" />
              <h4 className="text-xl font-black">AI Audit</h4>
            </div>
            {loadingInsights ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded-full w-full"></div>
                <div className="h-4 bg-white/10 rounded-full w-5/6"></div>
                <div className="h-4 bg-white/10 rounded-full w-4/6"></div>
              </div>
            ) : (
              <div className="text-slate-300 space-y-4 text-sm leading-relaxed font-medium">
                {insights.split('\n').filter(l => l.trim()).map((line, i) => (
                  <p key={i} className="flex gap-2">
                    <span className="text-violet-400 font-bold mt-1">•</span>
                    {line.replace(/^[-*•]\s+/, '')}
                  </p>
                ))}
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => handleTermExplain('Mechanicals')} className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-black text-slate-400 hover:bg-violet-600/20 hover:text-violet-300 transition-all border border-white/5 uppercase tracking-widest">Help</button>
              </div>
              {termExplanation && (
                <div className="mt-4 p-4 bg-violet-600/10 rounded-2xl text-[11px] text-violet-200 animate-in fade-in slide-in-from-top-2 border border-violet-500/20 leading-snug">
                  <strong className="block mb-1 text-white uppercase tracking-widest font-black">{termExplanation.term}</strong>
                  {termExplanation.explanation}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Royalty Table */}
      <div className="glass rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
          <div>
            <h4 className="text-2xl font-black text-white tracking-tight">Statement Ledger</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Audited earnings by work</p>
          </div>
          <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black text-white transition-all uppercase tracking-widest flex items-center gap-2">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="px-10 py-5">Work Details</th>
                <th className="px-10 py-5">Society</th>
                <th className="px-10 py-5">Period</th>
                <th className="px-10 py-5 text-right">Plays</th>
                <th className="px-10 py-5 text-right">Net Earned</th>
                <th className="px-10 py-5">Status</th>
                <th className="px-10 py-5 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {works.map((record) => (
                <React.Fragment key={record.id}>
                  <tr 
                    onClick={() => setExpandedRow(expandedRow === record.id ? null : record.id)}
                    className="group hover:bg-white/[0.03] cursor-pointer transition-colors"
                  >
                    <td className="px-10 py-6 font-black text-white text-lg">{record.title}</td>
                    <td className="px-10 py-6">
                      <span className="bg-slate-800/80 text-slate-300 px-3 py-1 rounded-lg text-[10px] font-black border border-white/5 uppercase tracking-widest">{record.cmo}</span>
                    </td>
                    <td className="px-10 py-6 text-slate-400 text-sm font-bold">{record.period}</td>
                    <td className="px-10 py-6 text-slate-300 text-sm font-bold text-right tabular-nums">{record.plays.toLocaleString()}</td>
                    <td className="px-10 py-6 font-black text-violet-400 text-right text-lg tabular-nums">${record.earnings.toFixed(2)}</td>
                    <td className="px-10 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        record.status === 'Distributed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        record.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          record.status === 'Distributed' ? 'bg-emerald-400' :
                          record.status === 'Pending' ? 'bg-amber-400' : 'bg-blue-400'
                        }`} />
                        {record.status}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-slate-600">
                      {expandedRow === record.id ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="group-hover:text-white transition-colors" />}
                    </td>
                  </tr>
                  {expandedRow === record.id && (
                    <tr className="bg-violet-600/[0.03] animate-in slide-in-from-top-1 duration-300 border-x border-violet-500/10">
                      <td colSpan={7} className="px-12 py-10">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Geographic Split</h5>
                            <div className="space-y-3">
                              {[
                                { l: 'US/Canada', p: '52%' },
                                { l: 'Western Europe', p: '24%' },
                                { l: 'APAC', p: '14%' }
                              ].map(r => (
                                <div key={r.l} className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-slate-400">{r.l}</span>
                                  <span className="text-xs font-black text-white">{r.p}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Revenue Stream</h5>
                            <div className="space-y-3">
                              {[
                                { l: 'Performance', p: '82%' },
                                { l: 'Mechanical', p: '12%' },
                                { l: 'Sync', p: '6%' }
                              ].map(r => (
                                <div key={r.l} className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-slate-400">{r.l}</span>
                                  <span className="text-xs font-black text-white">{r.p}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col justify-end">
                            <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Audit Status</p>
                                <p className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                                  <CheckCircle size={14} /> Verified by Chain
                                </p>
                              </div>
                              <button className="bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 px-6 py-3 rounded-2xl text-xs font-black transition-all border border-violet-500/20">
                                View Full Audit Log
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SubmissionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={onAddSubmission}
      />
    </div>
  );
};

export default Dashboard;
