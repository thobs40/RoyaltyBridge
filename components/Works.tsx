import React, { useState } from 'react';
import { 
  Music, Filter, Search, MoreHorizontal, Globe, Shield, 
  ExternalLink, Play, Plus, UploadCloud, ChevronDown, 
  ChevronUp, Users, CheckCircle, Clock, Info, Loader2, Sparkles,
  BarChart2, FileText, UserCheck, RefreshCcw, ArrowRight, Activity, ShieldCheck,
  Disc, Percent, Zap
} from 'lucide-react';
import { MOCK_ROYALTIES } from '../constants';
import { getTrackAnalysis } from '../services/geminiService';
import SubmissionModal from './SubmissionModal';

const Works: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState<Record<string, boolean>>({});
  const [analysisResults, setAnalysisResults] = useState<Record<string, string>>({});

  const filteredWorks = MOCK_ROYALTIES.filter(work => 
    work.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const runAnalysis = async (e: React.MouseEvent, work: any) => {
    e.stopPropagation();
    if (analysisResults[work.id]) return;

    setAnalysisLoading(prev => ({ ...prev, [work.id]: true }));
    const result = await getTrackAnalysis(work.title, work.plays, work.earnings, work.cmo);
    setAnalysisResults(prev => ({ ...prev, [work.id]: result }));
    setAnalysisLoading(prev => ({ ...prev, [work.id]: false }));
  };

  // Mock participants since the constants don't provide them for royalty records
  const getMockParticipants = (id: string) => [
    { name: 'Alex Producer', role: 'Primary Artist', share: 50 },
    { name: 'Sarah Writer', role: 'Songwriter', share: 30 },
    { name: 'Label Node', role: 'Publisher', share: 20 },
  ];

  return (
    <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto overflow-hidden">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
              <Disc size={24} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">Asset Catalog</h2>
          </div>
          <p className="text-slate-400 font-medium text-lg">Manage your registered works and monitor global node distribution.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group flex-1 sm:flex-none">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter catalog..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-[2rem] pl-14 pr-8 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all w-full sm:w-72 text-sm font-medium"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Plus size={18} /> Register New Work
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {filteredWorks.map((work) => {
          const isExpanded = expandedId === work.id;
          const participants = getMockParticipants(work.id);
          
          return (
            <div 
              key={work.id}
              onClick={() => toggleExpand(work.id)}
              className={`glass-ultra rounded-[3.5rem] border transition-all duration-500 cursor-pointer overflow-hidden group ${
                isExpanded ? 'border-blue-500/40 bg-blue-600/[0.03] scale-[1.01]' : 'border-white/5 hover:border-blue-500/20 hover:bg-white/[0.03]'
              }`}
              role="button"
              aria-expanded={isExpanded}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleExpand(work.id)}
            >
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 shadow-2xl ${
                    isExpanded ? 'bg-blue-600 text-white rotate-6' : 'bg-slate-800 text-slate-400 group-hover:text-blue-400'
                  }`}>
                    <Music size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{work.title}</h4>
                      <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[8px] font-black text-blue-400 uppercase tracking-widest">ISRC Verified</div>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Globe size={14} className="text-slate-700" />
                        Network: <span className="text-slate-300">{work.cmo}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-slate-700" />
                        Status: <span className={work.status === 'Distributed' ? 'text-emerald-400' : 'text-blue-400'}>{work.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Total Yield</p>
                    <p className="text-2xl font-black text-white">${work.earnings.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl transition-all duration-300 ${isExpanded ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-600 group-hover:text-slate-400'}`}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-8 lg:px-10 pb-10 pt-4 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Participants & Splits */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="flex items-center gap-3 px-2">
                        <Users size={16} className="text-blue-400" />
                        <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Equity Allocation</h5>
                      </div>
                      <div className="space-y-4">
                        {participants.map((p, i) => (
                          <div key={i} className="glass p-5 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-blue-400 border border-white/5">
                                {p.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-black text-white leading-none mb-1">{p.name}</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{p.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-black text-white">{p.share}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white hover:border-blue-500/30 hover:bg-blue-600/5 transition-all flex items-center justify-center gap-2">
                        <Percent size={14} /> Request Split Revision
                      </button>
                    </div>

                    {/* Timeline & Analysis */}
                    <div className="lg:col-span-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Status Timeline */}
                        <div className="glass p-8 rounded-[2.5rem] border border-white/5">
                          <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Node Lifecycle</h5>
                          <div className="space-y-8">
                            {[
                              { label: 'Master Ingested', status: 'Completed', date: 'Oct 12', icon: <UploadCloud size={16} /> },
                              { label: 'Registry Sync', status: 'Completed', date: 'Oct 14', icon: <RefreshCcw size={16} /> },
                              { label: 'Network Broadcast', status: 'Active', date: 'Ongoing', icon: <Globe size={16} /> }
                            ].map((step, i) => (
                              <div key={i} className="flex gap-6 relative group/step">
                                {i !== 2 && <div className="absolute left-4 top-10 bottom-0 w-px bg-white/5 group-hover/step:bg-blue-500/20 transition-colors" />}
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center z-10 ${
                                  step.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-600 text-white animate-pulse'
                                }`}>
                                  {step.status === 'Completed' ? <CheckCircle size={14} /> : step.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <p className="text-xs font-black text-white uppercase tracking-wider">{step.label}</p>
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{step.date}</span>
                                  </div>
                                  <p className="text-[10px] font-medium text-slate-500">{step.status}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Neural Performance */}
                        <div className="glass p-8 rounded-[2.5rem] border border-blue-500/20 bg-blue-600/[0.02] flex flex-col">
                          <div className="flex items-center justify-between mb-8">
                            <h5 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-2">
                              <Sparkles size={14} className="animate-pulse" /> Neural Insight
                            </h5>
                            <div className="px-2 py-0.5 bg-blue-600/10 rounded-md text-[8px] font-black text-blue-500 uppercase tracking-widest">GEMINI V3</div>
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-center">
                            {analysisLoading[work.id] ? (
                              <div className="flex flex-col items-center gap-4 text-center py-6">
                                <Loader2 size={32} className="animate-spin text-blue-500" />
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Querying Performance Nodes...</p>
                              </div>
                            ) : analysisResults[work.id] ? (
                              <div className="animate-in fade-in zoom-in-95 duration-700">
                                <p className="text-sm text-slate-300 font-medium leading-relaxed italic mb-4">
                                  {analysisResults[work.id]}
                                </p>
                                <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                                  <Zap size={10} /> Verified Strategy
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <p className="text-xs font-bold text-slate-500 mb-6 px-4">Generate a tactical performance analysis for this specific node.</p>
                                <button 
                                  onClick={(e) => runAnalysis(e, work)}
                                  className="mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2"
                                >
                                  <Activity size={12} /> Run Analysis
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'View Contract', icon: <FileText size={16} /> },
                          { label: 'Analytics Pro', icon: <BarChart2 size={16} /> },
                          { label: 'Download Cert', icon: <ShieldCheck size={16} /> },
                          { label: 'External Link', icon: <ExternalLink size={16} /> }
                        ].map((btn, i) => (
                          <button 
                            key={i}
                            onClick={(e) => e.stopPropagation()}
                            className="p-5 glass border border-white/5 rounded-[1.5rem] flex flex-col items-center gap-3 hover:bg-white/5 hover:border-blue-500/20 transition-all group/btn"
                          >
                            <div className="text-slate-500 group-hover/btn:text-blue-400 transition-colors">
                              {btn.icon}
                            </div>
                            <span className="text-[8px] font-black text-slate-600 group-hover/btn:text-white uppercase tracking-widest transition-colors">{btn.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Works;