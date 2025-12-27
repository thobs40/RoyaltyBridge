
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle2, Loader2, AlertTriangle, Check, Info, Users, Music, Database, ChevronRight, User } from 'lucide-react';
import { Submission } from '../types';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (submission: Submission) => void;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    cmo: 'ASCAP',
    isrc: '',
  });
  const [splits, setSplits] = useState([{ name: 'Me (Alex Producer)', percentage: 100 }]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ title: '', cmo: 'ASCAP', isrc: '' });
      setSplits([{ name: 'Me (Alex Producer)', percentage: 100 }]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddSplit = () => {
    const currentTotal = splits.reduce((sum, s) => sum + s.percentage, 0);
    const remaining = Math.max(0, 100 - currentTotal);
    setSplits([...splits, { name: '', percentage: remaining }]);
  };

  const handleUpdateSplit = (index: number, field: string, value: string | number) => {
    const newSplits = [...splits];
    newSplits[index] = { ...newSplits[index], [field]: value };
    setSplits(newSplits);
  };

  const handleRemoveSplit = (index: number) => {
    setSplits(splits.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call for work registration
    await new Promise(r => setTimeout(r, 1500));
    
    const newSubmission: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      cmo: formData.cmo,
      date: new Date().toISOString().split('T')[0],
      splits: splits.map(s => ({ name: s.name, percentage: s.percentage })),
      status: 'Reviewing'
    };

    if (onSuccess) {
      onSuccess(newSubmission);
    }
    
    setLoading(false);
    setStep(3);
  };

  const totalPercentage = splits.reduce((sum, s) => sum + s.percentage, 0);
  const isOverLimit = totalPercentage > 100;
  const isPerfect = totalPercentage === 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-slate-900/60 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header with Step Indicator */}
        <div className="p-8 border-b border-white/5 bg-white/5 relative">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-500 ease-in-out" style={{ width: `${(step / 3) * 100}%` }}></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center text-violet-400">
                    {step === 1 ? <Music size={18} /> : step === 2 ? <Users size={18} /> : <Check size={18} />}
                 </div>
                 <h3 className="text-2xl font-black text-white tracking-tight">
                   {step === 1 ? 'Work Details' : step === 2 ? 'Split Sheet' : 'Success'}
                 </h3>
              </div>
              <p className="text-slate-400 text-sm font-medium">Step {step} of 3 • {step === 1 ? 'Primary Metadata' : step === 2 ? 'Ownership Distribution' : 'Completion'}</p>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-2xl transition-all text-slate-500 hover:text-white group">
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-3">
             <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${step >= 1 ? 'text-violet-400' : 'text-slate-600'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800'}`}>1</div>
                Metadata
             </div>
             <ChevronRight size={12} className="text-slate-700" />
             <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${step >= 2 ? 'text-violet-400' : 'text-slate-600'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800'}`}>2</div>
                Splits
             </div>
             <ChevronRight size={12} className="text-slate-700" />
             <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${step >= 3 ? 'text-violet-400' : 'text-slate-600'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800'}`}>3</div>
                Finish
             </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="space-y-4">
                <div className="flex items-center gap-2 ml-1 text-slate-400">
                   <Info size={14} className="text-violet-500" />
                   <span className="text-xs font-bold uppercase tracking-widest">General Information</span>
                </div>
                
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-[#1e2433] px-2 text-[10px] font-black text-violet-400 uppercase tracking-tighter z-10">Work Title</label>
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors">
                    <Music size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-semibold text-lg placeholder:text-slate-700"
                    placeholder="E.g. Moonlight Sonata Redux"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-[#1e2433] px-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter z-10">Society (CMO)</label>
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors pointer-events-none">
                      <Database size={18} />
                    </div>
                    <select 
                      value={formData.cmo}
                      onChange={e => setFormData({...formData, cmo: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-bold appearance-none cursor-pointer"
                    >
                      <option value="ASCAP">ASCAP (Global)</option>
                      <option value="BMI">BMI (North America)</option>
                      <option value="SESAC">SESAC (Private)</option>
                      <option value="GEMA">GEMA (Europe)</option>
                      <option value="PRS">PRS (UK)</option>
                    </select>
                  </div>
                  
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-[#1e2433] px-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter z-10">ISRC Code</label>
                    <input 
                      type="text" 
                      value={formData.isrc}
                      onChange={e => setFormData({...formData, isrc: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-mono font-bold placeholder:text-slate-700"
                      placeholder="US-XXX-XX-XXXXX"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-3xl flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Info size={20} className="text-blue-400" />
                 </div>
                 <div className="space-y-1">
                    <h5 className="text-sm font-bold text-blue-200">What happens next?</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">After metadata, you'll define the ownership splits. This data is transmitted directly to the chosen CMO once you finalize the submission.</p>
                 </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <Users size={20} className="text-violet-400" />
                    Ownership Ledger
                  </h4>
                  <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Distributed Shares of {formData.title}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`text-[10px] font-black px-4 py-1.5 rounded-full border transition-all duration-300 ${
                    isPerfect ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    isOverLimit ? 'bg-red-500/20 text-red-400 border-red-500/30 scale-105 shadow-xl shadow-red-500/10' : 
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {totalPercentage}% OF 100%
                  </div>
                  <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ease-out ${
                        isPerfect ? 'bg-emerald-500' : isOverLimit ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {isOverLimit && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                  <AlertTriangle size={16} />
                  <span>The ownership exceeds 100%. Adjust the shares to continue.</span>
                </div>
              )}
              
              <div className="space-y-4">
                {splits.map((split, index) => (
                  <div key={index} className="group relative animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className={`flex gap-4 items-center p-5 rounded-[2rem] border transition-all duration-300 ${
                      index === 0 ? 'bg-violet-600/5 border-violet-500/30 ring-4 ring-violet-500/5' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}>
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                         {index === 0 ? <User size={24} className="text-violet-400" /> : <Users size={24} className="text-slate-500" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Collaborator</label>
                        <input 
                          type="text" 
                          value={split.name}
                          onChange={e => handleUpdateSplit(index, 'name', e.target.value)}
                          className="w-full bg-transparent text-white focus:outline-none font-bold text-lg placeholder:text-slate-700 truncate"
                          placeholder="Member Name..."
                        />
                      </div>
                      
                      <div className="w-24 text-right">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1 mb-1 block">Share</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            value={split.percentage}
                            onChange={e => handleUpdateSplit(index, 'percentage', parseInt(e.target.value) || 0)}
                            className={`w-full bg-white/5 border-b-2 font-black text-xl text-center py-1 transition-all ${
                              isOverLimit ? 'border-red-500 text-red-400' : 'border-violet-500/30 focus:border-violet-500 text-violet-400'
                            }`}
                            min="0"
                            max="100"
                          />
                          <span className="font-black text-slate-600">%</span>
                        </div>
                      </div>

                      {index > 0 && (
                        <button 
                          onClick={() => handleRemoveSplit(index)} 
                          className="p-3 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all ml-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button 
                  onClick={handleAddSplit}
                  className="w-full py-5 border-2 border-dashed border-white/10 rounded-[2rem] text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/5 transition-all flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest group"
                >
                  <Plus size={20} className="group-hover:rotate-180 transition-transform duration-500" /> Add Contributor
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500 flex flex-col items-center">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] rounded-full animate-pulse" />
                <div className="relative z-10 w-32 h-32 rounded-full bg-emerald-500/10 border-4 border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-2xl">
                  <CheckCircle2 size={64} className="animate-in zoom-in duration-500 delay-200" />
                </div>
              </div>
              <h4 className="text-4xl font-black text-white mb-4 tracking-tight">Registered!</h4>
              <p className="text-slate-400 font-medium mb-12 max-w-sm mx-auto leading-relaxed">
                <span className="text-violet-400 font-black">"{formData.title}"</span> has been transmitted to <span className="text-white font-bold">{formData.cmo}</span>. We'll notify you when tracking begins.
              </p>
              
              <div className="w-full grid grid-cols-2 gap-4">
                 <div className="glass p-4 rounded-3xl border border-white/5 text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Status</p>
                    <p className="text-white font-bold text-sm">Reviewing</p>
                 </div>
                 <div className="glass p-4 rounded-3xl border border-white/5 text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Queue ID</p>
                    <p className="text-white font-mono font-bold text-sm">#{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 3 && (
          <div className="p-8 bg-slate-900/40 border-t border-white/5 flex gap-4 backdrop-blur-md">
            {step === 2 && (
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-5 bg-white/5 text-slate-300 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all border border-white/10 active:scale-95"
              >
                Back
              </button>
            )}
            <button 
              onClick={step === 1 ? () => setStep(2) : handleSubmit}
              disabled={loading || (step === 1 && !formData.title) || (step === 2 && !isPerfect)}
              className={`flex-1 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden active:scale-[0.98] ${
                (step === 1 && formData.title) || (step === 2 && isPerfect)
                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-violet-600/30 hover:shadow-violet-600/50' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed grayscale'
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {step === 1 ? 'Configure Splits' : `Finalize & Submit`}
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        )}
        
        {step === 3 && (
           <div className="p-8 bg-slate-900/40 border-t border-white/5 flex backdrop-blur-md">
              <button 
                onClick={onClose}
                className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-2xl transition-all active:scale-95"
              >
                Go to Catalog
              </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionModal;
