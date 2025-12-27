
import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, ShieldCheck, Zap, ArrowRight, Play, Music, Cpu, Globe } from 'lucide-react';
import { generateMusicalImage } from '../services/geminiService';

interface LandingPageProps {
  onLogin: (role: 'CREATOR' | 'CMO') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [featureImages, setFeatureImages] = useState<(string | null)[]>([null, null, null]);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoadingImages(true);
      const main = await generateMusicalImage("a holographic glowing futuristic grand piano");
      setHeroImage(main);
      
      const f1 = await generateMusicalImage("a sleek floating electronic violin with neon strings");
      const f2 = await generateMusicalImage("a cyber-organic synthesizer with flowing data streams");
      const f3 = await generateMusicalImage("a golden geometric digital trumpet representing royalties");
      
      setFeatureImages([f1, f2, f3]);
      setLoadingImages(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
              <Music className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tighter">
              MiRoy
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Product', 'Network', 'Pricing', 'Resources'].map((item) => (
              <a key={item} href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onLogin('CREATOR')}
              className="text-sm font-black text-slate-200 hover:text-white px-4 py-2 transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={() => onLogin('CREATOR')}
              className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-xl shadow-violet-600/20 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles size={16} />
              <span className="text-xs font-black uppercase tracking-widest">AI-Powered Royalty Intelligence</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Stop Guessing, <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-glow">Start Earning.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
              The only platform that bridges the gap between global streams and your pocket. Real-time tracking, AI insights, and instant registration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <button 
                onClick={() => onLogin('CREATOR')}
                className="group bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-violet-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Join the Network
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="glass hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg border border-white/10 transition-all flex items-center justify-center gap-2">
                <Play size={18} fill="currentColor" />
                Watch Demo
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-8 justify-center lg:justify-start grayscale opacity-40">
              <div className="flex items-center gap-2 text-white font-bold"><Globe size={20} /> GLOBAL REACH</div>
              <div className="flex items-center gap-2 text-white font-bold"><Cpu size={20} /> AI AUDITED</div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-600/20 blur-[120px] rounded-full" />
            
            <div className="relative glass p-4 rounded-[3rem] border border-white/10 shadow-2xl animate-float">
              {heroImage ? (
                <img 
                  src={heroImage} 
                  alt="Futuristic Piano" 
                  className="w-full h-auto rounded-[2.5rem] object-cover"
                />
              ) : (
                <div className="w-full aspect-square bg-white/5 rounded-[2.5rem] flex items-center justify-center animate-pulse">
                  <Music className="text-white/10" size={64} />
                </div>
              )}
              
              {/* Floating detail card */}
              <div className="absolute -bottom-10 -right-10 glass p-6 rounded-3xl border border-white/20 shadow-2xl animate-float-slow bg-slate-900/80">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Claimed Royalties</p>
                    <p className="text-2xl font-black text-white">$14,204.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto px-6 py-40">
        <div className="text-center mb-20">
          <h3 className="text-4xl font-black text-white mb-4">Built for the Modern Music Ecosystem</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Registration used to take months. With MiRoy, it takes seconds. Powered by the same technology used by global collection societies.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart3 className="text-violet-400" size={32} />,
              title: "Unified Revenue",
              desc: "Consolidate earnings from Spotify, Apple, Radio, and Sync in one verified vault.",
              image: featureImages[0]
            },
            {
              icon: <Zap className="text-blue-400" size={32} />,
              title: "Smart Split Sheets",
              desc: "Collaborate on rights in real-time. Automated signatures and direct CMO transmission.",
              image: featureImages[1]
            },
            {
              icon: <ShieldCheck className="text-pink-400" size={32} />,
              title: "Audit Protection",
              desc: "Every stream is tracked and verified. We fight for every cent you're owed, automatically.",
              image: featureImages[2]
            }
          ].map((feature, i) => (
            <div key={i} className="group glass p-2 rounded-[2.5rem] border border-white/5 hover:border-violet-500/30 transition-all">
              <div className="p-2">
                {feature.image ? (
                  <img src={feature.image} alt={feature.title} className="w-full aspect-[4/3] object-cover rounded-[2rem] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full aspect-[4/3] bg-white/5 rounded-[2rem] mb-6 animate-pulse" />
                )}
              </div>
              <div className="px-6 pb-8">
                <div className="mb-4 bg-white/5 p-4 rounded-2xl inline-block group-hover:bg-violet-500/10 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-black text-white mb-4">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-6 py-20 border-t border-white/5 bg-white/[0.01]">
        <p className="text-center text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Trusted by 5,000+ Independent Artists & Major Labels</p>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 grayscale opacity-30 hover:opacity-80 transition-opacity">
          {['ASCAP', 'BMI', 'GEMA', 'PRS', 'SESAC', 'SABAM'].map(name => (
            <span key={name} className="text-3xl font-black text-white tracking-tighter">{name}</span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 mt-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <Music className="text-white" size={16} />
          </div>
          <h5 className="font-black text-white">MiRoy</h5>
        </div>
        <p className="text-slate-500 text-sm font-medium">© 2024 MiRoy Inc. All rights reserved.</p>
        <div className="flex gap-8">
          {['Privacy', 'Terms', 'Security', 'Cookies'].map(item => (
            <a key={item} href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">{item}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

const DollarSign = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default LandingPage;
