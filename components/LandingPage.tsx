import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, BarChart3, ShieldCheck, ArrowRight, Play, Music, Globe, Disc, Volume2, Layers, Radio, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const [synthImg, celloImg, guitarImg] = await Promise.all([
        generateMusicalImage("a futuristic modular synthesizer with glowing neon blue patches and floating holographic knobs"),
        generateMusicalImage("a holographic cello made of translucent glass with internal fiber optic wiring glowing violet"),
        generateMusicalImage("a glowing electric guitar with a body made of dark chrome and laser-etched neon circuits")
      ]);
      setImages({ synth: synthImg, cello: celloImg, guitar: guitarImg });
      setLoading(false);
    };
    fetchImages();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen gradient-bg overflow-x-hidden relative">
      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Mouse Tracking Glow */}
        <div 
          className="absolute w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          }}
        />
        
        {/* Pulsing Abstract Particles */}
        <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20" />
        <div className="absolute top-[65%] left-[85%] w-3 h-3 bg-indigo-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[85%] left-[25%] w-2 h-2 bg-blue-600 rounded-full animate-ping opacity-20" style={{ animationDelay: '2.5s' }} />
        
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '3s' }} />
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
          <button 
            onClick={() => onLogin('CREATOR')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all active:scale-95 border border-blue-400/20"
          >
            Enter Console
          </button>
        </div>
      </nav>

      {/* Hero Section with AI Synthesizer */}
      <section className="pt-56 pb-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 text-center lg:text-left">
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
              The first high-fidelity operating system for music royalties. Manage global splits and audit every stream with neural precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
               <button onClick={() => onLogin('CREATOR')} className="group bg-white text-slate-950 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3">
                  Start Registration <ArrowRight size={18} />
               </button>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl group">
             <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full scale-110 group-hover:bg-blue-400/30 transition-all duration-1000 animate-pulse"></div>
             <div className="relative glossy-card p-5 rounded-[4.5rem] animate-musical">
                <div className="relative rounded-[3.5rem] overflow-hidden bg-slate-950 aspect-square">
                  {images.synth ? (
                    <img src={images.synth} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" alt="AI Synthesizer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900/50 animate-pulse">
                      <Radio size={80} className="text-blue-500/20" />
                    </div>
                  )}
                  <div className="absolute bottom-10 left-10 glass px-6 py-3 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Protocol Node: Synthesizer</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section with Cello and Guitar */}
      <section className="py-32 container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Cello Card */}
          <div className="glass p-12 rounded-[5rem] border border-blue-500/20 relative overflow-hidden flex flex-col items-center gap-8 group">
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden glossy-card p-2">
              {images.cello ? (
                <img src={images.cello} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]" alt="AI Cello" />
              ) : (
                <div className="w-full h-full bg-slate-900/50 animate-pulse" />
              )}
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-black text-white tracking-tighter mb-4">Acoustic Logic</h3>
              <p className="text-slate-400 max-w-xs font-medium">Neural mapping of organic performance metadata.</p>
            </div>
          </div>

          {/* Guitar Card */}
          <div className="glass p-12 rounded-[5rem] border border-indigo-500/20 relative overflow-hidden flex flex-col items-center gap-8 group">
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden glossy-card p-2">
              {images.guitar ? (
                <img src={images.guitar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]" alt="AI Guitar" />
              ) : (
                <div className="w-full h-full bg-slate-900/50 animate-pulse" />
              )}
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-black text-white tracking-tighter mb-4">Electric Ledger</h3>
              <p className="text-slate-400 max-w-xs font-medium">Streamlined distribution for modern amplification.</p>
            </div>
          </div>

        </div>
      </section>

      <footer className="py-24 border-t border-white/5 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">© 2024 MiRoy Secure Index</p>
          <div className="flex gap-8">
            <Music size={20} className="text-slate-600" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;