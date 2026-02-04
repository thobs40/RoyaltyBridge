import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DollarSign, Play, Music, Sparkles, Plus, 
  TrendingUp, Zap, Radio, Guitar, Loader2, Bolt,
  Activity, ArrowUpRight, ChevronRight, Disc
} from 'lucide-react';
import { MOCK_ROYALTIES } from '../constants';
import { getRoyaltyInsights, getTrackAnalysis, getFastInsight } from '../services/geminiService';
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
  const [fastInsight, setFastInsight] = useState<string>('Syncing with edge nodes...');
  const [isSyncingFast, setIsSyncingFast] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getRoyaltyInsights(10276, 3045600);
      setInsights(res || '');
      setLoadingInsights(false);
    };
    fetchInsights();
    handleFastSync();
  }, []);

  const handleFastSync = async () => {
    setIsSyncingFast(true);
    const result = await getFastInsight("Global electronic music streaming growth Q4 2024");
    setFastInsight(result);
    setIsSyncingFast(false);
  };

  return (
    <div className="p-6 lg:p-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <header className="mb-14 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/40">
              <Activity className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter text-blue-glow">MiRoy Console</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Protocol Node 3.1.0 Online</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center gap-3"
          >
            <Plus size={20} />
            Register Work
          </button>
        </div>
      </header>

      {/* Fast AI Neural Ticker */}
      <div className="mb-12 glass-ultra p-8 rounded-[3rem] border border-blue-500/20 bg-blue-600/5 relative overflow-hidden group transition-all hover:bg-blue-600/10">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="p-3.5 bg-blue-500/20 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
              <Bolt size={20} className={isSyncingFast ? 'animate-pulse' : ''} />
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Stream (2.5 Flash Lite)</p>
              <h4 className="text-white font-bold text-xl tracking-tight leading-none">
                {isSyncingFast ? "Recalibrating insights..." : fastInsight}
              </h4>
            </div>
          </div>
          <button 
            onClick={handleFastSync}
            disabled={isSyncingFast}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center gap-2"
          >
            {isSyncingFast ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
            Force Sync
          </button>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Large Chart Card */}
        <div className="lg:col-span-8 glass-ultra p-12 rounded-[4.5rem] relative overflow-hidden group">
          <div className="absolute top-10 right-10 flex gap-2">
            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black text-slate-400">YTD Performance</div>
          </div>
          <div className="mb-12">
            <h4 className="text-3xl font-black text-white tracking-tighter mb-2">Equity Trajectory</h4>
            <p className="text-slate-500 text-sm font-medium">Aggregate royalties distributed across all catalog nodes.</p>
          </div>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '24px', 
                    backdropFilter: 'blur(12px)',
                    color: '#fff',
                    fontWeight: 'bold'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorEarnings)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vertical Stats Stack */}
        <div className="lg:col-span-4 space-y-8">
          {[
            { label: 'Net Revenue', val: '$10,276', icon: <DollarSign size={24} />, color: 'blue' },
            { label: 'Airplay Units', val: '3.04M', icon: <Radio size={24} />, color: 'indigo' },
            { label: 'Active Nodes', val: '24 Works', icon: <Guitar size={24} />, color: 'violet' }
          ].map((stat, i) => (
            <div key={i} className="glass-ultra p-8 rounded-[3.5rem] flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-400 border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h5 className="text-3xl font-black text-white tracking-tighter leading-none">{stat.val}</h5>
                </div>
              </div>
              <ChevronRight className="text-slate-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Assets / Recent Activity Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Recommended Nodes</h4>
          <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline transition-all">View Full Network</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_ROYALTIES.slice(0, 3).map((work, i) => (
            <div key={i} className="glass-ultra p-10 rounded-[4rem] group hover:bg-blue-600/5 transition-all relative overflow-hidden">
              <div className="absolute top-10 right-10">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-blue-400 transition-colors">
                  <Disc size={24} />
                </div>
              </div>
              <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Neural Verified</p>
              <h5 className="text-3xl font-black text-white mb-6 tracking-tight leading-none group-hover:text-blue-glow transition-all">{work.title}</h5>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div>
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-black text-emerald-400">{work.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Yield</p>
                  <p className="text-lg font-black text-white">${work.earnings.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;