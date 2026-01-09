import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Plus, Trash2, CheckCircle2, Loader2, Music, 
  Database, ChevronRight, User, Globe, Hash, Sparkles, Receipt, 
  Download, RefreshCw, Clock, ShieldCheck, Users, Info, Disc, Zap
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
    // Simulate API registration delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl glossy-card rounded-[4rem] border border-blue-500/20 shadow-2xl shadow-blue-900/40 overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Sidebar Info (Hidden on mobile) */}
        <div className="hidden lg:flex w-72 bg-blue-600/5 border-r border-white/5 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-blue-500/5 rotate-12">
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
            
            <div className="space-y-6">
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
            </div>
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
          <div className="flex justify-between items-center mb-12">
             <div>
               <h4 className="text-3xl font-black text-white tracking-tighter">
                {step === 1 && "Catalog Identification"}
                {step === 2 && "Equity Distribution"}
                {step === 3 && "Registry Complete"}
               </h4>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Transaction ID: {txId}</p>
             </div>
             <button 
               onClick={onClose}
               className="p-3 hover:bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all"
             >
               <X size={24} />
             </button>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Work Title</label>
                  <div className="relative group">
                    <Disc className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="e.g. Midnight Echoes"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-white text-lg font-bold focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Collection Society</label>
                    <div className="relative group">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={20} />
                      <select 
                        value={formData.cmo}
                        onChange={(e) => setFormData({...formData, cmo: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-white text-lg font-bold focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                      >
                        {['ASCAP', 'BMI', 'SESAC', 'GEMA', 'PRS'].map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">ISRC Code (Optional)</label>
                    <div className="relative group">
                      <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="US-ABC-24-00001"
                        value={formData.isrc}
                        onChange={(e) => setFormData({...formData, isrc: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-white text-lg font-bold focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8">
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.title}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  Configure Equity Splits <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-8 bg-blue-500/5 rounded-[2.5rem] border border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Equity Reservoir</p>
                    <p className="text-2xl font-black text-white">{totalPercentage}% <span className="text-slate-600">/ 100%</span></p>
                  </div>
                </div>
                <div className="flex-1 w-full max-w-md h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full transition-all duration-700 ${totalPercentage === 100 ? 'bg-emerald-500' : totalPercentage > 100 ? 'bg-red-500' : 'bg-blue-600'}`} 
                    style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {splits.map((split, index) => (
                  <div key={index} className="flex gap-4 items-end animate-in slide-in-from-top-2 duration-300">
                    <div className="flex-1 space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">Collaborator Name</label>
                      <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={18} />
                        <input 
                          type="text" 
                          value={split.name}
                          onChange={(e) => handleUpdateSplit(index, 'name', e.target.value)}
                          placeholder="e.g. Sarah Writer"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold focus:outline-none focus:border-blue-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div className="w-32 space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">Share %</label>
                      <input 
                        type="number" 
                        value={split.percentage}
                        onChange={(e) => handleUpdateSplit(index, 'percentage', parseInt(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold text-center focus:outline-none focus:border-blue-500/30 transition-all"
                      />
                    </div>
                    {splits.length > 1 && (
                      <button 
                        onClick={() => handleRemoveSplit(index)}
                        className="p-4 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-2xl transition-all border border-red-500/10"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  onClick={handleAddSplit}
                  className="flex-1 py-5 border-2 border-dashed border-white/10 rounded-3xl text-slate-500 font-black text-[11px] uppercase tracking-widest hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add Collaborator
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={loading || totalPercentage !== 100}
                  className="flex-[2] py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Anchoring Data...
                    </>
                  ) : (
                    <>
                      Verify & Submit Ledger <CheckCircle2 size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
               <div className="w-32 h-32 bg-emerald-500/20 rounded-[3rem] flex items-center justify-center text-emerald-500 mb-10 shadow-2xl shadow-emerald-500/20 relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-[3rem] animate-ping opacity-20" />
                  <CheckCircle2 size={64} strokeWidth={1.5} />
               </div>
               <h4 className="text-5xl font-black text-white tracking-tighter mb-4">Registry Locked</h4>
               <p className="text-slate-400 max-w-md mx-auto text-lg font-medium leading-relaxed mb-12">
                 The work <span className="text-blue-400 font-black">"{formData.title}"</span> has been successfully logged into the MiRoy index.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10">
                  <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5 text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-white font-bold flex items-center gap-2">
                      <Clock size={14} className="text-amber-400" /> Pending Society Audit
                    </p>
                  </div>
                  <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5 text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Receipt ID</p>
                    <p className="text-white font-bold flex items-center gap-2 truncate">
                      {txId} <Receipt size={14} className="text-blue-400" />
                    </p>
                  </div>
               </div>

               <div className="flex gap-4 w-full max-w-lg">
                  <button className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2">
                    <Download size={18} /> Receipt
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl transition-all"
                  >
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