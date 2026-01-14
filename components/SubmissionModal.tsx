import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Plus, Trash2, CheckCircle2, Music, 
  ChevronRight, User, Globe, Hash, Zap, 
  ShieldCheck, Users, Disc, Percent,
  Activity, Sparkles, Loader2
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    cmo: 'ASCAP',
    isrc: '',
  });
  const [splits, setSplits] = useState([{ name: 'Me (Alex Producer)', percentage: 100 }]);
  const totalPercentage = splits.reduce((sum, s) => sum + Number(s.percentage || 0), 0);
  const modalRef = useRef<HTMLDivElement>(null);

  const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#6366f1'];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ title: '', cmo: 'ASCAP', isrc: '' });
      setSplits([{ name: 'Me (Alex Producer)', percentage: 100 }]);
      setTxId(`MR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setTimeout(() => modalRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddSplit = () => {
    if (totalPercentage >= 100) return;
    const remaining = Math.max(0, 100 - totalPercentage);
    setSplits([...splits, { name: '', percentage: remaining }]);
  };

  const handleUpdateSplit = (index: number, field: string, value: string | number) => {
    const newSplits = [...splits];
    newSplits[index] = { ...newSplits[index], [field]: value };
    setSplits(newSplits);
  };

  const handleRemoveSplit = (index: number) => {
    if (splits.length > 1) {
      setSplits(splits.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setStep(3);
  };

  const isStep1Valid = formData.title.trim() !== '' && formData.isrc.trim() !== '';

  const chartData = splits.map((s, idx) => ({
    name: s.name || `Participant ${idx + 1}`,
    value: s.percentage > 0 ? Number(s.percentage) : 0,
  }));

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[10px] font-black">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-6xl glossy-card rounded-[3rem] lg:rounded-[4.5rem] border border-blue-500/30 shadow-2xl shadow-blue-900/40 overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col lg:flex-row min-h-[750px]">
        
        {/* Sidebar Status Info */}
        <div className="hidden lg:flex w-80 bg-slate-900/40 border-r border-white/5 p-12 flex-col justify-between relative">
          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-blue-600/30 group">
                <Music className="text-white group-hover:scale-110 transition-transform" size={24} aria-hidden="true" />
              </div>
              <div>
                 <h2 className="text-xl font-black text-white tracking-tight">MiRoy Registry</h2>
                 <p className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em]">Protocol Node 2.4</p>
              </div>
            </div>

            <nav className="space-y-10" aria-label="Submission Progress">
              {[
                { s: 1, label: 'Asset Identification', desc: 'Metadata & ISRC mapping' },
                { s: 2, label: 'Equity Distribution', desc: 'Defining ownership splits' },
                { s: 3, label: 'Ledger Settlement', desc: 'Cryptographic confirmation' }
              ].map((item) => (
                <div key={item.s} className="group flex gap-5" aria-current={step === item.s ? 'step' : undefined}>
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black border transition-all duration-500 ${
                      step >= item.s ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 border-white/10 text-slate-600'
                    }`}>
                      {item.s}
                    </div>
                    {item.s !== 3 && (
                      <div className={`w-0.5 h-10 my-2 transition-colors duration-500 ${step > item.s ? 'bg-blue-600' : 'bg-white/5'}`} aria-hidden="true" />
                    )}
                  </div>
                  <div className="pt-1">
                    <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 ${
                      step >= item.s ? 'text-blue-400' : 'text-slate-600'
                    }`}>
                      {item.label}
                    </span>
                    <p className="text-[10px] text-slate-500 font-medium leading-tight max-w-[140px] opacity-60">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="relative z-10 glass p-6 rounded-3xl border border-white/5 bg-blue-600/5">
            <div className="flex items-center gap-3 text-blue-400 mb-2">
              <ShieldCheck size={18} aria-hidden="true" />
              <span className="text-[10px] font-black uppercase tracking-widest">Vault Security</span>
            </div>
            <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
              Every registry entry is timestamped and anchored to the global rights ledger.
            </p>
          </div>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 flex flex-col p-8 lg:p-16 bg-slate-950/40 relative">
          <div className="flex justify-between items-center mb-12">
             <div className="animate-in slide-in-from-left-4 duration-700">
               <h3 id="modal-title" className="text-4xl font-black text-white tracking-tighter mb-2">
                {step === 1 && "Catalog Node Setup"}
                {step === 2 && "Configure Equity"}
                {step === 3 && "Node Anchored"}
               </h3>
               <div className="flex items-center gap-3">
                 <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TXID: <span className="text-blue-400" aria-label={`Transaction ID ${txId}`}>{txId}</span></p>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 rounded-lg border border-blue-500/10">
                   <Activity size={10} className="text-blue-500" aria-hidden="true" />
                   <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Syncing</span>
                 </div>
               </div>
             </div>
             <button 
               onClick={onClose} 
               aria-label="Close registration console"
               className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-500 hover:text-white transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500"
             >
               <X size={20} className="group-hover:rotate-90 transition-transform" aria-hidden="true" />
             </button>
          </div>

          <div className="flex-1">
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                       <label htmlFor="work-title" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Work Title</label>
                       <Sparkles size={14} className="text-blue-500/30" aria-hidden="true" />
                    </div>
                    <div className="relative group">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-blue-500/10 rounded-xl text-blue-500 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all" aria-hidden="true">
                        <Disc size={20} />
                      </div>
                      <input 
                        id="work-title"
                        type="text"
                        placeholder="e.g., Midnight Neon Echoes"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-lg font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label htmlFor="isrc-code" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">ISRC Code</label>
                      <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-blue-500/10 rounded-xl text-blue-500 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all" aria-hidden="true">
                          <Hash size={20} />
                        </div>
                        <input 
                          id="isrc-code"
                          type="text"
                          placeholder="US-ABC-24-00001"
                          value={formData.isrc}
                          onChange={(e) => setFormData({...formData, isrc: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="cmo-select" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Society Affiliation</label>
                      <div className="relative group">
                         <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-blue-500/10 rounded-xl text-blue-500 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all" aria-hidden="true">
                           <Globe size={20} />
                         </div>
                         <select 
                           id="cmo-select"
                           value={formData.cmo}
                           onChange={(e) => setFormData({...formData, cmo: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-12 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold appearance-none cursor-pointer"
                         >
                           {['ASCAP', 'BMI', 'SESAC', 'GEMA', 'PRS'].map(c => <option key={c} value={c} className="bg-slate-900">{c} Global Network</option>)}
                         </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in slide-in-from-right-8 duration-700 h-full">
                <div className="flex-1 space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ownership Nodes</p>
                    <div className={`text-[10px] font-black px-3 py-1 rounded-lg ${totalPercentage === 100 ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                      Total: {totalPercentage}%
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {splits.map((split, index) => (
                      <div key={index} className="group glass p-6 rounded-[2rem] border border-white/5 flex items-center gap-6 animate-in slide-in-from-left-4 transition-all hover:bg-white/[0.03]">
                        <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400">
                          <User size={20} />
                        </div>
                        <input 
                          type="text"
                          placeholder="Participant name..."
                          value={split.name}
                          onChange={(e) => handleUpdateSplit(index, 'name', e.target.value)}
                          className="flex-1 bg-transparent border-none text-white focus:outline-none font-bold text-lg"
                        />
                        <div className="flex items-center gap-4 bg-white/5 rounded-2xl px-4 py-2 border border-white/5 group-focus-within:border-blue-500/30">
                          <input 
                            type="number"
                            value={split.percentage}
                            onChange={(e) => handleUpdateSplit(index, 'percentage', Number(e.target.value))}
                            className="w-16 bg-transparent text-right text-blue-400 font-black text-xl focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-slate-600 font-bold">%</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveSplit(index)}
                          className="p-3 text-slate-600 hover:text-red-400 transition-colors"
                          aria-label="Remove participant"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleAddSplit}
                    className="w-full py-5 border-2 border-dashed border-white/10 rounded-[2rem] text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                  >
                    <Plus size={18} /> Add Participant Node
                  </button>
                </div>

                <div className="w-full lg:w-96 flex flex-col gap-6">
                  <div className="glass p-8 rounded-[3rem] border border-blue-500/20 bg-blue-600/5 flex-1 flex flex-col items-center justify-center relative min-h-[350px]">
                    <div className="absolute top-6 left-8 flex items-center gap-2">
                       <Activity size={12} className="text-blue-500" />
                       <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Equity Map</span>
                    </div>
                    
                    <div className="w-full h-64 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            labelLine={false}
                            label={renderCustomLabel}
                            animationDuration={800}
                          >
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={CHART_COLORS[index % CHART_COLORS.length]} 
                                style={{ filter: `drop-shadow(0 0 10px ${CHART_COLORS[index % CHART_COLORS.length]}60)` }}
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                              border: '1px solid rgba(255,255,255,0.1)', 
                              borderRadius: '20px', 
                              backdropFilter: 'blur(12px)',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              color: '#fff'
                            }}
                            itemStyle={{ color: '#fff' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      {totalPercentage === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-32 h-32 border-4 border-dashed border-white/5 rounded-full animate-spin duration-[10s]" />
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 text-center">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                       <p className={`text-sm font-black ${totalPercentage === 100 ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                         {totalPercentage === 100 ? '✓ Ready for Ledger' : `! Distribution Mismatch (${totalPercentage}%)`}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95 duration-700">
                <div className="w-32 h-32 bg-emerald-500/20 rounded-[2.5rem] border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-10 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 size={64} />
                </div>
                <h3 className="text-5xl font-black text-white tracking-tighter mb-4 text-blue-glow">Ledger Entry Finalized</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-12 text-lg font-medium leading-relaxed">
                  Your work <span className="text-white font-bold">"{formData.title}"</span> has been anchored to the global registry nodes.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                  <button onClick={onClose} className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 transition-all">
                    View Registry
                  </button>
                  <button onClick={() => setStep(1)} className="px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all">
                    Register Another
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-10 flex justify-between items-center border-t border-white/5">
            {step < 3 && (
              <button 
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                  step === 1 ? 'opacity-0 cursor-default' : 'text-slate-500 hover:text-white'
                }`}
              >
                Back to Node Setup
              </button>
            )}

            <div className="flex gap-4 ml-auto">
              {step === 1 && (
                <button 
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center gap-3 active:scale-95"
                >
                  Configure Equity <ChevronRight size={18} />
                </button>
              )}
              {step === 2 && (
                <button 
                  onClick={handleSubmit}
                  disabled={totalPercentage !== 100 || loading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center gap-3 active:scale-95 min-w-[200px] justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <>Anchor to Ledger <Zap size={18} className="fill-current" /></>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;