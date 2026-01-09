
import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, ShieldCheck, Zap, ArrowRight, Play, Music, Cpu, Globe, Disc, Mic2, Guitar, Headphones, Radio } from 'lucide-react';
import { generateMusicalImage } from '../services/geminiService';

interface LandingPageProps {
  onLogin: (role: 'CREATOR' | 'CMO') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const main = await generateMusicalImage("a holographic glowing high-tech grand piano made of blue light particles");
      setHeroImage(main);
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen gradient-bg overflow-x-hidden relative">
      {/* Decorative Musical Elements */}
      <div className="absolute top-20 left-[10%] text-blue-500/10 animate-musical pointer-events-none">
        <Disc size={150} strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-20 right-[10%] text-indigo-500/10 animate-musical pointer-events-none" style={{ animationDelay: '2s' }}>
        <Guitar size={200} strokeWidth={0.5} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600/5 pointer-events-none">
        <Headphones size={600} strokeWidth={0.1} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass bg-slate-950/40 border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Music className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent tracking-tighter">
              MiRoy
            </h1>
          </div>
          <div className="hidden lg:flex gap-10">
             {['Platform', 'Audit', 'Trust', 'Docs'].map(item => (
               <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-400 transition-colors">{item}</a>
             ))}
          </div>
          <button 
            onClick={() => onLogin('CREATOR')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95"
          >
            Launch Console
          </button>
        </div>
      </nav>

      <section className="pt-48 pb-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-8">
              <Zap size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Royalty Indexing</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] text-blue-glow">
              Unified Music <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Equity Node.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mb-12 font-medium leading-relaxed">
              Consolidate your global catalog. MiRoy bridges the gap between creators and collection societies with glossy efficiency and AI precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
               <button onClick={() => onLogin('CREATOR')} className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all">
                  Join the Network
               </button>
               <button className="glass px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3">
                  <Play size={16} className="text-blue-400" /> Demo Feed
               </button>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl group">
             <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000"></div>
             <div className="relative glossy-card p-4 rounded-[3.5rem] animate-musical">
                {heroImage ? (
                  <img src={heroImage} className="w-full h-auto rounded-[2.5rem] shadow-2xl group-hover:scale-[1.02] transition-transform duration-700" alt="Musical Visualization" />
                ) : (
                  <div className="w-full aspect-square bg-slate-900/50 rounded-[2.5rem] animate-pulse flex items-center justify-center">
                    <Radio size={80} className="text-blue-500/20" />
                  </div>
                )}
                
                <div className="absolute -bottom-10 -left-10 glossy-card p-6 rounded-[2rem] border border-blue-500/20 shadow-2xl">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Live Collection</p>
                   <p className="text-3xl font-black text-white tracking-tighter">$14,204.30</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: "Smart Contracts", desc: "Automated split sheet generation with legal-grade cryptographic signing.", icon: <ShieldCheck size={32} /> },
             { title: "Deep Analytics", desc: "Visualizing metadata flows across 192 global collection territories.", icon: <BarChart3 size={32} /> },
             { title: "AI Audit", desc: "Our neural engine scans DSP data to find missing mechanical royalties.", icon: <Sparkles size={32} /> }
           ].map((feature, i) => (
             <div key={i} className="glossy-card p-10 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-blue-500/30">
                <div className="mb-6 text-blue-500">{feature.icon}</div>
                <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Music size={16} className="text-white" />
             </div>
             <span className="text-xl font-black text-white tracking-tighter">MiRoy</span>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">© 2024 MiRoy Global Node • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
