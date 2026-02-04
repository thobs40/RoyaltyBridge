import React, { useState } from 'react';
import { Sparkles, Wand2, Download, Zap, Info, Layers, Loader2, ShieldAlert, Key, Search, Music, Disc, Guitar, Mic2, Layout } from 'lucide-react';
import { generateMusicalImage } from '../services/geminiService';

const SUGGESTIONS = [
  "Futuristic modular synth with neon wires",
  "Translucent glass cello with fiber optics",
  "Cyberpunk studio at midnight, blue neon",
  "Abstract soundwaves as crystalline structures",
  "Holographic album cover, iridescent textures"
];

const CreativeLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<"1K" | "2K" | "4K">("1K");
  const [error, setError] = useState<string | null>(null);
  const [authRequired, setAuthRequired] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setAuthRequired(false);

    try {
      const result = await generateMusicalImage(prompt, selectedSize);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("Neural node timeout. Please retry.");
      }
    } catch (err: any) {
      if (err.message === "AUTH_REQUIRED") {
        setAuthRequired(true);
      } else if (err.message === "PERMISSION_DENIED") {
        setError("Permission Denied. Key lacks Pro visual access.");
      } else {
        setError("Global network congestion. Try a shorter prompt.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectKey = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
      await (window as any).aistudio.openSelectKey();
      setAuthRequired(false);
      handleGenerate();
    }
  };

  const handleDownloadAsset = () => {
    if (!generatedImage) return;

    // Create a sanitized slug from the prompt (first 15 chars)
    const slug = prompt
      .slice(0, 15)
      .trim()
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase();
    
    const timestamp = new Date().getTime();
    const filename = `miroy-${slug}-${selectedSize}-${timestamp}.png`;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto overflow-hidden">
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
              <Sparkles size={24} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter text-blue-glow">Creative Lab</h2>
          </div>
          <p className="text-slate-400 font-medium text-lg">Synthesize high-fidelity musical assets using Pro neural engines.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10" role="group" aria-label="Resolution selection">
          {(["1K", "2K", "4K"] as const).map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all ${
                selectedSize === size 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">
        {/* Control Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-ultra p-10 rounded-[3.5rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-20" />
            
            <label htmlFor="prompt-input" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Neural Prompt Input</label>
            <div className="relative mb-8">
              <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your musical vision..."
                className="w-full bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 text-white text-lg font-medium placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5 transition-all min-h-[180px] resize-none"
              />
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest" aria-live="polite">{prompt.length} chars</span>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Suggested Primitives</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => setPrompt(s)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                  Synthesizing Node...
                </>
              ) : (
                <>
                  <Wand2 size={20} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  Generate Asset
                </>
              )}
            </button>
          </div>

          <div className="glass-ultra p-8 rounded-[3rem] bg-indigo-600/5 border-indigo-500/10">
            <div className="flex items-center gap-4 mb-4 text-indigo-400">
              <Info size={20} aria-hidden="true" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Protocol Specs</h4>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Gemini 3 Pro Image (Nano Banana Pro) supports up to 4K resolution. Output assets are optimized for album covers, studio mockups, and interface elements.
            </p>
          </div>
        </div>

        {/* Display Area */}
        <div className="lg:col-span-7">
          <div className="glass-ultra h-[700px] rounded-[4.5rem] flex flex-col items-center justify-center p-8 relative group" role="region" aria-label="Visual generation preview">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-8 text-center" aria-live="polite">
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-dashed border-blue-500/20 rounded-full animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={40} className="text-blue-500 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-black text-white tracking-tighter">Synthesizing Neural Vectors</p>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Node Cluster established at {selectedSize}</p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="w-full h-full relative animate-in zoom-in-95 duration-700">
                <img 
                  src={generatedImage} 
                  alt={`AI generated visualization based on prompt: ${prompt}`} 
                  className="w-full h-full object-cover rounded-[3.5rem] shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-12">
                  <div className="space-y-2">
                    <h5 className="text-2xl font-black text-white tracking-tight">Master Asset</h5>
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Res: {selectedSize} • Model: Gemini 3 Pro</p>
                  </div>
                  <button 
                    onClick={handleDownloadAsset}
                    aria-label={`Download asset as miroy-${prompt.slice(0, 10).trim().toLowerCase()}-${selectedSize}.png`}
                    className="p-5 bg-blue-600 text-white rounded-3xl shadow-xl hover:bg-blue-500 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <Download size={24} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : authRequired ? (
              <div className="flex flex-col items-center gap-8 text-center p-12 max-w-md">
                <div className="w-24 h-24 bg-amber-500/10 rounded-[2.5rem] border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Key size={40} aria-hidden="true" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-white tracking-tighter">Pro Access Restricted</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Gemini 3 Pro Image generation requires principal project authentication. Please select a valid paid project API key.
                  </p>
                  <button 
                    onClick={handleSelectKey}
                    className="w-full py-5 bg-white text-slate-950 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Key size={16} aria-hidden="true" /> Select Pro Key
                  </button>
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="block text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500">
                    Billing Documentation
                  </a>
                </div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-6 text-center text-red-400 p-12" aria-live="assertive">
                <ShieldAlert size={64} className="opacity-20 mb-2" aria-hidden="true" />
                <p className="text-lg font-bold tracking-tight">{error}</p>
                <button onClick={handleGenerate} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors focus:outline-none focus:underline">Retry Signal</button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 text-slate-800" aria-hidden="true">
                <Layers size={120} strokeWidth={0.5} className="opacity-10" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-black text-slate-500 tracking-tighter">Neural Engine Standby</p>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Waiting for creative signal...</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-10 right-10 flex gap-3">
              <div className="glass px-4 py-2 rounded-xl border border-white/5">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={10} className="text-blue-500" aria-hidden="true" /> Neural V3.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Categories - Visual Only to match the reference image theme */}
      <section className="mt-20">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Node Categories</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { label: 'Strings', icon: <Music size={20} /> },
            { label: 'Percussion', icon: <Disc size={20} /> },
            { label: 'Electronic', icon: <Guitar size={20} /> },
            { label: 'Vocal', icon: <Mic2 size={20} /> },
            { label: 'Studio', icon: <Layout size={20} /> },
            { label: 'Interface', icon: <Search size={20} /> },
          ].map((cat, i) => (
            <div 
              key={i} 
              tabIndex={0}
              role="button"
              aria-label={`Select category: ${cat.label}`}
              className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center gap-4 hover:bg-white/[0.03] transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                {cat.icon}
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CreativeLab;