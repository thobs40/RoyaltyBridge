import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, CheckCircle2, Loader2, Music, 
  ChevronRight, User, Globe, Hash, Zap, 
  ShieldCheck, Users, Disc, Receipt, Download, Percent,
  UserPlus, UserMinus, Activity, Sparkles
} from 'lucide-react';

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
  const totalPercentage = splits.reduce((sum, s) => sum + s.percentage, 0);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ title: '', cmo: 'ASCAP', isrc: '' });
      setSplits([{ name: 'Me (Alex Producer)', percentage: 100 }]);
      setTxId(`MR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
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

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-5xl glossy-card rounded-[3rem] lg:rounded-[4.5rem] border border-blue-500/30 shadow-2xl shadow-blue-900/40 overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col lg:flex-row min-h-[700px]">
        
        {/* Sidebar Status Info */}
        <div className="hidden lg:flex w-80 bg-slate-900/40 border-r border-white/5 p-12 flex-col justify-between relative">
          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-blue-600/30 group">
                <Music className="text-white group-hover:scale-110 transition-transform" size={24} />
              </div>
              <div>
                 <h2 className="text-xl font-black text-white tracking-tight">MiRoy Registry</h2>
                 <p className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em]">Protocol Node 2.4</p>
              </div>
            </div>

            <nav className="space-y-10" aria-label="Progress">
              {[
                { s: 1, label: 'Asset Identification', desc: 'Metadata & ISRC mapping' },
                { s: 2, label: 'Equity Distribution', desc: 'Defining ownership splits' },
                { s: 3, label: 'Ledger Settlement', desc: 'Cryptographic confirmation' }
              ].map((item) => (
                <div key={item.s} className="group flex gap-5">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black border transition-all duration-500 ${
                      step >= item.s ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 border-white/10 text-slate-600'
                    }`}>
                      {item.s}
                    </div>
                    {item.s !== 3 && (
                      <div className={`w-0.5 h-10 my-2 transition-colors duration-500 ${step > item.s ? 'bg-blue-600' : 'bg-white/5'}`} />
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
              <ShieldCheck size={18} />
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
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TXID: <span className="text-blue-400">{txId}</span></p>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 rounded-lg border border-blue-500/10">
                   <Activity size={10} className="text-blue-500" />
                   <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Syncing</span>
                 </div>
               </div>
             </div>
             <button 
               onClick={onClose} 
               className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-500 hover:text-white transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500"
             >
               <X size={20} className="group-hover:rotate-90 transition-transform" />
             </button>
          </div>

          <div className="flex-1">
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                       <label htmlFor="work-title" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Work Title</label>
                       <Sparkles size={14} className="text-blue-500/30" />
                    </div>
                    <div className="relative group">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-blue-500/10 rounded-xl text-blue-500 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all">
                        <Disc size={18} />
                      </div>
                      <input 
                        id="work-title"
                        type="text" 
                        placeholder="e.g. Midnight Horizon"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-slate-900/40 border border-white/10 rounded-[2rem] py-6 pl-20 pr-8 text-white text-xl font-bold focus:outline-none focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5 transition-all placeholder:text-slate-800 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label htmlFor="cmo-select" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Collection Node</label>
                      <div className="relative">
                        <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                        <select 
                          id="cmo-select"
                          value={formData.cmo}
                          onChange={(e) => setFormData({...formData, cmo: e.target.value})}
                          className="w-full bg-slate-900/40 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-white font-black text-lg focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer transition-all"
                        >
                          {['ASCAP', 'BMI', 'SESAC', 'GEMA', 'PRS'].map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
                          <ChevronRight className="rotate-90" size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label htmlFor="isrc-code" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">ISRC Identifier</label>
                      <div className="relative">
                        <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                        <input 
                          id="isrc-code"
                          type="text" 
                          placeholder="US-ABC-24-00001"
                          value={formData.isrc}
                          onChange={(e) => setFormData({...formData, isrc: e.target.value})}
                          className="w-full bg-slate-900/40 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-white font-black text-lg focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="w-full py-7 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 disabled:cursor-not-allowed text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
                  >
                    Set Ownership Splits <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Next: Defining equity participants</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 h-full flex flex-col">
                {/* Visual Tracker */}
                <div className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden bg-white/[0.01]">
                  <div className="flex justify-between items-end mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl transition-colors duration-500 ${totalPercentage === 100 ? 'bg-emerald-500 text-white' : 'bg-blue-600/20 text-blue-400'}`}>
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Allocated Equity</p>
                        <p className={`text-4xl font-black tabular-nums transition-colors duration-500 ${
                          totalPercentage === 100 ? 'text-emerald-400' : 
                          totalPercentage > 100 ? 'text-red-400' : 'text-white'
                        }`}>
                          {totalPercentage}%
                        </p>
                      </div>
                    </div>
                    {totalPercentage === 100 ? (
                       <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 animate-in zoom-in-95">
                          <CheckCircle2 size={14} /> Ready to Anchor
                       </div>
                    ) : (
                       <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Must equal 100%</p>
                    )}
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div 
                       className={`h-full transition-all duration-700 ease-out ${
                         totalPercentage === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 
                         totalPercentage > 100 ? 'bg-red-500' : 'bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                       }`}
                       style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                     />
                  </div>
                </div>

                {/* Participants Scroll List */}
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4 max-h-[340px]">
                  {splits.map((split, index) => (
                    <div 
                      key={index} 
                      className="glass p-5 lg:p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row items-end gap-5 animate-in slide-in-from-top-4 duration-300 group/item"
                    >
                      <div className="flex-1 space-y-3 w-full">
                         <div className="flex items-center gap-2 px-2">
                           <User size={12} className="text-blue-500/40" />
                           <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Holder Identity</label>
                         </div>
                         <input 
                           type="text" 
                           value={split.name}
                           onChange={(e) => handleUpdateSplit(index, 'name', e.target.value)}
                           placeholder="Full Legal Name"
                           className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 px-6 text-white font-bold focus:outline-none focus:border-blue-500/40 transition-all text-sm"
                         />
                      </div>
                      <div className="w-full sm:w-32 space-y-3">
                         <div className="flex items-center gap-2 px-2">
                           <Percent size={12} className="text-blue-500/40" />
                           <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Share</label>
                         </div>
                         <div className="relative">
                           <input 
                             type="number" 
                             value={split.percentage}
                             onChange={(e) => handleUpdateSplit(index, 'percentage', parseInt(e.target.value) || 0)}
                             className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-4 px-6 text-white font-black text-center text-lg focus:outline-none focus:border-blue-500/40 transition-all appearance-none"
                           />
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-700">%</div>
                         </div>
                      </div>
                      {splits.length > 1 && (
                        <button 
                          onClick={() => handleRemoveSplit(index)}
                          className="p-4 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl border border-red-500/10 transition-all active:scale-90 group/trash"
                        >
                          <UserMinus size={18} className="group-hover/trash:scale-110 transition-transform" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button 
                    onClick={handleAddSplit}
                    disabled={totalPercentage >= 100}
                    className="w-full py-5 border-2 border-dashed border-white/5 rounded-[2rem] text-slate-600 hover:text-blue-400 hover:border-blue-500/20 hover:bg-blue-600/5 transition-all text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-20 disabled:cursor-not-allowed group"
                  >
                    <UserPlus size={18} className="group-hover:scale-110 transition-transform" /> Add Participant Node
                  </button>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 mt-auto">
                   <button 
                     onClick={() => setStep(1)}
                     className="px-10 py-6 glass rounded-[2rem] text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-white border border-white/5 hover:border-white/10 transition-all flex items-center justify-center gap-2"
                   >
                     Metadata
                   </button>
                   <button 
                     onClick={handleSubmit}
                     disabled={loading || totalPercentage !== 100}
                     className="flex-1 py-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 disabled:bg-slate-800 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                   >
                     {loading ? (
                       <>
                         <Loader2 className="animate-spin" size={20} />
                         Anchoring Node...
                       </>
                     ) : (
                       <>
                         Anchor to Ledger <CheckCircle2 size={18} />
                       </>
                     )}
                   </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-1000">
                 <div className="relative mb-12">
                   <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full animate-pulse" />
                   <div className="w-32 h-32 bg-emerald-500/20 rounded-[3rem] border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 relative">
                      <div className="absolute inset-0 border-4 border-emerald-500 rounded-[3rem] animate-ping opacity-10" />
                      <CheckCircle2 size={64} strokeWidth={1.5} />
                   </div>
                 </div>
                 
                 <h4 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-4">Node Registry Complete</h4>
                 <p className="text-slate-400 max-w-sm mx-auto text-lg font-medium leading-relaxed mb-12">
                   Your work <span className="text-blue-400 font-black">"{formData.title}"</span> has been successfully cryptographically anchored.
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-12">
                    <div className="p-6 glass rounded-3xl border border-white/5 text-left bg-emerald-500/5">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Status</p>
                      <p className="text-emerald-400 text-sm font-black flex items-center gap-2 uppercase tracking-widest">
                        <Activity size={14} /> LIVE & COLLECTING
                      </p>
                    </div>
                    <div className="p-6 glass rounded-3xl border border-white/5 text-left">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Immutable Hash</p>
                      <p className="text-white text-xs font-mono truncate">
                        {txId}00xbf2a3...
                      </p>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                    <button className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-3">
                      <Download size={18} /> Get Certificate
                    </button>
                    <button onClick={onClose} className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-[0.98]">
                      Close Console
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;