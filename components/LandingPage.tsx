import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Music, Radio, Disc, Activity, Zap, Key, Layers, Image as ImageIcon, RefreshCcw, AlertTriangle, Cpu, ShieldAlert } from 'lucide-react';
import { generateMusicalImage } from '../services/geminiService';

interface LandingPageProps {
  onLogin: (role: 'CREATOR' | 'CMO') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [images, setImages] = useState<{
    synth: string | null;
    cello: string | null;
    guitar: string | null;
  }>({ synth: null, cello: null, guitar: null });
  const [loading, setLoading] = useState(true);
  const [hasKey, setHasKey] = useState(true);
  const [selectedSize, setSelectedSize] = useState<"1K" | "2K" | "4K">("1K");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [authError, setAuthError] = useState(false);
  const [permError, setPermError] = useState(false);
  const [overloadError, setOverloadError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSingleImage = async (key: keyof typeof images, prompt: string, size: "1K" | "2K" | "4K") => {
    try {
      const img = await generateMusicalImage(prompt, size);
      setImages(prev => ({ ...prev, [key]: img }));
    } catch (err: any) {
      if (err.message === "AUTH_REQUIRED") {
        setHasKey(false);
        setAuthError(true);
      } else if (err.message === "PERMISSION_DENIED") {
        setPermError(true);
      } else if (err.message === "MODEL_OVERLOADED") {
        setOverloadError(true);
      }
    }
  };

  const checkAndFetch = async (sizeOverride?: "1K" | "2K" | "4K") => {
    const targetSize = sizeOverride || selectedSize;
    setLoading(true);
    setOverloadError(false);
    setPermError(false);
    
    try {
      const keySelected = typeof (window as any).aistudio?.hasSelectedApiKey === 'function' 
        ? await (window as any).aistudio.hasSelectedApiKey() 
        : true;
      
      setHasKey(keySelected);
      setAuthError(false);
      
      if (!keySelected) {
        setLoading(false);
        return;
      }

      // Fetch images independently so one failing doesn't block the UI
      await Promise.all([
        fetchSingleImage("synth", "a futuristic modular synthesizer with glowing neon blue patches and floating holographic knobs", targetSize),
        fetchSingleImage("cello", "a holographic cello made of translucent glass with internal fiber optic wiring glowing violet", targetSize),
        fetchSingleImage("guitar", "a glowing electric guitar with a body made of dark chrome and laser-etched neon circuits", targetSize)
      ]);
    } catch (err: any) {
      console.error("Landing visuals fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAndFetch();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectKey = async () => {
    try {
      if (typeof (window as any).aistudio?.openSelectKey === 'function') {
        await (window as any).aistudio.openSelectKey();
      }
      setHasKey(true);
      setAuthError(false);
      setPermError(false);
      setOverloadError(false);
      checkAndFetch();
    } catch (err) {
      console.error("Key selection failed", err);
    }
  };

  const handleSizeChange = (size: "1K" | "2K" | "4K") => {
    setSelectedSize(size);
    checkAndFetch(size);
  };

  return (
    <div ref={containerRef} className="min-h-screen gradient-bg overflow-x-hidden relative">
      {/* Dynamic Banner System */}
      {(!hasKey || authError || overloadError || permError) && (
        <div className={`fixed top-0 left-0 right-0 z-[60] p-3 text-center flex items-center justify-center gap-4 animate-in slide-in-from-top duration-500 shadow-2xl ${
          permError ? 'bg-red-900/90' : overloadError ? 'bg-indigo-900/90' : 'bg-blue-600'
        } backdrop-blur-xl border-b border-white/10`}>
          <p className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
            {permError ? (
              <><ShieldAlert size={14} className="text-red-400" /> Permission Denied: Key lacks access to Pro Image Models.</>
            ) : overloadError ? (
              <><Cpu size={14} className="animate-pulse" /> Neural Nodes Saturated. Pro Visuals may be delayed.</>
            ) : (
              <><Key size={14} /> {authError ? "Principal Auth Required: Gemini 3 Pro Restricted" : "Pro Visuals Require a Paid API Key"}</>
            )}
          </p>
          <button 
            onClick={overloadError ? () => checkAndFetch() : handleSelectKey}
            className="bg-white text-slate-900 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 shadow-lg flex items-center gap-2"
          >
            {overloadError ? <><RefreshCcw size={12} /> Sync Node</> : "Configure Access"}
          </button>
          {!overloadError && !permError && <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-white/80 underline text-[10px] font-bold hover:text-white transition-colors">Billing Docs</a>}
          {permError && <a href="https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com" target="_blank" rel="noreferrer" className="text-white/80 underline text-[10px] font-bold hover:text-white transition-colors">Enable API</a>}
        </div>
      )}

      {/* Interactive Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` }}
        />
      </div>

      <nav className={`fixed ${(!hasKey || authError || overloadError || permError) ? 'top-12' : 'top-0'} left-0 right-0 z-50 glass bg-slate-950/40 border-b border-white/5 backdrop-blur-2xl transition-all duration-500`}>
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40">
              <Music className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent tracking-tighter leading-none">MiRoy</h1>
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em]">Nano Banana Pro 3.0</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
            {(["1K", "2K", "4K"] as const).map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all ${
                  selectedSize === size 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button onClick={() => onLogin('CREATOR')} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-blue-600/20">
            Enter Console
          </button>
        </div>
      </nav>

      <section className="pt-56 pb-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-10 backdrop-blur-md">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gemini 3 Pro Visual Cluster</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85] text-blue-glow">
              Your Music. <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
                Pure Equity.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mb-14 font-medium leading-relaxed opacity-80">
              Generating high-fidelity instrument assets at <span className="text-blue-400 font-black">{selectedSize} resolution</span>. 
              {permError ? " Access to generative assets is restricted by project permissions." : overloadError ? " The neural engine is currently saturated. Syncing with standby nodes." : " Powered by the latest Pro-tier neural rendering engine."}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
               <button onClick={() => onLogin('CREATOR')} className="group bg-white text-slate-950 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3">
                  Start Registration <ArrowRight size={18} />
               </button>
               {(!hasKey || authError || overloadError || permError) && (
                 <button 
                  onClick={overloadError ? () => checkAndFetch() : handleSelectKey} 
                  className="px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 text-white hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                 >
                    {overloadError ? <RefreshCcw size={18} /> : <Key size={18} />} 
                    {overloadError ? "Manual Sync" : permError ? "Change Project Key" : `Unlock ${selectedSize} Pro`}
                 </button>
               )}
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl group">
             <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full scale-110 group-hover:bg-blue-400/30 transition-all duration-1000"></div>
             <div className="relative glossy-card p-5 rounded-[4.5rem] animate-musical">
                <div className="relative rounded-[3.5rem] overflow-hidden bg-slate-950 aspect-square flex items-center justify-center border border-white/5">
                  {images.synth ? (
                    <img src={images.synth} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s]" alt="AI Synthesizer" />
                  ) : (
                    <div className="flex flex-col items-center gap-6 text-slate-700 p-12 text-center">
                      {permError ? <ShieldAlert size={80} className="text-red-500/20" /> : <Radio size={80} className={`${loading ? 'animate-pulse text-blue-500/40' : 'text-blue-500/10'}`} />}
                      {loading ? (
                        <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 animate-pulse">
                            {overloadError ? "Saturated Cluster: Queueing..." : `Synthesizing ${selectedSize} Pro Asset...`}
                          </p>
                          <p className="text-[9px] text-slate-600 font-bold">Protocol Node: {overloadError ? "Wait-listed" : "Establishing Tunnel"}</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-xs mx-auto">
                            {permError ? "Selected key lacks permission for image generation. Ensure 'Generative Language API' is enabled in Cloud Console." : overloadError ? "Pro Node capacity reached. Manual sync suggested." : "Gemini 3 Pro requires a principal project key."}
                           </p>
                           <button 
                            onClick={handleSelectKey} 
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 flex items-center gap-2 border border-blue-500/20 px-8 py-4 rounded-2xl bg-blue-500/5 mx-auto transition-all hover:bg-blue-500/10"
                           >
                            <Key size={14} /> 
                            {permError ? "Switch to Authorized Key" : "Authorize Pro Access"}
                           </button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-10 left-10 glass px-6 py-3 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <Zap size={10} className="text-blue-400" /> {selectedSize} Pro Asset
                    </span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[
            { key: 'cello' as const, prompt: "a holographic cello made of translucent glass with internal fiber optic wiring glowing violet", title: "Holographic Strings", desc: "Translucent cello at 32,000 metadata points.", icon: <Activity size={60} /> },
            { key: 'guitar' as const, prompt: "a glowing electric guitar with a body made of dark chrome and laser-etched neon circuits", title: "Laser-Etched Ledger", desc: "Chrome body with integrated circuit routing.", icon: <Disc size={60} /> }
          ].map((item, i) => (
            <div key={i} className="glass p-12 rounded-[5rem] border border-white/5 relative overflow-hidden flex flex-col items-center gap-8 group hover:bg-white/[0.02] transition-all duration-700">
              <div className="relative w-full aspect-square rounded-[3.5rem] overflow-hidden glossy-card p-2 bg-slate-950 flex items-center justify-center border border-white/5">
                {images[item.key] ? (
                  <img src={images[item.key]!} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s]" alt={item.title} />
                ) : (
                  <div className="flex flex-col items-center gap-6 text-slate-800">
                    {loading ? <ImageIcon size={64} className="animate-pulse text-blue-500/20" /> : permError ? <ShieldAlert size={64} className="text-red-500/10" /> : <Key size={64} className="text-white/5" />}
                    {!loading && (overloadError || permError) && (
                      <button 
                        onClick={() => fetchSingleImage(item.key, item.prompt, selectedSize)}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 border border-blue-500/20 px-4 py-2 rounded-xl bg-blue-500/5 transition-all"
                      >
                        <RefreshCcw size={12} /> Sync Node
                      </button>
                    )}
                    {!loading && !overloadError && !permError && <p className="text-[9px] font-black uppercase tracking-widest text-slate-700">Pending Pro Key</p>}
                  </div>
                )}
                <div className="absolute top-6 right-6">
                   <div className="w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md flex items-center justify-center text-blue-400 border border-white/10">
                      <Zap size={16} />
                   </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-black text-white tracking-tighter mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 max-w-xs font-medium opacity-70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 opacity-50">
             <Layers size={20} className="text-blue-400" />
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">MiRoy Secure Visual Index v3.0</p>
          </div>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Nodes List</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;