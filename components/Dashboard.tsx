import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { 
  DollarSign, Play, Music, Sparkles, Plus, 
  ChevronDown, ChevronUp, History, TrendingUp, Zap, 
  Headphones, Radio, Guitar, Info, Loader2
} from 'lucide-react';
import { MOCK_ROYALTIES, MOCK_SUBMISSIONS } from '../constants';
import { getRoyaltyInsights, getTrackAnalysis } from '../services/geminiService';
import SubmissionModal from './SubmissionModal';

const chartData = [
  { name: 'Jul', earnings: 1200 },
  { name: 'Aug', earnings: 2100 },
  { name: 'Sep', earnings: 1800 },
  { name: 'Oct', earnings: 4235 },
  { name: 'Nov', earnings: 3800 },
  { name: 'Dec', earnings: 5100 },
];

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [trackInsights, setTrackInsights] = useState<Record<string, { text: string; loading: boolean }>>({});

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getRoyaltyInsights(10276, 3045600);
      setInsights(res || '');
      setLoadingInsights(false);
    };
    fetchInsights();
  }, []);

  const handleRowExpand = async (record: any) => {
    const isExpanding = expandedRow !== record.id;
    setExpandedRow(isExpanding ? record.id : null);
    
    if (isExpanding && !trackInsights[record.id]) {
      setTrackInsights(prev => ({ ...prev, [record.id]: { text: '', loading: true } }));
      try {
        const insight = await getTrackAnalysis(record.title, record.plays, record.earnings, record.cmo);
        setTrackInsights(prev => ({ ...prev, [record.id]: { text: insight || 'Analysis unavailable.', loading: false } }));
      } catch (err) {
        setTrackInsights(prev => ({ ...prev, [record.id]: { text: 'Audit engine offline.', loading: false } }));
      }
    }
  };

  return (
    <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto overflow-hidden">
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter text-blue-glow">Artist Console</h2>
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest animate-pulse">
              Gloss Core V2
            </div>
          </div>
          <p className="text-slate-400 font-medium text-lg">Real-time metadata auditing and royalty distribution.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-95 group relative overflow-hidden w-full md:w-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Plus size={22} />
          Register New Work
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Total Revenue', val: '$10,276.95', change: '↑ 12.5%', icon: <DollarSign size={24} />, color: 'blue' },
          { label: 'Airplay Units', val: '3.04M', change: '↑ 8.2%', icon: <Radio size={24} />, color: 'blue' },
          { label: 'Active Catalog', val: '24 Works', change: 'Live Nodes', icon: <Guitar size={24} />, color: 'blue' }
        ].map((stat, i) => (
          <div key={i} className="glossy-card p-10 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity text-blue-400 group-hover:rotate-12 duration-700">
              {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 120 })}
            </div>
            <p className="text-slate-500 text-[11px] font-black mb-2 uppercase tracking-[0.25em]">{stat.label}</p>
            <h3 className="text-5xl font-black text-white mb-4 tracking-tighter">{stat.val}</h3>
            <span className="text-blue-400 text-xs font-black bg-blue-400/10 px-4 py-1.5 rounded-xl border border-blue-500/10 inline-block">
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        <div className="lg:col-span-2 glossy-card p-8 lg:p-12 rounded-[3.5rem] overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div className="space-y-1">
              <h4 className="text-2xl font-black text-white flex items-center gap-3">
                <TrendingUp size={28} className="text-blue-400" />
                Revenue Trajectory
              </h4>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aggregate performance flow across all nodes</p>
            </div>
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl">
              {['3M', '6M', '1Y'].map(t => (
                <button key={t} className={`px-5 py-2 text-[11px] font-black rounded-xl transition-all ${t === '6M' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" stroke="#475569" fontSize={12} fontWeight="700" tickLine={false} axisLine={false} tickMargin={12} />
                <YAxis stroke="#475569" fontSize={12} fontWeight="700" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} tickMargin={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', color: '#fff', fontSize: '13px', backdropFilter: 'blur(16px)', padding: '16px' }}
                  itemStyle={{ color: '#60a5fa', fontWeight: '800' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorEarnings)" animationDuration={2500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glossy-card p-10 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-transparent relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-8 text-blue-400">
              <Sparkles size={28} className="animate-pulse" />
              <h4 className="text-2xl font-black">AI Global Insights</h4>
            </div>
            <div className="text-slate-400 space-y-6 text-base leading-relaxed font-medium">
              {loadingInsights ? (
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
                  <div className="h-4 bg-white/5 rounded-full w-4/5 animate-pulse"></div>
                  <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse"></div>
                </div>
              ) : (
                insights.split('\n').filter(l => l.trim()).slice(0, 4).map((line, i) => (
                  <p key={i} className="flex gap-3 items-start">
                    <span className="text-blue-500 font-black mt-1.5">•</span>
                    {line.replace(/^[-*•]\s+/, '')}
                  </p>
                ))
              )}
            </div>
          </div>

          <div className="glossy-card p-10 rounded-[3rem] border border-blue-500/10">
            <h4 className="text-lg font-black text-white flex items-center gap-3 mb-8">
              <History size={22} className="text-blue-400" />
              Submission Log
            </h4>
            <div className="space-y-5">
              {MOCK_SUBMISSIONS.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:bg-blue-600/10 transition-all duration-500">
                  <div className="min-w-0">
                    <p className="text-base font-bold text-white truncate group-hover:text-blue-400 transition-colors">{sub.title}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{sub.cmo} • {sub.date}</p>
                  </div>
                  <div className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider ${
                    sub.status === 'Approved' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                    'bg-slate-500/10 text-slate-400 border border-white/10'
                  }`}>
                    {sub.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="glossy-card rounded-[4rem] overflow-hidden mb-10">
        <div className="p-10 lg:p-14 border-b border-white/5 flex justify-between items-center">
          <div className="space-y-1">
            <h4 className="text-3xl font-black text-white tracking-tight">Statement Ledger</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Individual Asset Performance Audit</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-slate-500 text-[11px] font-black uppercase tracking-[0.4em]">
                <th className="px-14 py-8">Track Asset</th>
                <th className="px-14 py-8">Society</th>
                <th className="px-14 py-8 text-right">Net Collection</th>
                <th className="px-14 py-8">Audit Status</th>
                <th className="px-14 py-8 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_ROYALTIES.map((record) => (
                <React.Fragment key={record.id}>
                  <tr 
                    onClick={() => handleRowExpand(record)}
                    className={`group hover:bg-blue-600/[0.04] cursor-pointer transition-all duration-500 ${expandedRow === record.id ? 'bg-blue-600/[0.06]' : ''}`}
                  >
                    <td className="px-14 py-8 font-black text-white text-xl flex items-center gap-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500">
                        <Headphones size={24} />
                      </div>
                      {record.title}
                    </td>
                    <td className="px-14 py-8">
                      <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-xl text-[10px] font-black border border-blue-500/20 uppercase tracking-widest">{record.cmo}</span>
                    </td>
                    <td className="px-14 py-8 font-black text-blue-300 text-right text-2xl tabular-nums">${record.earnings.toFixed(2)}</td>
                    <td className="px-14 py-8">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Zap size={12} className="fill-current" />
                        {record.status}
                      </div>
                    </td>
                    <td className="px-14 py-8">
                      {expandedRow === record.id ? <ChevronUp size={24} className="text-blue-400" /> : <ChevronDown size={24} className="text-slate-600 group-hover:text-white" />}
                    </td>
                  </tr>
                  {expandedRow === record.id && (
                    <tr className="bg-blue-600/[0.03] animate-in slide-in-from-top-2 duration-500">
                      <td colSpan={5} className="px-14 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                           <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col justify-center">
                              <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Radio size={14} className="text-blue-400" />
                                Share Distribution
                              </h5>
                              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                                 <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 w-[78%]"></div>
                              </div>
                              <p className="text-sm font-bold text-white">78% Streaming / 22% Performance</p>
                           </div>
                           <div className="lg:col-span-3 p-8 bg-blue-600/5 rounded-[2.5rem] border border-blue-500/10 relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-8 text-blue-600/5 rotate-12">
                                <Music size={120} />
                              </div>
                              <h5 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Sparkles size={16} /> Gemini Track Audit
                              </h5>
                              <div className="relative z-10">
                                {trackInsights[record.id]?.loading ? (
                                  <div className="flex items-center gap-3 text-slate-400 py-4">
                                    <Loader2 className="animate-spin" size={20} />
                                    <span className="font-bold text-sm">Auditing metadata vectors...</span>
                                  </div>
                                ) : (
                                  <p className="text-white text-lg italic font-medium leading-relaxed">
                                    "{trackInsights[record.id]?.text || 'No audit report available for this cycle.'}"
                                  </p>
                                )}
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
      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;