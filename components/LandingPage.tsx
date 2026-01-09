import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, ShieldCheck, Zap, ArrowRight, Play, Music, Globe, Disc, Volume2, Layers, Radio, CheckCircle2, ChevronRight } from 'lucide-react';
import { generateMusicalImage } from '../services/geminiService';

interface LandingPageProps {
  onLogin: (role: 'CREATOR' | 'CMO') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const [main, secondary] = await Promise.all([
        generateMusicalImage("a holographic glowing high-tech grand piano made of blue light particles with floating musical notes"),
        generateMusicalImage("a futuristic glowing violin made of translucent glass and neon blue circuits")
      ]);
      setHeroImage(main);
      setFeatureImage(secondary);
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen gradient-bg overflow-x-hidden relative">
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Floating Micro-Assets (Music Industry Visuals) */}
      <div className="absolute top-40 left-[5%] text-blue-500/10 animate-musical pointer-events-none hidden lg:block">
        <Volume2 size={120} strokeWidth={0.5} />
      </div>
      <div className="absolute top-[65%] right-[8%] text-indigo-500/10 animate-musical pointer-events-none hidden lg:block" style={{ animationDelay: '4s' }}>
        <Layers size={140} strokeWidth={0.5} />
      </div>
      <div className="absolute top-[20%] right-[15%] text-blue-400/5 animate-musical pointer-events-none hidden lg:block" style={{ animationDelay: '2s' }}>
        <Music size={100} strokeWidth={0.5} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass bg-slate-950/40 border-b border-white/5 backdrop-blur-2xl">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-500">
              <Music className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent tracking-tighter leading-none">
                MiRoy
              </h1>
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em]">Global Node</span>
            </div>
          </div>
          <div className="hidden lg:flex gap-12">
             {['Protocol', 'Analytics', 'Registry', 'Security'].map(item => (
               <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-blue-400 transition-all hover:translate-y-[-1px]">{item}</a>
             ))}
          </div>
          <button 
            onClick={() => onLogin('CREATOR')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all active:scale-95 border border-blue-400/20"
          >
            Enter Console
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-56 pb-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 text-center lg:text-left relative">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-10 backdrop-blur-md">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI-Powered Asset Intelligence</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85] text-blue-glow">
              Your Music. <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
                Pure Equity.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mb-14 font-medium leading-relaxed opacity-80">
              The first high-fidelity operating system for music royalties. Manage global splits, automate society filings, and audit every stream with neural precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
               <button onClick={() => onLogin('CREATOR')} className="group bg-white text-slate-950 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3">
                  Start Registration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <button className="glass px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest text-white border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Play size={14} fill="currentColor" />
                  </div>
                  Live Audit Feed
               </button>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl group">
             {/* Glowing Aura */}
             <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full scale-110 group-hover:bg-blue-400/30 transition-all duration-1000 animate-pulse"></div>
             
             <div className="relative glossy-card p-5 rounded-[4.5rem] animate-musical shadow-[0_0_100px_rgba(59,130,246,0.15)]">
                {/* Image Frame with Inner Glow */}
                <div className="relative rounded-[3.5rem] overflow-hidden bg-slate-950 aspect-square">
                  {heroImage ? (
                    <img 
                      src={heroImage} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" 
                      alt="Neural Instrument" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900/50 animate-pulse">
                      <Radio size={80} className="text-blue-500/20" />
                    </div>
                  )}
                  {/* Glass overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 border-[12px] border-white/[0.03] rounded-[3.5rem] pointer-events-none" />
                </div>
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-8 -left-12 glossy-card p-8 rounded-[2.5rem] border border-blue-500/30 shadow-2xl backdrop-blur-3xl">
                   <div className="flex items-center gap-3 mb-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Global Collection</p>
                   </div>
                   <p className="text-4xl font-black text-white tracking-tighter">$14,204.30</p>
                   <div className="mt-4 flex gap-1 h-6 items-end">
                      {[0.6, 0.4, 0.9, 0.5, 0.8, 0.3].map((h, i) => (
                        <div key={i} className="w-1.5 bg-blue-500/20 rounded-full overflow-hidden">
                          <div className="bg-blue-500 w-full animate-pulse" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Showcase Visual Section */}
      <section className="py-32 container mx-auto px-6 overflow-hidden">
        <div className="glass p-12 lg:p-24 rounded-[5rem] border border-blue-500/20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-20 bg-[#020617]/40">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
           
           <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
              <h3 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
                Audit Every <br /> <span className="text-blue-500">Metadata Node.</span>
              </h3>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Our global index bridges the gap between DSPs and CMOs, providing a single source of truth for your creative equity.
              </p>
              <ul className="space-y-4 text-left inline-block lg:block">
                 {['ISRC Mapping Audit', 'CMO Conflict Resolution', 'Global Territorial Indexing'].map(item => (
                   <li key={item} className="flex items-center gap-4 text-white font-bold text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                        <CheckCircle2 size={14} />
                      </div>
                      {item}
                   </li>
                 ))}
              </ul>
           </div>

           <div className="flex-1 relative w-full group">
              <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full animate-pulse" />
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/40 glossy-card p-2">
                <div className="rounded-[2.5rem] overflow-hidden">
                  {featureImage ? (
                    <img src={featureImage} className="w-full h-auto group-hover:scale-105 transition-transform duration-[4s]" alt="Neural Analysis" />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-slate-900/50 animate-pulse flex items-center justify-center">
                       <Disc size={60} className="text-blue-500/10 animate-spin-slow" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none" />
              </div>
              
              {/* Overlay Label */}
              <div className="absolute top-10 right-10 glass px-6 py-3 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl group-hover:-translate-y-2 transition-transform">
                <div className="flex items-center gap-3">
                   <Activity className="text-blue-400" size={16} />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Metadata Vector Scan</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40 container mx-auto px-6 relative">
        <div className="text-center mb-24 space-y-4">
           <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Engineered for Creators.</h3>
           <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Proprietary neural networks scanning 15+ streaming protocols to ensure no dollar is left on the table.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: "Smart Contracts", desc: "Digital split sheets with legal-grade cryptographic signatures and society routing.", icon: <ShieldCheck size={32} /> },
             { title: "Universal Ledger", desc: "Real-time visualization of metadata flows across 192 global collection territories.", icon: <BarChart3 size={32} /> },
             { title: "AI Recovery", desc: "Neural audit engine that identifies and reclaims unassigned mechanical royalties.", icon: <Sparkles size={32} /> }
           ].map((feature, i) => (
             <div key={i} className="group glossy-card p-12 rounded-[3.5rem] hover:-translate-y-3 transition-all duration-700 border border-white/5 hover:border-blue-500/40 relative overflow-hidden bg-white/[0.01]">
                <div className="absolute top-0 right-0 p-8 text-blue-500/5 group-hover:scale-110 transition-transform duration-1000">
                   {feature.icon}
                </div>
                <div className="mb-10 w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                   {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
                </div>
                <h4 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                <p className="text-slate-400 text-base leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">{feature.desc}</p>
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Protocol V2.4</span>
                   <ChevronRight size={18} className="text-slate-800 group-hover:text-blue-500 transition-colors" />
                </div>
             </div>
           ))}
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Music size={20} className="text-white" />
               </div>
               <span className="text-2xl font-black text-white tracking-tighter">MiRoy</span>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Decentralized infrastructure for the next generation of music publishing and royalty collection.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-20">
             <div className="space-y-6">
                <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Protocol</h5>
                <ul className="space-y-4">
                   {['Node Status', 'Audit Engine', 'Society Sync'].map(l => <li key={l}><a href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors font-bold">{l}</a></li>)}
                </ul>
             </div>
             <div className="space-y-6">
                <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Company</h5>
                <ul className="space-y-4">
                   {['Global Node', 'Whitepaper', 'Contact'].map(l => <li key={l}><a href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors font-bold">{l}</a></li>)}
                </ul>
             </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">© 2024 MiRoy Secure Index • 128-bit Encrypted</p>
          <div className="flex gap-8">
            {['Twitter', 'Discord', 'LinkedIn'].map(s => <a key={s} href="#" className="text-[10px] font-black text-slate-600 hover:text-blue-400 transition-colors uppercase tracking-widest">{s}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
};

// Re-using same simple icon for checkmark to avoid import bloat
const Activity = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

export default LandingPage;