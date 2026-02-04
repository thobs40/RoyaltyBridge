import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Plus, Trash2, CheckCircle2, Music, 
  ChevronRight, User, Globe, Hash, Zap, 
  ShieldCheck, Users, Disc, Percent,
  Activity, Sparkles, Loader2, Upload, FileAudio, FileCheck, Waveform, ArrowRight
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
  
  // Audio Upload State
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setAudioFile(null);
      setUploadProgress(0);
      setIsUploading(false);
      setTimeout(() => modalRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

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

  const isStep1Valid = formData.title.trim() !== '' && formData.isrc.trim() !== '' && !isUploading;

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

      <div className="relative w-full max-w-6xl glass-ultra rounded-[3rem] lg:rounded-[4.5rem] border border-blue-500/30 shadow-2xl shadow-blue-900/40 overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col lg:flex-row min-h-[750px]">
        
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
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 h-full overflow-y-auto pr-4 custom-scrollbar">
                
                {/* Audio Upload Block */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Master Audio Ingest</p>
                  <div 
                    role="button"
                    tabIndex={0}
                    onClick={triggerFileUpload}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        triggerFileUpload();
                      }
                    }}
                    aria-label="Upload master audio record"
                    className={`relative p-8 rounded-[2.5rem] border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center justify-center gap-4 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      audioFile ? 'bg-blue-600/5 border-blue-500/30' : 'bg-white/5 border-white/10 hover:border-blue-500/30 hover:bg-white/[0.08]'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="audio/*" 
                      onChange={handleFileChange}
                      aria-hidden="true"
                    />
                    
                    {isUploading ? (
                      <div className="w-full space-y-4 flex flex-col items-center">
                        <div className="p-4 bg-blue-600/20 rounded-2xl">
                          <Loader2 size={32} className="text-blue-400 animate-spin" />
                        </div>
                        <div className="w-full max-w-xs h-2 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={uploadProgress} aria-valuemin={0} aria-valuemax={100}>
                          <div 
                            className="h-full bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs font-black text-blue-400 uppercase tracking-widest">
                          Ingesting Master: {uploadProgress}%
                        </p>
                      </div>
                    ) : audioFile ? (
                      <div className="flex items-center gap-6 w-full animate-in zoom-in-95">
                        <div className="p-5 bg-blue-600 rounded-3xl shadow-xl shadow-blue-600/20">
                           <FileAudio size={32} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-white font-bold truncate text-lg mb-1">{audioFile.name}</p>
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                              <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                                  <FileCheck size={10} /> Securely Stored
                                </span>
                              </div>
                           </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setAudioFile(null); }}
                          aria-label="Remove audio file"
                          className="p-3 text-slate-600 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                          <Upload size={32} />
                        </div>
                        <div className="text-center">
                          <p className="text-white font-black text-sm uppercase tracking-widest">Select Master File</p>
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1">WAV / AIFF / FLAC Only</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <label htmlFor="track-title" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Work Title</label>
                      <input 
                        id="track-title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Neon Horizon"
                        className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all font-bold text-lg"
                      />
                   </div>
                   <div className="space-y-4">
                      <label htmlFor="isrc" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">ISRC Code</label>
                      <input 
                        id="isrc"
                        type="text"
                        value={formData.isrc}
                        onChange={(e) => setFormData({...formData, isrc: e.target.value})}
                        placeholder="US-XXX-XX-XXXXX"
                        className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-lg"
                      />
                   </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Registration Society</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="radiogroup" aria-label="Select collection society">
                    {['ASCAP', 'BMI', 'SESAC', 'GEMA'].map((cmo) => (
                      <button 
                        key={cmo}
                        type="button"
                        onClick={() => setFormData({...formData, cmo})}
                        aria-checked={formData.cmo === cmo}
                        role="radio"
                        className={`py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border transition-all ${
                          formData.cmo === cmo 
                            ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-600/20' 
                            : 'bg-white/5 border-white/10 text-slate-600 hover:text-white'
                        }`}
                      >
                        {cmo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-700 h-full flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 overflow-hidden">
                  <div className="space-y-8 overflow-y-auto pr-4 custom-scrollbar">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Participant List</p>
                    {splits.map((split, idx) => (
                      <div key={idx} className="glass p-6 rounded-3xl border border-white/5 flex gap-4 items-center group/split animate-in fade-in slide-in-from-left-4 duration-300">
                        <div className="flex-1 space-y-4">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} aria-hidden="true" />
                            <input 
                              type="text"
                              value={split.name}
                              onChange={(e) => handleUpdateSplit(idx, 'name', e.target.value)}
                              placeholder="Collaborator name..."
                              aria-label={`Participant ${idx + 1} name`}
                              className="w-full bg-slate-900/60 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-blue-500/50"
                            />
                          </div>
                          <div className="relative">
                            <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} aria-hidden="true" />
                            <input 
                              type="number"
                              value={split.percentage}
                              onChange={(e) => handleUpdateSplit(idx, 'percentage', e.target.value)}
                              aria-label={`Participant ${idx + 1} ownership percentage`}
                              className="w-full bg-slate-900/60 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-blue-500/50"
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveSplit(idx)}
                          disabled={splits.length === 1}
                          aria-label={`Remove participant ${idx + 1}`}
                          className="p-3 bg-red-500/5 hover:bg-red-500/10 text-red-500/40 hover:text-red-400 rounded-xl border border-red-500/10 transition-all disabled:opacity-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      onClick={handleAddSplit}
                      className="w-full py-5 border-2 border-dashed border-white/10 rounded-3xl text-slate-600 hover:text-blue-400 hover:border-blue-500/30 transition-all text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 group"
                    >
                      <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Add Participant
                    </button>
                  </div>

                  <div className="glass rounded-[3.5rem] border border-white/5 p-12 flex flex-col items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-blue-600/[0.02] mix-blend-overlay" />
                     <div className="w-full h-80 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={splits.map((s, idx) => ({ 
                                name: s.name || 'Untitled', 
                                value: Number(s.percentage) || 0 
                              }))}
                              cx="50%"
                              cy="50%"
                              innerRadius={80}
                              outerRadius={120}
                              paddingAngle={8}
                              dataKey="value"
                              stroke="none"
                            >
                              {splits.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(2, 6, 23, 0.9)', 
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(10px)',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#fff'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                           <p className={`text-4xl font-black tracking-tighter ${totalPercentage === 100 ? 'text-white' : 'text-red-500 animate-pulse'}`}>
                             {totalPercentage}%
                           </p>
                           <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Total Equity</p>
                        </div>
                     </div>
                     <div className="mt-8 space-y-3 w-full">
                        {totalPercentage !== 100 && (
                          <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 flex items-center gap-3 text-red-400">
                             <Zap size={14} className="animate-pulse" />
                             <p className="text-[10px] font-black uppercase tracking-widest">Ownership must equal 100.0%</p>
                          </div>
                        )}
                        <p className="text-[10px] text-slate-500 font-medium text-center leading-relaxed">
                          Equity allocations will be anchored to the MiRoy Ledger and broadcast to the selected society.
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in zoom-in-95 fade-in duration-1000 h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12">
                 <div className="relative mb-12">
                    <div className="w-40 h-40 bg-blue-600/10 rounded-full blur-[60px] absolute inset-0 animate-pulse" />
                    <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-blue-600/40">
                       <CheckCircle2 size={64} className="animate-in zoom-in duration-700 delay-500" />
                    </div>
                 </div>
                 
                 <h4 className="text-5xl font-black text-white tracking-tighter mb-4">Registration Finalized</h4>
                 <p className="text-slate-400 font-medium text-lg leading-relaxed mb-12">
                   Track <span className="text-white font-bold">"{formData.title}"</span> has been successfully mapped to the MiRoy Network under <span className="text-blue-400 font-bold">{formData.cmo}</span>.
                 </p>

                 <div className="w-full p-8 glass rounded-[2.5rem] border border-white/10 bg-blue-600/5 space-y-6">
                    <div className="flex justify-between items-center px-4">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset Index</span>
                       <span className="text-xs font-black text-blue-400 font-mono tracking-widest">{txId}</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="grid grid-cols-2 gap-8">
                       <div className="text-left px-4">
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</p>
                          <p className="text-sm font-black text-emerald-400 flex items-center gap-2">
                             <Zap size={12} /> BROADCASTING
                          </p>
                       </div>
                       <div className="text-right px-4">
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Trust Score</p>
                          <p className="text-sm font-black text-white">9.9/10</p>
                       </div>
                    </div>
                 </div>

                 <button 
                  onClick={onClose}
                  className="mt-12 w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
                 >
                   Return to Console <ArrowRight size={18} />
                 </button>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {step < 3 && (
            <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
              <button 
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-all flex items-center gap-3"
              >
                {step === 1 ? <X size={16} /> : <ChevronRight size={16} className="rotate-180" />}
                {step === 1 ? 'Abort Session' : 'Backtrack Node'}
              </button>
              
              <button 
                onClick={step === 1 ? () => setStep(2) : handleSubmit}
                disabled={loading || (step === 1 && !isStep1Valid) || (step === 2 && totalPercentage !== 100)}
                className="group bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 transition-all flex items-center gap-4 relative overflow-hidden"
              >
                {loading ? (
                   <>
                    <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                    Synchronizing Ledger...
                   </>
                ) : (
                  <>
                    {step === 2 ? 'Authorize Split' : 'Continue Phase'}
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;