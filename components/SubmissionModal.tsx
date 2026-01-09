import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, CheckCircle2, Loader2, Music, 
  ChevronRight, User, Globe, Hash, Zap, 
  ShieldCheck, Users, Disc, Receipt, Download, Percent
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

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-4xl glossy-card rounded-[4rem] border border-blue-500/20 shadow-2xl shadow-blue-900/40 overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col lg:flex-row min-h-[650px]">
        
        {/* Sidebar Info */}
        <div className="hidden lg:flex w-72 bg-blue-600/5 border-r border-white/5 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-blue-500/5 rotate-12" aria-hidden="true">
            <Music size={240} strokeWidth={1} />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-10">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter mb-2">Node Registration</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Connect your intellectual property to the global royalty ledger.
              </p>
            </div>
            
            <nav className="space-y-6" aria-label="Submission Progress">
              {[
                { s: 1, label: 'Asset Metadata' },
                { s: 2, label: 'Equity Splits' },
                { s: 3, label: 'Ledger Confirmation' }
              ].map((item) => (
                <div key={item.s} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
                    step >= item.s ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-600'
                  }`}>
                    {item.s}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    step >= item.s ? 'text-blue-400' : 'text-slate-600'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </nav>
          </div>

          <div className="relative z-10 p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Secured</span>
            </div>
            <p className="text-[10px] font-medium text-slate-500 leading-tight">
              Submissions are cryptographically signed for society verification.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-8 lg:p-14 bg-slate-950/20 overflow-y-auto max-h-[90vh] lg:max-h-none">
          <div className="flex justify-between items-center mb-10">
             <div>
               <h4 id="modal-title" className="text-3xl font-black text-white tracking-tighter">
                {step === 1 && "Catalog Identification"}
                {step === 2 && "Equity Distribution"}
                {step === 3 && "Registry Complete"}
               </h4>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">TXID: {txId}</p>
             </div>
             <button 
               onClick={onClose} 
               aria-label="Close registration modal"
               className="p-3 hover:bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
             >
               <X size={24} />
             </button>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <label htmlFor="work-title" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Work Title</label>
                  <div className="relative group">
                    <Disc className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={20} aria-hidden="true" />
                    <input 
                      id="work-title"
                      type="text" 
                      placeholder="e.g. Neon Nights"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-white text-lg font-bold focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="cmo-select" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Collection Society</label>
                    <div className="relative group">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={20} aria-hidden="true" />
                      <select 
                        id="cmo-select"
                        value={formData.cmo}
                        onChange={(e) => setFormData({...formData, cmo: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-white text-lg font-bold focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                      >
                        {['ASCAP', 'BMI', 'SESAC', 'GEMA', 'PRS'].map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="isrc-code" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">ISRC Code</label>
                    <div className="relative group">
                      <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={20} aria-hidden="true" />
                      <input 
                        id="isrc-code"
                        type="text" 
                        placeholder="US-ABC-24-00001"
                        value={formData.isrc}
                        onChange={(e) => setFormData({...formData, isrc: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-white text-lg font-bold focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.title}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none"
                >
                  Configure Equity Splits <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Visual Equity Tracker */}
              <div className="p-6 bg-white/[0.02] rounded-[2.5rem] border border-white/5 space-y-4">
                <div className="flex justify-between items-end px-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl transition-colors ${totalPercentage === 100 ? 'bg-emerald-500 text-white' : 'bg-blue-600/20 text-blue-400'}`} aria-hidden="true">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Aggregate Allocation</p>
                      <p 
                        className={`text-2xl font-black transition-colors ${totalPercentage === 100 ? 'text-emerald-400' : totalPercentage > 100 ? 'text-red-400' : 'text-white'}`}
                        aria-live="polite"
                      >
                        {totalPercentage}% <span className="text-slate-700 text-lg">/ 100%</span>
                      </p>
                    </div>
                  </div>
                  {totalPercentage === 100 && (
                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full animate-in zoom-in-75 duration-300">
                      <CheckCircle2 size={12} aria-hidden="true" /> Balanced Ledger
                    </div>
                  )}
                </div>
                <div 
                  className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative"
                  role="progressbar"
                  aria-valuenow={totalPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Total split percentage progress"
                >
                  <div 
                    className={`h-full transition-all duration-700 relative z-10 ${totalPercentage === 100 ? 'bg-emerald-500' : totalPercentage > 100 ? 'bg-red-500' : 'bg-blue-600'}`} 
                    style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                  />
                  {totalPercentage === 100 && <div className="absolute inset-0 bg-emerald-400/20 animate-pulse" aria-hidden="true" />}
                </div>
              </div>

              {/* Dynamic Split List */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-4 custom-scrollbar" role="list">
                {splits.map((split, index) => (
                  <div key={index} className="flex gap-4 items-end animate-in slide-in-from-top-4 duration-300" role="listitem">
                    <div className="flex-[3] space-y-2">
                      <div className="flex items-center gap-2 px-4">
                        <User size={12} className="text-slate-600" aria-hidden="true" />
                        <label htmlFor={`collab-name-${index}`} className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Collaborator Node</label>
                      </div>
                      <div className="relative group">
                        <input 
                          id={`collab-name-${index}`}
                          type="text" 
                          value={split.name}
                          onChange={(e) => handleUpdateSplit(index, 'name', e.target.value)}
                          placeholder="e.g. Sarah Writer"
                          aria-label={`Name of collaborator ${index + 1}`}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-4.5 px-6 text-white font-bold focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.06] transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-[120px] space-y-2">
                      <div className="flex items-center gap-2 px-4">
                        <Percent size={12} className="text-slate-600" aria-hidden="true" />
                        <label htmlFor={`collab-share-${index}`} className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Share</label>
                      </div>
                      <div className="relative">
                        <input 
                          id={`collab-share-${index}`}
                          type="number" 
                          value={split.percentage}
                          onChange={(e) => handleUpdateSplit(index, 'percentage', parseInt(e.target.value) || 0)}
                          aria-label={`Share percentage for collaborator ${index + 1}`}
                          className={`w-full bg-white/[0.02] border rounded-2xl py-4.5 px-4 text-white font-black text-center focus:outline-none transition-all ${
                            totalPercentage > 100 ? 'border-red-500/50 text-red-400' : 'border-white/10 focus:border-blue-500/50'
                          }`}
                        />
                      </div>
                    </div>

                    {splits.length > 1 && (
                      <button 
                        onClick={() => handleRemoveSplit(index)}
                        aria-label={`Remove collaborator ${split.name || (index + 1)}`}
                        className="p-4.5 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all border border-red-500/20 group/remove h-[58px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-red-500 focus:outline-none"
                        title="Remove Collaborator"
                      >
                        <Trash2 size={20} className="group-hover/remove:scale-110 transition-transform" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-auto">
                <button 
                  onClick={handleAddSplit}
                  disabled={totalPercentage >= 100}
                  aria-label="Add another collaborator to this work"
                  className="flex-1 py-5 border-2 border-dashed border-white/10 rounded-3xl text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none"
                >
                  <Plus size={18} aria-hidden="true" /> Add Participant
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={loading || totalPercentage !== 100}
                  aria-label="Finalize splits and anchor to registry"
                  className="flex-[1.5] py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 disabled:bg-slate-800 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} aria-hidden="true" />
                      Anchoring Splits...
                    </>
                  ) : (
                    <>
                      Finalize Ledger <CheckCircle2 size={20} aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700" role="status">
               <div className="w-28 h-28 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center text-emerald-500 mb-10 relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] animate-ping opacity-10" aria-hidden="true" />
                  <CheckCircle2 size={56} strokeWidth={1.5} aria-hidden="true" />
               </div>
               <h4 className="text-4xl font-black text-white tracking-tighter mb-4">Work Anchored</h4>
               <p className="text-slate-400 max-w-sm mx-auto text-base font-medium leading-relaxed mb-10">
                 <span className="text-blue-400 font-black">"{formData.title}"</span> has been registered to the global royalty node.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-10">
                  <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 text-left">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-white text-sm font-bold flex items-center gap-2">
                      <Receipt size={14} className="text-amber-400" aria-hidden="true" /> Pending Audit
                    </p>
                  </div>
                  <div className="p-5 bg-white/[0.03] rounded-3xl border border-white/5 text-left">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">TX Receipt</p>
                    <p className="text-white text-sm font-bold truncate">
                      {txId}
                    </p>
                  </div>
               </div>

               <div className="flex gap-4 w-full max-w-md">
                  <button className="flex-1 py-4.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white/20 focus:outline-none">
                    <Download size={16} aria-hidden="true" /> Save Receipt
                  </button>
                  <button onClick={onClose} className="flex-1 py-4.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none">
                    Finish
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;