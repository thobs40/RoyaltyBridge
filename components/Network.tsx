import React, { useState } from 'react';
import { 
  Users, Search, Mail, MessageSquare, ShieldCheck, UserPlus, 
  Star, ChevronLeft, ExternalLink, Briefcase, Award, 
  TrendingUp, Calendar, Zap, Music, Globe, ArrowRight, Loader2,
  MoreVertical, Share2, Link as LinkIcon, Database, CheckCircle,
  BarChart3, Headphones, Activity, ChevronDown, ChevronUp, Layers, Plus, Sparkles,
  Quote
} from 'lucide-react';
import { MOCK_ROYALTIES } from '../constants';
import { getContactBio } from '../services/geminiService';

interface Contact {
  name: string;
  role: string;
  works: number;
  rating: number;
  status: string;
}

const Network: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [aiBio, setAiBio] = useState<string>('');
  const [aiEndorsement, setAiEndorsement] = useState<string>('');
  const [loadingBio, setLoadingBio] = useState(false);
  const [loadingEndorsement, setLoadingEndorsement] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    trust: true,
    collabs: true,
    portfolio: true
  });

  const contacts: Contact[] = [
    { name: 'Sarah Writer', role: 'Songwriter', works: 12, rating: 4.9, status: 'Verified' },
    { name: 'Mike Mix', role: 'Engineer', works: 8, rating: 4.8, status: 'Verified' },
    { name: 'Luna Vocalist', role: 'Artist', works: 4, rating: 5.0, status: 'Verified' },
    { name: 'David Label', role: 'Publisher', works: 24, rating: 4.7, status: 'Verified' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleViewProfile = async (contact: Contact) => {
    setSelectedContact(contact);
    setLoadingBio(true);
    const bio = await getContactBio(contact.name, contact.role, contact.works);
    setAiBio(bio || '');
    setLoadingBio(false);
  };

  const handleGenerateEndorsement = async () => {
    if (!selectedContact) return;
    setLoadingEndorsement(true);
    // Reuse the bio service but with a "testimonial" context implied by the prompt in geminiService
    const endorsement = await getContactBio(selectedContact.name, selectedContact.role, selectedContact.works);
    setAiEndorsement(endorsement || '');
    setLoadingEndorsement(false);
  };

  const handleBack = () => {
    setSelectedContact(null);
    setAiBio('');
    setAiEndorsement('');
  };

  if (selectedContact) {
    return (
      <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-700 max-w-[1400px] mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={handleBack}
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group"
          >
            <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-blue-600/20 transition-colors border border-white/5">
              <ChevronLeft size={20} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Network Directory</span>
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 border border-white/5 transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 border border-white/5 transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Identity Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 rounded-[3.5rem] border border-white/10 relative overflow-hidden flex flex-col items-center text-center bg-white/[0.01]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />
              
              <div className="relative mb-8 group/avatar">
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-150 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                <div className="relative w-40 h-40 rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-white/5 flex items-center justify-center text-5xl font-black text-white shadow-2xl overflow-hidden group-hover/avatar:scale-[1.02] transition-transform duration-500">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-[#020617] flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <h3 className="text-4xl font-black text-white mb-2 tracking-tight">{selectedContact.name}</h3>
              <p className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] mb-6">{selectedContact.role}</p>

              <div className="flex flex-col gap-4 w-full pt-4 border-t border-white/5">
                <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                  <MessageSquare size={18} /> Direct Message
                </button>
                <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                  <Briefcase size={18} /> New Split Proposal
                </button>
              </div>
            </div>

            {/* AI Insights & Endorsement Cards */}
            <div className="space-y-6">
              {/* Node Audit Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[3rem] blur-xl opacity-40 group-hover:opacity-100 transition duration-1000" />
                <div className="relative glass p-8 rounded-[3rem] border border-blue-500/30 bg-[#020617]/60">
                  <div className="flex items-center gap-4 mb-6">
                    <Sparkles size={20} className="text-blue-400 animate-pulse" />
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Node Audit</h4>
                  </div>
                  {loadingBio ? (
                    <div className="flex items-center gap-4 py-4">
                      <Loader2 size={18} className="animate-spin text-blue-500" />
                      <p className="text-slate-500 font-medium italic text-xs">Scanning nodes...</p>
                    </div>
                  ) : (
                    <p className="text-base text-slate-300 font-medium leading-relaxed italic">
                      "{aiBio}"
                    </p>
                  )}
                </div>
              </div>

              {/* Endorsement Section */}
              <div className="relative group">
                {!aiEndorsement && !loadingEndorsement ? (
                  <button 
                    onClick={handleGenerateEndorsement}
                    className="w-full py-6 glass rounded-[2.5rem] border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10 text-violet-400 transition-all flex flex-col items-center justify-center gap-3 group/endors"
                  >
                    <Award size={24} className="group-hover/endors:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Generate AI Endorsement</span>
                  </button>
                ) : (
                  <div className="relative glass p-8 rounded-[3rem] border border-violet-500/40 bg-violet-950/20 overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-violet-500/10 rotate-12">
                      <Quote size={120} />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <Award size={20} className="text-violet-400" />
                      <h4 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.4em]">Endorsement Ledger</h4>
                    </div>
                    
                    {loadingEndorsement ? (
                      <div className="space-y-4 py-2">
                        <div className="h-3 bg-white/5 rounded-full w-full animate-pulse" />
                        <div className="h-3 bg-white/5 rounded-full w-5/6 animate-pulse" />
                        <div className="h-3 bg-white/5 rounded-full w-4/6 animate-pulse" />
                      </div>
                    ) : (
                      <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <p className="text-sm text-slate-200 font-bold leading-relaxed mb-6 relative z-10">
                          {aiEndorsement}
                        </p>
                        <div className="flex items-center gap-2 text-[9px] font-black text-violet-400 uppercase tracking-widest pt-4 border-t border-white/5">
                          <CheckCircle size={12} /> Registry Verified Recommendation
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6 pb-20">
            
            {/* 1. Trust Ledger Section */}
            <div className={`glass rounded-[2.5rem] border border-white/5 transition-all duration-500 overflow-hidden ${expandedSections.trust ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
              <button 
                onClick={() => toggleSection('trust')}
                className="w-full px-10 py-8 flex justify-between items-center group/btn"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all duration-500 ${expandedSections.trust ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500'}`}>
                    <ShieldCheck size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-black text-white tracking-tight">Trust & Verification Ledger</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Verified Credentials & Performance Ratings</p>
                  </div>
                </div>
                <div className={`transition-transform duration-500 ${expandedSections.trust ? 'rotate-180' : ''}`}>
                   <ChevronDown className="text-slate-600" />
                </div>
              </button>

              {expandedSections.trust && (
                <div className="px-10 pb-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Trust Rating</p>
                      <div className="flex items-center gap-2 text-3xl font-black text-amber-400 tracking-tighter">
                        <Star size={24} fill="currentColor" /> {selectedContact.rating}
                      </div>
                    </div>
                    <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Admin Accuracy</p>
                      <div className="flex items-center gap-2 text-3xl font-black text-emerald-400 tracking-tighter">
                        <CheckCircle size={24} /> 99.9%
                      </div>
                    </div>
                    <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">CMO Affiliation</p>
                      <div className="flex flex-wrap gap-2">
                        {['ASCAP', 'PRS', 'GEMA'].map(soc => (
                          <span key={soc} className="text-[9px] font-black text-blue-400 px-2.5 py-1 bg-blue-500/10 rounded-lg border border-blue-500/20 uppercase">{soc}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Collaborative Ecosystem Section */}
            <div className={`glass rounded-[2.5rem] border border-white/5 transition-all duration-500 overflow-hidden ${expandedSections.collabs ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
              <button 
                onClick={() => toggleSection('collabs')}
                className="w-full px-10 py-8 flex justify-between items-center group/btn"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all duration-500 ${expandedSections.collabs ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500'}`}>
                    <Layers size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-black text-white tracking-tight">Collaborative Ecosystem</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Shared Revenue Nodes & Historical Impact</p>
                  </div>
                </div>
                <div className={`transition-transform duration-500 ${expandedSections.collabs ? 'rotate-180' : ''}`}>
                   <ChevronDown className="text-slate-600" />
                </div>
              </button>

              {expandedSections.collabs && (
                <div className="px-10 pb-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-indigo-600/5 rounded-[2.5rem] border border-indigo-500/10 flex items-center justify-between">
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Joint Equity</p>
                            <p className="text-4xl font-black text-white tracking-tighter">$14,204.30</p>
                         </div>
                         <TrendingUp size={40} className="text-indigo-400 opacity-20" />
                      </div>
                      <div className="p-8 bg-indigo-600/5 rounded-[2.5rem] border border-indigo-500/10 flex items-center justify-between">
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Shared Asset Count</p>
                            <p className="text-4xl font-black text-white tracking-tighter">{selectedContact.works} <span className="text-slate-600 text-xl">Nodes</span></p>
                         </div>
                         <Database size={40} className="text-indigo-400 opacity-20" />
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* 3. Joint Asset Ledger Section */}
            <div className={`glass rounded-[2.5rem] border border-white/5 transition-all duration-500 overflow-hidden ${expandedSections.portfolio ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
              <button 
                onClick={() => toggleSection('portfolio')}
                className="w-full px-10 py-8 flex justify-between items-center group/btn"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all duration-500 ${expandedSections.portfolio ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-500'}`}>
                    <BarChart3 size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-black text-white tracking-tight">Joint Asset Ledger</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Direct Portfolio Tracking & Royalty Status</p>
                  </div>
                </div>
                <div className={`transition-transform duration-500 ${expandedSections.portfolio ? 'rotate-180' : ''}`}>
                   <ChevronDown className="text-slate-600" />
                </div>
              </button>

              {expandedSections.portfolio && (
                <div className="px-10 pb-10 space-y-6 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_ROYALTIES.slice(0, 4).map((work, idx) => (
                      <div key={idx} className="group/work glass p-6 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-600/[0.02] transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover/work:text-emerald-400 transition-all duration-500">
                            <Headphones size={28} />
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Settlement</p>
                            <p className="text-[10px] font-black text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-md">LIVE</p>
                          </div>
                        </div>
                        <h5 className="text-xl font-black text-white mb-2 group-hover/work:text-emerald-400 transition-colors">{work.title}</h5>
                        <div className="flex items-center gap-2 mb-6 text-slate-500 font-bold text-xs">
                          <Database size={14} className="text-slate-700" />
                          {work.cmo} Registered
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{work.status}</span>
                          <ArrowRight size={18} className="text-slate-700 group-hover/work:text-white group-hover/work:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-6 border-2 border-dashed border-white/10 rounded-[2.5rem] text-slate-500 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.3em]">
                    <Plus size={16} /> Load Extended Portfolio
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-white tracking-tighter">Global Network</h2>
          <p className="text-slate-400 font-medium text-lg">Connect with verified rights holders and metadata specialists.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500" size={18} />
            <input 
              type="text" 
              placeholder="Search nodes..." 
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all w-64 text-sm font-medium"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center gap-3">
             <UserPlus size={18} /> Invite Node
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contacts.map((contact, i) => (
          <div key={i} className="group glass p-8 rounded-[3rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden bg-white/[0.01]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 mb-6 flex items-center justify-center text-3xl font-black text-white shadow-2xl group-hover:scale-110 transition-transform duration-700 relative">
                {contact.name.split(' ').map(n => n[0]).join('')}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-xl border-4 border-[#020617] flex items-center justify-center text-white">
                  <ShieldCheck size={14} />
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">{contact.name}</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{contact.role}</p>
              
              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                 <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Rating</p>
                    <p className="text-white font-black flex items-center justify-center gap-1">
                      <Star size={12} fill="currentColor" className="text-amber-400" /> {contact.rating}
                    </p>
                 </div>
                 <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Joint Works</p>
                    <p className="text-white font-black">{contact.works}</p>
                 </div>
              </div>

              <button 
                onClick={() => handleViewProfile(contact)}
                className="w-full py-4 bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white border border-white/10 hover:border-blue-500/50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                View Trust Ledger <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Network;
